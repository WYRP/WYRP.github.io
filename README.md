# Personal Website

A simple static portfolio: a project gallery (images + videos) and a text resume.
There's no build step. Open `index.html` in a browser to preview it.

## Files

```
index.html          Home page: intro, project grid, about/contact
resume.html         Text resume + "Download PDF" button
js/projects.js      ← YOUR PROJECT LIST (the main file you edit)
js/main.js          Renders the grid and project popups (no need to edit)
css/style.css       Styling (colors are at the top under :root)
assets/resume.pdf   ← put your PDF resume here
assets/projects/    ← one folder per project for images/videos
```

## Adding a project

1. Make a folder: `assets/projects/my-project/` and put images (`.jpg`, `.png`, `.webp`) and short videos (`.mp4`) in it.
2. For longer videos, upload to YouTube (Unlisted works) and copy the ID — the part after `watch?v=`.
3. Add an entry to `js/projects.js`:

```js
{
  id: "my-project",
  title: "My Project",
  year: "2025",
  summary: "One-line summary for the card.",
  description: "Longer write-up.\n\nSecond paragraph.",
  tags: ["Python", "Robotics"],
  links: [{ label: "GitHub", url: "https://github.com/you/my-project" }],
  media: [
    { type: "youtube", id: "VIDEO_ID", caption: "Full demo" },
    { type: "video", src: "assets/projects/my-project/clip.mp4", caption: "Short clip" },
    { type: "image", src: "assets/projects/my-project/photo.jpg", caption: "Final build" }
  ]
}
```

The card thumbnail is the first image (or YouTube thumbnail) unless you set `thumbnail: "path/to/img.jpg"`.

Tips:
- Keep MP4 files under ~50 MB (GitHub rejects files over 100 MB). Compress with HandBrake if needed.
- Resize images to ~1600 px wide so pages load fast.
- File names are case-sensitive on GitHub Pages: `Photo.JPG` ≠ `photo.jpg`.

## Editing your info

Search for `Your Name`, `you@example.com`, and `yourname` in `index.html` and `resume.html` and replace them.

## Publishing on GitHub Pages

1. Create a GitHub account if needed, then a new **public** repository named `<your-username>.github.io`.
2. Upload the contents of this folder (not the folder itself) to the repo, either with **Add file → Upload files** on github.com or with git:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. In the repo go to **Settings → Pages**, set Source to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. After a minute the site is live at `https://<your-username>.github.io`.

To update later, edit files and upload/push again.
