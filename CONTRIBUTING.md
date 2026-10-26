# Contributing

Each teammate works in their own clone and task branch. Coordinate who is editing which sections of `Bizethics/web.html`, since most of the site lives in that one file.

## One-time setup

Accept your GitHub repository invitation. Install Git and GitHub CLI, then authenticate with your own account:

```sh
gh auth login
git clone https://github.com/tungvp448/BIZETHICS.git
cd BIZETHICS
git config user.name "Your Name"
git config user.email "your-verified-email-or-github-noreply-address"
```

Do not share GitHub logins or tokens. Follow the README to preview the website.

## For every task

1. Finish or stash any uncommitted work before changing branches. Always update `main` before starting:

   ```sh
   git switch main
   git pull --ff-only origin main
   git switch -c feature/short-description
   ```

2. Make focused changes and preview the site. Use a unique branch name for each task; `fix/short-description` is also fine.
3. Review your diff, stage only intended files, and commit small, clear changes:

   ```sh
   git diff
   git add Bizethics/web.html
   git diff --cached
   git commit -m "Describe the change clearly"
   ```

   Substitute the paths you actually changed. Never commit `.env` files, credentials, API keys, dependencies, or build output. `.gitignore` cannot detect secrets pasted into source code.

4. Push your task branch and open a pull request into `main`:

   ```sh
   git push -u origin feature/short-description
   gh pr create --base main --title "Describe the change" --body "Explain what changed and how you checked it."
   ```

5. Request another teammate's review in GitHub. Address feedback on the same branch, commit, and push again. Obtain at least one approval from someone other than the author before merging. Use GitHub's merge button once required checks and reviews pass. Never push directly to `main` or force-push shared history.
6. After merging, update your local `main` with `git switch main` and `git pull --ff-only origin main`. Start the next task on a new branch.

## Merge conflicts

Commit your task work first, then bring current `main` into your task branch:

```sh
git fetch origin
git merge origin/main
```

If Git reports conflicts, run `git status` to find affected files. Open each file, discuss overlapping changes with the other author, and edit the final result so both intended changes are preserved. Remove the `<<<<<<<`, `=======`, and `>>>>>>>` conflict markers. Do not blindly accept one entire side. Preview and check the combined site, then finish:

```sh
git add path/to/resolved-file
git commit -m "Merge main and resolve conflicts"
git push
```

Replace the example path with each resolved file. If unsure how to resolve the conflict, use `git merge --abort` to return to the pre-merge state and ask a teammate. If `git pull --ff-only` fails on local `main`, stop and ask for help preserving any local commits; do not reset or force-push them away.

## Working with Claude Code

Open your cloned repository folder in Claude Code. Authenticate GitHub CLI with your own GitHub account. A useful task prompt is:

> Read README.md and CONTRIBUTING.md. Check that my worktree is clean, switch to main, pull the latest main with --ff-only, and create feature/short-description. Make the requested changes, preview and verify them, review the diff for secrets and unintended edits, commit small clear changes, push the branch, and open a pull request into main with gh pr create. Summarize the changes and checks in the PR. Do not merge the PR; another teammate must review it.

Replace the branch name and describe the actual task. Review Claude's diff yourself before sharing it. Give each concurrent Claude session a separate clone or Git worktree and its own branch; do not let multiple sessions edit the same working folder.
