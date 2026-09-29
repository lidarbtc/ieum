import { watch } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { buildApp, root, outputDirectory } from './build.mjs';

const portIndex = process.argv.indexOf('--port');
const port = portIndex === -1 ? 5173 : Number(process.argv[portIndex + 1]);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('Use --port followed by a port number between 1 and 65535.');
}

await buildApp();
const routes = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/LICENSE', ['LICENSE', 'text/plain; charset=utf-8']],
  ['/THIRD_PARTY_LICENSES.txt', ['THIRD_PARTY_LICENSES.txt', 'text/plain; charset=utf-8']],
]);
const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const route = routes.get(pathname);
  if (!route || !['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(404).end('Not found');
    return;
  }
  try {
    const body = await readFile(resolve(outputDirectory, route[0]));
    response.writeHead(200, {
      'Content-Type': route[1],
      'Cache-Control': 'no-store',
      'Content-Length': body.length,
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(503).end('Build unavailable');
  }
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Ieum: http://127.0.0.1:${port}/`);
  console.log('Source changes rebuild automatically. Refresh the browser to see them.');
});

let timer;
let building = false;
let pending = false;
async function rebuild() {
  if (building) {
    pending = true;
    return;
  }
  building = true;
  do {
    pending = false;
    try {
      await buildApp();
    } catch (error) {
      console.error(error);
    }
  } while (pending);
  building = false;
}
const watchers = ['src', 'data'].map((directory) =>
  watch(resolve(root, directory), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 100);
  }),
);
function close() {
  clearTimeout(timer);
  watchers.forEach((watcher) => watcher.close());
  server.close();
}
process.once('SIGINT', close);
process.once('SIGTERM', close);
