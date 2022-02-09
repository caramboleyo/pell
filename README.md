pellqor is the extracted core of the [pell wysiwyg editor](https://github.com/jaredreich/pell), giving you a headless, super simple wysiwyg editor.

Live demo: [https://jaredreich.com/pell](https://jaredreich.com/pell)

[![Live demo](/demo.gif?raw=true "Demo")](https://jaredreich.com/pell)

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
- uutdent
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

#### HTML:

```html
<html>
	<head>
		<meta charset="UTF-8">
	</head>
	<body>
		<div id="editor">This is a <b>sample</b> text.</div>
		<script>
			import pellqor from '//cdn.centralis.world/js/pellqor.js';
			const.editor = pellqor.init({
				element: document.getElementById('editor')
			});
		</script>
	</body>
</html>
```

## Usage

#### API

```js
// Initialize pell on an HTMLElement
const editor = pellqor.init({
	// <HTMLElement>, required
	element: document.getElementById('some-id'),

	// <Function>, required
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

	// Choose your custom class names
	classes: {
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

#### List of overwriteable action names
- bold
- italic
- underline
- strikethrough
- heading1
- heading2
- paragraph
- quote
- olist
- ulist
- code
- line
- link
- image

## Examples

### General

```html
<div id="editor" class="pell"></div>
<div>
	HTML output:
	<div id="html-output" style="white-space:pre-wrap;"></div>
</div>
```

## License

MIT
