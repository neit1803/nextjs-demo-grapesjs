/* eslint-disable @typescript-eslint/no-explicit-any */
export type CreateEditorOptions = {
  selectors: {
    container: string;
    blocks: string;
    traits: string;
    layers: string;
    topbar: string;
  };
  storage: { type: 'local' | 'remote'; projectId?: string };
  enablePresets?: { webpage?: boolean; newsletter?: boolean };
};


import { loadScript } from '../gjs/loadScript';

export async function createEditor(opts: CreateEditorOptions) {
  // 👇 Lấy cả usePlugin từ grapesjs (quan trọng)
  const { default: grapesjs, usePlugin } = await import('grapesjs');

  // Plugin ESM
  
  const blocksBasic  = (await import('grapesjs-blocks-basic')).default;
  const exportPlugin = (await import('grapesjs-plugin-export')).default;

  await loadScript('https://unpkg.com/grapesjs-blocks-table/dist/grapesjs-blocks-table.min.js');
  // const tablePlugin  = (await import('grapesjs-table')).default;

  // Import preset có điều kiện
  let presetWebpage: any;
  if (opts.enablePresets?.webpage) {
    try { presetWebpage = (await import('grapesjs-preset-webpage')).default; }
    catch { console.warn('[GrapesJS] Missing grapesjs-preset-webpage'); }
  }
  let presetNewsletter: any;
  if (opts.enablePresets?.newsletter) {
    try { presetNewsletter = (await import('grapesjs-preset-newsletter')).default; }
    catch { console.warn('[GrapesJS] Missing grapesjs-preset-newsletter'); }
  }

  const { storageManager } = await import('./storage');

  const editor = grapesjs.init({
    container: opts.selectors.container,
    height: '100vh',
    width: '100%',
    noticeOnUnload: false,
    fromElement: false,
    panels: { defaults: [] },
    blockManager: { appendTo: opts.selectors.blocks },
    traitManager: { appendTo: opts.selectors.traits },
    layerManager: { appendTo: opts.selectors.layers },

    canvas: {
      styles: [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
      ],
    },

    storageManager: storageManager(opts.storage),

    // 🚀 Truyền plugin + options bằng usePlugin, bỏ hẳn pluginsOpts
    plugins: [
      usePlugin(blocksBasic, {}),
 // tuỳ chọn thêm nếu muốn
      usePlugin(exportPlugin, {
        filename: () => `template-${Date.now()}.zip`,
      }),
    ],
  });

  // Topbar
  editor.Panels.addPanel({ id: 'topbar', el: opts.selectors.topbar });
  editor.Panels.addButton('topbar', [
    { id: 'visibility',      label: 'Borders',     command: 'sw-visibility' },
    { id: 'export-template', label: 'Export HTML', command: 'export-template' },
    { id: 'export-zip',      label: 'Export ZIP',  command: () => editor.runCommand('gjs-export-zip') },
    { id: 'clear',           label: 'Clear',       command: 'clear-canvas' },
  ]);

  const { registerCustom } = await import('./registerCustom');
  registerCustom(editor);

  editor.on('block:drag:start', b => console.log('Drag start', b?.id));
  editor.on('block:drag:stop',  b => console.log('Drag stop',  b?.id));

  return () => editor.destroy();
}
