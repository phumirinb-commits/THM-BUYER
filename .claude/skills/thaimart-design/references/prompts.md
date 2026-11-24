# Prompts for common jobs

Ready prompts to paste into any AI that has the Thaimart kit (the skill "thaimart-design" or AGENTS.md). Fill
the [slots]. The same list is on the team link (https://thaimart-final.charunmeedate.workers.dev, ใช้กับ AI · Prompt) with a copy button.

## ออกแบบหน้าใหม่

When: เริ่มหน้าที่ยังไม่มีในต้นแบบ

~~~text
Use the Thaimart design kit: the "thaimart-design" skill, or AGENTS.md if your tool has that instead. Read SKILL.md, references/mood-tone.md and references/pages.md, and look at references/examples/ before you start.

Task: design a new phone screen for [what the page is for].
Who uses it, and when: [the user and the moment].
What the page holds, top to bottom: [the blocks].
Closest existing page to start from: [a page name, or "pick one and tell me which"].

Keep to the kit: 390 x 844, tokens only, a white header (the soft red top is only for Home, Discover, Order and Profile), red only where it means something, trust badges only from the data, short everyday Thai with no em dash.

Give me:
1. the layout top to bottom, naming the kit classes you reuse
2. the HTML and CSS
3. anything the kit does not cover: build it from the tokens and the voice, and mark it as new
4. any place where you changed the prototype's layout, with the UX reason in one line
Then go through references/checklist.md and list any item you could not meet.

ตอบสั้น: start with the result in short Thai, at most 5 bullets, no intro and no restating the rules; code or long reports go in a file (or one code block) with its path.
~~~

## ทำ component ใหม่ตามระบบ

When: ต้องมีชิ้นส่วนใหม่ ที่ชุดเดิมยังไม่มี

~~~text
Use the Thaimart design kit: the "thaimart-design" skill, or AGENTS.md if your tool has that instead. Read references/components.md, references/tokens.md and references/mood-tone.md first.

I need a new component: [what it does].
It appears on: [pages].
States it needs: [default, pressed, disabled, empty, loading, error].

First check the kit: if an existing component (product card, pill, tag, chip, button, row, sheet, note) can do this with a modifier, use it and say so. Only if nothing fits, design a new one:
- tokens only; a one-off size goes into the lane block of section 11 in tokens.css with a role comment
- the 4 px scale, 44 x 44 tap targets, a Thai aria-label on icon buttons
- one icon family (Phosphor via data-icon, or the designer's icons via data-di)
- red only for an action, a price or trust

Give me the markup, the CSS, every state, and one line on where it may and may not be used.

ตอบสั้น: start with the result in short Thai, at most 5 bullets, no intro and no restating the rules; code or long reports go in a file (or one code block) with its path.
~~~

## เขียนโค้ดหน้าจากต้นแบบ

When: dev ทำหน้าจริงตามต้นแบบในลิงก์ทีม

~~~text
Use the Thaimart design kit: the "thaimart-design" skill, or AGENTS.md if your tool has that instead. The reference page is [page name, e.g. f3-product] on the team link: https://thaimart-final.charunmeedate.workers.dev/final/[page].html (open it, it is the source of truth).

Build it in [framework and folder, e.g. React in src/pages/Product.tsx].
Map the kit to our code: tokens.json into [our theme file]; the kit classes into components with the same anatomy (references/components.md).

Keep the concept and the mood and tone exactly: tokens, type pairs, the badge rules and the Thai voice. The layout may differ from the prototype where UX research or a usability test says so. Data comes from [our API or content/final-bible.json]; do not invent shops, prices or badges. Do not copy or link the Sukhumvit Tadmai font files: use the font our app already ships, through one font variable.

When done, compare your page with references/examples/ and the live page side by side at 390 wide, and list every difference you made on purpose with its UX reason.

ตอบสั้น: start with the result in short Thai, at most 5 bullets, no intro and no restating the rules; code or long reports go in a file (or one code block) with its path.
~~~

## เขียนข้อความในแอป

When: เขียนหรือแก้คำบนปุ่ม แจ้งเตือน หน้าว่าง

~~~text
Use the Thaimart design kit: the "thaimart-design" skill, or AGENTS.md if your tool has that instead. Read references/copy.md and the voice part of references/mood-tone.md.

Write the Thai UI copy for: [the screen or the moment, e.g. the empty cart].
What the user needs to know or do: [the point].
Where it shows: [button, title, note, toast, empty state].

Rules: short everyday Thai, one idea per line, friendly and calm, never pushy or urgent, no "!!!", no em dash (use a space, " · " or a new line), English only for names. Buttons are 1 to 3 word verbs. Never mention voice search.

Give me 3 options for each line, the one you recommend first, and the Thai aria-label for any icon button.

ตอบสั้น: start with the result in short Thai, at most 5 bullets, no intro and no restating the rules; code or long reports go in a file (or one code block) with its path.
~~~

## รีวิวงานที่ AI ทำมา

When: ตรวจงานก่อนส่งดีไซเนอร์หรือ dev

~~~text
Use the Thaimart design kit: the "thaimart-design" skill, or AGENTS.md if your tool has that instead. Act as the Thaimart design reviewer. Read references/checklist.md and references/mood-tone.md.

Review this work: [paste the code, attach screenshots, or give the page link].

Go through every item of the checklist and the DO / DON'T table. For each problem give: where it is, the rule it breaks, and the exact fix (the token, class or Thai line to use). Group them by: colour, type and spacing · badges and data · copy · pictures · icons · per device.

Be strict about: raw hex or px, red outside its places, a soft red top on a page that is not one of the 4 tab pages, invented badges, ร้านทางการ on a shop that is not official, "-40%" instead of "−40%", the em dash, voice search, emoji icons, taps under 44.
Put the problems in two groups: must fix (the concept, mood and tone or trust rules are broken) and differs from the prototype (fine when there is a UX reason; ask for it if missing). A different layout alone is not a problem.
End with a short verdict: ready, or what must change first.

ตอบสั้น: start with the result in short Thai, at most 5 bullets, no intro and no restating the rules; code or long reports go in a file (or one code block) with its path.
~~~

## แปลงหน้าเป็น Desktop / iPhone Duo

When: มีหน้ามือถือแล้ว อยากได้จอใหญ่

~~~text
Use the Thaimart design kit: the "thaimart-design" skill, or AGENTS.md if your tool has that instead. Read references/pages.md (Desktop and iPhone Duo) and look at references/examples/desk-home.jpg.

Turn this phone page into [Desktop 1440 / iPhone Duo พับ / กางแนวนอน / กางแนวตั้ง]: [page name or paste it].

Keep the same kit classes and tokens, grown for the bigger screen: the one-row top bar with the search button next to the bell on Desktop; the rail or toolbar on Duo. The soft red top only if this is a tab page (Home, Discover, Order, Profile). It must be clean at 1440 and at 1280 with no sideways scroll; on Duo the two panes meet at the fold and nothing sits on the fold.

Give me the layout per screen size, the HTML and CSS, and what moves where compared with the phone.

ตอบสั้น: start with the result in short Thai, at most 5 bullets, no intro and no restating the rules; code or long reports go in a file (or one code block) with its path.
~~~

## ทำ Figma จากต้นแบบ

When: ใช้กับ AI ที่วาดลง Figma ได้

~~~text
Use the Thaimart design kit: the "thaimart-design" skill, or AGENTS.md if your tool has that instead. The source is the prototype page [page name] on the team link: https://thaimart-final.charunmeedate.workers.dev/final/[page].html.

Recreate it in Figma as one frame of 390 x 844 named "แนวทางที่เลือก · [CODE] [Thai page name]".
- use auto layout; spacing on the 4 px scale, 16 side margins
- colours and text styles named after the tokens (c-red, c-ink, fs-14/lh-20 ...), values from tokens.json
- the real pictures of the page, edge to edge; Thai text exactly as on the page
- the font is Sukhumvit Tadmai if it is installed on this computer; never download it from the web
- reuse components that already exist in the file before making new ones

Do not add anything that is not on the page. When done, list the layers you could not match.

ตอบสั้น: start with the result in short Thai, at most 5 bullets, no intro and no restating the rules; code or long reports go in a file (or one code block) with its path.
~~~
