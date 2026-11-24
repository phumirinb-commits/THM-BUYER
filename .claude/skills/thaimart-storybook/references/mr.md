# The merge request: branch, commit, open, review, fix

Ask before you push or open anything. Never merge; the Lead approves and merges.

## Branch and commit

```sh
git fetch origin
git switch -c feature/<feature>-prototype origin/<defaultBranch>
git add <story files> <rewritten parts> storybook-handoff/<feature>/
git commit -m "feat(<feature>): prototype stories and design system audit"
```

Commit only the feature's files. Never commit `.env` files, keys, or the Sukhumvit Tadmai font files.

## MR description

Fill `references/templates/mr-description.md`: Thai, short, plain. Attach or link the screenshots
(`storybook-handoff/<feature>/screens/*.png`). Fill "เปลี่ยนจากต้นแบบตรงไหน เพราะอะไร" with each UI difference and its
UX reason (a finding, a usability test, a link); if a reason is missing, ask the person instead of making one up.
Write it to `storybook-handoff/<feature>/mr-description.md` first, then use it as the MR body.

## Open it

GitLab (`repo.platform` "gitlab", needs `glab auth status` to pass):

```sh
git push -u origin feature/<feature>-prototype
glab mr create --source-branch feature/<feature>-prototype --target-branch <defaultBranch> \
  --title "<feature>: prototype ขึ้น Storybook" --description "$(cat storybook-handoff/<feature>/mr-description.md)" \
  --label "<labels, comma separated>" --reviewer "<leads, comma separated>" --remove-source-branch
```

GitHub (`repo.platform` "github", needs `gh auth status` to pass):

```sh
git push -u origin feature/<feature>-prototype
gh pr create --base <defaultBranch> --head feature/<feature>-prototype --title "<feature>: prototype ขึ้น Storybook" \
  --body-file storybook-handoff/<feature>/mr-description.md --label "<labels>" --reviewer "<leads>"
```

No CLI, or not logged in: print these steps for the person in Thai, plus the web way (open the repo, "New merge
request", source `feature/<feature>-prototype`, target `<defaultBranch>`, paste `mr-description.md`, add the labels and
the Lead as reviewer). Say which one you did.

## After the Lead's review: "แก้ตามคอมเมนต์ใน MR"

Read every comment and unresolved thread:

```sh
glab mr view <iid> --comments                      # GitLab: the comments
glab api "projects/:fullpath/merge_requests/<iid>/discussions?per_page=100"   # GitLab: threads, resolved or not
gh pr view <number> --comments                     # GitHub: the conversation
gh api repos/{owner}/{repo}/pulls/<number>/comments   # GitHub: comments on lines
```

Then:
1. List the comments back in Thai, one line each, with what you will do. Ask about anything unclear.
2. Fix each one in the code, the stories or the requests; run the audit again (`scripts/audit.mjs`).
3. Commit (`fix(<feature>): ตามคอมเมนต์ Lead`) and push to the same branch; the MR updates by itself.
4. Reply on each thread with what you changed in one line (`glab mr note <iid> -m "..."`, `gh pr comment <number>
   --body "..."`); resolve a GitLab thread only if the team does that (ask once).
5. If a comment asks to break tier 1 (concept, mood and tone), or to copy the prototype pixel for pixel without a
   reason, say so politely and ask the Lead before you change it.

If the MR was closed as "ไม่ผ่าน", the same loop applies on the same branch; reopen only when the person says so.
