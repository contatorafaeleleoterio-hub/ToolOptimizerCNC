/**
 * vite-plugin-admin-sync — dev-only Vite plugin
 *
 * Registers a POST /api/admin-sync endpoint that writes the request body
 * (JSON) to docs/admin-requests.json. This lets the admin tasks page
 * persist tasks to the filesystem so Claude can read them at session start.
 *
 * Only active during `vite dev` (apply: 'serve').
 */

import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

export function adminSyncPlugin(): Plugin {
  return {
    name: 'admin-sync',
    apply: 'serve',

    configureServer(server) {
      server.middlewares.use('/api/admin-sync', (req, res, next) => {
        if (req.method !== 'POST') {
          next();
          return;
        }

        let body = '';
        req.on('data', (chunk: Buffer) => {
          body += chunk.toString();
        });

        req.on('end', () => {
          try {
            const data: unknown = JSON.parse(body);
            const outPath = path.resolve(process.cwd(), 'docs/admin-requests.json');
            fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8');

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true }));
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
          }
        });
      });
    },
  };
}
