import { build } from 'esbuild';
import { renderSeoHead, renderRobots, renderSitemap } from './seo.mjs';
import { githubLink, writeGroupPages, createPathData } from './group-pages.mjs';
import { copyFile, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages, localizedPath } from '../src/i18n.js';
import { renderTemplate, languageLink } from './templates.mjs';

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
  const [template, css, contentCss, rawData, catalogBundle, navigationBundle, aboutMarkup, pathMarkup] = await Promise.all([
    readFile(resolve(root, 'src/index.html'), 'utf8'),
    readFile(resolve(root, 'src/style.css'), 'utf8'),
    readFile(resolve(root, 'src/content.css'), 'utf8'),
    readFile(resolve(root, 'data/girl-group-graph.json'), 'utf8'),
    build({absWorkingDir:root,entryPoints:['src/catalog.js'],bundle:true,minify:true,format:'iife',write:false,target:['es2020']}),
    build({absWorkingDir:root,entryPoints:['src/content-navigation.js'],bundle:true,minify:true,format:'iife',write:false,target:['es2020']}),
    readFile(resolve(root, 'src/about-dialog.html'), 'utf8'),
    readFile(resolve(root, 'src/path-dialog.html'), 'utf8'),
  ]);
  const javascript = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });
  await cp(resolve(root, 'public'), outputDirectory, { recursive: true });
  await writeFile(resolve(outputDirectory, 'robots.txt'), renderRobots());
  const data = JSON.parse(rawData);
  const catalogs = [];
  const paths = [];
  for (const language of languages) {
    const path = localizedPath('/', language);
    const about = renderTemplate(aboutMarkup, language);
    const html = renderTemplate(template, language)
      .replace('__SEO_HEAD__', () => renderSeoHead({ path, language }))
      .replace('__GITHUB_LINK__', () => githubLink('github-link', language))
      .replace('__LANGUAGE_LINK__', () => languageLink(path, language))
      .replace('__ABOUT_DIALOG__', () => about)
      .replace('__CSS__', () => css)
      .replace('__JS__', () => javascript);
    const directory = resolve(outputDirectory, language === 'en' ? 'en' : '.');
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, 'index.html'), html);
    const catalog = await writeGroupPages({ data, outputDirectory, css: css + '\n' + contentCss, javascript: catalogBundle.outputFiles[0].text, aboutMarkup: about, pathMarkup: renderTemplate(pathMarkup, language), navigationJavascript: navigationBundle.outputFiles[0].text, language });
    catalogs.push(catalog);
    paths.push(path, localizedPath('/groups/', language), ...catalog.map(group => group.path));
  }
  await writeFile(resolve(outputDirectory, 'content-navigation.js'), navigationBundle.outputFiles[0].text);
  await writeFile(resolve(outputDirectory, 'path-data.json'), JSON.stringify(createPathData(data, catalogs[0])));
  await writeFile(resolve(outputDirectory, 'sitemap.xml'), renderSitemap(paths));
  await copyFile(resolve(root, 'LICENSE'), resolve(outputDirectory, 'LICENSE'));
  await copyFile(
    resolve(root, 'THIRD_PARTY_LICENSES.txt'),
    resolve(outputDirectory, 'THIRD_PARTY_LICENSES.txt'),
  );
  console.log(`Built ${paths.length} pages in ${languages.length} languages`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await buildApp();
}
