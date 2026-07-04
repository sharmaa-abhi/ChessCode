# ♟️ ChessCode — Project Summary

**Last Updated:** July 4, 2026 — 08:40 PM IST  

> A browser-based chess game built with **vanilla HTML, CSS, and JavaScript** using ES Modules.
>
> **Major Update (July 4, 2026):** Turn management, chess timers, castling, pawn promotion, move logger, last-move highlighting, and turn indicator all implemented. Game is fully playable!

---

## 🎯 What This Project Does

ChessCode renders a full 8×8 chess board in the browser with all pieces on correct starting squares. **All 12 piece types are fully playable** — pawns, bishops, rooks, knights, queens, and kings — with proper turn management enforced.

**Currently Functional:**
- All piece movement with valid move highlighting (green dots)
- Turn management — white/black alternation enforced
- Chess timers — 10-minute per-player countdown with low-time warnings
- Self-selection highlight (yellow glow)
- Capture detection (red highlight on enemy squares)
- Last-move highlighting (source/destination squares)
- Castling (king-side and queen-side, both colors)
- Pawn promotion (modal UI for piece selection)
- Move logger with chess notation and Unicode piece symbols
- Turn indicator showing active player

**Not Yet Implemented:**
- Check / Checkmate detection (stub exists)
- En passant
- Stalemate detection

---

## 🗂️ Project Structure

```
chessCode/
│
├── index.html              → App entry point (board layout, timers, logger)
├── index.js                → Bootstraps the game (3 calls: data, render, events)
├── server.js               → Node.js dev server (port 8082)
│
├── Data/
│   ├── data.js             → Board data builder (Square, squareRow, initGame)
│   └── pieces.js           → Piece factory functions (12 pieces total)
│
├── Helper/
│   ├── constant.js         → ROOT_DIV shared constant
│   ├── commonHelper.js     → Move calculation, capture detection, ray-blocking
│   ├── logging.js          → Move logger UI (chess notation with Unicode symbols)
│   ├── timer.js            → Chess timer system (ChessTimer class)
│   └── modelCreator.js     → Pawn promotion modal (ModalCreater class)
│
├── Render/
│   └── main.js             → All DOM rendering functions
│
├── Events/
│   └── Global.js           → All click event handlers, turn system, game logic
│
├── Assets/
│   └── Pieces/
│       ├── white/          → White piece images (pawn, rook, knight, etc.)
│       └── black/          → Black piece images
│
└── style/
    └── style.css           → Board, piece, timer, logger, modal styling
```

---

## ⚙️ How It Works (3 Steps)

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

---

## 🧩 Key Concepts

### `globalData`
The central 8×8 array that holds every square's state. Every function reads from or writes to it.
```js
globalData[0]       // Row 8 (top of board, black pieces)
globalData[7]       // Row 1 (bottom of board, white pieces)
globalData[0][0]    // Square a8 → { id: "a8", color: "black", piece: {...} }
```

### Square Object
```js
{ color: "white", piece: { current_Position: "a2", img: "...", piece_name: "WHITE_PAWN" }, id: "a2" }
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

## 🚧 What's Not Yet Implemented

| Feature | Status |
|---------|--------|
| Check / Checkmate detection | ⏳ Stub exists (`checkForCheck()`) |
| Stalemate detection | ❌ Not implemented |
| En passant | ❌ Not implemented |
| Move history / undo | ❌ Not implemented |
| AI opponent | ❌ Future |
| Game state persistence | ❌ Future |

---

## 📄 Documentation Files

| File | What it covers |
|------|---------------|
| `README.md` | Setup and project overview |
| `Md_file/Function.md` | Every function explained line by line |
| `Md_file/FunctionReference.md` | Simple one-liner per function with execution order |
| `Md_file/Design_Architecture.md` | System architecture and module layers |
| `Md_file/Design_Data.md` | Data structures and schemas |
| `Md_file/Design_PieceMovement.md` | Movement rules for all 6 piece types |
| `Md_file/Design_UIUX.md` | Visual design system, colors, CSS classes |
| `Md_file/Flowchart.md` | Mermaid flowcharts for pawn click logic |
| `Md_file/FlowChart2.md` | Visual flowcharts for all major flows |
| `Md_file/All_Bugs_Report.md` | Bug history & resolutions |
| `Md_file/IMPLEMENTATION_STATUS.md` | Feature completion matrix & roadmap |
| `ProjectSummary.md` | This file — overall project summary |

---

## 🛠️ How to Run

1. Open the project folder
2. Run `node server.js` in terminal
3. Open `http://localhost:8082` in your browser

> ⚠️ Must be served via a local server — **do not open `index.html` directly** as ES Modules require HTTP.

---

## 📌 Key Things to Remember

- All board state lives in `globalData` — never create state outside it
- The board renders once (`initGameRender`) — after that only `globalStateRender` + `moveElement` update the DOM
- Turn is managed by `inTurn` variable, toggled by `changeTurn()` after each move
- Timer switches automatically with each turn via `chessTimer.switchTurn()`
- `movePieceFromXtoY()` in `Global.js` is **replaced** by `moveElement()` — kept only for export
