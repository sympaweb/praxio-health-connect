<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Directory content lives in `src/lib/data.ts`; demo submissions (claims, inquiries, reviews, portal edits) persist in browser storage via `src/lib/store.ts` — why: app runs fully without a backend until Cloud is enabled.
