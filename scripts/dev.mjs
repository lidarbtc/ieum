import { watch } from 'node:fs';
import { createSiteServer } from './serve.mjs';
import { resolve } from 'node:path';
import { buildApp, root, outputDirectory } from './build.mjs';

const portIndex = process.argv.indexOf('--port');
const port = portIndex === -1 ? 5173 : Number(process.argv[portIndex + 1]);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('Use --port followed by a port number between 1 and 65535.');
}

await buildApp();
const server = createSiteServer(outputDirectory);
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
const watchers = ['src', 'data', 'public'].map((directory) =>
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
