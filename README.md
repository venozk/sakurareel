# SakuraReel

A free, static streaming site for original AI-made anime. No backend, no build step, no hosting bill.

**Live demo:** `https://YOUR-USERNAME.github.io/sakurareel/`

## Features
- Home page with featured series and episode grid
- Search and browse
- Watch page with YouTube embed or direct MP4 player
- "Made with AI" badge on every episode
- Support and paid-download buttons for earning
- Responsive, keyboard accessible, light and dark mode
- Auto-deploys to GitHub Pages

## Quick start
1. Create a GitHub repo and upload these files.
2. Go to **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. Your site goes live in about a minute.

To preview locally, open `index.html` in a browser.

## Add an episode
Edit `data.js` and add an entry:

```js
{ id: "my-show-1", series: "My Show", ep: 1, title: "Pilot",
  desc: "One-line summary.", c: ["#ff5c8a", "#3a1c71"],
  youtube: "VIDEO_ID", download: "https://gumroad.com/l/your-file" }
```

| Field | Purpose |
|---|---|
| `youtube` | YouTube video ID (unlisted or public) |
| `video` | Direct `.mp4` URL, such as Cloudflare R2 |
| `download` | Your paid download link (Gumroad, Ko-fi, Stripe) |
| `thumb` | Optional thumbnail image URL |
| `c` | Two gradient colors used when no thumbnail is set |

## Hosting videos for free
Don't commit videos to GitHub (1 GB repo limit). Use YouTube embeds or Cloudflare R2 (10 GB free, no download fees).

## Earning
- YouTube Partner Program on embedded uploads
- Paid downloads through Gumroad or Ko-fi
- Donations and memberships through the support link

## Content rules
Only upload work you own. Do not use characters or footage from existing studios. Label AI-generated content as such, as YouTube and ad networks require.

## License
MIT. See [LICENSE](LICENSE).
