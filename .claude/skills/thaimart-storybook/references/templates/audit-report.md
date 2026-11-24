# Audit: {feature}

{date} · target {target} · registry {registry}
Files: {files}
Screens found: {screens}

**{summary}**

The prototype was approved for its concept and its mood and tone, not as a UI to copy 100%. So this report has two
parts: what must be fixed, and what differs from the prototype (fine with a UX reason).

## ต้องแก้ (หลุด concept / mood tone)

Fix all of these before the MR. Each one breaks the concept, the mood and tone, a trust rule, or uses a hand-made part
where the design system already has one.

{must_fix}

## ต่างจากต้นแบบ (ใส่เหตุผล UX ใน MR)

Not failures. Each needs one line of UX reason in the MR (a finding, a usability test, a link). New parts also go to
`new-component-requests.md`.

{differs}

| What changed from the prototype | Prototype page | UX reason (finding or test link) |
| --- | --- | --- |
| AI: fill one row per layout, order, flow or component change | | |

## All rules

PASS = the script found nothing · FAIL = must fix · CHECK = found something to look at · LOOK = the script cannot
check it: the AI looks and writes PASS or FAIL here. Rules: `references/audit-rules.md` (thaimart-storybook).

{rules_table}

## Details

{details}

## Design system parts already used

{used}

Prototype kit parts that are not (yet) one of the design system components: {kit_parts}

## Next

1. Fix every item under ต้องแก้ (mapping: `mapping.md`).
2. Write the UX reason for each item under ต่างจากต้นแบบ.
3. Complete `new-component-requests.md`.
4. Look at the LOOK rules ({look}) and mark them here.
5. Run the audit again; then write the stories and the MR.
