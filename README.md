# ♟️ ChessCode — Browser-Based Chess Game

A vanilla JavaScript chess game with ES Modules. Full 8×8 board, all pieces rendered, and complete pawn movement logic (white & black).

## ✨ Features

- ✅ **8×8 chessboard** with piece placement
- ✅ **Pawn movement** (white up, black down)
- ✅ **Move highlighting** (green dots for valid moves)
- ✅ **Capture detection** (red highlights on enemy diagonals)
- ✅ **Selection glow** (yellow highlight for selected piece)
- ✅ **Efficient lookups** using `keySquareMapper`

## 🚀 Tech Stack

- Vanilla HTML, CSS, JavaScript
- ES Modules (no build tools)
- No external dependencies

## 📂 Structure

```
chessCode/
├── index.html                 → Entry point
├── index.js                   → Bootstrap (3 steps: init, render, events)
├── style/style.css           → Styling
├── Data/
│   ├── data.js              → Board builder
│   └── pieces.js            → Piece factories
├── Helper/
│   ├── constant.js          → ROOT_DIV
│   └── commonHelper.js      → Utilities
├── Render/main.js           → DOM rendering
├── Events/Global.js         → Event handlers & logic
├── Assets/Pieces/           → Piece images
└── Md_file/                 → Documentation
```

## ⚙️ How It Works

```
initGame()  →  initGameRender()  →  globalEvent()
  (data)         (display)          (clicks → all piece handlers)
```

1. **Data:** Build 8×8 board array (`globalData`)
2. **Render:** Draw squares and place pieces on screen
3. **Events:** Listen for clicks and dispatch to piece handlers (all pieces already implemented)

## 🎮 Gameplay

- **Click any piece** → Shows valid moves (green dots) + captures (red)
- **Click valid move** → Piece moves to that square (handlers for all pieces are coded!)
- **Click empty square** → Clears highlights
- **White pieces:** Move up the board, **Black pieces:** Move down
- ⏳ **Current limitation:** Turn validation not implemented — both colors can move any piece

## � Key Data

**`globalData`** — 8×8 array of square objects  
**`keySquareMapper`** — ID → square lookup (O(1) instead of O(64))

## 🚀 Getting Started

**⚠️ Must use a local server (ES Modules require HTTP, not `file://`)**

**Python:**
```bash
python -m http.server 8000
# Open http://localhost:8000
```

**Node.js:**
```bash
npx http-server
# Open http://localhost:8080
```

**VS Code:**
- Install **Live Server** extension
- Right-click `index.html` → "Open with Live Server"

## ✅ Code Quality (June 22, 2026)

- ✅ No syntax errors
- ✅ No runtime crashes  
- ✅ **All piece handlers implemented and wired** (major discovery!)
- ⚠️ Turn validation missing (blocks multi-piece gameplay)
- ⚠️ Move validation needs refinement

📖 **Full Details:** [IMPLEMENTATION_STATUS.md](./Md_file/IMPLEMENTATION_STATUS.md)

---

## � Documentation

| File | Purpose |
|------|---------|
| [ProjectSummary.md](./ProjectSummary.md) | Overview & architecture |
| [Md_file/Function.md](./Md_file/Function.md) | All functions (line-by-line) |
| [Md_file/FunctionReference.md](./Md_file/FunctionReference.md) | Quick function reference |
| [Md_file/Flowchart.md](./Md_file/Flowchart.md) | Visual flowcharts |
| [Md_file/Code_Audit_Report.md](./Md_file/Code_Audit_Report.md) | Code audit (7 issues) |
| [Md_file/All_Bugs_Report.md](./Md_file/All_Bugs_Report.md) | Bug history & fixes |

## 🚧 Not Yet Implemented

| Feature | Status |
|---------|--------|
| Turn validation (white/black alternation) | ⏳ **PRIORITY** — Blocks multi-piece play |
| Move validation (legal moves per piece type) | ⏳ Next priority |
| Check / Checkmate detection | ❌ Future |
| Pawn promotion | ❌ Future |
| En passant | ❌ Future |
| Castling | ❌ Future |
| Move history / undo | ❌ Future |
| AI opponent | ❌ Future |
| Game state persistence | ❌ Future |

**Note:** Handlers for all pieces (rook, bishop, knight, queen, king) are already implemented in `Events/Global.js`. They just need turn validation to work properly.

## 📋 Key Export Points

| File | Exports |
|------|---------|
| `index.js` | `globalData`, `keySquareMapper` |
| `Data/data.js` | `initGame` |
| `Render/main.js` | `initGameRender`, `renderHighlight`, `clearHighlight`, `selfHighlight`, `moveElement`, `globalStateRender` |
| `Events/Global.js` | `globalEvent`, `movePieceFromXtoY` |
| `Helper/constant.js` | `ROOT_DIV` |
| `Helper/commonHelper.js` | `checkPieceOfOpponentOnElement`, `checkSquareCaptureId` |

## 🎨 Styling

- Board: 8×8 CSS grid
- Pieces: PNG images
- **Highlights:** Yellow glow (selected) | Green dot (valid move) | Red (capture)

## 📝 Code Conventions

- Use `globalData`, not `gobalData`
- Use `highlight`, not `highLight`
- Use `square`, not `sqaure`

## 🔧 Extending the Project

1. Add piece logic in `Events/Global.js`
2. Update rendering in `Render/main.js`
3. Add game rules in `Helper/commonHelper.js`
4. Update styles in `style/style.css`

## 📄 License


Unlicensed (open for learning and extension).

## error batch

