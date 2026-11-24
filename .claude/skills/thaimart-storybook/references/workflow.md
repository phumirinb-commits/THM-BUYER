# The full workflow (thaimart-storybook)

The detail behind SKILL.md: open it when a step needs more than SKILL.md says.

**Status today:** the team's real design system (Figma), its React and Flutter packages and the central Storybook repo
are not ready. Until they are, the design system is the prototype's: `proto/final/tokens.css`, `kit.css`, `trust.*` and
the 34 components of `references/registry.md` (steps 0 to 3, from the team's design system sheets). The
React and Flutter names in the registry say "pending". This kit updates itself when the team fills them in (run the
install command again).

## Two tiers: what the review checks

The prototype was approved for its **concept and its mood and tone**, not as a UI to copy 100%. A feature may change the
UI when UX research or a usability test gives a reason, as long as it stays in the same concept and mood and tone.

- **ต้องแก้ (must fix):** anything that breaks the concept or the mood and tone (tokens, red only for meaning, trust
  badges from real data, ร้านทางการ only for official shops, the Thai voice, no em dash, one icon family, 44 taps), a
  hand-made copy of a part the design system already has (consistency), removed parts, font files.
- **ต่างจากต้นแบบ (differs from the prototype):** a different layout, section order, flow, steps, component choice, or a
  new component. Fine. Each one needs a UX reason in the MR (a finding, a test, a link), and new components go to the
  design system team as requests. Never mark a layout difference as a failure.

The Lead checks the concept and the mood and tone, not pixel sameness with the prototype.

## Before you start: the config

Read `.thaimart/storybook.json` at the project root (the install command creates it with placeholders; never overwrite a
filled one). Run `node <this skill>/scripts/config.mjs` when Node is available; it prints in Thai what is missing.
Fields and the exact Thai lines to say: `references/config.md`.

- If something is missing, **stop that step and say so plainly in Thai**, for example:
  "ยังไม่ได้ตั้งค่า repo Storybook: ทีมจะแจ้งภายหลัง ตอนนี้ทำได้ถึงขั้นตรวจและ map".
  Never guess a repo URL, a branch, a package name, a reviewer or a label.
- Without the repo you still do steps 1 to 4 (and draft the stories), and write everything to
  `storybook-handoff/<feature>/` so the MR can be opened later in one go.

## While the team's design system and Storybook are not ready (interim mode)

ระหว่างรอ Design system และ Storybook ทำยังไง. Explain it to the person in these steps (plain Thai, short) and work this way:

1. The person types "ตรวจ prototype นี้กับ design system": do workflow steps 1 to 4 against the prototype's design system and give the report (ต้องแก้, and ต่างจากต้นแบบ with the UX reasons), the mapping table and the new component list.
   (พิมพ์ประโยคนี้ AI ตรวจกับ design system ของต้นแบบ ได้รายงาน (ต้องแก้ และต่างจากต้นแบบพร้อมเหตุผล UX) ตาราง map และรายการ component ใหม่: "ตรวจ prototype นี้กับ design system")
2. Fix the ต้องแก้ items with the person (ask before a big rewrite).
   (แก้ข้อที่ต้องแก้)
3. The new component list (new-component-requests.md) can go to the design system team now; they do not need the MR for it.
   (ส่งรายการ component ใหม่ให้ทีม design system ได้เลย)
4. The person sends the prototype link and the report to the Lead in the team's usual channel; the Lead checks the concept and the mood and tone. Offer a short Thai message they can paste.
   (ส่งลิงก์ prototype พร้อมรายงานให้ Lead ในช่องทางที่ทีมใช้ Lead ดูแนวคิดและ mood tone)
5. Everything stays in storybook-handoff/<feature>/ (report, mapping, requests, screenshots, draft stories, draft MR description).
   (ผลทั้งหมดเก็บไว้ในโฟลเดอร์ storybook-handoff/ชื่อฟีเจอร์)
6. When the repo and the packages are ready and the person types "ส่งขึ้น Storybook": run the audit again with the real registry, map to the real names (replace every TODO(ds)), write the stories and open the MR (steps 5 to 6).
   (พอ Storybook พร้อม พิมพ์ประโยคนี้ AI ตรวจซ้ำกับ design system จริง map ชื่อใหม่ เขียน story แล้วเปิด MR: "ส่งขึ้น Storybook")

## The workflow (numbered; do them in order)

1. **Find the prototype and the target.** Ask for or locate the files (a folder, a page, a pasted single file; save a
   pasted file into `storybook-handoff/<feature>/prototype/` first). Name the feature in short English kebab case
   (`favorites`, `coupon-wallet`) and confirm it. Target: React (`.tsx`, `.jsx`, imports react), Flutter (`.dart`) or HTML
   (kit classes or plain HTML). The config says which Storybook targets are on.

2. **Audit.** Run `node <this skill>/scripts/audit.mjs <files or folder> --feature <feature>` (it writes
   `storybook-handoff/<feature>/audit-report.md`, `mapping.md`, `new-component-requests.md`, `audit.json`). Then read the
   prototype yourself for the rules marked LOOK (the script cannot judge them) and update the report: every rule
   PASS, FAIL or CHECK with `file:line`, split into **ต้องแก้** and **ต่างจากต้นแบบ**. Rules and how each is checked:
   `references/audit-rules.md` (the same rules as thaimart-design's checklist; do not invent others). No Node: do the
   same checks by reading, and write the report from `references/templates/audit-report.md`.

3. **Map and rewrite (propose first).** The audit report and `mapping.md` are the proposal: show the change list
   ("ตรงไหน: ก่อน → หลัง · เพราะ", 7 lines at most) and, for UI changes, write `storybook-handoff/<feature>/preview.html`
   (before and after side by side, real tokens). Rewrite only what the person approved. Go through `mapping.md`: each prototype part -> its design system component with props
   (`references/registry.md`: classes, props, tokens). "yes" rows: rewrite the part to the component. "check" rows: you
   decide; say why. Fix every **ต้องแก้** item too (tokens, badges, copy). Ask before a big rewrite (more than about 10
   parts, or a change of structure). Keep the person's layout: mapping is about using the same parts, not making the
   screen look like the prototype. Until the team's packages exist, rewrite to the prototype kit (HTML: the kit classes;
   React and Flutter: the provisional names in the registry, marked `// TODO(ds): pending package`).

4. **List new components.** Complete `new-component-requests.md` (template `references/templates/new-component.md`), one
   block per part the design system does not have: what it is, where it is used (`file:line`, screens), a screenshot,
   the markup snippet, the closest existing component and why it does not fit, proposed props (with states), and the UX
   reason. Remove drafts that turned out to map to an existing component (move them to the mapping table). Take the
   screenshots with a browser tool when you have one; otherwise ask the person for them and leave the file names.

5. **Write the stories.** One story per screen state (default, empty, loading, error, filled, selected ...). React:
   Storybook CSF3 `*.stories.tsx`, args per variant and state. Flutter: Widgetbook use-cases. HTML: convert to the chosen
   target; keep an HTML story only if the config allows it. File names, folders and examples: `references/stories.md`.
   The config's story folder decides where they go; without a repo, write them to `storybook-handoff/<feature>/stories/`.

6. **Prepare the MR.** Branch `feature/<feature>-prototype` from the config's default branch; commit the stories, the
   rewritten prototype parts and `storybook-handoff/<feature>/` (report, mapping, requests, screenshots). Fill the MR
   description from `references/templates/mr-description.md` (Thai, short): what the feature is, what changed from the
   prototype and why (UX finding or usability test link), the audit result, the new component requests, and the Lead
   checklist. Labels and reviewers come from the config. Open it with `glab` (GitLab) or `gh` (GitHub) when the config
   says so and the CLI is logged in; otherwise print the exact steps. Commands: `references/mr.md`. Ask before you push.

7. **After the review: "แก้ตามคอมเมนต์ใน MR".** Read the MR's comments and unresolved threads (`references/mr.md`), list
   them back in Thai, fix each one, run the audit again, push to the same branch, and reply on each thread with what you
   changed in one line. If a comment asks to change a tier 1 item (concept, mood and tone) or to copy the prototype pixel
   for pixel, say so politely and ask the Lead.

## What to tell the person at the end

In plain Thai, short: what passed, what you fixed, what differs from the prototype (with the UX reason, or a question if
the reason is missing), the new components you listed, where the files are, and the next step (open the MR, or wait for
the team's repo). One line per item; no em dash.

## Never

- Never mark a layout or flow difference as a failure; ask for the UX reason instead.
- Never invent tokens, components, props, badge kinds, repo URLs, reviewers or labels.
- Never push, open an MR or merge without the person's yes. Never merge your own MR.
- Never copy, link or attach the Sukhumvit Tadmai font files.
- Never write the em dash in anything the team reads.
