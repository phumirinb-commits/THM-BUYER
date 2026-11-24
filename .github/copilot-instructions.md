<!-- thaimart-ai:start · Thaimart แนวทางที่เลือก kit 2026-11-03.2790b09 · made by the install command: do not edit inside this block, run the command again to update -->
## Thaimart design (แนวทางที่เลือก)

**When to apply:** any Thaimart design, code, review or Thai UI copy (phone 390, Desktop 1440, iPhone Duo), even if
the user does not name this kit. Keep its concept and mood and tone every time (they win over your own taste); the UI
may change with a UX reason (say what and why).

Full rules: the Thaimart block of `AGENTS.md` at the repo root, and `.claude/skills/thaimart-design/references/` (mood and
tone, tokens, components, pages, copy, checklist) with example screens in `.claude/skills/thaimart-design/references/examples/`.

Sending a finished prototype to the central Storybook (audit against the design system, map parts to its components, list new components, prepare the merge request for the Lead, fix after review): the skill **thaimart-storybook** (`.claude/skills/thaimart-storybook/SKILL.md`, settings in `.thaimart/storybook.json`).

**Kit updates:** at the start of a Thaimart task, if you can run shell commands, run `sh .thaimart/update.sh --check` (Windows: `powershell -File .thaimart/update.ps1 -Check`; it checks at most once a day and is silent otherwise); if it prints a newer version, ask the user in Thai "มีชุดแนวทาง Thaimart รุ่นใหม่ อัปเดตเลยไหม" and on yes run it without --check.

Kit version 2026-11-03.2790b09 (3 พ.ย. 2569). The latest is on the team link (https://thaimart-final.charunmeedate.workers.dev, ใช้กับ AI); to update,
run the install command again in the project folder: `curl -fsSL https://thaimart-final.charunmeedate.workers.dev/ai/install.sh | sh` (Windows PowerShell: `irm https://thaimart-final.charunmeedate.workers.dev/ai/install.ps1 | iex`).

### The core rules

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

Direction: เหมือนเดินห้างที่ไว้ใจได้ แต่สนุกและมีชีวิตชีวา (like walking through a mall you can trust, but fun and lively). Trust first (ของแท้มาก่อน, trust badges from real data, Thaimart holds the money until the buyer gets the item), lively everywhere (Live, creators, Reels, shops that decorate their storefront).

Rules:
1. Use only the CSS variables of proto/final/tokens.css (var(--c-red), var(--c-ink), var(--c-muted), var(--s-16), var(--r-12), var(--fs-14) with var(--lh-20)). No raw hex or px a token covers.
2. Red only for the primary button, prices, trust icons, the active tab, Live and counts. White pages; the soft red top (--fx-mood) only on Home, Discover, Order and Profile.
3. Trust badges only from data: ร้านทางการ, ของแท้ (การันตีของแท้ on the product page), ยืนยันตัวตน, มอก., อย., คืนเงิน 2 เท่า (ปลอมคืนเงิน 2 เท่า on the product page), จัดส่งฟรี. Product card pill "ร้านทางการ | ของแท้" only for official shops, "ของแท้" for all others. ยืนยันตัวตน only on the shop profile header. มอก./อย. only from the product's cert.
4. Product card: picture 175 x 175 with white icon circles, name 2 lines, red price + struck price + −NN%, the pill, rating and sold.
5. Home search is a plain search button in the top bar before the bell; no search box on Home; no running light on search fields; never mention voice search.
6. Phone 390 wide, 16 px side margins, 4 px spacing scale, 44 x 44 tap targets, Thai aria-labels on icon buttons.
7. Icons: Phosphor (proto/shared/icons.js) and the designer's icons only. No mascot or elephant character.
8. Copy: short everyday Thai, no urgency, never the em dash (use a space, " · " or a new line).
9. Font: var(--font-ui) (Sukhumvit Tadmai, provided by the project; never link or copy font files).
10. Reuse the kit (proto/final/kit.css, trust.js) and the data in content/final-bible.json; do not invent shops, prices or badges. The current Live layout is the reference; change it only with a UX reason.
<!-- thaimart-ai:end -->
