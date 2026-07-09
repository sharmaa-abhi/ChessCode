# ♟️ ChessCode — Project Documentation

**Last Updated:** July 9, 2026  

> A browser-based chess game built with **vanilla HTML, CSS, and JavaScript** using ES Modules.

---

## 🎯 What This Project Does

ChessCode renders a full 8×8 chess board in the browser with all pieces on correct starting squares. **All 12 piece types are fully playable** — pawns, bishops, rooks, knights, queens, and kings — with proper turn management enforced.

## ✨ Features

- ✅ **8×8 chessboard** with piece placement
- ✅ **All piece movement** — Pawn, Rook, Bishop, Knight, Queen, King (both colors)
- ✅ **Turn management** — White/Black alternation enforced
- ✅ **Chess timers** — 10-minute per-player countdown clocks with low-time warnings
- ✅ **Move highlighting** (green dots for valid moves)
- ✅ **Capture detection** (red highlights on enemy squares)
- ✅ **Selection glow** (yellow highlight for selected piece)
- ✅ **Last-move highlighting** — Source and destination squares highlighted after each move
- ✅ **Castling** — King-side and Queen-side for both colors
- ✅ **Pawn promotion** — Modal selection (Queen, Rook, Bishop, Knight)
- ✅ **Move logger** — Real-time move history panel with chess notation and piece symbols
- ✅ **Turn indicator** — Visual display of whose turn it is
- ✅ **Efficient lookups** using `keySquareMapper`
- ✅ **Mobile responsive** — Scales to tablets, phones, and landscape orientations

## 🚧 Not Yet Implemented

| Feature | Status |
|---------|--------|
| Check / Checkmate detection | ⏳ Stub exists, needs completion |
| Stalemate detection | ❌ Future |
| En passant | ❌ Future |
| Move history / undo | ❌ Future |
| AI opponent | ❌ Future |
| Game state persistence | ❌ Future |

## 🚀 Tech Stack

- Vanilla HTML, CSS, JavaScript
- ES Modules (no build tools)
- Google Fonts (Inter, JetBrains Mono)
- No external dependencies

---

## 📂 Project Structure

```
chessCode/
├── index.html                 → Entry point (board + timer + logger layout)
├── index.js                   → Bootstrap (3 steps: init, render, events)
├── server.js                  → Local dev server (Node.js, port 8082)
├── style/
│   ├── style.css             → Desktop styling (board, timers, logger, modals)
│   └── mobile.css            → Mobile responsive layout (tablets, phones, landscape)
├── Data/
│   ├── data.js              → Board builder (Square, squareRow, initGame)
│   └── pieces.js            → Piece factories (12 pieces)
├── Helper/
│   ├── constant.js          → ROOT_DIV shared constant
│   ├── commonHelper.js      → Move calculation & capture utilities
│   ├── logging.js           → Move logger (chess notation UI)
│   ├── timer.js             → Chess timer system (per-player countdown)
│   └── modelCreator.js      → Pawn promotion modal
├── Render/main.js           → DOM rendering
├── Events/Global.js         → Event handlers, turn system, game logic
├── Assets/Pieces/           → Piece images (white/ & black/)
└── docs/                    → Documentation (this folder)
```

---

## ⚙️ How It Works

```
STEP 1 — Build Data        STEP 2 — Render Board       STEP 3 — Listen for Clicks
─────────────────          ──────────────────────       ──────────────────────────
initGame()                 initGameRender()             globalEvent()
  └─ squareRow() × 8         └─ Creates 64 divs           └─ One listener on ROOT_DIV
      └─ Square() × 8             └─ Places pieces               ├─ Turn validation
                                       └─ pieceRender()           ├─ Piece handler dispatch
                                                                  ├─ moveElement() → move piece
                                                                  ├─ changeTurn() → switch turn
                                                                  └─ chessTimer.switchTurn()
```

1. **Data:** Build 8×8 board array (`globalData`)
2. **Render:** Draw squares, place pieces, initialize timers
3. **Events:** Listen for clicks — validate turn → dispatch to piece handler → execute move → switch turn → switch timer

---

## 📦 Files & Their Responsibility

| File | Layer | Responsibility |
|------|-------|---------------|
| `index.js` | Entry | Calls `initGame`, `initGameRender`, `globalEvent`; exports `globalData`, `keySquareMapper`, `globalPiece` |
| `Data/data.js` | Data | Builds the 8×8 board array in memory (`globalData`) |
| `Data/pieces.js` | Data | Creates piece objects with image path, piece name, and position |
| `Helper/constant.js` | Helper | Shares `ROOT_DIV` across all files |
| `Helper/commonHelper.js` | Helper | Move range calculators, capture detection, ray-blocking utilities |
| `Helper/logging.js` | Helper | Logs moves to the UI panel with chess notation and Unicode piece symbols |
| `Helper/timer.js` | Helper | `ChessTimer` class — per-player countdown, low-time warnings, timeout detection |
| `Helper/modelCreator.js` | Helper | `ModalCreater` class and `pawnPromotion()` — promotion piece selection UI |
| `Render/main.js` | Render | Draws squares, places images, handles highlights and moves on screen |
| `Events/Global.js` | Events | All 12 piece click handlers, turn management (`inTurn`), `changeTurn()`, `moveElement()`, last-move tracking, timer integration |
| `style/style.css` | Style | Board, timers, logger, modals, last-move highlights, timeout overlay |
| `style/mobile.css` | Style | Mobile responsive breakpoints (tablet, phone, landscape) |

---

## 🧩 Key Concepts

### `globalData`
The central 8×8 array that holds every square's state. Every function reads from or writes to it.
```js
globalData[0]       // Row 8 (top of board, black pieces)
globalData[7]       // Row 1 (bottom of board, white pieces)
globalData[0][0]    // Square a8 → { id: "a8", color: "black", piece: {...} }
```

### `keySquareMapper`
A flat dictionary (id → square object) for O(1) square lookups instead of O(64) array scans.
```js
keySquareMapper["e4"]  // → { id: "e4", color: "white", piece: null }
```

### State Variables (in `Global.js`)
| Variable | Meaning |
|----------|---------| 
| `highlightState` | `true` when a piece is selected and valid move dots are showing |
| `selfHighlightState` | The piece object currently glowing yellow |
| `moveState` | The piece object that will be moved on next click |
| `inTurn` | Current turn — `"white"` or `"black"` |
| `lastMoveFrom` | Square ID where last move originated (for highlighting) |
| `lastMoveTo` | Square ID where last move landed (for highlighting) |

---

## 🔄 Move Execution Flow

```
User clicks a piece (matching inTurn color)
    │
    ├─ Same piece clicked again?
    │   └─ YES → Deselect (remove glow + dots), return
    │
    ├─ Clear previous highlights
    │
    └─ New piece selected
           ├─ Add yellow glow via selfHighlight()
           ├─ Calculate valid moves (per piece type)
           ├─ Show green dots (highlight) + red squares (capture)
           └─ Set moveState = piece

User clicks a valid move (green dot or red capture)
    │
    ├─ moveElement(moveState, targetId)
    │   ├─ Log move to move logger
    │   ├─ Clear previous last-move highlights
    │   ├─ Update globalData (vacate old square, place on new)
    │   ├─ Move DOM image element
    │   ├─ Apply new last-move highlights
    │   ├─ Check for pawn promotion → show modal if applicable
    │   ├─ Check for check (stub)
    │   └─ changeTurn()
    │       ├─ Toggle inTurn (white ↔ black)
    │       ├─ Update turn indicator UI
    │       └─ chessTimer.switchTurn()
    └─ Clear highlights and moveState
```

---

## 🎮 Gameplay

- **Click a piece** → Shows valid moves (green dots) + captures (red)
- **Click valid move** → Piece moves, turn switches, timer switches
- **Click empty square** → Clears highlights
- **Turn enforcement** → Only the active player's pieces can be selected
- **Timers** → Active player's clock counts down; low-time warning at 30 seconds
- **Castling** → Available when king and rook haven't moved, path is clear
- **Pawn promotion** → Reaching the 8th/1st rank triggers piece selection modal
- **Timer timeout** → Game ends with winner declared on time

---

## 📋 Key Export Points

| File | Exports |
|------|---------| 
| `index.js` | `globalData`, `keySquareMapper`, `globalPiece` |
| `Data/data.js` | `initGame`, `Square` |
| `Render/main.js` | `initGameRender`, `clearHighlight`, `selfHighlight`, `globalStateRender`, `globalPiece` |
| `Events/Global.js` | `globalEvent`, `movePieceFromXtoY`, `moveElement`, `clearPreviousSelfHighlight`, `inTurn` |
| `Helper/constant.js` | `ROOT_DIV` |
| `Helper/commonHelper.js` | `checkPieceOfOpponentOnElement`, `checkSquareCaptureId`, `giveXxxHighlightedIds`, `giveXxxCaptureIds`, `checkWhetherPieceExistOrNot` |
| `Helper/logging.js` | `logMoves` |
| `Helper/timer.js` | `chessTimer`, `ChessTimer` |
| `Helper/modelCreator.js` | `ModalCreater`, `pawnPromotion` |

---

## 🛠️ How to Run

1. Open the project folder
2. Run `node server.js` in terminal
3. Open `http://localhost:8082` in your browser

> ⚠️ Must be served via a local server — **do not open `index.html` directly** as ES Modules require HTTP.

---

## 🎨 Styling

- Board: 8×8 CSS grid (600×600px desktop, scales on mobile)
- Pieces: PNG images (75×75px desktop, proportional on mobile)
- **Highlights:** Yellow glow (selected) | Green dot (valid move) | Red (capture) | Light yellow (last move)
- **Timers:** Active glow, low-time red pulse animation
- **Fonts:** Inter (UI), JetBrains Mono (timer, moves)
- **Theme:** Dark chess.com-inspired (charcoal/olive green)

## 📝 Code Conventions

- Use `globalData`, not `gobalData`
- Use `highlight`, not `highLight`
- Use `square`, not `sqaure`
- Turn tracked via `inTurn` variable ("white" / "black")
- Piece names follow `COLOR_TYPE` format (e.g., `WHITE_PAWN`, `BLACK_KING`)

## 📚 Documentation Index

| File | What it covers |
|------|---------------|
| [Architecture.md](./Architecture.md) | System design, module layers, data structures, flowcharts |
| [Implementation.md](./Implementation.md) | All functions explained + piece movement rules |
| [UI_UX.md](./UI_UX.md) | Visual design system, colors, CSS classes |
| [Bugs_and_Audit.md](./Bugs_and_Audit.md) | Bug history, code audit, fixes |
| [Final_Report.md](./Final_Report.md) | Implementation status, project health |
| [CHANGELOG.md](./CHANGELOG.md) | Update history |
| [Future_Implementation.md](./Future_Implementation.md) | Roadmap for upcoming features |

## 📌 Key Things to Remember

- All board state lives in `globalData` — never create state outside it
- The board renders once (`initGameRender`) — after that only `globalStateRender` + `moveElement` update the DOM
- Turn is managed by `inTurn` variable, toggled by `changeTurn()` after each move
- Timer switches automatically with each turn via `chessTimer.switchTurn()`
- `movePieceFromXtoY()` in `Global.js` is **replaced** by `moveElement()` — kept only for export

## 📄 License

Unlicensed (open for learning and extension).
