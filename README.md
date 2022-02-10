## Pellqor
pellqor is the extracted core of the [pell wysiwyg editor](https://github.com/jaredreich/pell), giving you a headless, super simple wysiwyg editor.

Live demo: https://caramboleyo.github.io/pellqor/

## Modifications to original [pell](https://github.com/jaredreich/pell)

* New `watchState` function, to trigger selected class on a button when its action is active at cursor position
* actions is an object now, properties are the action names
* More actions were added
* execCommands `enableInlineTableEditing`, `enableAbsolutePositionEditor` and `enableObjectResizing` are active by default, but only seem to work in Firefox

## Notes

Pell relies fully on the [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) function, which is officially deprecated but still works in all major browsers. This means it is completly left to the browser on how to interprete one of this commands. For example the table edit functions work in Firefox - it has them since Netscape, but not in Chrome.

## Features

* Pure JavaScript, no dependencies, ES6 module

Included actions:
- bold
- italic
- underline
- strikethrough
- justifyLeft
- justifyCenter
- justifyRight
- justifyFull
- subscript
- superscript
- indent
- outdent
- heading1
- heading2
- heading3
- heading4
- heading5
- heading6
- paragraph
- quote
- orderedList
- unorderedList
- code
- horizontalRule
- link
- image
- undo
- redo
- clearFormatting

Other available actions (listed at https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand):
- Font Size
- Font Name

Or create any custom action!

## Browser Support

* IE 9+ (theoretically, but good luck)
* Chrome 5+
* Firefox 4+
* Safari 5+
* Opera 11.6+

## Installation

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<style>
			.pell-button-selected { font-weight: bold; }
		</style>
	</head>
	<body>
		<button id="boldButton" onclick="editor.action.bold()">Bold</button>
		<div id="editor">This is a <b>sample</b> text.</div>
		<script type="module">
			import pellqor from 'https://cdn.centralis.world/js/pellqor/20220209/pellqor.js';
			const editor = pellqor.init({
				element: document.getElementById('editor')
			});
			editor.watchState(document.getElementById('boldButton'), 'bold');
		</script>
	</body>
</html>
```

## Usage

```js
// Initialize pell on an HTMLElement
const editor = pellqor.init({
	// <HTMLElement>, required
	element: document.getElementById('some-id'),

	// <Function>, optional
	// Use the output html, triggered by element's `oninput` event
	onChange: html => console.log(html),

	// <string>, optional, default = 'p'
	// Instructs the editor which element to inject via the return key
	defaultParagraphSeparator: 'p',

	// <boolean>, optional, default = false
	// Outputs <span style="font-weight: bold;"></span> instead of <b></b>
	styleWithCSS: false,

	// <Object>, optional
	actions: {
		myAction: {
			state: () => false, // return true to set your button active
			result: () => console.log('Do something!')
		},
	},

	// Choose your custom class names, optional
	classes: {
		editor: 'pell-editor',
		content: 'pell-content',
		selected: 'pell-button-selected'
	}
})

// This makes your buttons active if their operation is active in the selection
// eg if you have a bold button and the cursor is inside bold text, this triggers
// the classes.selected class in your button
editor.watchState(document.getElementById('myStrikeButton'), 'strikethrough');

// Execute a document command, see reference:
// https://developer.mozilla.org/en/docs/Web/API/Document/execCommand
// this is just `document.execCommand(command, false, value)`
pellqor.exec('command', 'value')
```

## License

MIT
