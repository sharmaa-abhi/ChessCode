# ChessCode

ChessCode is a browser-based chess project built with vanilla HTML, CSS, and JavaScript. It renders a full 8x8 board, places pieces, and wires up click-driven interactions for moves and highlights.

## Features

- 8x8 chessboard rendering with alternating square colors
- Piece rendering using image assets
- Move highlighting and selection styling
- Global state used to track board and piece positions

## Project Structure

- `index.html`: App entry point
- `index.js`: Bootstraps data, rendering, and event wiring
- `style/style.css`: Board, squares, and piece styling
- `Render/main.js`: Board and piece rendering utilities
- `Data/`: Game data, piece factories, and initial state
- `Events/`: Event handlers for interactions
- `Assets/Pieces/`: Piece image assets

## Getting Started

1. Open `index.html` directly in a browser, or
2. Serve the folder with a simple static server.

If you use VS Code, you can run a quick server with any static server extension, then open the local URL in your browser.

## Notes

- The project uses ES modules, so serving via a local server is recommended for consistent module loading.
- Game logic and legal move validation can be extended inside `Data/` and `Events/`.

## License

No license has been specified yet.