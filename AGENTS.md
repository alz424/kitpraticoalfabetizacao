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

## Project architecture
- Keep the supplied long-form sales narrative on the index route; it is one continuous offer, not separate business pages.
- Keep editable offer values in a typed frontend configuration; preview edits are browser-local drafts, not hosted administration.
- Keep checkout validation and guarantee duration in the offer module so rules are tested independently of presentation.
- Keep carousel image sources and captions in a separate activity manifest; Embla handles dragging and snapping, while Radix Dialog provides accessible enlarged viewing.
