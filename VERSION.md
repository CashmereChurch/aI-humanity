# Version 2 — 27 August 2026

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
