'use client';

import { useEffect, useRef } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import { createEditor } from '@/lib/gjs/createEditor';

export default function EditorShell() {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    let destroy: (() => void) | undefined;

    (async () => {
      destroy = await createEditor({
        selectors: {
          container: '#gjs-canvas',
          blocks: '#gjs-blocks',
          traits: '#gjs-traits',
          layers: '#gjs-layers',
          topbar: '#gjs-topbar',
        },
        storage: { type: 'local', projectId: 'demo-1' },
        enablePresets: {
          webpage: true,     // preset web miễn phí
          newsletter: false, // bật true nếu cần preset newsletter
        },
      });
    })();

    return () => destroy?.();
  }, []);

  return (
    <div className="h-screen grid grid-cols-[280px_1fr]">
      <aside className="border-r overflow-auto">
        <div id="gjs-topbar" className="p-2 border-b" />
        <div id="gjs-blocks" className="p-2 border-b" />
        <div id="gjs-traits" className="p-2 border-b" />
        <div id="gjs-layers" className="p-2" />
      </aside>
      <main id="gjs-canvas" />
    </div>
  );
}
