import { readFile, readdir, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(docsRoot, '..');
const sourceRoot = path.join(docsRoot, 'src/content/docs');
const outputRoot = path.join(docsRoot, 'github');

const navigation = [
  {
    section: 'Getting started tutorial',
    items: [
      ['Tutorial overview', 'tutorial'],
      ['1. Install Piton', 'tutorial/01-install-piton'],
      ['2. Add the factory package', 'tutorial/02-add-factory'],
      ['3. Scaffold the factory', 'tutorial/03-scaffold'],
      ['4. Onboard', 'tutorial/04-onboard'],
      ['5. Submit your first order', 'tutorial/05-first-order'],
      ['6. Answer and deliver', 'tutorial/06-answer-deliver'],
      ['7. Shut down and verify', 'tutorial/07-shutdown-verify'],
    ],
  },
  {
    section: 'Start here',
    items: [
      ['How it works', 'start/how-it-works'],
      ['Set up in a new project', 'start/setup'],
      ['First run', 'start/quickstart'],
      ['Core concepts', 'start/concepts'],
      ['Why a factory', 'start/why'],
      ['Design choices', 'start/choices'],
    ],
  },
  {
    section: 'Guides',
    items: [
      ['Onboarding and configuration', 'guides/onboarding'],
      ['Operating a factory', 'guides/operating'],
      ['Planning and dependencies', 'guides/planning'],
      ['Execution', 'guides/execution'],
      ['Delivery and integration', 'guides/delivery'],
      ['Recovery', 'guides/recovery'],
      ['Model routing and budgets', 'guides/routing'],
      ['Security and audit', 'guides/security'],
      ['Self-enhancement', 'guides/evolution'],
      ['Conformance', 'guides/conformance'],
    ],
  },
  {
    section: 'Reference',
    items: [
      ['Commands', 'reference/commands'],
      ['States', 'reference/states'],
      ['Descriptor', 'reference/descriptor'],
      ['Operations', 'reference/operations'],
      ['Glossary', 'reference/glossary'],
    ],
  },
];

const flatNavigation = navigation.flatMap((group) => group.items);

async function collectMarkdown(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectMarkdown(full)));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function sourceSlug(file) {
  return path.relative(sourceRoot, file).replace(/\.md$/, '');
}

let sourceSlugs = new Set();

function resolveSourceSlug(slug) {
  if (sourceSlugs.has(`${slug}/index`)) return `${slug}/index`;
  return slug;
}

function navSlugForSource(slug) {
  if (slug === 'index') return 'index';
  if (slug.endsWith('/index')) return slug.slice(0, -'/index'.length);
  return slug;
}

function sourceToOutputSlug(slug) {
  if (slug === 'index') return 'README';
  if (slug.endsWith('/index')) return `${slug.slice(0, -'index'.length)}README`;
  return slug;
}

function outputFile(slug) {
  return path.join(outputRoot, `${sourceToOutputSlug(resolveSourceSlug(slug))}.md`);
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return { data: {}, body: raw };
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return { data: {}, body: raw };
  const header = raw.slice(4, end);
  const body = raw.slice(end + 5);
  const data = {};
  for (const line of header.split('\n')) {
    const match = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (match) data[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
  return { data, body };
}

function sourcePathForLink(href) {
  const clean = href.replace(/^\/+|\/+$/g, '');
  if (clean === '') return 'index';
  const candidates = [`${clean}/index`, clean];
  for (const candidate of candidates) {
    if (flatNavigation.some(([, slug]) => slug === candidate)) return resolveSourceSlug(candidate);
  }
  return resolveSourceSlug(clean);
}

function relativeMarkdownLink(fromSlug, href) {
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('#')
  ) {
    return href;
  }

  if (!href.startsWith('/')) return href;

  const [rawTarget, fragment] = href.split('#');
  const targetSlug = sourcePathForLink(rawTarget);
  const targetFile = outputFile(targetSlug);
  const fromFile = outputFile(fromSlug);
  let relative = path
    .relative(path.dirname(fromFile), targetFile)
    .split(path.sep)
    .join('/');
  if (!relative.startsWith('.')) relative = `./${relative}`;
  return fragment ? `${relative}#${fragment}` : relative;
}

function rewriteLinks(body, fromSlug) {
  const lines = body.split('\n');
  let inFence = false;
  let fenceMarker = '';

  return lines
    .map((line) => {
      const fence = line.match(/^\s*(```+|~~~+)/);
      if (fence) {
        if (!inFence) {
          inFence = true;
          fenceMarker = fence[1][0];
        } else if (fence[1][0] === fenceMarker) {
          inFence = false;
          fenceMarker = '';
        }
        return line;
      }
      if (inFence) return line;

      return line.replace(
        /\[([^\]]+)\]\(([^)\s]+)\)/g,
        (match, label, href) =>
          `[${label}](${relativeMarkdownLink(fromSlug, href)})`,
      );
    })
    .join('\n');
}

function pageFooter(slug) {
  const navSlug = navSlugForSource(slug);
  const index = flatNavigation.findIndex(([, itemSlug]) => itemSlug === navSlug);
  const currentFile = outputFile(slug);
  const rootLink = path
    .relative(path.dirname(currentFile), path.join(outputRoot, 'README.md'))
    .split(path.sep)
    .join('/');
  const parts = [`[Documentation home](${rootLink.startsWith('.') ? rootLink : `./${rootLink}`})`];
  const repoReadmeLink = path
    .relative(path.dirname(currentFile), path.join(repoRoot, 'README.md'))
    .split(path.sep)
    .join('/');
  parts.unshift(`[Repository README](${repoReadmeLink.startsWith('.') ? repoReadmeLink : `./${repoReadmeLink}`})`);

  if (index > 0) {
    const [title, previousSlug] = flatNavigation[index - 1];
    const link = path
      .relative(path.dirname(currentFile), outputFile(previousSlug))
      .split(path.sep)
      .join('/');
    parts.push(`[← ${title}](${link.startsWith('.') ? link : `./${link}`})`);
  }

  if (index >= 0 && index < flatNavigation.length - 1) {
    const [title, nextSlug] = flatNavigation[index + 1];
    const link = path
      .relative(path.dirname(currentFile), outputFile(nextSlug))
      .split(path.sep)
      .join('/');
    parts.push(`[${title} →](${link.startsWith('.') ? link : `./${link}`})`);
  }

  return `\n---\n\n${parts.join(' · ')}\n`;
}

function renderPage(slug, raw) {
  const { data, body } = parseFrontmatter(raw);
  const title = data.title || slug.split('/').pop();
  const trimmed = body.trimStart();
  const heading = trimmed.startsWith('# ') ? '' : `# ${title}\n\n`;
  const description = data.description ? `*${data.description}*\n\n` : '';
  const content = `${heading}${description}${rewriteLinks(trimmed, slug).trim()}\n`;
  return `<!-- Generated from docs/src/content/docs. Do not edit directly. -->\n\n${content}${pageFooter(slug)}`;
}

function renderIndex() {
  const lines = [
    '<!-- Generated from docs/src/content/docs. Do not edit directly. -->',
    '',
    '# Factory documentation',
    '',
    `[← Repository README](${path.relative(outputRoot, path.join(repoRoot, 'README.md')).split(path.sep).join('/')})`,
    '',
    'This is the Markdown version of the factory documentation. It is generated',
    'from the Astro Starlight source under `docs/src/content/docs` and is meant',
    'to be read directly on GitHub.',
    '',
    'Start with the **Getting started tutorial** if you are new. It takes you',
    'from an empty project to a working factory, one lesson at a time.',
    '',
    '## Choose your path',
    '',
    '| If you want to... | Read |',
    '| --- | --- |',
    '| Build a working factory step by step | [Getting started tutorial](tutorial/README.md) |',
    '| Understand the idea first | [How it works](start/how-it-works.md) |',
    '| Set up an existing project | [Set up in a new project](start/setup.md) |',
    '| Run your first order | [First run](start/quickstart.md) |',
    '| Operate a factory day to day | [Operating a factory](guides/operating.md) |',
    '| Understand the tradeoffs | [Design choices](start/choices.md) |',
    '| Implement or verify one | [Commands](reference/commands.md) and [Descriptor](reference/descriptor.md) |',
    '',
  ];

  for (const group of navigation) {
    lines.push(`## ${group.section}`, '');
    for (const [title, slug] of group.items) {
      const relative = path
        .relative(outputRoot, outputFile(slug))
        .split(path.sep)
        .join('/');
      lines.push(`- [${title}](${relative})`);
    }
    lines.push('');
  }

  lines.push(
    '## Source of truth',
    '',
    'The Piton specification under `spec/factory` is authoritative. These pages',
    'are a guided explanation, not a replacement for it.',
    '',
  );

  return lines.join('\n');
}

async function checkLinks(files) {
  const problems = [];
  for (const file of files) {
    const content = await readFile(file, 'utf8');
    const lines = content.split('\n');
    let inFence = false;
    let fenceMarker = '';

    for (const line of lines) {
      const fence = line.match(/^\s*(```+|~~~+)/);
      if (fence) {
        if (!inFence) {
          inFence = true;
          fenceMarker = fence[1][0];
        } else if (fence[1][0] === fenceMarker) {
          inFence = false;
          fenceMarker = '';
        }
        continue;
      }
      if (inFence) continue;

      for (const match of line.matchAll(/\[[^\]]+\]\(([^)\s]+)\)/g)) {
        const href = match[1];
        if (
          href.startsWith('http://') ||
          href.startsWith('https://') ||
          href.startsWith('mailto:') ||
          href.startsWith('#')
        ) {
          continue;
        }
        const [target] = href.split('#');
        if (!target) continue;
        const resolved = path.resolve(path.dirname(file), target);
        try {
          await readFile(resolved);
        } catch {
          problems.push(`${path.relative(outputRoot, file)} -> ${href}`);
        }
      }
    }
  }
  return problems;
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

const sourceFiles = await collectMarkdown(sourceRoot);
sourceSlugs = new Set(sourceFiles.map(sourceSlug));
const generated = [];

for (const file of sourceFiles) {
  const slug = sourceSlug(file);
  const raw = await readFile(file, 'utf8');
  const output = outputFile(slug);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, renderPage(slug, raw));
  generated.push(output);
}

const indexFile = path.join(outputRoot, 'README.md');
await writeFile(indexFile, renderIndex());
generated.push(indexFile);

const problems = await checkLinks(generated);
if (problems.length > 0) {
  console.error('Broken links in generated Markdown:');
  for (const problem of problems) console.error(`  ${problem}`);
  process.exitCode = 1;
} else {
  console.log(`Generated ${generated.length} Markdown files in ${path.relative(process.cwd(), outputRoot)}`);
}
