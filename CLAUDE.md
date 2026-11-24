<!-- thaimart-ai:start · Thaimart แนวทางที่เลือก kit 2026-11-03.2790b09 · made by the install command: do not edit inside this block, run the command again to update -->
## Thaimart design (แนวทางที่เลือก)

**When to apply:** any Thaimart design, code, review or Thai UI copy (phone 390, Desktop 1440, iPhone Duo), even if
the user does not name this kit. Keep its concept and mood and tone every time (they win over your own taste); the UI
may change with a UX reason (say what and why).

### How to answer and change

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

Use the skill **thaimart-design** (`.claude/skills/thaimart-design/SKILL.md`, also installed in `~/.claude/skills/`); it loads by
itself for Thaimart work, or call it with `/thaimart-design`. The same rules in short: the Thaimart block of `AGENTS.md`.

Sending a finished prototype to the central Storybook (audit against the design system, map parts to its components, list new components, prepare the merge request for the Lead, fix after review): the skill **thaimart-storybook** (call it with `/thaimart-storybook`; `.claude/skills/thaimart-storybook/SKILL.md`, settings in `.thaimart/storybook.json`).

**Kit updates:** a SessionStart hook in `.claude/settings.json` (marked thaimart-ai-update) starts `sh .thaimart/update.sh --quiet` in the background when a session starts and returns at once; a new kit applies from the next session. Off: `"autoUpdate": false` in `.thaimart/settings.json`.

Kit version 2026-11-03.2790b09 (3 พ.ย. 2569). The latest is on the team link (https://thaimart-final.charunmeedate.workers.dev, ใช้กับ AI); to update,
run the install command again in the project folder: `curl -fsSL https://thaimart-final.charunmeedate.workers.dev/ai/install.sh | sh` (Windows PowerShell: `irm https://thaimart-final.charunmeedate.workers.dev/ai/install.ps1 | iex`).
<!-- thaimart-ai:end -->
