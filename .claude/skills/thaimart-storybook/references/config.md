# The project config: `.thaimart/storybook.json`

The install command creates it at the project root with placeholders when it is missing, and never touches it again
(a filled config is kept on every update). A copy of the empty one: `config/storybook.example.json`. Read it before
every step; `node <skill>/scripts/config.mjs` checks it and prints what is missing in Thai (`--json` for tools).

| Field | What | Needed for |
| --- | --- | --- |
| `repo.url` | the central Storybook repo (GitLab or GitHub URL) | step 6 (MR) |
| `repo.platform` | `gitlab` or `github` | step 6 |
| `repo.defaultBranch` | the branch MRs go to (often `main` or `develop`) | step 6 |
| `targets.react.enabled`, `storyDir`, `importFrom` | React stories on; where they go; the team's component package | step 5 |
| `targets.flutter.enabled`, `useCaseDir`, `package` | Flutter use-cases on; where they go; the team's Flutter package | step 5 |
| `targets.flutter.tool` | `widgetbook` (default) or what the central Storybook uses for Flutter | step 5 |
| `targets.html.convertTo`, `allowHtmlStories` | what HTML prototypes become; whether an HTML story is allowed | step 5 |
| `review.leads` | the Lead reviewer usernames | step 6 |
| `review.labels` | MR labels | step 6 |
| `registry.url` | a newer component registry (JSON) from the design system team; empty = the one in this skill | steps 2 to 5 |
| `handoffDir` | where the outputs go before the MR (default `storybook-handoff`) | all |
| `mr.cli` | `auto` (use glab or gh if logged in), `glab`, `gh` or `none` (print the steps) | step 6 |
| `pending` (any section) | `true` = the team has not filled it yet | all |

A section with `"pending": true` or an empty required field is missing. Never guess it.

## What to say (plain Thai, then go on with what you can do)

| Missing | Say | Then |
| --- | --- | --- |
| no config file | ยังไม่มีไฟล์ตั้งค่า .thaimart/storybook.json: รันคำสั่งติดตั้งชุด Thaimart อีกครั้ง หรือให้ทีมส่งไฟล์ให้ ตอนนี้ทำได้ถึงขั้นตรวจและ map | steps 1 to 4, outputs in `storybook-handoff/<feature>/` |
| `repo.url` | ยังไม่ได้ตั้งค่า repo Storybook: ทีมจะแจ้งภายหลัง ตอนนี้ทำได้ถึงขั้นตรวจและ map | steps 1 to 5 locally; keep everything ready for the MR |
| `targets.*.importFrom` / `package` | ยังไม่มีแพ็กเกจ component ของทีม: story ใช้ชื่อชั่วคราว ทีมทำเสร็จแล้วแก้ที่บรรทัด TODO(ds) | provisional names, marked |
| `review.leads` | ยังไม่ได้ใส่ชื่อ Lead ที่ตรวจ MR: บอกชื่อมา หรือให้ทีมใส่ในไฟล์ตั้งค่า | open the MR without a reviewer only if the person says so |
| `review.labels` | ยังไม่มีป้าย (label) ของ MR: เปิดได้โดยไม่มีป้าย | go on |
| no glab / gh, or not logged in | ในเครื่องยังไม่มี glab (หรือ gh) หรือยังไม่ได้ล็อกอิน: นี่คือขั้นตอนเปิด MR เอง | print the steps (`references/mr.md`) |
| the registry's React / Flutter names say pending | ตอนนี้ใช้ design system จากต้นแบบไปก่อน เมื่อทีมทำ Design system และ Storybook เสร็จ ชุดนี้จะอัปเดตเอง | map to the prototype kit |
