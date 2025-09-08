// app/editor/page.tsx
"use client";
import { useEffect, useRef } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { saveTemplate } from "@/lib/api";

export default function EditorPage() {
  // ref sẽ lưu instance của GrapesJS editor
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = grapesjs.init({
        container: "#gjs",
        height: "100vh",
        storageManager: false,
      });
      editorRef.current = editor;
    }
  }, []);

  const handleSave = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const html = editor.getHtml();
    const css = editor.getCss();
    const json = editor.getComponents();

    console.log("HTML:", html);
    console.log("CSS:", css);
    console.log("JSON:", json);

    saveTemplate({ html, css, json })
  };

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <div id="gjs" />
    </div>
  );
}
