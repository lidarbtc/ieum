import { build } from 'esbuild';
import { renderSeoHead, renderRobots, renderSitemap } from './seo.mjs';
import { githubLink, writeGroupPages } from './group-pages.mjs';
import { copyFile, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const outputDirectory = resolve(root, 'dist');

export async function buildApp() {
  const result = await build({
    absWorkingDir: root,
    entryPoints: ['src/app.js'],
    bundle: true,
    minify: true,
    format: 'iife',
    write: false,
    legalComments: 'inline',
    target: ['es2020'],
  });
  const [template, css, contentCss, rawData, catalogBundle] = await Promise.all([
    readFile(resolve(root, 'src/index.html'), 'utf8'),
    readFile(resolve(root, 'src/style.css'), 'utf8'),
    readFile(resolve(root, 'src/content.css'), 'utf8'),
    readFile(resolve(root, 'data/girl-group-graph.json'), 'utf8'),
    build({absWorkingDir:root,entryPoints:['src/catalog.js'],bundle:true,minify:true,format:'iife',write:false,target:['es2020']}),
  ]);
  const javascript = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
  const html = template
    .replace('__SEO_HEAD__', () => renderSeoHead())
    .replace('__GITHUB_LINK__', () => githubLink())
    .replace('__CSS__', () => css)
    .replace('__JS__', () => javascript);
  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });
  await cp(resolve(root, 'public'), outputDirectory, { recursive: true });
  await writeFile(resolve(outputDirectory, 'index.html'), html);
  await writeFile(resolve(outputDirectory, 'robots.txt'), renderRobots());
  const catalog = await writeGroupPages({ data: JSON.parse(rawData), outputDirectory, css: css + '\n' + contentCss, javascript: catalogBundle.outputFiles[0].text });
  await writeFile(resolve(outputDirectory, 'sitemap.xml'), renderSitemap(['/', '/groups/', ...catalog.map(group => group.path)]));
  await copyFile(resolve(root, 'LICENSE'), resolve(outputDirectory, 'LICENSE'));
  await copyFile(
    resolve(root, 'THIRD_PARTY_LICENSES.txt'),
    resolve(outputDirectory, 'THIRD_PARTY_LICENSES.txt'),
  );
  console.log(`Built map, group index and ${catalog.length} group pages`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await buildApp();
}
