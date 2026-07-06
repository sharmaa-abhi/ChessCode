# ♟️ ChessCode — Browser-Based Chess Game

**Last Updated:** July 4, 2026 — 08:40 PM IST  

A vanilla JavaScript chess game with ES Modules. Full 8×8 board, all 12 piece types fully playable with turn management, chess timers, castling, pawn promotion, and move logging.

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

## 🚀 Tech Stack

- Vanilla HTML, CSS, JavaScript
- ES Modules (no build tools)
- Google Fonts (Inter, JetBrains Mono)
- No external dependencies

## 📂 Structure

```
chessCode/
├── index.html                 → Entry point (board + timer + logger layout)
├── index.js                   → Bootstrap (3 steps: init, render, events)
├── server.js                  → Local dev server (Node.js, port 8082)
├── style/style.css           → Styling (board, timers, logger, modals)
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
└── Md_file/                 → Documentation (15 files)
```

## ⚙️ How It Works

```
initGame()  →  initGameRender()  →  globalEvent()
  (data)         (display)          (clicks → turn-gated piece handlers)
```

1. **Data:** Build 8×8 board array (`globalData`)
2. **Render:** Draw squares, place pieces, initialize timers
3. **Events:** Listen for clicks — validate turn → dispatch to piece handler → execute move → switch turn → switch timer

## 🎮 Gameplay

- **Click a piece** → Shows valid moves (green dots) + captures (red)
- **Click valid move** → Piece moves, turn switches, timer switches
- **Click empty square** → Clears highlights
- **Turn enforcement** → Only the active player's pieces can be selected
- **Timers** → Active player's clock counts down; low-time warning at 30 seconds
- **Castling** → Available when king and rook haven't moved, path is clear
- **Pawn promotion** → Reaching the 8th/1st rank triggers piece selection modal
- **Timer timeout** → Game ends with winner declared on time

## 📊 Key Data

**`globalData`** — 8×8 array of square objects  
**`keySquareMapper`** — ID → square lookup (O(1) instead of O(64))  
**`globalPiece`** — Named references to all pieces for check detection  

## 🚀 Getting Started

**⚠️ Must use a local server (ES Modules require HTTP, not `file://`)**

**Node.js (built-in server):**
```bash
node server.js
# Open http://localhost:8082
```

**Python:**
```bash
python -m http.server 8000
# Open http://localhost:8000
```

**VS Code:**
- Install **Live Server** extension
- Right-click `index.html` → "Open with Live Server"

## ✅ Code Quality (July 4, 2026)

- ✅ No syntax errors
- ✅ No runtime crashes
- ✅ **All piece handlers implemented and wired**
- ✅ **Turn validation working** — white/black alternation enforced
- ✅ **Chess timers working** — 10-minute per-player clocks
- ✅ **Castling implemented** — both colors, king-side and queen-side
- ✅ **Pawn promotion implemented** — modal selection UI
- ✅ **Move logger working** — real-time notation with Unicode pieces
- ⚠️ Check/Checkmate detection incomplete (stub exists)
- ⚠️ En passant not implemented

📖 **Full Details:** [IMPLEMENTATION_STATUS.md](./Md_file/IMPLEMENTATION_STATUS.md)

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| [ProjectSummary.md](./ProjectSummary.md) | Overview & architecture |
| [Md_file/Function.md](./Md_file/Function.md) | All functions (line-by-line) |
| [Md_file/FunctionReference.md](./Md_file/FunctionReference.md) | Quick function reference |
| [Md_file/Design_Architecture.md](./Md_file/Design_Architecture.md) | System architecture |
| [Md_file/Design_Data.md](./Md_file/Design_Data.md) | Data structures |
| [Md_file/Design_PieceMovement.md](./Md_file/Design_PieceMovement.md) | Movement rules |
| [Md_file/Design_UIUX.md](./Md_file/Design_UIUX.md) | UI/UX design system |
| [Md_file/All_Bugs_Report.md](./Md_file/All_Bugs_Report.md) | Bug history & fixes |
| [Md_file/IMPLEMENTATION_STATUS.md](./Md_file/IMPLEMENTATION_STATUS.md) | Feature status matrix |

## 🚧 Not Yet Implemented

| Feature | Status |
|---------|--------|
| Check / Checkmate detection | ⏳ Stub exists, needs completion |
| Stalemate detection | ❌ Future |
| En passant | ❌ Future |
| Move history / undo | ❌ Future |
| AI opponent | ❌ Future |
| Game state persistence | ❌ Future |

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

## 🎨 Styling

- Board: 8×8 CSS grid (600×600px)
- Pieces: PNG images (75×75px)
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

## 📄 License

Unlicensed (open for learning and extension).
