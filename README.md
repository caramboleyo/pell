pellqor is the extracted core of the [pell wysiwyg editor](https://github.com/jaredreich/pell), giving you a headless, super simple wysiwyg editor.

Live demo: https://caramboleyo.github.io/pellqor/

## Features

* Pure JavaScript, no dependencies, ES6 module

Included actions:
- Bold
- Italic
- Underline
- Strike-through
- Heading 1
- Heading 2
- Paragraph
- Quote
- Ordered List
- Unordered List
- Code
- Horizontal Rule
- Link
- Image

Other available actions (listed at https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand):
- Justify Center
- Justify Full
- Justify Left
- Justify Right
- Subscript
- Superscript
- Font Name
- Font Size
- Indent
- Outdent
- Clear Formatting
- Undo
- Redo

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
<head>
  ...
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/pell/dist/pell.min.css">
  <style>
    /* override styles here */
    .pell-content {
      background-color: pink;
    }
  </style>
</head>
<body>
  ...
  <!-- Bottom of body -->
  <script src="https://unpkg.com/pell"></script>
</body>
```

## Usage

#### API

```js
// ES6
import pell from 'pell'
// or
import { exec, init } from 'pell'
```

```js
// Browser
pell
// or
window.pell
```

```js
// Initialize pell on an HTMLElement
pell.init({
  // <HTMLElement>, required
  element: document.getElementById('some-id'),

  // <Function>, required
  // Use the output html, triggered by element's `oninput` event
  onChange: html => console.log(html),

  // <string>, optional, default = 'div'
  // Instructs the editor which element to inject via the return key
  defaultParagraphSeparator: 'div',

  // <boolean>, optional, default = false
  // Outputs <span style="font-weight: bold;"></span> instead of <b></b>
  styleWithCSS: false,

  // <Array[string | Object]>, string if overwriting, object if customizing/creating
  // action.name<string> (only required if overwriting)
  // action.icon<string> (optional if overwriting, required if custom action)
  // action.title<string> (optional)
  // action.result<Function> (required)
  // Specify the actions you specifically want (in order)
  actions: [
    'bold',
    {
      name: 'custom',
      icon: 'C',
      title: 'Custom Action',
      result: () => console.log('Do something!')
    },
    'underline'
  ],

  // classes<Array[string]> (optional)
  // Choose your custom class names
  classes: {
    actionbar: 'pell-actionbar',
    button: 'pell-button',
    content: 'pell-content',
    selected: 'pell-button-selected'
  }
})

// Execute a document command, see reference:
// https://developer.mozilla.org/en/docs/Web/API/Document/execCommand
// this is just `document.execCommand(command, false, value)`
pell.exec(command<string>, value<string>)
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

#### General

```html
<div id="editor" class="pell"></div>
<div>
  HTML output:
  <div id="html-output" style="white-space:pre-wrap;"></div>
</div>
```

```js
import { exec, init } from 'pell'

const editor = init({
  element: document.getElementById('editor'),
  onChange: html => {
    document.getElementById('html-output').textContent = html
  },
  defaultParagraphSeparator: 'p',
  styleWithCSS: true,
  actions: [
    'bold',
    'underline',
    {
      name: 'italic',
      result: () => exec('italic')
    },
    {
      name: 'backColor',
      icon: '<div style="background-color:pink;">A</div>',
      title: 'Highlight Color',
      result: () => exec('backColor', 'pink')
    },
    {
      name: 'image',
      result: () => {
        const url = window.prompt('Enter the image URL')
        if (url) exec('insertImage', url)
      }
    },
    {
      name: 'link',
      result: () => {
        const url = window.prompt('Enter the link URL')
        if (url) exec('createLink', url)
      }
    }
  ],
  classes: {
    actionbar: 'pell-actionbar-custom-name',
    button: 'pell-button-custom-name',
    content: 'pell-content-custom-name',
    selected: 'pell-button-selected-custom-name'
  }
})

// editor.content<HTMLElement>
// To change the editor's content:
editor.content.innerHTML = '<b><u><i>Initial content!</i></u></b>'
```

#### Example (Markdown)

```html
<div id="editor" class="pell"></div>
<div>
  Markdown output:
  <div id="markdown-output" style="white-space:pre-wrap;"></div>
</div>
```

```js
import { init } from 'pell'
import Turndown from 'turndown'

const { turndown } = new Turndown({ headingStyle: 'atx' })

init({
  element: document.getElementById('editor'),
  actions: ['bold', 'italic', 'heading1', 'heading2', 'olist', 'ulist'],
  onChange: html => {
    document.getElementById('markdown-output').innerHTML = turndown(html)
  }
})
```

## License

MIT
