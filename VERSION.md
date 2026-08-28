# Version 2 — 27 August 2026

## Feedback form link added (29 Aug 2026)

`FEEDBACK_URL` in `index.html` now holds the live Microsoft Forms link. The Feedback tab
and the three "Tell us how it went" links are therefore visible and working; previously
they hid themselves because the URL was empty. Offline cache bumped to `ai2026-v9`.

## A1 lead-in line (28 Aug 2026)

Workshop A1 on the Workshops tab now carries the lead-in
**"Practical self-defence against AI harms:"** above its bullet list, matching the
wording already used in the Saturday agenda summary. Offline cache bumped to `ai2026-v7`.

The same line was added to `Signs for AI\01-agenda-A3-v2.docx` — on page 1 (the combined
Friday/Saturday agenda) and on the workshops page. It was **deliberately not added to the
Saturday-only agenda page**: that table is already full to the page edge, and one more line
pushes the Session A/B cards off the sheet entirely.

## Workshop A2 rewritten + agenda spacing (28 Aug 2026)

The A2 outline in `Signs for AI\01-agenda-A3.docx` no longer matches the marked-up sheet
the previous A2 topics came from, so the app now follows the docx:

| Was (from the marked-up sheet) | Now (from `01-agenda-A3.docx`) |
|---|---|
| Does AI enhance or threaten spiritual formation? | How are we using AI in our spiritual lives and contexts? |
| Intersection of faith & digital technology | What starting points might shape that? |
| Grief care and spiritual encounters through AI | Thinking about AI and worship, preaching, devotional life and more |
| — | Final thoughts |

**B2 was rewritten the same way** (28 Aug), replacing "identifying your core values /
impact of technological change / developing a plan…" with the docx outline: how are you
using AI · how do you decide when, how and why · negotiating AI: a process · from
experience and questions to ongoing reflective action · trying the process out · final
thoughts.

The one-line A2 and B2 summaries on the Saturday agenda were reworded to match.
A1 and B1 were checked against the docx and already agreed — not touched.

In B2, "From experience and questions to ongoing reflective action" and "Trying the
process out" are now **sub-points nested under "Negotiating AI: A process"**, not
top-level bullets. Sub-points render indented with a hollow gold ring instead of a
solid dot (new `.wcard .wtopics li > ul` rules). "Final thoughts" stays top-level.

Agenda rows: `.slot` padding raised from `14px 0` to `19px 0` so the text sits clear of the
dividing rules; the first row keeps a tighter `6px` top so the list doesn't start low.

Offline cache bumped to `ai2026-v6`.

## Speaker titles (added after the first v2 upload)

Titles now appear on every agenda slot and workshop card, not just the Speakers tab:

- **Dr** Stephen Garner
- **Dr** Matthew Galloway
- **Professor** Kathryn MacCallum
- **Emma Humphrey** — no title (confirmed by Luca, 27 Aug)

Speaker biographies were left alone so the prose still reads correctly.
Offline cache bumped again to `ai2026-v5`.

> **Still to fix:** page 1 of `Signs for AI\01-agenda-A3.docx` says "Dr Emma Humphrey".
> Page 2 and the app both say "Emma Humphrey". Page 1 needs correcting before printing.


This folder is **version 2** of the conference app. The live version is in `..\publish\`
and is unchanged. Nothing here is deployed until you upload it.

## Content corrections (from the marked-up A3 agenda, matched to `01-agenda-A3.docx`)

**Workshop A1 — AI self defence**

- "Facial recognition software" replaced with "Surveillance"
- The Saturday agenda summary now ends "…deepfakes and surveillance."

**Workshop A2 — AI and the spiritual life** — three topics added:

- Does AI enhance or threaten spiritual formation?
- Intersection of faith & digital technology
- Grief care and spiritual encounters through AI

**Workshop B2 — Using AI well** — three topics added:

- Identifying your core values
- Impact of technological change (managing)
- Developing a plan for use of AI that aligns with your core values

**Workshop B1** — no changes.

The two crossed-out items on the marked-up sheet ("How and where is God involved in AI?"
and "Faith informing engagement with AI?") were deliberately left out.

## Technical corrections (carried over from the earlier subfolder build)

- Service worker path made relative — `./service-worker.js` instead of `/service-worker.js`,
  so the app works from a subfolder as well as a domain root
- Service worker registration moved inside `</body>` (it was after `</html>`) and now waits
  for page load
- `matthew-galloway.co.nz` link upgraded from `http://` to `https://`
- Offline cache bumped to `ai2026-v4` so returning phones fetch the new version

## To make this live

Upload the contents of this folder to GitHub Pages / Netlify, replacing the current files.
Then copy them into `..\publish\` so that folder stays the record of what is live.

Bump `ai2026-v4` in `service-worker.js` again on any future change, or phones that already
have the app installed will keep serving the cached copy.
