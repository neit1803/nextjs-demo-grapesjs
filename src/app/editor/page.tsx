"use client";

import { useEffect } from "react";
import createStudioEditor from "@grapesjs/studio-sdk";
import {
  tableComponent,
  listPagesComponent,
  lightGalleryComponent,
  iconifyComponent,
  accordionComponent,
  flexComponent,
  canvasEmptyState,
  canvasFullSize,
  canvasGridMode,
  layoutSidebarButtons,
} from "@grapesjs/studio-sdk-plugins";
import "@grapesjs/studio-sdk/style";

export default function EditorPage() {
  useEffect(() => {
    // Chỉ init 1 lần khi component mount
    const editor = createStudioEditor({
      root: "#studio-editor",
      licenseKey: process.env.GRAPESJS_LICENSE_KEY || "Missing GrapesJS Key", // vẫn free nếu bạn dùng open-source
      project: { type: "web" },
      assets: {
        storageType: "self",
        onUpload: async ({ files }) => {
          const body = new FormData();
          for (const file of files) {
            body.append("files", file);
          }
          // const response = await fetch("http://localhost:8080/api/assets", {
          //   method: "POST",
          //   body,
          // });
          // return await response.json(); // [{ src: "url" }]

          console.log("Uploaded files:", files);
          return files.map((file) => ({ src: URL.createObjectURL(file) }));
        },
        onDelete: async ({ assets }) => {
          // await fetch("http://localhost:8080/api/assets", {
          //   method: "DELETE",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify(assets),
          // });
          console.log("Deleted assets:", assets);
        },
      },
      storage: {
        type: "self",
        onSave: async ({ project }) => {
          // await fetch("http://localhost:8080/api/projects", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify(project),
          // });
          console.log("Project saved:", project);
        },
        // onLoad: async () => {
        //   const res = await fetch("http://localhost:8080/api/projects/1"); // ví dụ load template id=1
        //   const project = await res.json();
        //   return { project };
        // },
        autosaveChanges: 100,
        autosaveIntervalMs: 10000,
      },
      plugins: [
        tableComponent.init({}),
        listPagesComponent.init({}),
        lightGalleryComponent.init({}),
        iconifyComponent.init({}),
        accordionComponent.init({}),
        flexComponent.init({}),
        canvasEmptyState.init({}),
        canvasFullSize.init({}),
        canvasGridMode.init({}),
        layoutSidebarButtons.init({}),
      ],
    });

    return () => {
      // Nếu cần cleanup khi unmount
      // editor.destroy?.();
    };
  }, []);

  return <div id="studio-editor" style={{ height: "100vh" }} />;
}
