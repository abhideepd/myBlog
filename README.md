# myBlog — Minimalist Static Blog Engine

An aesthetic, minimalist, zero-backend blog engine built with pure HTML, CSS, and JavaScript. Designed for effortless writing, showcase, and hosting on GitHub Pages without requiring any build servers, node servers, or complex setup.

## Features

- **Editorial Minimalist Design**: High-contrast, clean typography focus (Inter + JetBrains Mono), smooth dark/light mode switcher with local storage & OS preference detection.
- **Pure Client-Side SPA**: Operates entirely in the browser with full Hash URL Routing (`/#/post/LoadBalancers`, `/#/tag/system-design`), shareable post links, and browser history support.
- **Instant Search & Filtering**: Real-time search across titles, summaries, tags, and content.
- **Rich Markdown Capabilities**:
  - Code syntax highlighting with copy-to-clipboard button.
  - Native support for `<details>` / `<summary>` collapsible sections.
  - Math formula rendering via KaTeX.
  - PlantUML diagram rendering.
  - Auto-generated Table of Contents & reading progress bar.
  - Reading time calculation for every post.
- **Zero Maintenance Overhead**: To add a new post, just drop your markdown file into `myBlogs/` and add an entry in `posts.json`.

---

## How to Add a New Post

1. Create a markdown file in `myBlogs/` (e.g. `myBlogs/my-new-post.md`).
2. Add an entry to `posts.json`:
   ```json
   {
     "id": "my-new-post",
     "title": "My New Post Title",
     "file": "myBlogs/my-new-post.md",
     "date": "2026-09-05",
     "tags": ["tech", "learning"],
     "summary": "Short description of the post."
   }
   ```
3. Commit and push to GitHub — your post is instantly live!

---

## Local Development & Preview

Serve the root directory with any standard HTTP server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node / npx
npx serve .
```

Open `http://localhost:8000` in your browser.
