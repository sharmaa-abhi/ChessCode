# ♟️ ChessCode — Implementation Reference

**Last Updated:** July 9, 2026

This document covers all functions (with quick reference), piece movement rules, and implementation details.

---

# 📋 Quick Function Reference

> One-liner summary for every function in the project.

## `Data/data.js` — Building the Board

| # | Function | What It Does |
|---|----------|--------------|
| 1 | `Square(color, piece, id)` | Makes one chess square object |
| 2 | `squareRow(rowId)` | Makes one row of 8 squares with alternating colors |
| 3 | `initGame()` | Uses `squareRow` 8 times to make the full 8×8 board |

## `Data/pieces.js` — Creating Pieces

| # | Function | What It Does |
|---|----------|--------------|
| 4 | `blackPawn(pos)` | Makes a black pawn at given position |
| 5 | `blackRook(pos)` | Makes a black rook (includes `move: false` for castling) |
| 6 | `blackBishop(pos)` | Makes a black bishop |
| 7 | `blackQueen(pos)` | Makes a black queen |
| 8 | `blackKing(pos)` | Makes a black king (includes `move: false` for castling) |
| 9 | `blackKnight(pos)` | Makes a black knight |
| 10 | `whitePawn(pos)` | Makes a white pawn |
| 11 | `whiteRook(pos)` | Makes a white rook (includes `move: false` for castling) |
| 12 | `whiteKnight(pos)` | Makes a white knight |
| 13 | `whiteBishop(pos)` | Makes a white bishop |
| 14 | `whiteKing(pos)` | Makes a white king (includes `move: false` for castling) |
| 15 | `whiteQueen(pos)` | Makes a white queen |

## `Helper/constant.js`

| # | Thing | What It Does |
|---|-------|--------------|
| 16 | `ROOT_DIV` | Grabs `<div id="root">` from HTML so all files can use it |

## `Helper/commonHelper.js` — Utilities

| # | Function | What It Does |
|---|----------|--------------|
| 17 | `checkPieceOfOpponentOnElement(id, color)` | Checks if enemy piece is on a square; marks it red if so |
| 18 | `checkSquareCaptureId(array)` | Walks a ray, stops before occupied square — returns empty squares only |
| 19 | `checkWhetherPieceExistOrNot(squareId)` | Returns the square if it has a piece, `false` otherwise |
| 20 | `giveBishopHighlightedIds(id)` | Calculate all diagonal ray squares from a position |
| 21 | `giveRookHighlightedIds(id)` | Calculate all straight-line ray squares |
| 22 | `giveKnightHighlightedIds(id)` | Calculate all L-shape landing squares |
| 23 | `giveQueenHighlightedIds(id)` | Combine rook + bishop rays (all 8 directions) |
| 24 | `giveKingHighlightedIds(id)` | Combine rook + bishop but limited to 1 square per direction |
| 25 | `giveKnightCaptureIds(id)` | Knight capture squares (for check detection) |
| 26 | `giveBishopCaptureIds(id)` | Bishop capture squares (for check detection) |
| 27 | `giveRookCaptureIds(id)` | Rook capture squares (for check detection) |
| 28 | `giveQueenCaptureIds(id)` | Queen capture squares (for check detection) |
| 29 | `giveKingCaptureIds(id)` | King capture squares (for check detection) |
| 30 | `checkPieceOfOpponentOnElementNoDom(id, color)` | Like #17 but without DOM manipulation (for check calculations) |

## `Helper/timer.js` — Chess Timer

| # | Function/Class | What It Does |
|---|----------------|--------------|
| 31 | `ChessTimer` class | Per-player countdown timer with timeout detection |
| 32 | `chessTimer.switchTurn()` | Switch active clock to the other player |
| 33 | `chessTimer.stop()` | Stop the timer entirely |
| 34 | `chessTimer.reset()` | Reset both clocks to 10:00 |
| 35 | `chessTimer._onTimeout(color)` | Handle flag fall — show game-over overlay |

## `Helper/logging.js` — Move Logger

| # | Function | What It Does |
|---|----------|--------------|
| 36 | `logMoves(move, turn)` | Adds move entry to moves panel with chess notation and Unicode symbols |

## `Helper/modelCreator.js` — Pawn Promotion

| # | Function/Class | What It Does |
|---|----------------|--------------|
| 37 | `ModalCreater` class | Creates modal overlays that blur the board |
| 38 | `pawnPromotion(color, callback, id)` | Shows promotion modal with 4 piece choices |

## `Render/main.js` — Drawing on Screen

| # | Function | What It Does |
|---|----------|--------------|
| 39 | `initGameRender(data)` | Draws all 64 squares and places pieces. Stores piece refs in `globalPiece` |
| 40 | `pieceRender(data)` | Puts piece `<img>` elements on squares |
| 41 | `globalStateRender()` | Adds or removes highlight dots on squares |
| 42 | `selfHighlight(piece)` | Adds yellow glow to the selected piece |
| 43 | `clearHighlight()` | Removes ALL green dots and red highlights |

## `Events/Global.js` — Handling Clicks & Game Logic

| # | Function | What It Does |
|---|----------|--------------|
| 44 | `changeTurn()` | Toggle `inTurn` (white↔black), update UI, switch timer |
| 45 | `checkForCheck()` | Stub — calculates attack squares but doesn't validate yet |
| 46 | `checkForPawnPromotion(piece, id)` | Returns true if pawn reached final rank |
| 47 | `callBackPawnPromotion(piece, id)` | Callback for modal — replaces pawn with selected piece |
| 48 | `moveElement(piece, id, castle)` | Main move function — logs, updates data, moves DOM, handles castling, checks promotion, changes turn |
| 49 | `captureInTurn(square)` | Handles clicking opponent piece on capture-highlighted square |
| 50 | `clearHighlightLocal()` | Removes all green dots + sets highlightState to false |
| 51 | `movePieceFromXtoY(from, to)` | Old move function — replaced by `moveElement()`, kept for export |
| 52 | `whitePawnClick(square)` | White pawn handler — forward moves + diagonal captures |
| 53 | `blackPawnClick(square)` | Black pawn handler — forward moves downward |
| 54 | `whiteBishopClick(square)` | Diagonal moves + captures |
| 55 | `blackBishopClick(square)` | Diagonal moves + captures |
| 56 | `whiteRookClick(square)` | Straight-line moves + captures |
| 57 | `blackRookClick(square)` | Straight-line moves + captures |
| 58 | `whiteKnightClick(square)` | L-shaped moves + captures |
| 59 | `blackKnightClick(square)` | L-shaped moves + captures |
| 60 | `whiteQueenClick(square)` | All 8 directions + captures |
| 61 | `blackQueenClick(square)` | All 8 directions + captures |
| 62 | `whiteKingClick(square)` | 1-square all directions + castling |
| 63 | `blackKingClick(square)` | 1-square all directions + castling |
| 64 | `globalEvent()` | Main click listener — validates turn, dispatches to handler |
| 65 | `clearPreviousSelfHighlight(piece)` | Removes yellow glow from previously selected piece |

---

# ♟️ Piece Movement Rules

---

## 🔧 Core Movement Utilities

All movement logic relies on functions in `Helper/commonHelper.js`:

| Function | Purpose |
|---|---|
| `checkSquareCaptureId(array)` | Walks a ray array, stops before any occupied square — returns only empty squares |
| `checkWhetherPieceExistOrNot(id)` | Returns the square if it has a piece, `false` otherwise |
| `checkPieceOfOpponentOnElement(id, color)` | If the square has an enemy piece, marks it red (`captureHighlight`) and clears its green dot |

### Ray Blocking Pattern (for sliding pieces)

```
Ray:  [a3, a4, a5, a6, a7, a8]  ← generated by helper
            ↑
       a4 has a piece

checkSquareCaptureId → [a3]       ← green dots up to blocker
temp loop             → checks a4 → if enemy: mark RED
                                    if friendly: skip (already blocked)
```

---

## ♙ Pawn

### White Pawn

**Direction:** Upward (row + 1)  
**First move:** 2 squares if still on row 2  
**Captures:** Diagonals only (±1 column, +1 row)  
**Promotion:** Reaching row 8 triggers `pawnPromotion()` modal

```
Starting (row 2):          Not starting:
  🟢 🔴 🔴                  🔴 🔴
  🟢                           🟢
  ♙                            ♙
```

**Move squares:**
```js
// From e2
["e3", "e4"]   // row 2 → 2 forward squares

// From e4
["e5"]         // other rows → 1 forward square
```

**Capture squares:**
```js
col1 = charCode(col - 1) + (row + 1)  // left diagonal
col2 = charCode(col + 1) + (row + 1)  // right diagonal
// Example from e4: ["d5", "f5"]
```

> **Rule:** `checkSquareCaptureId` is used for forward moves (stops if blocked). Captures use `checkPieceOfOpponentOnElement` directly — diagonal squares are independent.

### Black Pawn

**Direction:** Downward (row - 1)  
**First move:** 2 squares if still on row 7  
**Captures:** Diagonals (±1 column, -1 row)  
**Promotion:** Reaching row 1 triggers modal

### Pawn Promotion

When a pawn reaches the final rank (row 8 for white, row 1 for black), `checkForPawnPromotion()` returns `true`. After the move is executed, `pawnPromotion(color, callback, id)` shows a modal overlay with 4 choices: Queen, Rook, Bishop, Knight.

```
Promotion check:  id?.[1] === "8"  (white)
                  id?.[1] === "1"  (black)
```

---

## ♜ Rook

**Directions:** 4 straight rays (top, bottom, left, right)  
**Range:** Unlimited until blocked  
**Captures:** First enemy piece on each ray  
**Castling:** Tracked via `piece.move` flag — set to `true` after first move

```
     🟢
     🟢
🟢🟢 ♜ 🟢🔴
     🟢
```

**Helper:** `giveRookHighlightedIds(pos)` → `{ top, bottom, left, right }`

---

## ♝ Bishop

**Directions:** 4 diagonal rays (topLeft, topRight, bottomLeft, bottomRight)  
**Range:** Unlimited until blocked  
**Captures:** First enemy piece on each diagonal

```
🔴     🟢
  ♝
🟢     🔴
```

**Helper:** `giveBishopHighlightedIds(pos)` → `{ topLeft, topRight, bottomLeft, bottomRight }`

---

## ♞ Knight

**Pattern:** L-shape — 2 squares in one direction, 1 perpendicular  
**Range:** Fixed (jumps, not rays — cannot be blocked)  
**Captures:** Any enemy piece on a valid landing square

**Helper:** `giveKnightHighlightedIds(pos)` → flat array of all valid landing square IDs

**Algorithm (unique — no ray blocking):**
```js
highlightedSquareIds.forEach((id) => {
  const square = keySquareMapper[id];
  if (!square) return;

  if (square.piece === null || square.piece === undefined) {
    square.highlight = true;           // empty → green dot
  } else {
    checkPieceOfOpponentOnElement(id, color);  // occupied → check for capture
  }
});
```

> Knights skip over pieces — no `checkSquareCaptureId` needed.

---

## ♛ Queen

**Directions:** All 8 — combines Rook + Bishop  
**Range:** Unlimited until blocked  
**Captures:** First enemy piece on each ray

**Helper:** `giveQueenHighlightedIds(pos)` → `{ top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight }`

```js
function giveQueenHighlightedIds(id) {
  return {
    ...giveRookHighlightedIds(id),
    ...giveBishopHighlightedIds(id),
  };
}
```

---

## ♚ King

**Directions:** All 8  
**Range:** 1 square per direction only  
**Captures:** Any enemy piece 1 square away  
**Castling:** Available when `king.move === false` and `rook.move === false` and path is clear

**Helper:** `giveKingHighlightedIds(pos)` — reuses Rook + Bishop helpers but slices each ray to `[0]` (first square only)

### Castling Logic

```
White King-side:  King e1 → g1, Rook h1 → f1  (f1 and g1 must be empty)
White Queen-side: King e1 → c1, Rook a1 → d1  (b1, c1, d1 must be empty)

Black King-side:  King e8 → g8, Rook h8 → f8  (f8 and g8 must be empty)
Black Queen-side: King e8 → c8, Rook a8 → d8  (b8, c8, d8 must be empty)
```

Conditions:
1. `king.move === false` (king hasn't moved)
2. `rook.move === false` (rook hasn't moved)
3. All squares between king and rook are empty
4. When king moves to castling square, `moveElement()` automatically moves the rook

---

## 📏 Move Range Summary Table

| Piece | Max Range | Directions | Can Jump? | Captures | Special |
|---|---|---|---|---|---|
| Pawn | 1 (2 from start) | Forward only | No | Diagonal only | Promotion on final rank |
| Rook | 7 | Straight (4) | No | First enemy on ray | Castling (with king) |
| Bishop | 7 | Diagonal (4) | No | First enemy on ray | — |
| Knight | Fixed L-shape | 8 landing squares | **Yes** | Any enemy on landing | — |
| Queen | 7 | All 8 directions | No | First enemy on ray | — |
| King | 1 | All 8 directions | No | Any adjacent enemy | Castling (with rook) |

---

# 🔢 Piece Handler Pattern

All piece click handlers follow the same pattern:

1. **Check if same piece clicked** → Deselect
2. **Check if capture square** → Move piece to capture
3. **Otherwise** → Select piece, calculate valid moves, highlight them
4. **Use helper functions** to calculate moves:
   - `giveRookHighlightedIds()` → Straight-line moves
   - `giveBishopHighlightedIds()` → Diagonal moves
   - `giveKnightHighlightedIds()` → L-shaped moves
   - `giveQueenHighlightedIds()` → Rook + Bishop combined
   - `giveKingHighlightedIds()` → 1 square in all directions

**Pattern Example (Bishop):**
```
whiteBishopClick()
  ↓
  giveBishopHighlightedIds() → returns {topLeft, topRight, bottomLeft, bottomRight}
  ↓
  checkSquareCaptureId() for each direction → stops at first piece
  ↓
  checkPieceOfOpponentOnElement() → marks capture squares red
  ↓
  globalStateRender() → displays on board
```

---

## 🔁 Full Story

```
You open the game
  │
  ├── Board data is made (8×8 grid of square objects)
  │
  ├── Board is drawn on screen (64 square divs + piece images)
  │
  ├── Timers initialized (10:00 for both players)
  │
  └── Click listener starts watching...

It's White's turn (timer not started yet)
  │
  You click a WHITE piece
  ├── It glows yellow  ✨
  └── Valid squares get green dots 🟢 / red captures 🔴

You click a green dot or red capture square
  ├── Piece moves there ♟️
  ├── Move is logged 📝
  ├── Previous squares get last-move highlight 🟨
  ├── Turn switches to Black ⬛
  ├── Black's timer starts counting down ⏱️
  └── Highlights clear

Black makes their move...
  ├── Timer switches back to White ⏱️
  └── And so on...

Timer reaches 0:00? ⏰
  └── Game over! Winner declared on time.
```

> 💡 **Quick Rule:** Every function either **builds data**, **draws on screen**, **responds to a click**, or **manages game state (turn/timer)**. That's it!
