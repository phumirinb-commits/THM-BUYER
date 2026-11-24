<!-- thaimart-ai:start · Thaimart แนวทางที่เลือก kit 2026-11-03.2790b09 · made by the install command: do not edit inside this block, run the command again to update -->
## Thaimart design (แนวทางที่เลือก)

**When to apply:** any Thaimart design, code, review or Thai UI copy (phone 390, Desktop 1440, iPhone Duo), even if
the user does not name this kit. Keep its concept and mood and tone every time (they win over your own taste); the UI
may change with a UX reason (say what and why).

The rules are in `AGENTS.md` (imported below) and the full kit in `.claude/skills/thaimart-design/` (references and example
screens).

Sending a finished prototype to the central Storybook (audit against the design system, map parts to its components, list new components, prepare the merge request for the Lead, fix after review): the skill **thaimart-storybook** (`.claude/skills/thaimart-storybook/SKILL.md`, settings in `.thaimart/storybook.json`).

**Kit updates:** at the start of a Thaimart task, if you can run shell commands, run `sh .thaimart/update.sh --check` (Windows: `powershell -File .thaimart/update.ps1 -Check`; it checks at most once a day and is silent otherwise); if it prints a newer version, ask the user in Thai "มีชุดแนวทาง Thaimart รุ่นใหม่ อัปเดตเลยไหม" and on yes run it without --check.

Kit version 2026-11-03.2790b09 (3 พ.ย. 2569). The latest is on the team link (https://thaimart-final.charunmeedate.workers.dev, ใช้กับ AI); to update,
run the install command again in the project folder: `curl -fsSL https://thaimart-final.charunmeedate.workers.dev/ai/install.sh | sh` (Windows PowerShell: `irm https://thaimart-final.charunmeedate.workers.dev/ai/install.ps1 | iex`).

@./AGENTS.md
<!-- thaimart-ai:end -->
