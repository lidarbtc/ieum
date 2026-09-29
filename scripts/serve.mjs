import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.ico', 'image/x-icon'],
  ['.webmanifest', 'application/manifest+json'],
  ['.json', 'application/json; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
]);

export function createSiteServer(directory) {
  const output = resolve(directory);
  return createServer(async (request, response) => {
    const send = (status, body, contentType) => {
      response.writeHead(status, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store',
        'Content-Length': Buffer.byteLength(body),
        'X-Content-Type-Options': 'nosniff',
      });
      response.end(request.method === 'HEAD' ? undefined : body);
    };
    const notFound = async () => {
      try {
        send(404, await readFile(resolve(output, '404.html')), 'text/html; charset=utf-8');
      } catch {
        send(404, 'Not found', 'text/plain; charset=utf-8');
      }
    };
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    let pathname, parsedUrl;
    try {
      parsedUrl = new URL(request.url, 'http://localhost');
      pathname = decodeURIComponent(parsedUrl.pathname);
    } catch {
      send(400, 'Invalid URL', 'text/plain; charset=utf-8');
      return;
    }
    if (pathname.endsWith('/index.html')) {
      response.writeHead(301, { Location: encodeURI(pathname.slice(0, -'index.html'.length)) + parsedUrl.search, 'Cache-Control': 'no-store' }).end();
      return;
    }
    const relativePath = pathname === '/' ? 'index.html' : pathname.slice(1);
    if (relativePath.split(/[\\/]/).some((part) => part.startsWith('.') || part === '_headers' || part === '_redirects')) {
      await notFound();
      return;
    }
    let path = resolve(output, relativePath);
    if (!path.startsWith(output + sep)) {
      await notFound();
      return;
    }
    try {
      if ((await stat(path)).isDirectory()) {
        if (!pathname.endsWith('/')) {
          response.writeHead(301, { Location: encodeURI(pathname) + '/' + parsedUrl.search }).end();
          return;
        }
        path = resolve(path, 'index.html');
      }
      const data = await readFile(path);
      send(200, data, contentTypes.get(extname(path)) || 'text/plain; charset=utf-8');
    } catch {
      await notFound();
    }
  });
}
