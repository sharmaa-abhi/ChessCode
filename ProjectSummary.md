# ♟️ ChessCode — Project Summary

> A browser-based chess game built with **vanilla HTML, CSS, and JavaScript** using ES Modules.

---

## 🎯 What This Project Does

ChessCode renders a full 8×8 chess board in the browser, places all pieces on their correct starting squares, and lets users click pieces to select and move them. Currently, **pawn movement is fully implemented** for both white and black pawns including:
- Move highlighting (green dots)
- Self-selection highlight (yellow glow)
- Capture detection (red highlight on enemy diagonal squares)
- Two-square first move from the starting row

---

## 🗂️ Project Structure

```
chessCode/
│
├── index.html              → App entry point (loads index.js as module)
├── index.js                → Bootstraps the game (3 calls: data, render, events)
│
├── Data/
│   ├── data.js             → Board data builder (Square, squareRow, initGame)
│   └── pieces.js           → Piece factory functions (12 pieces total)
│
├── Helper/
│   ├── constant.js         → ROOT_DIV shared constant
│   └── commonHelper.js     → checkPieceOfOpponentOnElement utility
│
├── Render/
│   └── main.js             → All DOM rendering functions
│
├── Events/
│   └── Global.js           → All click event handlers
│
├── Assets/
│   └── Pieces/
│       ├── white/          → White piece images (pawn, rook, knight, etc.)
│       └── black/          → Black piece images
│
└── style/
    └── style.css           → Board, piece, and highlight styling
```

---

## ⚙️ How It Works (3 Steps)

```
STEP 1 — Build Data        STEP 2 — Render Board       STEP 3 — Listen for Clicks
─────────────────          ──────────────────────       ──────────────────────────
initGame()                 initGameRender()             globalEvent()
  └─ squareRow() × 8         └─ Creates 64 divs           └─ One listener on ROOT_DIV
      └─ Square() × 8             └─ Places pieces               ├─ img click → pawnClick
                                       └─ pieceRender()           ├─ span click → moveElement
                                                                   └─ else → clearHighlight
```

---

## 📦 Files & Their Responsibility

| File | Layer | Responsibility |
|------|-------|---------------|
| `index.js` | Entry | Calls `initGame`, `initGameRender`, `globalEvent` in order |
| `Data/data.js` | Data | Builds the 8×8 board array in memory (`globalData`) |
| `Data/pieces.js` | Data | Creates piece objects with image path and piece name |
| `Helper/constant.js` | Helper | Shares `ROOT_DIV` across all files |
| `Helper/commonHelper.js` | Helper | Checks diagonal squares for enemy pieces |
| `Render/main.js` | Render | Draws squares, places images, handles highlights and moves on screen |
| `Events/Global.js` | Events | Handles all user click interactions and pawn move logic |

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

---

## 🔄 Pawn Click Flow (Summary)

```
Click White Pawn
    │
    ├─ Same pawn? → Deselect (remove glow + dots)
    │
    └─ New pawn selected
           ├─ Glow yellow ✨
           └─ On row 2? → Show 2 squares ahead 🟢🟢
              Not row 2? → Show 1 square ahead 🟢 + check diagonals for captures 🔴

Click Green Dot / Highlighted Square
    └─ moveElement() → Piece moves, all highlights clear ♟️

Click Black Pawn (when white is selected)
    └─ Move white pawn to that square immediately
```

---

## 🚧 What's Not Yet Implemented

| Feature | Status |
|---------|--------|
| Rook, Bishop, Knight, Queen, King movement | ❌ Not implemented |
| Turn management (white/black alternation) | ❌ Not implemented |
| Check / Checkmate detection | ❌ Not implemented |
| Pawn promotion | ❌ Not implemented |
| En passant | ❌ Not implemented |
| Castling | ❌ Not implemented |
| Win/lose screen | ❌ Not implemented |

---

## 📄 Documentation Files

| File | What it covers |
|------|---------------|
| `README.md` | Setup and project overview |
| `Function.md` | Every function explained line by line |
| `FunctionReference.md` | Simple one-liner per function with execution order |
| `Flowchart.md` | Mermaid flowcharts for pawn click logic |
| `FlowChart2.md` | Visual flowcharts for all major flows |
| `MD_CrossCheck.md` | Error audit — MD files vs actual JS code |
| `ProjectSummary.md` | This file — overall project summary |

---

## 🛠️ How to Run

1. Open the project folder in VS Code
2. Use the **Live Server** extension to serve `index.html`
3. Open `http://localhost:5500` (or similar) in your browser

> ⚠️ Must be served via a local server — **do not open `index.html` directly** as ES Modules require HTTP.

---

## 📌 Key Things to Remember

- All board state lives in `globalData` — never create state outside it
- The board renders once (`initGameRender`) — after that only `globalStateRender` + `moveElement` update the DOM
- `renderHighlight()` in `main.js` is **unused dead code** — use `globalStateRender()` instead
- `movePieceFromXtoY()` in `Global.js` is **replaced** by `moveElement()` — kept only for export
