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

## Project rules
- Portfolio AI assistant calls the AI gateway only from a server function (`src/lib/portfolio-chat.functions.ts`); keep its facts in the system prompt in sync with page content so it never invents details.
- Uploaded media (certificates, photos, CV) is served via Lovable asset pointers in `src/assets/*.asset.json`, with forward-slash web paths only, so the site runs on any machine.
- All page content lives in typed data (src/data/portfolio.ts); components in src/components/portfolio only render it, so content edits never touch layout.
