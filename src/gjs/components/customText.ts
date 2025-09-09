// import type { Editor } from 'grapesjs';

// export function registerCustomText(editor: Editor) {
//   editor.DomComponents.addType('custom-text', {
//     model: {
//       defaults: {
//         editable: true,
//         traits: [
//           { type: 'text',   label: 'Content',   name: 'content',  changeProp: true },
//           { type: 'number', label: 'Font Size', name: 'fontSize', changeProp: true },
//           { type: 'color',  label: 'Color',     name: 'color',    changeProp: true },
//         ],
//       },
//       init() {
//         this.on('change:content change:fontSize change:color', this.updateText);
//       },
//       updateText() {
//         const content  = this.get('content');
//         const fontSize = this.get('fontSize');
//         const color    = this.get('color');
//         const el = this.getEl() as HTMLElement | null;
//         if (!el) return;
//         if (typeof content === 'string') el.innerText = content;
//         if (fontSize) el.style.fontSize = `${fontSize}px`;
//         if (color) el.style.color = String(color);
//       },
//     },
//   });
// }
