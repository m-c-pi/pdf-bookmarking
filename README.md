<p align="center">
  <img src="public/icon-192x192.png" alt="Superior PDF Bookmarks" width="96" />
</p>

<h1 align="center">Superior PDF Bookmarks</h1>

<p align="center">
  A sophisticated and free Chrome extension for bookmarking PDF documents.
</p>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/superior-pdf-bookmarks/cmbcjkejdebbengdbindhfofkkendcon">Chrome Web Store</a>
</p>

## Features

- **Page bookmarks** — Save bookmarks to specific pages in any PDF with custom titles
- **Per-PDF and global views** — Switch between bookmarks for the current PDF or browse all saved bookmarks
- **Drag-and-drop reordering** — Rearrange bookmarks and PDF entries freely
- **Search** — Find bookmarks by title across all your PDFs
- **Inline editing** — Rename bookmarks and PDF titles without leaving the popup
- **Dark mode** — Automatic theme detection with a manual toggle
- **Local storage** — All data stays in your browser via Chrome Storage API

## Installation

Install from the [Chrome Web Store](https://chromewebstore.google.com/detail/superior-pdf-bookmarks/cmbcjkejdebbengdbindhfofkkendcon).

### Load from source

1. Clone the repository:

   ```sh
   git clone https://github.com/pascal-iding/pdf-bookmarking.git
   cd pdf-bookmarking
   ```

2. Install dependencies and build:

   ```sh
   npm install
   npm run build
   ```

3. Open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select the `dist/` directory.

## Development

```sh
npm install
npm run dev       # Start Vite dev server with hot-reload
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run oxlint + ESLint
npm run format    # Format with Prettier
```

Requires Node.js `^20.19.0` or `>=22.12.0`.

## Tech Stack

- [Vue 3](https://vuejs.org/) with Composition API
- [Pinia](https://pinia.vuejs.org/) for state management
- [Vite](https://vite.dev/) for building
- [Sortable.js](https://sortablejs.github.io/Sortable/) for drag-and-drop
- [GSAP](https://gsap.com/) for animations
- Chrome Extension Manifest V3

## Contributing

Contributions are welcome! Feel free to open an issue for feature requests or bugs.

## License

This project is open source. See the repository for license details.
