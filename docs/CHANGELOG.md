# 📝 ChessCode — Changelog

All notable changes to this project are documented chronologically.

---

## July 9, 2026

### Documentation Restructure
- Consolidated 15 overlapping documentation files in `Md_file/` into 7 clean files in `docs/`
- Eliminated redundancy across files with overlapping bug reports, status updates, and architecture descriptions

### Mobile Responsive Layout
- Added `style/mobile.css` with 4 breakpoints (tablet, phone, small phone, landscape)
- Board, pieces, highlights, and labels all scale proportionally using `calc()` with viewport units
- Move logger adapts height and font size for mobile

---

## July 4, 2026

### Major Feature Update — Full Gameplay
- **Turn enforcement fixed** — Removed broken `if (inTurn == "X");` semicolons from all 12 switch cases in `globalEvent()`
- **Chess timer system** — New `Helper/timer.js` with `ChessTimer` class (10min per-player countdown, timeout detection, low-time warnings)
- **Turn indicator** — New DOM element in `index.html` with turn dot + text, updated by `changeTurn()`
- **Last-move highlighting** — Tracks `lastMoveFrom`/`lastMoveTo`, applies `.lastMoveHighlight` CSS class
- **Pawn promotion fix** — `id?.includes("8")` → `id?.[1] === "8"` (prevents false rank matches)
- **Black king capture fix** — Added missing `captureHighlight` handler in `blackKingClick()`
- **Pawn storage fix** — `globalPiece.black_Pawn` → `globalPiece.black_Pawns[]` (array of all 8 pawns)
- **Dead code removed** — `Greet()` from `data.js`, `renderHighlight()` from `main.js`
- **HTML restructured** — Board wrapped in `.board-container` with timers; side panel with turn indicator + move logger
- **CSS overhauled** — Timer styling, turn indicator, last-move highlight, timeout overlay, Google Fonts (Inter, JetBrains Mono)

### Documentation (July 4)
- Complete rewrite: README.md, ProjectSummary.md, IMPLEMENTATION_STATUS.md, FunctionReference.md
- Updated: Design_Architecture.md, Design_UIUX.md, MD_CrossCheck.md, ErrorReport.md, All_Bugs_Report.md

---

## June 30, 2026

### Documentation Sync
- Updated all MD files to reflect current codebase state
- Function.md expanded to 847 lines covering all piece handlers

---

## June 22, 2026

### Major Discovery
- **All 12 piece handlers were already implemented** in `Events/Global.js` — previously overlooked in audits
- Updated IMPLEMENTATION_STATUS.md, README.md, ProjectSummary.md, MD_CrossCheck.md

---

## May 22, 2026

### Documentation Pass
- README.md complete rewrite with project structure and getting started guide
- New file: IMPLEMENTATION_STATUS.md with feature matrix
- MD_CrossCheck.md audit of all documentation

---

## May 13–14, 2026

### Pawn Bug Fix
- Fixed white pawn direction bug: subtracted from row instead of adding (`-1`/`-2` → `+1`/`+2`)
- Fixed pawn capture blocked by `checkSquareCaptureId()` — diagonals now go directly to `checkPieceOfOpponentOnElement()`
- Fixed edge pawn crash — added null guard for off-board squares in `checkSquareCaptureId()`
- Fixed render performance O(N²) → O(N) — moved `globalStateRender()` outside loop in `clearHighlight()`

---

## May 10, 2026

### Initial Documentation
- Created Function.md, FunctionReference.md, Flowchart.md, FlowChart2.md, ProjectSummary.md
- First code audit — found 7 issues across documentation and code
