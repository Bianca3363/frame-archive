# FRAME / ARCHIVE

A cinematic, bilingual (English / Chinese) personal video portfolio built with plain HTML, CSS and JavaScript. Designed for GitHub Pages.

## Preview locally

Open `index.html` in a browser, or use VS Code Live Server.

## Publish with GitHub Pages

1. Open this repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**, then Save.
4. After GitHub finishes publishing, the site will be available at:
   `https://bianca3363.github.io/frame-archive/`

## Add your own videos

Edit `assets/js/projects.js`. Each project has:

- `title` and `titleZh`: English and Chinese titles
- `subtitle` and `subtitleZh`: short metadata
- `category`: `travel`, `daily`, or `film`
- `cover`: thumbnail image URL
- `video`: an embed URL or direct MP4 URL
- `description` and `descriptionZh`: project notes

For YouTube, use an embed URL such as `https://www.youtube.com/embed/VIDEO_ID`.
For Vimeo, use `https://player.vimeo.com/video/VIDEO_ID`.

The sample projects are placeholders. Their video fields are intentionally empty until you add your own video links.

## Structure

```
index.html
assets/
  css/style.css
  js/main.js
  js/projects.js
```

Video files are not stored in this repository. Use a video host or object storage for the actual media, and keep the embed / playback URL in the project data.
