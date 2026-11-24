---
name: thaimart-design
description: The Thaimart design kit (แนวทางที่เลือก): rules, tokens, components, mood and tone of the Thaimart social commerce app. Use it for ANY Thaimart work, even unnamed: designing, coding, reviewing or writing Thai UI copy for any screen, component, flow or prototype (phone, Desktop, iPhone Duo), product cards and trust badges (ร้านทางการ, ของแท้, มอก., อย.), and turning prototype pages into code or Figma.
---

# Thaimart design: แนวทางที่เลือก

**When to apply:** any Thaimart design, code, review or Thai copy. The concept and the mood and tone win over your taste;
the UI may change with a UX reason.

**Kit version 2026-11-03.2790b09** (3 พ.ย. 2569). Team link https://thaimart-final.charunmeedate.workers.dev wins when this kit disagrees. Update: `curl -fsSL https://thaimart-final.charunmeedate.workers.dev/ai/install.sh | sh`.

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

## Direction and two tiers

> เหมือนเดินห้างที่ไว้ใจได้ แต่สนุกและมีชีวิตชีวา: trust first, lively everywhere. The prototype approves the concept and
> the mood and tone, not a UI to copy; its screens are references, not specs.

- **ต้องคงไว้ (keep):** the main line; trust (badges from real data, ร้านทางการ only for official shops, a clear price,
  the escrow promise); tokens; red only for meaning; white and bright, soft red top only on the 4 tab pages; real photos
  and people; one icon family; calm motion; short friendly Thai, no hype, no em dash; 44 taps, readable contrast.
- **ปรับได้ (with a UX reason):** layouts, section order, flows, steps, which components, new components, wording, any
  page layout (Live too).

## Top rules

1. Tokens only (`var(--c-red)`, `var(--s-16)`), no raw hex or px. Red only for the primary button, prices, trust icons,
   the active tab, Live, counts.
2. Badges from data: ร้านทางการ, ของแท้ (การันตีของแท้ on the product page), ยืนยันตัวตน, มอก., อย., คืนเงิน 2 เท่า (ปลอมคืนเงิน 2 เท่า on the product page), จัดส่งฟรี. Card pill "ร้านทางการ | ของแท้" for official shops, "ของแท้" for others;
   ยืนยันตัวตน only on the shop header; มอก. / อย. only from `products.*.cert`. Discount `−NN%` (U+2212).
3. Phone 390 (team repo: fluid, check 375), 16 side margins, 4 px scale, 44 x 44 taps, Thai `aria-label` on icon buttons.
4. Icons: Phosphor `<i data-icon>`, the designer's `<i data-di>`, badge icons `TI`; no emoji, no mascot.
5. No voice-search text, no mic button. Font `var(--font-ui)`; never copy or link font files.
6. Pictures `object-fit: cover`. Data from `content/final-bible.json`; never invent shops, prices or badges.

## Load only what the task needs

Never read the references or pictures up front. Open one only when needed: full rules `references/rules.md` · tokens
`references/tokens.md` · components `references/components.md` · pages and devices `references/pages.md` · copy
`references/copy.md` · feel `references/mood-tone.md` · checking `references/checklist.md` · screens
`references/examples/*.jpg` (one or two, only for a whole new screen). Figma: components on "Design System · เริ่มที่นี่",
mood on "แนวทางที่เลือก-Final" (https://www.figma.com/design/PoSOBYzXkrIeF6slJxbcEY/).
