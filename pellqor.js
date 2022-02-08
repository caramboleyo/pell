const defaultParagraphSeparatorString = 'defaultParagraphSeparator';
const formatBlock = 'formatBlock';
const queryCommandState = command => document.queryCommandState(command);
const queryCommandValue = command => document.queryCommandValue(command);

const defaultActions = {
	bold: {
		state: () => queryCommandState('bold'),
		result: () => exec('bold')
	},
	italic: {
		state: () => queryCommandState('italic'),
		result: () => exec('italic')
	},
	underline: {
		state: () => queryCommandState('underline'),
		result: () => exec('underline')
	},
	strikethrough: {
		state: () => queryCommandState('strikeThrough'),
		result: () => exec('strikeThrough')
	},
	heading1: {
		state: () => queryCommandState('h1'),
		result: () => exec(formatBlock, '<h1>')
	},
	heading2: {
		result: () => exec(formatBlock, '<h2>')
	},
	heading3: {
		result: () => exec(formatBlock, '<h3>')
	},
	heading4: {
		result: () => exec(formatBlock, '<h4>')
	},
	heading5: {
		result: () => exec(formatBlock, '<h5>')
	},
	heading6: {
		result: () => exec(formatBlock, '<h6>')
	},
	paragraph: {
		result: () => exec(formatBlock, '<p>')
	},
	quote: {
		result: () => exec(formatBlock, '<blockquote>')
	},
	olist: {
		result: () => exec('insertOrderedList')
	},
	ulist: {
		result: () => exec('insertUnorderedList')
	},
	code: {
		result: () => exec(formatBlock, '<pre>')
	},
	line: {
		result: () => exec('insertHorizontalRule')
	},
	link: {
		result: () => {
			const url = window.prompt('Enter the link URL')
			if (url) exec('createLink', url)
		}
	},
	image: {
		result: () => {
			const url = window.prompt('Enter the image URL')
			if (url) exec('insertImage', url)
		}
	}
}

const defaultClasses = {
	editor: 'pell-editor',
	content: 'pell-content',
	selected: 'pell-button-selected'
};

export function init(settings) {
	if (!settings.element) {
		throw Error('pellqor setting missing: element');
	}
	settings.element.settings = settings;

	let actions = defaultActions;
	if (settings.actions) {
		Object.assign(actions, settings.actions);
	}

	const classes = { ...defaultClasses, ...settings.classes };
	settings.element.classList.add(classes.editor);

	const defaultParagraphSeparator = settings[defaultParagraphSeparatorString] || 'p';

	const content = settings.element.content = document.createElement('div');
	content.contentEditable = true;
	content.className = classes.content;
	content.oninput = ({ target: { firstChild } }) => {
		if (firstChild && firstChild.nodeType === 3) exec(formatBlock, `<${defaultParagraphSeparator}>`);
		else if (content.innerHTML === '<br>') content.innerHTML = '';
		settings.onChange(content.innerHTML);
	}
	content.onkeydown = event => {
		if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
			setTimeout(() => exec(formatBlock, `<${defaultParagraphSeparator}>`), 0);
		}
	}
	settings.element.content.innerHTML = settings.element.innerHTML;
	settings.element.innerHTML = '';
	settings.element.appendChild(content);

	if (settings.styleWithCSS) exec('styleWithCSS');
	exec(defaultParagraphSeparatorString, defaultParagraphSeparator);

	settings.element.action = {};
	for (const action in actions) {
		settings.element.action[action] = () => defaultActions[action].result() && content.focus();
	}

	settings.element.watchState = (element, action) => {
		action = defaultActions[action];
		if (action.state) {
			const handler = () => element.classList[action.state() ? 'add' : 'remove'](classes.selected);
			content.addEventListener('keyup', handler);
			content.addEventListener('mouseup', handler);
			element.addEventListener('click', handler);
		}
	};

	settings.onChange(content.innerHTML)
	return settings.element;
}

export function exec(command, value = null) {
	return document.execCommand(command, false, value);
}

export default { exec, init };
