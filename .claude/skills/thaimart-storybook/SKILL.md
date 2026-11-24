---
name: thaimart-storybook
description: Send a finished Thaimart feature prototype to the team's central Storybook (React web and Flutter app) through a merge request. Use it when someone says "ส่งขึ้น Storybook", "เตรียมส่ง MR", "เปิด MR", "ตรวจ prototype กับ design system", "map component", "ทำรายการ component ใหม่", "แก้ตามคอมเมนต์ใน MR", or asks to audit a prototype (React, Flutter or HTML) against the design system: checks concept, mood and tone, maps parts to components, lists new components, writes stories, prepares the MR and fixes it after review.
---

# Thaimart: send a prototype to Storybook

**Kit version 2026-11-03.2790b09** (3 พ.ย. 2569). Load **thaimart-design** too (rules, tokens). The team link https://thaimart-final.charunmeedate.workers.dev wins
when this kit disagrees.

## How to answer and change

- Short everyday Thai (or the user's language), result first, about 5 short bullets. No intro, no restating rules.
  UI changed from the prototype: one line "เปลี่ยน X เพราะ Y". Only the rule problems that matter. Reports (audit,
  mapping, new components, MR text) go to files; in chat 5 lines at most plus the paths.
- **Ask to recheck, often and short.** Quick questions with ready choices (Claude Code: the question tool), 3 at most:
  at the start if the screen, platform or goal is unclear; when leaving the prototype ("มีผล UX รองรับไหม?"); after a
  change ("ตรงที่ต้องการไหม?").
- **Propose first, then change.** Before editing any file or design, list the changes, one line each
  "ตรงไหน: ก่อน → หลัง · เพราะ" (7 at most, then "+ อีก N จุดแบบเดียวกัน"); for UI changes also a before/after
  preview with the real tokens; ask once which form they like (Artifact, Canvas, HTML file, list only) and keep it. End with "แก้ตามนี้ไหม? ทั้งหมด / เลือกข้อ / ยังไม่แก้" and apply only what was
  approved. Skip only when told "แก้เลยไม่ต้องถาม" or the task only reads or reports.

## Status

**In the team repo thaimart-redesign (GitLab uxi-team): read `references/repo.md` first; it wins over steps 1 and 6.**
The React and Flutter packages are not ready: the design system is the prototype's (tokens.css, kit.css, trust.*, the
34 components of `references/registry.md`). Never guess a package, reviewer or label.

## Two tiers

- **ต้องแก้ (must fix):** breaks the concept or the mood and tone (tokens, red only for meaning, badges from data, the
  Thai voice, no em dash, one icon family, 44 taps), a hand-made copy of a design system part, removed parts, font files.
- **ต่างจากต้นแบบ (differs):** another layout, order, flow, component choice, or a new component. Fine with a UX reason
  in the MR; never a failure. The Lead checks the concept and the mood and tone, not pixels.

## Steps (the scripts give the facts: do not read the prototype line by line)

1. Config: `node <skill>/scripts/config.mjs`. Say in Thai what is missing (it prints the lines) and go on with what you
   can do. Outside the repo: steps 2 to 5 only, into `storybook-handoff/<feature>/` (interim mode).
2. Audit: `node <skill>/scripts/audit.mjs <files or folder> --feature <feature>`. It writes audit-report.md, mapping.md,
   new-component-requests.md and audit.json. Read audit.json; open the prototype only at the lines it names; judge only
   the LOOK rules. No Node: `references/workflow.md`.
3. Propose, then map: the audit report and mapping.md are the proposal. Give the change list ("ตรงไหน: ก่อน → หลัง ·
   เพราะ") and, for UI changes, a before/after preview (Artifact, Canvas or `storybook-handoff/<feature>/preview.html`). After "โอเค",
   rewrite only the approved rows to the components (`references/registry.md`) and fix the approved ต้องแก้ items.
   Keep the person's layout.
4. New components: complete the "AI:" lines of new-component-requests.md.
5. Stories, one per screen state: `references/stories.md`.
6. MR (after approval): in the repo `repo.md`; elsewhere `references/mr.md`. Push and open only after a yes.
7. "แก้ตามคอมเมนต์ใน MR": read the comments, fix, audit again, push, reply one line per comment (`references/mr.md`).

## Load only what the step needs

`references/registry.md` (components, props) · `repo.md` · `audit-rules.md` · `stories.md` · `mr.md` · `config.md` ·
`workflow.md` (the full workflow, interim mode and the 6 steps to tell the person) · `templates/`. Never open them all
up front.

Never: call a layout difference a failure; invent components, props or repo details; push or merge without a yes.
