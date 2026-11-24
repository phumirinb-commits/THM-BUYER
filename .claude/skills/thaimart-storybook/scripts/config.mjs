#!/usr/bin/env node
// thaimart-storybook · check the project config .thaimart/storybook.json and say in plain Thai what is missing.
// Shipped in the skill folder (scripts/config.mjs); made by link-tools/fin/ai/storybook. Node 18+, no packages.
//   node <skill>/scripts/config.mjs [--json] [--dir <project folder>]
// It looks for .thaimart/storybook.json from the folder up to the disk root, checks every field the skill needs and
// whether glab / gh are installed and logged in, and prints what each workflow step can do now. It never writes.
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';

const argv = process.argv.slice(2);
const i = argv.indexOf('--dir');
let dir = path.resolve(i >= 0 ? argv[i + 1] : process.cwd());
let file = null;
for (let d = dir; ; d = path.dirname(d)) { const f = path.join(d, '.thaimart', 'storybook.json'); if (fs.existsSync(f)) { file = f; break; } if (path.dirname(d) === d) break; }

const say = [], missing = [];
const can = { audit: true, map: true, requests: true, stories: 'local', mr: false };
let C = null;
if (!file) {
  missing.push('config');
  say.push('ยังไม่มีไฟล์ตั้งค่า .thaimart/storybook.json: รันคำสั่งติดตั้งชุด Thaimart อีกครั้ง หรือให้ทีมส่งไฟล์ให้ ตอนนี้ทำได้ถึงขั้นตรวจและ map');
} else {
  try { C = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { missing.push('config'); say.push('ไฟล์ตั้งค่า .thaimart/storybook.json อ่านไม่ได้ (JSON ผิดรูปแบบ): ' + e.message.slice(0, 80)); }
}
const tool = (n) => { try { execFileSync(n, ['--version'], { stdio: 'ignore' }); } catch (e) { return 'none'; } try { execFileSync(n, ['auth', 'status'], { stdio: 'ignore' }); return 'ok'; } catch (e) { return 'logged-out'; } };
if (C) {
  const repo = C.repo || {}, t = C.targets || {}, rv = C.review || {};
  if (repo.pending || !repo.url) { missing.push('repo.url'); say.push('ยังไม่ได้ตั้งค่า repo Storybook: ทีมจะแจ้งภายหลัง ตอนนี้ทำได้ถึงขั้นตรวจและ map'); }
  if (!['gitlab', 'github'].includes(repo.platform)) { missing.push('repo.platform'); say.push('ยังไม่ได้บอกว่า repo อยู่บน GitLab หรือ GitHub'); }
  if (!repo.defaultBranch) { missing.push('repo.defaultBranch'); say.push('ยังไม่ได้ใส่ branch หลักที่ MR จะเข้าไป'); }
  const react = t.react || {}, flutter = t.flutter || {};
  if (react.enabled && (react.pending || !react.importFrom)) { missing.push('targets.react.importFrom'); say.push('ยังไม่มีแพ็กเกจ component ของทีม (React): story ใช้ชื่อชั่วคราว ทีมทำเสร็จแล้วแก้ที่บรรทัด TODO(ds)'); }
  if (flutter.enabled && (flutter.pending || !flutter.package)) { missing.push('targets.flutter.package'); say.push('ยังไม่มีแพ็กเกจ component ของทีม (Flutter): use-case ใช้ชื่อชั่วคราว ทีมทำเสร็จแล้วแก้ที่บรรทัด TODO(ds)'); }
  if (rv.pending || !(rv.leads || []).length) { missing.push('review.leads'); say.push('ยังไม่ได้ใส่ชื่อ Lead ที่ตรวจ MR: บอกชื่อมา หรือให้ทีมใส่ในไฟล์ตั้งค่า'); }
  if (!(rv.labels || []).length) say.push('ยังไม่มีป้าย (label) ของ MR: เปิดได้โดยไม่มีป้าย');
  if (!missing.includes('repo.url') && !missing.includes('repo.platform')) {
    const cli = (C.mr || {}).cli || 'auto', want = cli === 'auto' ? (repo.platform === 'github' ? 'gh' : 'glab') : cli;
    const st = want === 'none' ? 'none' : tool(want);
    can.mr = st === 'ok' ? 'cli:' + want : 'steps';
    if (st !== 'ok' && want !== 'none') say.push('ในเครื่องยัง' + (st === 'none' ? 'ไม่มี ' + want : 'ไม่ได้ล็อกอิน ' + want) + ': AI จะบอกขั้นตอนเปิด MR ให้ทำเองแทน');
    can.stories = 'repo';
  }
}
const ok = !missing.length;
const out = { file: file ? path.relative(process.cwd(), file) || file : null, ready: ok, missing, can, handoffDir: (C && C.handoffDir) || 'storybook-handoff', say };
if (argv.includes('--json')) { console.log(JSON.stringify(out, null, 1)); process.exit(0); }
console.log(file ? 'ไฟล์ตั้งค่า: ' + out.file : 'ไฟล์ตั้งค่า: ยังไม่มี');
console.log(ok ? 'ตั้งค่าครบ ทำได้ทุกขั้น จนถึงเปิด MR' : 'ยังขาด ' + missing.length + ' อย่าง:');
for (const l of say) console.log('- ' + l);
console.log('ตอนนี้ทำได้: ตรวจ · map · รายการ component ใหม่ · story ' + (can.stories === 'repo' ? 'ใน repo' : 'เก็บไว้ใน ' + out.handoffDir + '/') + ' · MR ' + (can.mr ? (String(can.mr).startsWith('cli') ? 'เปิดด้วย ' + String(can.mr).slice(4) : 'บอกขั้นตอนให้เปิดเอง') : 'ยังไม่ได้ (รอ repo)'));
