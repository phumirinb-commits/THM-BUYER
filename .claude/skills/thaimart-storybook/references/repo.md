# The team repo: thaimart-redesign

GitLab `git.7.solutions`, project `seven-solutions/uxi-team/thaimart-redesign`
(`git@git.7.solutions:seven-solutions/uxi-team/thaimart-redesign.git`). The Lead's guide (setup, Way of Work, Branch
and MR): https://claude.ai/artifact/2S75GjJYrgCJrJ7E1wbP4b

Inside this repo the repo's own `CLAUDE.md` and its hook win over this skill, and this file wins over `mr.md`,
`config.md` and `storybook-handoff/`. Outside the repo (a chat app, another project) use the other references.

## Locked (the repo's hook blocks these; never work around it: stop and say which rule)

- Never merge, never push to `develop`, `main` or `release/*`. Only punnaruth.a (the Lead) merges, by hand on GitLab.
- `upstream/` and every repo in `seven-solutions/marketplus` are the Dev team's: read only. Never commit, push, branch,
  open or comment an MR or issue there. Never audit or rewrite files in `upstream/`.
- Never edit `.claude/`, `CLAUDE.md`, `.gitlab-ci.yml` or other dot files (the DS owner and the Lead own them), never
  hand-edit `packages/tokens/dist/` (tokens change in Figma Variables; the DS owner runs `/ds-tokens`).
- `apps/storefront`: the UI layer only (`components/`, `app/**/page.tsx`, `layout.tsx`, `globals.css`); never `api/`,
  `hooks/`, `stores/`, `types/`, `proxy.ts`.
- No real customer data in `mocks/`, no `.env` files or passwords in commits.

## Use the team's skills when the repo has them

`/proto-screen` (app or web screens), `/ds-component` (components), `/ds-review` (before round 2), `/mock-data`,
`/handoff` (commit, push, MR). This skill adds what they do not: the concept and mood and tone check against
แนวทางที่เลือก, the mapping of prototype parts (from the team link or a chat app) to repo components, and the
new-component requests. A team skill is not in `.claude/skills/` yet (the repo is still being set up): do that step
yourself with the rules below, and say so in one line.

## Where things go

| What | Where |
| --- | --- |
| card notes, audit, mapping, new-component requests | `docs/cards/<MAR-xxxx>/` (5w1h.md, solution.md, links.md are the team's; ours: `audit-report.md`, `mapping.md`, `new-component-requests.md`; run the audit with `--out docs/cards/<MAR-xxxx>`) |
| a component | `packages/ui/shared/`, `mobile/` or `web/` + `<kebab-name>/`: `<Pascal>.tsx` (React), `<snake>.dart` (Flutter), `<Pascal>.stories.tsx`; always all three |
| an app screen | `apps/prototype/src/screens/`, one file per screen |
| a web page | `apps/storefront/src/` (UI layer only, see above) |
| mock data | `mocks/data/*.json`, `mocks/handlers/` |

A folder does not exist yet: say "repo ยังไม่มีโฟลเดอร์ X ทีมกำลังตั้ง", keep the outputs in `docs/cards/<MAR-xxxx>/`,
and never scaffold `packages/` or `apps/` yourself.

Storybook groups: Foundation · Components / Shared · Components / Mobile App · Components / Desktop Web. The status
tags (Ready for Dev, In Dev, Needs Changes, Live) are the Lead's: never set them.

## Sizes and tokens

- Phone 375 in this repo (the prototype is drawn at 390: keep layouts fluid and check 375 and 390). Desktop web 1440.
- Use the repo's token names from `packages/tokens` (e.g. `color.primary`, `spacing.md`): match our values by value.
  No raw numbers. A value with no token: ask, and add it to the requests for the DS owner.

## Branch, commit, MR (only when `/handoff` is missing; ask before every push)

1. Ask the Jira key (MAR-xxxx) first. One card = one branch = one MR.
   Branch name: `<type>/<name>-<key>-<what>`, e.g. `feat/somchai.k-MAR-1234-product-card`; `<name>` = the part of
   `git config user.email` before the @ (ask if it is missing), `<what>` = short English kebab-case. No card (repo
   upkeep): `chore/<name>-<what>`.
2. New work branches from `develop`; a fix to a card in the current round (tag In Dev) from `release/round-N`; a
   production hotfix from `main`. Unsure: ask the Lead.
   ```sh
   git fetch origin && git switch -c feat/somchai.k-MAR-1234-product-card origin/develop
   ```
3. Commit `<type>(<scope>): [<key>] <what>`, e.g. `feat(product-card): [MAR-1234] add sold-out variant`; types: feat,
   fix, docs, chore, style, refactor, ci, test, revert, perf. Commit only the card's files.
4. The MR is a Draft from round 1, target `develop`, the body is `.gitlab/merge_request_templates/Default.md` filled
   (card key, Research links, Figma frame, Preview, what changed, checks; add "เปลี่ยนจากต้นแบบตรงไหน เพราะอะไร").
   Label `รอบ 1 · Prototype`, later `รอบ 2 · Ready to Dev`. With glab:
   ```sh
   git push -u origin HEAD
   glab mr create --draft --target-branch develop --title "[MAR-1234] Product Card" \
     --description "$(cat docs/cards/MAR-1234/mr-description.md)" --label "รอบ 1 · Prototype" --remove-source-branch
   ```
   No glab: `git push -u origin HEAD -o merge_request.create -o merge_request.target=develop -o merge_request.draft
   -o merge_request.label="รอบ 1 · Prototype"`, then paste the description on the MR page.
5. Reviewers: a component = the DS owner + 1 designer + the Lead; a screen or web page = 1 designer + the Lead. Ask
   the names; never guess.
6. Round 2: the person clicks "Mark as ready". Comments: fix, push, reply "แก้แล้ว: <what>" in the thread. Never
   resolve a thread (the commenter does). Never merge.

Daily habits to remind: start the day by pulling `develop`, commit at save points, push before leaving.
