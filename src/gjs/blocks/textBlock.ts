import type { Editor } from 'grapesjs';

export const TextBlock = (editor: Editor, opts?: { label?: string }) => {
  editor.BlockManager.add('custom-text', {
    label: `
      <div style="display:flex;flex-direction:column;align-items:center;font-size:12px">
        <i class="fa-solid fa-font" style="font-size:20px;margin-bottom:5px"></i>
        <div>${opts?.label ?? 'Text'}</div>
      </div>
    `,
    content: `
      <div data-gjs-type="custom-text"
           style="padding:10px;width:100%;font-size:16px;color:#333;">
        Insert your text
      </div>
    `,
    category: 'Basic',
  });
};
