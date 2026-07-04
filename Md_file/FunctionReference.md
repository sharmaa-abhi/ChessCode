# ♟️ ChessCode — What Every Function Does (Simple Version)

Think of the app like this:
> **When you open the game → board is built → pieces are placed → you can click to play with timers!**

**Last Updated:** July 4, 2026 — 08:40 PM IST (Turn management, timers, castling, pawn promotion, move logging all implemented.)

---

## 🟢 STEP 1 — App Starts (`index.js`)

This is the **starting point** of the whole game.

```plaintext
1. initGame()        → Make the board data (8x8 grid in memory)
2. initGameRender()  → Draw that board on screen + set up piece references
3. globalEvent()     → Start listening for mouse clicks (with turn validation)
```

---

## 📦 `Data/data.js` — Building the Board

| # | Function | Simple Meaning |
|---|----------|----------------|
| 1 | `Square(color, piece, id)` | Makes one chess square like `{ color: "white", piece: null, id: "a1" }` |
| 2 | `squareRow(rowId)` | Makes one full row of 8 squares (like row number 2 or row 7) |
| 3 | `initGame()` | Uses `squareRow` 8 times to make the full 8×8 board |

---

## 🧩 `Data/pieces.js` — Creating Pieces

Each function just **makes a piece object** with its image and name.  
They are called when drawing pieces on the board.

| # | Function | Simple Meaning |
|---|----------|----------------|
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

---

## 🔧 `Helper/constant.js` — Shared Tools

| # | Thing | Simple Meaning |
|---|-------|----------------|
| 16 | `ROOT_DIV` | Just grabs the `<div id="root">` from HTML so all files can use it |

---

## 🔧 `Helper/commonHelper.js` — Utility Functions

| # | Function | Simple Meaning |
|---|----------|----------------|
| 17 | `checkPieceOfOpponentOnElement(id, color)` | Checks if an enemy piece is on a square. If yes → shows it in red (capture highlight) |
| 18 | `checkSquareCaptureId(array)` | Walks a ray, stops before any occupied square — returns only empty squares |
| 19 | `checkWhetherPieceExistOrNot(squareId)` | Returns the square if it has a piece, `false` otherwise |
| 20 | `giveBishopHighlightedIds(id)` | Calculate all diagonal ray squares from a position |
| 21 | `giveRookHighlightedIds(id)` | Calculate all straight-line ray squares from a position |
| 22 | `giveKnightHighlightedIds(id)` | Calculate all L-shape landing squares from a position |
| 23 | `giveQueenHighlightedIds(id)` | Combine rook + bishop rays (all 8 directions) |
| 24 | `giveKingHighlightedIds(id)` | Combine rook + bishop but limited to 1 square per direction |
| 25 | `giveKnightCaptureIds(id)` | Knight capture squares (for check detection) |
| 26 | `giveBishopCaptureIds(id)` | Bishop capture squares (for check detection) |
| 27 | `giveRookCaptureIds(id)` | Rook capture squares (for check detection) |
| 28 | `giveQueenCaptureIds(id)` | Queen capture squares (for check detection) |
| 29 | `giveKingCaptureIds(id)` | King capture squares (for check detection) |
| 30 | `checkPieceOfOpponentOnElementNoDom(id, color)` | Like #17 but without DOM manipulation (for check calculations) |

---

## ⏱️ `Helper/timer.js` — Chess Timer

| # | Function/Class | Simple Meaning |
|---|----------------|----------------|
| 31 | `ChessTimer` class | Per-player countdown timer with timeout detection |
| 32 | `chessTimer.switchTurn()` | Switch active clock to the other player (called by `changeTurn()`) |
| 33 | `chessTimer.stop()` | Stop the timer entirely |
| 34 | `chessTimer.reset()` | Reset both clocks to 10:00 |
| 35 | `chessTimer._onTimeout(color)` | Handle flag fall — show game-over overlay |

---

## 📝 `Helper/logging.js` — Move Logger

| # | Function | Simple Meaning |
|---|----------|----------------|
| 36 | `logMoves(move, turn)` | Adds a move entry to the moves panel with chess notation and Unicode symbols |

---

## 🎭 `Helper/modelCreator.js` — Pawn Promotion

| # | Function/Class | Simple Meaning |
|---|----------------|----------------|
| 37 | `ModalCreater` class | Creates modal overlays that blur the board (show/hide methods) |
| 38 | `pawnPromotion(color, callback, id)` | Shows promotion modal with 4 piece choices; calls callback with selected piece |

---

## 🖥️ `Render/main.js` — Drawing Things on Screen

| # | Function | Simple Meaning |
|---|----------|----------------|
| 39 | `initGameRender(data)` | Draws all 64 squares on screen and places all pieces on correct squares. Stores piece references in `globalPiece` |
| 40 | `pieceRender(data)` | Goes through every square and puts the piece image (`<img>`) on screen |
| 41 | `globalStateRender()` | Adds or removes the green dot (highlight circle) on squares |
| 42 | `selfHighlight(piece)` | Adds yellow glow to the piece you just clicked |
| 43 | `clearHighlight()` | Removes ALL green dots and red highlights from the whole board |

---

## 🖱️ `Events/Global.js` — Handling Clicks & Game Logic

> Before clicks start, tracking variables are ready:
> - `highlightState` → "Are move dots currently shown?" (true/false)
> - `selfHighlightState` → "Which piece is currently glowing yellow?"
> - `moveState` → "Which piece did the player pick up to move?"
> - `inTurn` → "Whose turn is it?" ("white" or "black")
> - `lastMoveFrom` / `lastMoveTo` → Track last move for highlighting

| # | Function | Simple Meaning |
|---|----------|----------------|
| 44 | `changeTurn()` | Toggle `inTurn` (white↔black), update turn indicator UI, switch chess timer |
| 45 | `checkForCheck()` | Stub for check detection — calculates attack squares but doesn't validate yet |
| 46 | `checkForPawnPromotion(piece, id)` | Returns true if a pawn reached the final rank (8 for white, 1 for black) |
| 47 | `callBackPawnPromotion(piece, id)` | Callback for promotion modal — replaces pawn with selected piece |
| 48 | `moveElement(piece, id, castle)` | The main move function — logs move, updates data, moves DOM, handles castling, applies last-move highlights, checks promotion, changes turn |
| 49 | `captureInTurn(square)` | Handles clicking opponent piece when it's on a capture-highlighted square |
| 50 | `clearHighlightLocal()` | Removes all green dots + sets highlightState to false |
| 51 | `movePieceFromXtoY(from, to)` | Old way to move a piece — replaced by `moveElement()`, kept for export |
| **Pawn Handlers** | | |
| 52 | `whitePawnClick(square)` | White pawn clicked → glow yellow → show valid moves (forward + diagonal captures) |
| 53 | `blackPawnClick(square)` | Black pawn clicked → glow yellow → show valid moves downward |
| **Bishop Handlers** | | |
| 54 | `whiteBishopClick(square)` | White bishop clicked → calculate diagonal moves → show highlights + captures |
| 55 | `blackBishopClick(square)` | Black bishop clicked → calculate diagonal moves → show highlights + captures |
| **Rook Handlers** | | |
| 56 | `whiteRookClick(square)` | White rook clicked → calculate straight-line moves → show highlights + captures |
| 57 | `blackRookClick(square)` | Black rook clicked → calculate straight-line moves → show highlights + captures |
| **Knight Handlers** | | |
| 58 | `whiteKnightClick(square)` | White knight clicked → calculate L-shaped moves → show highlights + captures |
| 59 | `blackKnightClick(square)` | Black knight clicked → calculate L-shaped moves → show highlights + captures |
| **Queen Handlers** | | |
| 60 | `whiteQueenClick(square)` | White queen clicked → combine rook + bishop moves → show highlights + captures |
| 61 | `blackQueenClick(square)` | Black queen clicked → combine rook + bishop moves → show highlights + captures |
| **King Handlers** | | |
| 62 | `whiteKingClick(square)` | White king clicked → 1-square all directions + castling options → show highlights + captures |
| 63 | `blackKingClick(square)` | Black king clicked → 1-square all directions + castling options → show highlights + captures |
| **Main Listener** | | |
| 64 | `globalEvent()` | The **big listener** — watches all clicks, validates turn, dispatches to correct handler |
| 65 | `clearPreviousSelfHighlight(piece)` | Removes the yellow glow from a previously selected piece |

---

## 🔁 Full Story (What Happens Step by Step)

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

---

> 💡 **Quick Rule:** Every function either **builds data**, **draws on screen**, **responds to a click**, or **manages game state (turn/timer)**. That's it!
