# ♟️ ChessCode — What Every Function Does (Simple Version)

Think of the app like this:
> **When you open the game → board is built → pieces are placed → you can click to play.**

**Last Updated:** June 30, 2026 — 08:25 PM IST (All piece handlers — pawns, rooks, bishops, knights, queens, kings — are implemented in `Events/Global.js`.)

---

## 🟢 STEP 1 — App Starts (`index.js`)

This is the **starting point** of the whole game.

```plaintext
1. initGame()        → Make the board data (8x8 grid in memory)
2. initGameRender()  → Draw that board on screen
3. globalEvent()     → Start listening for mouse clicks
```

---

## 📦 `Data/data.js` — Building the Board

| # | Function | Simple Meaning |
|---|----------|----------------|
| 1 | `Greet()` | Just shows "Hello" alert. Only for testing, not used in real game. |
| 2 | `Square(color, piece, id)` | Makes one chess square like `{ color: "white", piece: null, id: "a1" }` |
| 3 | `squareRow(rowId)` | Makes one full row of 8 squares (like row number 2 or row 7) |
| 4 | `initGame()` | Uses `squareRow` 8 times to make the full 8×8 board |

---

## 🧩 `Data/pieces.js` — Creating Pieces

Each function just **makes a piece object** with its image and name.  
They are called when drawing pieces on the board.

| # | Function | Simple Meaning |
|---|----------|----------------|
| 5 | `blackPawn(pos)` | Makes a black pawn at given position |
| 6 | `blackRook(pos)` | Makes a black rook |
| 7 | `blackBishop(pos)` | Makes a black bishop |
| 8 | `blackQueen(pos)` | Makes a black queen |
| 9 | `blackKing(pos)` | Makes a black king |
| 10 | `blackKnight(pos)` | Makes a black knight |
| 11 | `whitePawn(pos)` | Makes a white pawn |
| 12 | `whiteRook(pos)` | Makes a white rook |
| 13 | `whiteKnight(pos)` | Makes a white knight |
| 14 | `whiteBishop(pos)` | Makes a white bishop |
| 15 | `whiteKing(pos)` | Makes a white king |
| 16 | `whiteQueen(pos)` | Makes a white queen |

---

## 🔧 `Helper/constant.js` — Shared Tools

| # | Thing | Simple Meaning |
|---|-------|----------------|
| 17 | `ROOT_DIV` | Just grabs the `<div id="root">` from HTML so all files can use it |

---

## 🔧 `Helper/commonHelper.js` — Utility Functions

| # | Function | Simple Meaning |
|---|----------|----------------|
| 18 | `checkPieceOfOpponentOnElement(id, color)` | Checks if an enemy piece is on a square. If yes → shows it in red (capture highlight) |

---

## 🖥️ `Render/main.js` — Drawing Things on Screen

| # | Function | Simple Meaning |
|---|----------|----------------|
| 19 | `initGameRender(data)` | Draws all 64 squares on screen and places all pieces on correct squares |
| 20 | `pieceRender(data)` | Goes through every square and puts the piece image (`<img>`) on screen |
| 21 | `globalStateRender()` | Adds or removes the green dot (highlight circle) on squares |
| 22 | `moveElement(piece, id)` | Physically moves a piece from one square to another on screen |
| 23 | `clearPreviousSelfHighlight(piece)` | Removes the yellow glow from a previously selected piece |
| 24 | `selfHighlight(piece)` | Adds yellow glow to the piece you just clicked |
| 25 | `renderHighlight(squareId)` | ⚠️ Defined but **never called** in active code. Replaced by `globalStateRender()`. |
| 26 | `clearHighlight()` | Removes ALL green dots and red highlights from the whole board |

---

## 🖱️ `Events/Global.js` — Handling Clicks

> Before clicks start, 3 tracking variables are ready:
> - `highlightState` → "Are move dots currently shown?" (true/false)
> - `selfHighlightState` → "Which piece is currently glowing yellow?"
> - `moveState` → "Which piece did the player pick up to move?"

| # | Function | Simple Meaning |
|---|----------|----------------|
| 27 | `clearHighlightLocal()` | Removes all green dots + sets highlightState to false |
| 28 | `movePieceFromXtoY(from, to)` | Old way to move a piece in data. Replaced by `moveElement` now. |
| **Pawn Handlers** | | |
| 29 | `whitePawnClick(piece)` | White pawn clicked → glow yellow → show valid moves with green dots |
| 30 | `blackPawnClick(piece)` | Black pawn clicked → glow yellow → show valid moves downward |
| **Bishop Handlers** | | |
| 31 | `whiteBishopClick(piece)` | White bishop clicked → calculate diagonal moves → show highlights |
| 32 | `blackBishopClick(piece)` | Black bishop clicked → calculate diagonal moves → show highlights |
| **Rook Handlers** | | |
| 33 | `whiteRookClick(piece)` | White rook clicked → calculate straight-line moves → show highlights |
| 34 | `blackRookClick(piece)` | Black rook clicked → calculate straight-line moves → show highlights |
| **Knight Handlers** | | |
| 35 | `whiteKnightClick(piece)` | White knight clicked → calculate L-shaped moves → show highlights |
| 36 | `blackKnightClick(piece)` | Black knight clicked → calculate L-shaped moves → show highlights |
| **Queen Handlers** | | |
| 37 | `whiteQueenClick(piece)` | White queen clicked → combine rook + bishop moves → show highlights |
| 38 | `blackQueenClick(piece)` | Black queen clicked → combine rook + bishop moves → show highlights |
| **King Handlers** | | |
| 39 | `whiteKingClick(piece)` | White king clicked → 1-square in all directions → show highlights |
| 40 | `blackKingClick(piece)` | Black king clicked → 1-square in all directions → show highlights |
| **Main Listener** | | |
| 41 | `globalEvent()` | The **big listener** — watches all clicks and dispatches to correct handler via switch statement |

---

## 🔁 Full Story (What Happens Step by Step)

```
You open the game
  │
  ├── Board data is made (8x8 grid of square objects)
  │
  ├── Board is drawn on screen (64 square divs + piece images)
  │
  └── Click listener starts watching...

You click ANY piece (pawn, rook, bishop, knight, queen, or king)
  ├── It glows yellow  ✨
  └── Valid squares get green dots  🟢

You click a green dot or red capture square
  └── Piece moves there, highlights clear  ♟️

⏳ Current limitation: Turn validation not implemented — both colors can move any piece
```

---

> 💡 **Quick Rule:** Every function either **builds data**, **draws on screen**, or **responds to a click**. That's it!
