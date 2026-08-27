# Putting the AI & Humanity Conference app on WordPress

You have two files:

- **`conference-for-wordpress.zip`** — the app, ready to upload
- **`conference/`** — the same thing unzipped, if you'd rather upload via FTP

The app will end up at **`yourwordpresssite.com/conference/`**

---

## What changed from the Netlify version

Three fixes were needed to make it work from a subfolder rather than the root of a domain:

| Fix | Why |
|---|---|
| Service worker path changed from `/service-worker.js` to `./service-worker.js` | The absolute path pointed at your WordPress root, where the file won't be. This broke offline mode entirely. |
| Service worker registration moved inside `</body>` | It was sitting after `</html>`, which is invalid HTML. Also now waits for page load, so it doesn't compete with images for bandwidth. |
| `http://matthew-galloway.co.nz` upgraded to `https://` | A plain-HTTP link on an HTTPS page triggers a browser warning. |

Also bumped the offline cache name from `ai2026-v2` to `ai2026-v3`, so anyone who already installed the Netlify version gets the fresh copy rather than a stale cached one.

Everything else is untouched. All image paths were already relative, so they work anywhere.

---

## Method 1 — cPanel File Manager (easiest)

Most NZ hosts (Zeald, Web Drive, SiteHost, GoDaddy, Bluehost) give you cPanel.

1. Log in to your hosting control panel and open **File Manager**.
2. Navigate to your WordPress root — the folder containing `wp-content`, `wp-admin` and `wp-config.php`. It's usually `public_html/`.
3. Click **Upload** and select `conference-for-wordpress.zip`.
4. Once uploaded, go back to the file list, right-click the zip and choose **Extract**.
5. You should now have a `conference` folder there. **Delete the zip file** afterwards — don't leave it publicly downloadable.
6. Visit `yourwordpresssite.com/conference/` to check it works.

## Method 2 — FTP / SFTP

If you use FileZilla or similar:

1. Connect to your host with the FTP details from your hosting provider.
2. Navigate to the WordPress root (the folder with `wp-content` in it).
3. Drag the **`conference` folder** (unzipped) into it.
4. Wait for all 18 files to transfer, then visit `yourwordpresssite.com/conference/`.

## What will NOT work

**Do not try to upload this through the WordPress Media Library.** WordPress blocks `.html` and `.js` uploads for security reasons. You need File Manager or FTP. If a plugin offers to lift that restriction, don't — it's a genuine security risk on a church site.

---

## Adding it to your WordPress menu

WordPress doesn't know this folder exists, so you add a link manually:

1. **Appearance → Menus** in your WP admin.
2. On the left, expand **Custom Links**.
3. **URL:** `/conference/` &nbsp;&nbsp; **Link Text:** `Conference App`
4. Click **Add to Menu**, drag it where you want it, then **Save Menu**.

To put a button on a page instead, add a Button block and point it at `/conference/`.

---

## Checking it worked

Open `yourwordpresssite.com/conference/` on a phone and confirm:

- [ ] The banner image and all four speaker photos load
- [ ] The Agenda / Speakers / Workshops / Venue tabs switch correctly
- [ ] Tapping a speaker expands their biography
- [ ] The venue plan opens full size when tapped
- [ ] "Add to Home Screen" appears in the browser menu (this proves the service worker registered)
- [ ] Turn on flight mode, close the browser, reopen from the home screen icon — it should still load

That last one is the real test. It's what matters on the day if the church Wi-Fi struggles with 100 people on it.

---

## Important: HTTPS is required

The offline app features (service worker, add-to-home-screen) **only work over HTTPS**. If your WordPress site still runs on plain `http://`, the app will display fine but won't install or work offline.

Check by visiting your site — if there's no padlock in the address bar, ask your host to enable the free Let's Encrypt certificate. Nearly every host offers this at no cost.

---

## If something goes wrong

**Page loads but images are missing**
Files didn't all transfer, or the folder nested wrongly. Check File Manager — you want `public_html/conference/index.html`, not `public_html/conference/conference/index.html`.

**403 or 404 error**
File permissions. In cPanel File Manager, select all files in the folder, then **Permissions** → set files to `644` and the folder itself to `755`.

**Your WordPress theme's header appears above the app**
It shouldn't — this folder bypasses WordPress entirely. If it happens, a plugin or `.htaccess` rule is redirecting everything through WordPress. Ask your host to exclude `/conference/` from WordPress routing.

**Old version keeps appearing after a re-upload**
The offline cache is doing its job. Open `service-worker.js`, change `ai2026-v3` to `ai2026-v4`, re-upload that one file. Returning phones will then refresh.

**Security plugin blocks it**
Wordfence and similar sometimes flag HTML files outside WordPress. Whitelist the `/conference/` directory in the plugin settings.

---

## A word of advice

Your Netlify version works perfectly well and costs nothing. Unless there's a reason the app must live on the church domain, consider just linking to it from WordPress instead — one Custom Link pointing at `https://aiandhumanityconference.netlify.app/`.

If it's about the address looking official, the middle option is to point a subdomain like `conference.cashmerechurch.org.nz` at Netlify. You keep the instant deploys and the clean URL, without touching the WordPress install at all. Your host or Netlify support can set that up with a single DNS record.

Whichever you choose, **do not run both copies live long-term**. Two versions of a conference programme drifting out of sync is how people end up in the wrong room.
