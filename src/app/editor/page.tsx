"use client";
import createStudioEditor from '@grapesjs/studio-sdk';
import { tableComponent, listPagesComponent, lightGalleryComponent, iconifyComponent, accordionComponent, flexComponent, canvasEmptyState, canvasFullSize, canvasGridMode, layoutSidebarButtons } from '@grapesjs/studio-sdk-plugins';
import '@grapesjs/studio-sdk/style';
import { saveTemplate } from "@/lib/api";

export default function EditorPage() {
// ...once the '#studio-editor' DOM element is rendered
  createStudioEditor({
    root: '#studio-editor',
    licenseKey: '149bc6f4bc764a17ab6e08faeb5f40a3518121f29ac5476388011a9143a751da',
    project: {
      type: 'web'
    },
    assets: {
      storageType: 'self',
      // Provide a custom upload handler for assets
      onUpload: async ({ files }) => {
        const body = new FormData();
        for (const file of files) {
          body.append('files', file);
        }
        const response = await fetch('ASSETS_UPLOAD_URL', { method: 'POST', body });
        const result = await response.json();
        // The expected result should be an array of assets, eg.
        // [{ src: 'ASSET_URL' }]
        return result;
      },
      // Provide a custom handler for deleting assets
      onDelete: async ({ assets }) => {
        const body = JSON.stringify(assets);
        // await fetch('ASSETS_DELETE_URL', { method: 'DELETE', body });
        console.log('Delete these assets:', assets);
      }
    },
    storage: {
      type: 'self',
      // Provide a custom handler for saving the project data.
      onSave: async ({ project }) => {
        throw new Error('Implement your "onSave"!');
        const body = new FormData();
        body.append('project', JSON.stringify(project));
        // await fetch('PROJECT_SAVE_URL', { method: 'POST', body });
        await saveTemplate(project);
        console.log('Project data to be saved:', project);
      },
      // Provide a custom handler for loading project data.
      onLoad: async () => {
        throw new Error('Implement your "onLoad"!');
        // const response = await fetch('PROJECT_LOAD_URL');
        // const project = await response.json();
        // // The project JSON is expected to be returned inside an object.
        // return { project };
      },
      autosaveChanges: 100,
      autosaveIntervalMs: 10000
    },
    plugins: [
      tableComponent.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/components/table */ }),
      listPagesComponent.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/components/listPages */ }),
      lightGalleryComponent.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/components/lightGallery */ }),
      iconifyComponent.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/components/iconify */ }),
      accordionComponent.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/components/accordion */ }),
      flexComponent.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/components/flex */ }),
      canvasEmptyState.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/canvas/emptyState */ }),
      canvasFullSize.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/canvas/full-size */ }),
      canvasGridMode.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/canvas/grid-mode */ }),
      layoutSidebarButtons.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/layout/sidebar-buttons */ })
    ]
  });
}
