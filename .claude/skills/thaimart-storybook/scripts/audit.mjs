#!/usr/bin/env node
// thaimart-storybook · audit a prototype against the Thaimart design system (the registry) and the house rules.
// Shipped in the skill folder (scripts/audit.mjs); made by link-tools/fin/ai/storybook (do not edit the copy in a project:
// run the install command again to update it). Node 18+, no packages.
//
//   node <skill>/scripts/audit.mjs <file or folder>... [--feature <name>] [--out <dir>] [--registry <registry.json>] [--json]
//
// Reads references/registry.json (next to this script, or --registry), scans .html .css .scss .js .jsx .ts .tsx .vue
// .svelte .dart (skips node_modules, dist, build, .git, storybook-handoff) and writes into --out (default
// storybook-handoff/<feature>/):
//   audit-report.md            every rule PASS / FAIL / CHECK / LOOK, with file:line and the fix
//   mapping.md                 prototype part -> design system component (+ props), sure or to check
//   new-component-requests.md  a DRAFT request per part the design system does not have (the AI completes it)
//   audit.json                 the same, for tools
// Exit code: 0 when no rule FAILs, 1 when one does, 2 on a usage error. It only reads the prototype; it never edits it.
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
const flags = new Set(['--feature', '--out', '--registry']);
const inputs = argv.filter((a, i) => !a.startsWith('--') && !flags.has(argv[i - 1]));
if (!inputs.length) { console.error('usage: node audit.mjs <file or folder>... [--feature <name>] [--out <dir>] [--registry <file>] [--json]'); process.exit(2); }
const REG_FILE = opt('--registry') || path.join(HERE, '../references/registry.json');
if (!fs.existsSync(REG_FILE)) { console.error('registry not found: ' + REG_FILE); process.exit(2); }
const R = JSON.parse(fs.readFileSync(REG_FILE, 'utf8'));
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9ก-๙]+/g, '-').replace(/^-|-$/g, '') || 'feature';
const FEATURE = slug(opt('--feature') || path.basename(path.resolve(inputs[0])).replace(/\.[^.]+$/, ''));
const OUT = path.resolve(opt('--out') || path.join('storybook-handoff', FEATURE));
const rel = (p) => path.relative(process.cwd(), p).split(path.sep).join('/') || '.';

// ---------------------------------------------------------------- files
const EXT = /\.(html?|css|scss|less|jsx?|tsx?|mjs|vue|svelte|dart)$/i;
const SKIP = /^(node_modules|dist|build|\.git|\.next|storybook-handoff|coverage|\.dart_tool|upstream|\.claude)$/;   // upstream/ = the Dev team's code in the team repo: read only, never audited
const files = [];
function walk(p) {
  const st = fs.statSync(p);
  if (st.isDirectory()) { for (const n of fs.readdirSync(p).sort()) if (!SKIP.test(n)) walk(path.join(p, n)); }
  else if (EXT.test(p) && !/\.(stories|test|spec)\.[jt]sx?$/.test(p) && !/\.min\.(js|css)$/.test(p)) files.push(p);
}
for (const i of inputs) { if (!fs.existsSync(i)) { console.error('not found: ' + i); process.exit(2); } walk(path.resolve(i)); }
if (!files.length) { console.error('no prototype files (html, css, js, jsx, ts, tsx, vue, svelte, dart) in ' + inputs.join(' ')); process.exit(2); }
const SRC = files.map((f) => ({ f, rel: rel(f), lines: fs.readFileSync(f, 'utf8').split(/\r?\n/), ext: path.extname(f).slice(1).toLowerCase() }));
// lines inside comments (/* */, <!-- -->, // and * lines): never findings
for (const s of SRC) {
  s.skip = new Set(); let block = false, html = false;
  s.lines.forEach((l, i) => {
    if (block || html) { s.skip.add(i); if (block && /\*\//.test(l)) block = false; if (html && /-->/.test(l)) html = false; return; }
    if (/^\s*\/\*/.test(l) && !/\*\//.test(l)) { block = true; s.skip.add(i); return; }
    if (/^\s*<!--/.test(l) && !/-->/.test(l)) { html = true; s.skip.add(i); return; }
    if (/^\s*(\/\/|\*|<!--.*-->\s*$)/.test(l)) s.skip.add(i);
  });
}
const all = SRC.map((s) => s.lines.join('\n')).join('\n');
const TARGET = SRC.some((s) => s.ext === 'dart') ? 'flutter' : SRC.some((s) => /^[jt]sx$/.test(s.ext) || /from\s+['"]react['"]/.test(s.lines.join('\n'))) ? 'react' : SRC.some((s) => s.ext === 'vue' || s.ext === 'svelte') ? 'vue/svelte' : 'html';

// ---------------------------------------------------------------- the registry, ready to use
const COMP = Object.fromEntries(R.components.map((c) => [c.id, c]));
const TOK = R.tokens;   // name -> resolved value
const hexOf = (v) => { const m = /^#([0-9a-f]{3}|[0-9a-f]{6})([0-9a-f]{2})?$/i.exec(String(v).trim()); if (!m) return null; let h = m[1]; if (h.length === 3) h = h.split('').map((x) => x + x).join(''); return '#' + h.toUpperCase(); };
const COLOR_TOKENS = Object.entries(TOK).filter(([n, v]) => /^--c-/.test(n) && hexOf(v)).map(([n, v]) => [n, hexOf(v)]);
function nearestColor(hex) {
  const h = hexOf(hex); if (!h) return null;
  const exact = COLOR_TOKENS.find(([, v]) => v === h); if (exact) return { name: exact[0], exact: true };
  const rgb = (x) => [1, 3, 5].map((i) => parseInt(x.slice(i, i + 2), 16));
  const a = rgb(h); let best = null, bd = 1e9;
  for (const [n, v] of COLOR_TOKENS) { const b = rgb(v), d = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2; if (d < bd) { bd = d; best = n; } }
  return best ? { name: best, exact: false } : null;
}
const PX_GROUP = (prop) => /radius/i.test(prop) ? 'r' : /font-?size/i.test(prop) ? 'fs' : /line-?height/i.test(prop) ? 'lh' : /letter/i.test(prop) ? null : 's';
function pxToken(prop, v) {
  const g = PX_GROUP(prop); if (!g) return null;
  if (g === 'r' && (v >= 999 || v === 9999)) return '--r-pill';
  return TOK['--' + g + '-' + v] !== undefined ? '--' + g + '-' + v : null;
}
const definedVars = new Set([...all.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
const re = (s, f = 'i') => new RegExp(s, f);
const HINTS = R.hints.map((h) => ({ ...h, R: re(h.re), U: h.unless ? re(h.unless, '') : null,   // case-sensitive: <Button is ours, <button is not
  W: (h.when || []).map(([w, p]) => [re(w), p]) }));
const BLOCKS = new Map(); for (const c of R.components) for (const b of c.proto.blocks) BLOCKS.set(b, c.id);
for (const c of R.components) for (const k of c.proto.classes) { const b = k.slice(1).split(/__|--/)[0]; if (!BLOCKS.has(b)) BLOCKS.set(b, c.id); }
const SUGGEST = new Map(); for (const c of R.components) for (const n of [c.react.component, ...c.suggest.react]) if (n) SUGGEST.set(n, c.id);
for (const c of R.components) for (const n of [c.flutter.widget, ...c.suggest.flutter]) if (n) SUGGEST.set(n, c.id);
const DS_IMPORTS = [...new Set(R.components.map((c) => c.react.importPath).filter(Boolean))];

// ---------------------------------------------------------------- findings
const rules = new Map([...R.houseRules, ...R.dsRules].map((r) => [r.id, { ...r, findings: [] }]));
const byCheck = (k) => [...rules.values()].find((r) => r.check === k);
const add = (check, s, i, text, fix, sev = 'fail') => { const r = byCheck(check); if (r) r.findings.push({ file: s.rel, line: i + 1, text: String(text).trim().slice(0, 140), fix, sev }); };
const isComment = (l) => /^\s*(\/\/|\/\*|\*|<!--)/.test(l);
const TW_COLOR = /\b(bg|text|border|ring|from|to|via|fill|stroke|outline|divide|placeholder|accent|caret|decoration|shadow)-(red|rose|pink|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|gray|grey|slate|zinc|neutral|stone|black|white)(-\d{2,3})?(\/\d+)?\b/g;
const CSS_PX = /(?:^|[;{\s"'`])((?:margin|padding)(?:-(?:top|right|bottom|left|inline|block)(?:-start|-end)?)?|gap|row-gap|column-gap|font-size|line-height|border-radius|border-(?:top|bottom)-(?:left|right)-radius|letter-spacing)\s*:\s*([^;"'}`]+)/g;
const JSX_PX = /\b((?:margin|padding)(?:Top|Right|Bottom|Left|Inline|Block|X|Y)?|gap|rowGap|columnGap|fontSize|lineHeight|borderRadius|letterSpacing)\s*:\s*['"]?(\d+(?:\.\d+)?)(px)?['"]?/g;
const TW_PX = /\b(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|text|leading|rounded(?:-[tblr]{1,2})?|space-[xy])-\[(\d+(?:\.\d+)?)px\]/g;
const ICON_LIBS = /from\s+['"](lucide-react|react-icons[^'"]*|@heroicons\/[^'"]+|@mui\/icons-material[^'"]*|@fortawesome\/[^'"]+|@tabler\/icons[^'"]*|feather-icons|react-feather|@iconify\/[^'"]+)['"]|class(Name)?="[^"]*\b(material-icons|material-symbols[\w-]*|fa[srb]?\s+fa-[\w-]+)|\bIcons\.\w+|CupertinoIcons\.\w+|<ion-icon\b/;
const EMOJI = /(?![©®™★☆•·])\p{Extended_Pictographic}/u;
const TW_UTIL = /^(-?(flex|grid|block|inline|hidden|contents|items|justify|content|self|place|gap|space|p[trblxy]?|m[trblxy]?|w|h|min|max|size|text|font|bg|border|rounded|shadow|leading|tracking|overflow|relative|absolute|fixed|sticky|static|inset|top|left|right|bottom|z|object|opacity|transition|duration|ease|delay|animate|cursor|select|ring|divide|col|row|order|aspect|truncate|line|whitespace|break|sr|container|mx|my|basis|grow|shrink|from|to|via|fill|stroke|outline|underline|uppercase|lowercase|capitalize|italic|not|pointer|backdrop|blur|scale|rotate|translate|origin|appearance|resize|snap|scroll|touch|will|isolate|mix|filter|table|list|decoration|indent|align|hyphens|sm|md|lg|xl|2xl|hover|focus|active|disabled|group|peer|dark|first|last|odd|even)(\b|-|:|$))/;
const HELPER = /^(is|has|js|u|sr|nw|hit|lazy|capture|figma|screen|status|visually|hidden|active|open|on|off)(-|$)/;
const BADGEY = /(badge|tag|pill|label|chip|sticker|ribbon|flag|stamp)/i;
const INVENTED = new RegExp('(^|[^\\wก-๙])(' + R.invented.join('|') + ')(?=$|[^\\wก-๙])');

for (const s of SRC) {
  s.lines.forEach((l, i) => {
    if (s.skip.has(i)) return;
    // ---- tokens: colours
    for (const m of l.matchAll(/(?<![&\w])#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![\w-])/g)) {
      if (/href=["']#|url\(#|id=["']/.test(l.slice(Math.max(0, m.index - 8), m.index + 1))) continue;
      const n = nearestColor('#' + m[1].slice(0, 6));
      add('tokens', s, i, l, 'raw colour #' + m[1] + ': use ' + (n ? 'var(' + n.name + ')' + (n.exact ? '' : ' (nearest; ask the designer if the colour is not the same)') : 'a colour token'));
    }
    for (const m of l.matchAll(/\b(rgba?|hsla?)\(\s*\d/g)) add('tokens', s, i, l, 'raw ' + m[1] + '() colour: use a colour token (var(--c-...))');
    for (const m of l.matchAll(/Color\(0x([0-9A-Fa-f]{8})\)/g)) { const n = nearestColor('#' + m[1].slice(2)); add('tokens', s, i, l, 'raw Color(0x' + m[1] + '): use the theme colour for ' + (n ? n.name : 'a colour token') + ' (pending: the team\'s Flutter package)'); }
    for (const m of l.matchAll(/\bColors\.(\w+)/g)) add('tokens', s, i, l, 'Material Colors.' + m[1] + ': use a Thaimart colour token (pending: the team\'s Flutter package)');
    for (const m of l.matchAll(TW_COLOR)) { if (/^text-(left|right|center|justify|start|end)$/.test(m[0])) continue; add('tokens', s, i, l, 'Tailwind colour ' + m[0] + ': Tailwind colours are not Thaimart tokens; use var(--c-...)'); }
    for (const m of l.matchAll(/-\[(#[0-9a-fA-F]{3,8})\]/g)) { const n = nearestColor(m[1]); add('tokens', s, i, l, 'Tailwind arbitrary colour ' + m[1] + ': use ' + (n ? 'var(' + n.name + ')' : 'a colour token')); }
    // ---- tokens: sizes
    const pxs = [];
    for (const m of l.matchAll(CSS_PX)) { if (/var\(/.test(m[2]) && !/\d+px/.test(m[2].replace(/var\([^)]*\)/g, ''))) continue; for (const v of m[2].replace(/var\([^)]*\)/g, '').matchAll(/(\d+(?:\.\d+)?)px/g)) if (+v[1] !== 0) pxs.push([m[1], +v[1]]); }
    if (/[jt]sx?|vue|svelte/.test(s.ext)) for (const m of l.matchAll(JSX_PX)) if (+m[2] !== 0 && !(m[1] === 'lineHeight' && !m[3] && +m[2] < 4)) pxs.push([m[1], +m[2]]);
    for (const m of l.matchAll(TW_PX)) pxs.push([/^text/.test(m[1]) ? 'font-size' : /^leading/.test(m[1]) ? 'line-height' : /^rounded/.test(m[1]) ? 'border-radius' : 'padding', +m[2]]);
    if (s.ext === 'dart') {
      for (const m of l.matchAll(/\b(fontSize|height|letterSpacing):\s*(\d+(?:\.\d+)?)/g)) if (m[1] !== 'height') pxs.push([m[1] === 'fontSize' ? 'font-size' : 'letter-spacing', +m[2]]);
      for (const m of l.matchAll(/EdgeInsets\.\w+\(([^)]*)\)/g)) for (const v of m[1].matchAll(/(\d+(?:\.\d+)?)/g)) if (+v[1] !== 0) pxs.push(['padding', +v[1]]);
      for (const m of l.matchAll(/BorderRadius\.circular\((\d+(?:\.\d+)?)\)/g)) pxs.push(['border-radius', +m[1]]);
    }
    for (const [prop, v] of pxs) { const t = pxToken(prop, v); add('tokens', s, i, l, prop + ' ' + v + 'px written by hand: ' + (t ? 'use var(' + t + ')' : 'not on the scale; pick the nearest token or ask the designer')); }
    // ---- tokens: unknown or legacy variables
    for (const m of l.matchAll(/var\((--[\w-]+)/g)) {
      const v = m[1]; if (TOK[v] !== undefined || definedVars.has(v)) continue;
      if (R.aliases[v]) add('tokens', s, i, l, v + ' is an old kit alias: write var(' + R.aliases[v] + ')', 'check');
      else add('tokens', s, i, l, v + ' is not a Thaimart token (tokens.css): use one from references/registry.md');
    }
    // ---- fonts (licence)
    if (/@font-face|fonts\.googleapis|fonts\.gstatic|use\.typekit|\.(woff2?|ttf|otf)\b/i.test(l)) add('fonts', s, i, l, 'remove it: use var(--font-ui); Sukhumvit Tadmai comes with the project and is licensed for it only');
    for (const m of l.matchAll(/font-family\s*:\s*([^;"'}]+)/gi)) if (!/var\(--font-ui\)|inherit/.test(m[1])) add('fonts', s, i, l, 'font-family ' + m[1].trim() + ': use var(--font-ui)');
    for (const m of l.matchAll(/fontFamily\s*:\s*['"]([^'"]+)['"]/g)) if (!/Sukhumvit/i.test(m[1])) add('fonts', s, i, l, 'fontFamily ' + m[1] + ': use the project font (var(--font-ui), Sukhumvit Tadmai)');
    // ---- copy
    if (/\u2014|&mdash;|&#8212;|&#x2014;|\\u2014/i.test(l)) add('emdash', s, i, l, 'replace the em dash with a space, " · " or a new line');
    for (const m of l.matchAll(/(^|[^\w\-−])(-\s?\d{1,2}\s?%|-\s?\{[^}]{1,40}\}\s?%|ลด\s?(\d{1,2}|\{[^}]{1,40}\})\s?%|\d{1,2}\s?%\s?off)/gi)) add('discount', s, i, l, '"' + m[2].trim() + '": write −NN% (minus sign U+2212) in the Price component, right after the struck price');
    if (/รีบเลย|รีบซื้อ|!!|เหลือเวลา(อีก)?|หมดเขตใน|ด่วนที่สุด|\bhurry\b|limited time|last chance|\b\d{2}:\d{2}:\d{2}\b/i.test(l)) add('urgency', s, i, l, 'no urgency or countdown: state the fact calmly (e.g. "ชำระภายใน 10:12 น. วันนี้")');
    if (/\bmic(rophone)?\b|ค้นหาด้วยเสียง|voice[ -]?search|data-icon="microphone/i.test(l)) add('voice', s, i, l, 'remove it: no mic button, never mention voice search (the keyboard has its own mic)');
    if (/mascot|elephant|มาสคอต|ช้าง/i.test(l)) add('mascot', s, i, l, 'no mascot or elephant character in the UI (only stickers in the Live chat)');
    if (/object-fit\s*:\s*(contain|fill|none|scale-down)|objectFit\s*:\s*['"](contain|fill|none)|object-(contain|fill)\b|BoxFit\.(contain|fill)/.test(l)) add('pictures', s, i, l, 'pictures use object-fit: cover, edge to edge');
    // ---- icons
    if (ICON_LIBS.test(l)) add('icons', s, i, l, 'another icon set: use Phosphor (<i data-icon="name">, proto/shared/icons.js) or the designer\'s icons (<i data-di="name">)');
    if (EMOJI.test(l.replace(/<[^>]*>/g, ' '))) add('icons', s, i, l, 'emoji used as an icon or decoration: use the icon set');
    // ---- tap targets and labels
    if (/<button\b[^>]*>\s*(<(svg|i|img|span)[^>]*\/?>\s*(<\/(svg|i|span)>)?\s*)?(<\/button>|$)/.test(l) && !/aria-label=/.test(l) && /<button\b[^>]*>\s*</.test(l)) add('aria', s, i, l, 'icon-only button: add a Thai aria-label and a 44 x 44 tap area');
    for (const m of l.matchAll(/aria-label=["']([^"']+)["']/g)) if (!/[ก-๙]/.test(m[1])) add('aria', s, i, l, 'aria-label "' + m[1] + '" is not Thai', 'check');
    if (/--fx-mood/.test(l)) add('mood', s, i, l, 'the soft red top is only for Home, Discover, Order and Profile: check this page is one of them', 'check');
    // ---- badges
    if (BADGEY.test(l) && INVENTED.test(l.replace(/<[^>]*>/g, ' ').replace(/(class(Name)?|id|data-[\w-]+)=["'][^"']*["']/g, ''))) add('invented', s, i, l, '"' + l.match(INVENTED)[2] + '" is not a Thaimart trust badge: remove it (the set is ' + R.badgeSet + ')');
    // ---- removed parts
    for (const [b, why] of R.banned) if (re('(^|["\'\\s.])' + b.replace(/[-]/g, '\\-') + '(?![\\w-])').test(l)) add('banned', s, i, l, why);
  });
}

// ---------------------------------------------------------------- components: used, hand-made (mapping), unknown (requests)
const used = new Map(), mapping = [];
const compName = (id, part) => (COMP[id] ? COMP[id].name.en : id) + (part ? ' › ' + part : '');
for (const s of SRC) {
  const markup = /^(html?|jsx|tsx|vue|svelte|dart|js|ts|mjs)$/.test(s.ext);
  s.lines.forEach((l, i) => {
    if (s.skip.has(i)) return;
    // design system parts already used (prototype classes, or the component names once the team's package exists)
    for (const m of l.matchAll(/class(?:Name)?=["'{`]+([^"'`}]+)/g)) for (const c of m[1].split(/\s+/)) { const b = c.split(/__|--/)[0]; if (BLOCKS.has(b)) { const id = BLOCKS.get(b); if (!used.has(id)) used.set(id, []); used.get(id).push(s.rel + ':' + (i + 1)); } }
    for (const m of l.matchAll(/<([A-Z]\w+)\b/g)) if (SUGGEST.has(m[1]) && importsDs(s)) { const id = SUGGEST.get(m[1]); if (!used.has(id)) used.set(id, []); used.get(id).push(s.rel + ':' + (i + 1)); }
    if (!markup) return;
    if (/^(jsx?|tsx?|mjs)$/.test(s.ext) && !/<\/?[A-Za-z]|\/>/.test(l)) return;   // JSX: markup lines only, not data objects
    // a line whose classes all belong to the prototype kit is the kit, not a hand-made part
    const cls = [...l.matchAll(/class(?:Name)?=["'`{]+([^"'`}]+)/g)].flatMap((m) => m[1].split(/\s+/)).filter((c) => c && !TW_UTIL.test(c) && !HELPER.test(c));
    if (cls.length && cls.every((c) => { const b = c.split(/__|--/)[0]; return BLOCKS.has(b) || R.kitBlocks[b] !== undefined; })) return;
    const seen = new Set();
    for (const h of HINTS) {
      if (!h.R.test(l) || (h.U && h.U.test(l))) continue;
      const key = h.to[0] + '|' + h.to[1]; if (seen.has(key)) continue; seen.add(key);
      const props = { ...h.to[2] }; for (const [w, p] of h.W) if (w.test(l)) { Object.assign(props, p); break; }
      mapping.push({ file: s.rel, line: i + 1, part: h.what, snippet: l.trim().slice(0, 120), to: { id: h.to[0], name: compName(h.to[0], h.to[1]), part: h.to[1], props }, sure: h.sure, why: h.why, hint: h.id });
    }
  });
}
function importsDs(s) { const t = s.lines.join('\n'); return DS_IMPORTS.some((p) => t.includes(p)) || /from\s+['"]@thaimart\//.test(t); }

// parts the registry does not know: React and Flutter components, HTML class blocks
const words = (n) => n.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' ').toLowerCase().split(/\s+/).filter(Boolean);
const KW = R.components.map((c) => ({ id: c.id, strong: new Set(c.keywords.map((x) => x.toLowerCase())), kw: new Set([...c.keywords, ...words(c.name.en), ...c.parts.flatMap(words)].map((x) => x.toLowerCase())) }));
function closest(name, body) {
  const w = words(name), text = (body || '').toLowerCase(); let best = null;
  for (const k of KW) {
    let sc = 0; for (const x of w) if (k.strong.has(x)) sc += 3; else if (k.kw.has(x)) sc += 2;
    for (const x of k.kw) if (x.length > 3 && text.includes(x)) sc += 0.5;
    if (!best || sc > best.score) best = { id: k.id, score: sc };
  }
  return best && best.score >= 1 ? { id: best.id, name: COMP[best.id].name.en, th: COMP[best.id].name.th, score: best.score } : null;
}
const candidates = [], kitParts = new Map(), screens = [];
for (const s of SRC) {
  const t = s.lines.join('\n');
  if (/^[jt]sx?$/.test(s.ext) || s.ext === 'mjs') {
    const defs = [];
    s.lines.forEach((l, i) => { const m = /^\s*(export\s+)?(default\s+)?(?:function\s+([A-Z]\w*)\s*\(|const\s+([A-Z]\w*)\s*(?::\s*[\w.<>]+\s*)?=\s*(?:\(|[a-z]\w*\s*=>|styled))/.exec(l); if (m) defs.push({ name: m[3] || m[4], line: i, exported: !!m[1], def: !!m[2] }); });
    defs.forEach((d, n) => { d.end = Math.min(n + 1 < defs.length ? defs[n + 1].line : s.lines.length, d.line + 40); });
    for (const d of defs) {
      const body = s.lines.slice(d.line, d.end).join('\n');
      if (d.def || /(Page|Screen|View|App|Layout|Route)$/.test(d.name)) { screens.push({ name: d.name, file: s.rel, line: d.line + 1 }); continue; }
      const usedAt = SRC.flatMap((x) => x.lines.map((l, j) => (re('<' + d.name + '\\b', '').test(l) ? x.rel + ':' + (j + 1) : null)).filter(Boolean));
      const props = propsOf(s, d);
      if (SUGGEST.has(d.name)) { const id = SUGGEST.get(d.name); mapping.push({ file: s.rel, line: d.line + 1, part: 'local component ' + d.name, snippet: s.lines[d.line].trim().slice(0, 120), to: { id, name: COMP[id].name.en, part: '', props: {} }, sure: true, why: 'มีชิ้นนี้แล้ว อย่าทำซ้ำ', hint: 'local-copy' }); continue; }
      const near = closest(d.name, body);
      candidates.push({ name: d.name, kind: 'react component', file: s.rel, line: d.line + 1, snippet: s.lines.slice(d.line, Math.min(d.line + 14, d.end)).join('\n').trimEnd(), usedAt, closest: near, props });
    }
  }
  if (s.ext === 'dart') {
    s.lines.forEach((l, i) => {
      const m = /class\s+(\w+)\s+extends\s+(StatelessWidget|StatefulWidget)/.exec(l); if (!m) return;
      if (/(Page|Screen|View|App)$/.test(m[1])) { screens.push({ name: m[1], file: s.rel, line: i + 1 }); return; }
      if (SUGGEST.has(m[1])) return;
      const body = s.lines.slice(i, i + 40).join('\n');
      const props = [...body.matchAll(/final\s+([\w<>?,\s]+?)\s+(\w+);/g)].map((x) => ({ name: x[2], type: x[1].trim() }));
      candidates.push({ name: m[1], kind: 'flutter widget', file: s.rel, line: i + 1, snippet: s.lines.slice(i, Math.min(i + 14, s.lines.length)).join('\n'), usedAt: SRC.flatMap((x) => x.lines.map((ln, j) => (re('\\b' + m[1] + '\\(', '').test(ln) && j !== i ? x.rel + ':' + (j + 1) : null)).filter(Boolean)), closest: closest(m[1], body), props });
    });
  }
  if (/^(html?|vue|svelte|jsx|tsx)$/.test(s.ext)) {
    const unknown = new Map();
    s.lines.forEach((l, i) => {
      for (const m of l.matchAll(/class(?:Name)?=["'`{]+([^"'`}]+)/g)) for (const c of m[1].split(/\s+/)) {
        if (!c || /[${}()[\]:/]/.test(c) || TW_UTIL.test(c) || HELPER.test(c)) continue;
        const b = c.split(/__|--/)[0];
        if (BLOCKS.has(b)) continue;
        if (R.kitBlocks[b] !== undefined) { if (!kitParts.has(b)) kitParts.set(b, { block: b, screens: R.kitBlocks[b], at: s.rel + ':' + (i + 1), n: 0 }); kitParts.get(b).n++; continue; }
        if (!unknown.has(b)) unknown.set(b, { line: i, n: 0, mods: new Set() }); const u = unknown.get(b); u.n++; const mod = c.split('--')[1]; if (mod) u.mods.add(mod);
      }
    });
    for (const [b, u] of unknown) {
      if (/^[jt]sx$/.test(s.ext) && candidates.some((c) => c.file === s.rel && u.line >= c.line - 1 && u.line < c.line + 40)) continue;   // inside a component listed already
      candidates.push({ name: b, kind: 'class block', file: s.rel, line: u.line + 1, snippet: s.lines.slice(u.line, Math.min(u.line + 6, s.lines.length)).join('\n'), usedAt: [s.rel + ':' + (u.line + 1) + (u.n > 1 ? ' (' + u.n + ' times)' : '')], closest: closest(b, s.lines.slice(u.line, u.line + 8).join(' ')), props: [...u.mods].map((x) => ({ name: x, type: 'modifier' })) });
    }
  }
  void t;
}
function propsOf(s, d) {
  const head = s.lines.slice(d.line, d.line + 6).join(' ');
  const m = /\(\s*\{([^}]*)\}/.exec(head); const out = [];
  if (m) for (const p of m[1].split(',')) { const x = /^\s*(\.\.\.)?(\w+)\s*(?::\s*\w+)?\s*(?:=\s*([^,]+))?/.exec(p); if (x && x[2] && !x[1]) out.push({ name: x[2], type: '', default: x[3] ? x[3].trim() : undefined }); }
  const iface = re('(interface|type)\\s+' + d.name + 'Props\\s*=?\\s*\\{([^}]*)\\}', 's').exec(s.lines.join('\n'));
  if (iface) for (const x of iface[2].matchAll(/(\w+)(\?)?\s*:\s*([^;\n]+)/g)) { const o = out.find((p) => p.name === x[1]); if (o) o.type = x[3].trim(); else out.push({ name: x[1], type: x[3].trim(), optional: !!x[2] }); }
  return out;
}
// a candidate that is clearly one of ours goes to the mapping table (to check), the rest are new-component requests
const requests = [];
for (const c of candidates) {
  if (c.closest && c.closest.score >= 4) { mapping.push({ file: c.file, line: c.line, part: c.kind + ' ' + c.name, snippet: c.snippet.split('\n')[0].trim().slice(0, 120), to: { id: c.closest.id, name: c.closest.name, part: '', props: {} }, sure: false, why: 'ชื่อและเนื้อหาใกล้ ' + c.closest.th + ' ตรวจก่อนว่าใช้แทนได้', hint: 'closest' }); continue; }
  requests.push(c);
}
// one row per (file, component, part, props): the first line, then every other line where it shows
{
  const g = new Map();
  for (const m of mapping) { const k = [m.file, m.to.id, m.to.part, JSON.stringify(m.to.props)].join('|'); if (!g.has(k)) g.set(k, { ...m, lines: [m.line] }); else { const x = g.get(k); x.lines.push(m.line); x.sure = x.sure || m.sure; if (m.hint === 'local-copy') { x.part = m.part; x.why = m.why; } } }
  mapping.length = 0; mapping.push(...g.values());
}
// S1: a sure hand-made part is a FAIL; an unsure one is for the AI to decide
for (const m of mapping) { const r = byCheck('components'); r.findings.push({ file: m.file, line: m.line, text: m.snippet, fix: m.part + (m.lines && m.lines.length > 1 ? ' (also line ' + m.lines.slice(1).join(', ') + ')' : '') + ' -> ' + m.to.name + (Object.keys(m.to.props).length ? ' (' + Object.entries(m.to.props).map(([k, v]) => k + '=' + v).join(', ') + ')' : ''), sev: m.sure ? 'fail' : 'check' }); }
if (requests.length) byCheck('requests').findings.push(...requests.map((c) => ({ file: c.file, line: c.line, text: c.kind + ' ' + c.name, fix: 'not in the design system: complete its request in new-component-requests.md (or map it if a component fits)', sev: 'check' })));

// ---------------------------------------------------------------- write
// tier 'keep' (concept, mood and tone, consistency): a fail finding FAILs the rule; tier 'flex' (ปรับได้): never a FAIL, only CHECK
const status = (r) => r.tier !== 'flex' && r.findings.some((f) => f.sev === 'fail') ? 'FAIL' : r.findings.length ? 'CHECK' : r.auto ? 'PASS' : 'LOOK';
const list = [...rules.values()].map((r) => ({ id: r.id, check: r.check, tier: r.tier, group: r.group, th: r.th, en: r.en, auto: r.auto, status: status(r), findings: r.findings }));
const failed = list.filter((r) => r.status === 'FAIL').length, checks = list.filter((r) => r.status === 'CHECK').length;   // only tier 1 rules can FAIL
const date = new Date().toISOString().slice(0, 10);
const cell = (x) => String(x).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const tpl = (name) => { const p = path.join(HERE, '../references/templates/' + name); return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null; };
const fill = (t, o) => t.replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m));
fs.mkdirSync(OUT, { recursive: true });
const icon = { PASS: 'PASS', FAIL: 'FAIL', CHECK: 'CHECK', LOOK: 'LOOK' };
const rulesTable = '| Rule | Tier | ตรวจ | Status | Found |\n| --- | --- | --- | --- | --- |\n' + list.map((r) => '| ' + r.id + ' | ' + (r.tier === 'flex' ? 'ปรับได้' : 'ต้องคงไว้') + ' | ' + cell(r.th) + ' | ' + icon[r.status] + ' | ' + (r.findings.length ? r.findings.length + ': ' + r.findings.slice(0, 3).map((f) => f.file + ':' + f.line).join(', ') + (r.findings.length > 3 ? ' ...' : '') : r.auto ? '0' : 'look by eye') + ' |').join('\n');
const details = list.filter((r) => r.findings.length).map((r) => '### ' + r.id + ' ' + r.en + ' (' + r.status + ')\n\n' + r.findings.slice(0, 40).map((f) => '- `' + f.file + ':' + f.line + '` ' + (f.sev === 'check' ? '(check) ' : '') + f.fix + '\n  `' + cell(f.text).replace(/`/g, "'") + '`').join('\n') + (r.findings.length > 40 ? '\n- ... and ' + (r.findings.length - 40) + ' more in audit.json' : '')).join('\n\n') || 'Nothing found by the script.';
const usedList = [...used].map(([id, at]) => '- ' + COMP[id].n + ' ' + COMP[id].name.en + ' (' + COMP[id].name.th + '): ' + at.length + ' place(s), first ' + at[0]).join('\n') || '- none yet';
const look = list.filter((r) => r.status === 'LOOK').map((r) => r.id).join(', ');
const line = (f) => '- `' + f.file + ':' + f.line + '` ' + (f.sev === 'check' ? '(check) ' : '') + f.fix;
const mustFix = list.filter((r) => r.tier !== 'flex' && r.findings.length).map((r) => '**' + r.id + ' ' + r.th + '** (' + r.status + ', ' + r.findings.length + ')\n' + r.findings.slice(0, 12).map(line).join('\n') + (r.findings.length > 12 ? '\n- ... ' + (r.findings.length - 12) + ' more under Details' : '')).join('\n\n') || 'Nothing found by the script. The AI still checks the LOOK rules.';
const differs = list.filter((r) => r.tier === 'flex').map((r) => '**' + r.id + ' ' + r.th + '** (' + r.status + ')' + (r.findings.length ? '\n' + r.findings.slice(0, 12).map(line).join('\n') : r.status === 'LOOK' ? '\nAI: compare with the closest prototype page and list each layout, order, flow or component difference in the table below.' : '\nNothing found.')).join('\n\n');
const mapTable = '| # | Where | Prototype part | Design system component | Props | Sure? | Why |\n| --- | --- | --- | --- | --- | --- | --- |\n' +
  mapping.map((m, i) => '| ' + (i + 1) + ' | `' + m.file + ':' + m.line + '`' + (m.lines && m.lines.length > 1 ? ' and line ' + m.lines.slice(1).join(', ') : '') + ' | ' + cell(m.part) + ' | ' + COMP[m.to.id].n + ' ' + cell(m.to.name) + ' | ' + (Object.keys(m.to.props).length ? Object.entries(m.to.props).map(([k, v]) => k + '=' + v).join(', ') : 'see registry') + ' | ' + (m.sure ? 'yes' : 'check') + ' | ' + cell(m.why) + ' |').join('\n');
const summary = (failed ? 'ต้องแก้: ' + failed + ' rule(s) FAIL' : 'ต้องแก้: none found') + ' · ' + checks + ' to check · ' + mapping.length + ' part(s) to map (' + mapping.filter((m) => m.sure).length + ' sure) · ' + requests.length + ' new component candidate(s) · ' + used.size + ' design system component(s) already used';
const reportT = tpl('audit-report.md') || '# Audit report: {feature}\n\n{summary}\n\n{rules_table}\n\n{details}\n';
fs.writeFileSync(path.join(OUT, 'audit-report.md'), fill(reportT, { must_fix: mustFix, differs, feature: FEATURE, date, target: TARGET, files: SRC.map((s) => '`' + s.rel + '`').join(', '), summary, rules_table: rulesTable, details, used: usedList, look: look || 'none', kit_parts: [...kitParts.values()].sort((a, b) => b.n - a.n).slice(0, 20).map((k) => '`.' + k.block + '` (' + k.n + 'x, in ' + k.screens + ' prototype screens)').join(', ') || 'none', screens: screens.map((x) => x.name + ' (`' + x.file + ':' + x.line + '`)').join(', ') || 'one page', registry: R.version + (R.status ? ' · ' + R.status : '') }));
fs.writeFileSync(path.join(OUT, 'mapping.md'), '# Mapping: ' + FEATURE + '\n\nPrototype part -> design system component (registry ' + R.version + '). "yes" = rewrite it to the component; "check" = the AI or the person decides (ask before a big rewrite). Props are Figma property values; the React and Flutter prop names come with the team\'s design system (registry: pending).\n\n' + (mapping.length ? mapTable : 'Nothing to map: every part found is already a design system component, or a new one.') + '\n');
const reqT = tpl('new-component.md') || '## {n}. {name}\n\n{snippet}\n';
const reqs = requests.map((c, i) => fill(reqT, { n: i + 1, name: c.name, kind: c.kind, where: c.file + ':' + c.line, used_at: c.usedAt.length ? c.usedAt.map((u) => '`' + u + '`').join(', ') : '`' + c.file + ':' + c.line + '`', closest: c.closest ? COMP[c.closest.id].n + ' ' + c.closest.name + ' (' + c.closest.th + ')' : 'none found', closest_id: c.closest ? c.closest.id : '', props: c.props.length ? c.props.map((p) => '| `' + p.name + '` | ' + (cell(p.type) || 'to decide') + ' | ' + (p.default !== undefined ? '`' + cell(p.default) + '`' : '') + ' |').join('\n') : '| (to decide) | | |', snippet: '```' + (c.kind === 'flutter widget' ? 'dart' : /react/.test(c.kind) ? 'tsx' : 'html') + '\n' + c.snippet + '\n```', feature: FEATURE, shot: 'storybook-handoff/' + FEATURE + '/screens/' + slug(c.name) + '.png' }));
fs.writeFileSync(path.join(OUT, 'new-component-requests.md'), '# New component requests: ' + FEATURE + ' (DRAFT)\n\nParts this prototype needs that the design system (registry ' + R.version + ') does not have. The design system team decides for each: add it, change an existing component, or use what exists. The audit script drafted this; the AI completes every "AI:" line, adds the screenshot and removes what turned out to map to an existing component.\n\n' + (reqs.length ? reqs.join('\n') : 'None: every part maps to an existing component.\n'));
const json = { feature: FEATURE, date, target: TARGET, registry: R.version, files: SRC.map((s) => s.rel), summary, failed, rules: list, used: Object.fromEntries(used), mapping, requests, kitParts: [...kitParts.values()], screens };
fs.writeFileSync(path.join(OUT, 'audit.json'), JSON.stringify(json, null, 1) + '\n');
if (argv.includes('--json')) console.log(JSON.stringify(json, null, 1));
else console.log('audit ' + FEATURE + ' (' + TARGET + ', ' + SRC.length + ' file(s)): ' + summary + '\nwritten: ' + rel(OUT) + '/audit-report.md, mapping.md, new-component-requests.md, audit.json');
process.exit(failed ? 1 : 0);
