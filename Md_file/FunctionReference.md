# ♟️ ChessCode — What Every Function Does (Simple Version)

Think of the app like this:
> **When you open the game → board is built → pieces are placed → you can click to play.**

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
| 29 | `whitePawnClick(piece)` | When you click a white pawn → glow it yellow → show valid move squares with green dots |
| 30 | `blackPawnClick(piece)` | When you click a black pawn → if `highlightState` is true (any piece already selected), moves that selected piece to this square using `moveElement`. Otherwise glows this pawn yellow and shows its valid moves. |
| 31 | `globalEvent()` | The **big listener** — watches all clicks on the board and decides what to do |

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

You click a White Pawn
  ├── It glows yellow  ✨
  └── Valid squares get green dots  🟢

You click a green dot
  └── Pawn moves there, highlights clear  ♟️

You click a Black Pawn
  ├── If white pawn was selected → black pawn's square is the destination → move happens
  └── Otherwise → black pawn glows yellow, its valid moves shown
```

---

> 💡 **Quick Rule:** Every function either **builds data**, **draws on screen**, or **responds to a click**. That's it!
