import type { Editor } from 'grapesjs';

export async function registerCustom(editor: Editor) {
  // Đăng ký các block custom của bạn
  const { TextBlock }  = await import('../../gjs/blocks/textBlock');
  // const { ImageBlock } = await import('../../gjs/blocks/imageBlock');
  // const { TableBlock } = await import('../../gjs/blocks/tableBlock');

  // TextBlock(editor, { label: 'My Text' });
  // ImageBlock(editor, { label: 'My Image' });
  // TableBlock(editor, { label: 'My Table' });

  // (tuỳ chọn) đăng ký component type riêng
  // const { registerCustomText } = await import('../../gjs/components/customText');
  // registerCustomText(editor);
}
