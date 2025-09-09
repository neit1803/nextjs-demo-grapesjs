export function storageManager(
  cfg: { type: 'local' | 'remote'; projectId?: string }
) {
  if (cfg.type === 'local') {
    return {
      type: 'local',
      autosave: true,
      autoload: true,
      stepsBeforeSave: 1,
      options: {
        local: { key: `gjs-${cfg.projectId ?? 'default'}` },
      },
    };
  }

  const id = cfg.projectId ?? 'default';
  const endpoint = `/api/gjs/${id}`;

  return {
    type: 'remote',
    autosave: true,
    autoload: true,
    stepsBeforeSave: 2,
    options: {
      remote: {
        urlLoad: endpoint,
        urlStore: endpoint,
        fetchOptions: (opts: any) =>
          opts.method === 'POST' ? { method: 'PATCH' } : {},
        onStore: (data: any) => ({ id, data }),
        onLoad: (result: any) => result.data,
      },
    },
  };
}
