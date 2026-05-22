# ChessCode

ChessCode is a browser-based chess project built with vanilla HTML, CSS, and JavaScript. It renders a full 8x8 board, places pieces, and wires up click-driven interactions for moves and highlights.

## Features

- 8x8 chessboard rendering with alternating square colors
- Piece rendering using image assets
- Move highlighting and selection styling
- Global state used to track board and piece positions

## Key Technologies

- Vanilla HTML, CSS, and JavaScript
- ES modules for imports/exports
- No build tooling required (static files)

## Runtime Flow

- `index.html` loads `index.js` and provides the `#root` mount point.
- `index.js` initializes board data, renders the board/pieces, and wires global events.
- Rendering and interaction state are held in memory (`globalData`).

## Project Structure

- `index.html`: App entry point
- `index.js`: Bootstraps data, rendering, and event wiring
- `style/style.css`: Board, squares, and piece styling
- `Render/main.js`: Board and piece rendering utilities
- `Data/`: Game data, piece factories, and initial state
- `Events/`: Event handlers for interactions
- `Assets/Pieces/`: Piece image assets

## Getting Started

1. **Serve the folder with a local static server** (required for ES Modules).

   Examples:
   - **Python:** `python -m http.server 8000`
   - **Node.js:** `npx http-server`
   - **VS Code:** Use the Live Server extension

> **⚠️ Important:** Do **NOT** open `index.html` directly using `file://` — this will fail because the code uses ES Modules which require HTTP/HTTPS. You must serve the folder via a local server.

## Notes

- The project uses ES modules, so serving via a local server is required. Do not open `index.html` directly using a `file://` URL, as it will fail to load modules.
- Game logic and legal move validation can be extended inside `Data/` and `Events/`.

## License

No license has been specified yet.
