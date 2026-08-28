import { execSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');

// 1. Type-check + emit JS + .d.ts.
execSync(`${join(root, 'node_modules', '.bin', 'tsc')} -p tsconfig.build.json`, {
  stdio: 'inherit',
});

// 2. Rewrite `@components/*` / `@common/*` aliases to relative paths.
//    `.js` files get explicit `.js` extensions (bundler-friendly ESM);
//    `.d.ts` files stay extensionless (standard TS declaration resolution).
function resolveAlias(spec, fileDir) {
  const m = /^@(components|common)\/(.+)$/.exec(spec);
  if (!m) return null;
  const [, ns, name] = m;
  const target = join(dist, ns, name);
  let rel = relative(fileDir, target).replaceAll('\\', '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return { rel, hasExt: /\.(css|js)$/.test(name) };
}

function rewrite(file, { js }) {
  const code = readFileSync(file, 'utf8');
  const fileDir = dirname(file);
  const out = code.replace(/(['"])(@components\/[^'"]+|@common\/[^'"]+)\1/g, (m, q, spec) => {
    const r = resolveAlias(spec, fileDir);
    if (!r) return m;
    const rel = js && !r.hasExt ? r.rel + '.js' : r.rel;
    return `${q}${rel}${q}`;
  });
  writeFileSync(file, out);
}

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.js')) rewrite(p, { js: true });
    else if (entry.name.endsWith('.d.ts')) rewrite(p, { js: false });
  }
}

walk(dist);

// 3. Copy CSS modules + global stylesheets into dist.
mkdirSync(join(dist, 'components'), { recursive: true });
for (const entry of readdirSync(join(root, 'components'))) {
  if (entry.endsWith('.module.css')) {
    copyFileSync(join(root, 'components', entry), join(dist, 'components', entry));
  }
}
copyFileSync(join(root, 'global.css'), join(dist, 'global.css'));
copyFileSync(join(root, 'global-fonts.css'), join(dist, 'global-fonts.css'));

console.log('✓ build complete → dist/');
