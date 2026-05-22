# ♟️ ChessCode — All Functions Explained Line by Line

Every function in every `.js` file, with each line of code explained in plain English, in execution order.

---

## 📁 `Data/data.js`

---

### 1. `Greet()`
> ⚠️ Testing only — currently commented out in `index.js`

```js
function Greet() {
  alert("Hello");      // Line 1: Shows a browser popup saying "Hello"
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1 | `alert("Hello")` | Pops up a browser alert box with the text "Hello" |

---

### 2. `Square(color, piece, id)`
> Makes one chess square object. Called 64 times total to build the board.

```js
function Square(color, piece, id) {
  return { color, piece, id };    // Line 1: Packs the 3 inputs into one object and returns it
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1 | `return { color, piece, id }` | Creates and returns an object like `{ color: "white", piece: "null", id: "a2" }` |

**Example output:** `Square("white", "null", "a2")` → `{ color: "white", piece: "null", id: "a2" }`

---

### 3. `squareRow(rowId)`
> Builds one full row of 8 squares. Called 8 times (once per row 1–8).

```js
function squareRow(rowId) {
  const squareRow = [];                          // Line 1: Start with empty row array
  const abcd = ["a","b","c","d","e","f","g","h"]; // Line 2: All 8 column letters

  if (rowId % 2 == 0) {                         // Line 3: If row number is EVEN (2,4,6,8)
    abcd.forEach((element, index) => {
      if (index % 2 == 0) {                     // Line 4: Even index (0,2,4,6) → white square
        squareRow.push(Square("white", "null", element + rowId));
      } else {                                  // Line 5: Odd index (1,3,5,7) → black square
        squareRow.push(Square("black", "null", element + rowId));
      }
    });
  } else {                                      // Line 6: If row number is ODD (1,3,5,7)
    abcd.forEach((element, index) => {
      if (index % 2 == 0) {                    // Line 7: Even index → black square (flipped!)
        squareRow.push(Square("black", "null", element + rowId));
      } else {                                 // Line 8: Odd index → white square (flipped!)
        squareRow.push(Square("white", "null", element + rowId));
      }
    });
  }

  return squareRow;                            // Line 9: Return the completed row of 8 squares
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1 | `const squareRow = []` | Empty array — will hold 8 square objects |
| 2 | `const abcd = [...]` | The 8 column letters a through h |
| 3 | `if (rowId % 2 == 0)` | Check if row number is even — affects which color goes first |
| 4 | `if (index % 2 == 0)` | Even column index = white on even rows |
| 5 | `squareRow.push(Square(...))` | Creates a square and adds it to the row |
| 6 | `} else {` | For odd row numbers — colors are flipped |
| 9 | `return squareRow` | Returns the complete array of 8 square objects |

---

### 4. `initGame()`
> The starting function. Builds the entire 8×8 board. Called once from `index.js`.

```js
function initGame() {
  return [            // Line 1: Return an array of 8 rows
    squareRow(8),     // Line 2: Row 8 (top, black pieces)
    squareRow(7),     // Line 3: Row 7 (black pawns)
    squareRow(6),     // Line 4: Empty row
    squareRow(5),     // Line 5: Empty row
    squareRow(4),     // Line 6: Empty row
    squareRow(3),     // Line 7: Empty row
    squareRow(2),     // Line 8: Row 2 (white pawns)
    squareRow(1),     // Line 9: Row 1 (bottom, white pieces)
  ];
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1 | `return [...]` | Returns an 8-element array (one element = one row) |
| 2–9 | `squareRow(8)` … `squareRow(1)` | Calls `squareRow` for each row from top (8) to bottom (1) |

**Output:** A 2D array — `globalData[0]` is row 8, `globalData[7]` is row 1.

---

## 📁 `Data/pieces.js`

> All piece functions follow the exact same pattern. Each takes a position and returns a piece object.

---

### 5–10. Black Piece Factories

```js
function blackPawn(current_Position) {
  return {
    current_Position,                          // Line 1: Where the piece currently is (e.g. "a7")
    img: "./Assets/Pieces/black/pawn.png",     // Line 2: Path to the piece image
    piece_name: "BLACK_PAWN",                  // Line 3: Name used to identify piece type on click
  };
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1 | `current_Position` | Stores the square ID like `"a7"` — updated every time piece moves |
| 2 | `img: "..."` | The image file path shown on the board |
| 3 | `piece_name: "BLACK_PAWN"` | The unique name used by click handlers to identify which piece was clicked |

> `blackRook`, `blackBishop`, `blackQueen`, `blackKing`, `blackKnight` — all identical structure, just different `img` and `piece_name`.

---

### 11–16. White Piece Factories

> Exact same structure as black pieces. Only `img` path and `piece_name` differ.

```js
function whitePawn(current_Position) {
  return {
    current_Position,                          // Line 1: Square ID like "a2"
    img: "./Assets/Pieces/white/pawn.png",     // Line 2: White pawn image path
    piece_name: "WHITE_PAWN",                  // Line 3: Used to detect white pawn clicks
  };
}
```

> `whiteRook`, `whiteKnight`, `whiteBishop`, `whiteKing`, `whiteQueen` — same pattern.

---

## 📁 `Helper/constant.js`

---

### 17. `ROOT_DIV` *(constant, not a function)*

```js
const ROOT_DIV = document.getElementById("root");  // Line 1: Find the <div id="root"> in HTML
                                                    //         and store it forever
export { ROOT_DIV };                               // Line 2: Share it with all other files
```

| Line | Code | What it does |
|------|------|-------------|
| 1 | `document.getElementById("root")` | Grabs the main container div from HTML once at startup |
| 2 | `export { ROOT_DIV }` | Makes it available to `Render/main.js` and `Events/Global.js` |

---

## 📁 `Helper/commonHelper.js`

---

### 18. `checkPieceOfOpponentOnElement(id, color)`
> Checks a specific square for an enemy piece. If found, highlights it red.

```js
function checkPieceOfOpponentOnElement(id, color) {
  const flatData = globalData.flat();                    // Line 1: Flatten 8x8 array → 64-item array
  const opponentColor = color === "white" ? "BLACK" : "WHITE"; // Line 2: Flip color to find enemy

  for (let i = 0; i < flatData.length; i++) {           // Line 3: Loop through all 64 squares
    const element = flatData[i];                         // Line 4: Current square being checked
    if (element.id === id) {                             // Line 5: Found the target square by ID
      if (
        element.piece &&                                 // Line 6: Square has a piece
        element.piece.piece_name &&                      // Line 7: Piece has a name
        element.piece.piece_name.includes(opponentColor) // Line 8: Piece is the enemy color
      ) {
        const el = document.getElementById(id);          // Line 9: Get the DOM element
        el.classList.add("captureColor");                // Line 10: Add red highlight CSS class
        element.captureHighlight = true;                 // Line 11: Mark it in data for later cleanup
      }
      break;                                             // Line 12: Stop searching once square found
    }
  }
  return false;                                          // Line 13: Always returns false (unused)
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1 | `globalData.flat()` | Converts `[[row1], [row2]...]` into one flat list of 64 squares |
| 2 | `opponentColor = color === "white" ? "BLACK" : "WHITE"` | If I'm white → look for BLACK, and vice versa |
| 3 | `for (let i = 0; ...)` | Loop over all 64 squares |
| 5 | `if (element.id === id)` | Stop when we find the square we care about |
| 6–8 | `element.piece.piece_name.includes(opponentColor)` | Check if the piece on that square is an enemy |
| 9–10 | `el.classList.add("captureColor")` | Turn that square red (capture possible) |
| 11 | `element.captureHighlight = true` | Flag in data so `clearHighlight()` knows to clean it up |
| 12 | `break` | No need to keep searching once we found the square |

---

## 📁 `Render/main.js`

---

### 19. `initGameRender(data)`
> Draws the full board once at startup. Called from `index.js`.

```js
function initGameRender(data) {
  data.forEach((element) => {                           // Line 1: Loop through 8 rows
    const rowElement = document.createElement("div");  // Line 2: Create a row <div>

    element.forEach((square) => {                      // Line 3: Loop through 8 squares in row
      const squareDiv = document.createElement("div"); // Line 4: Create a square <div>
      squareDiv.id = square.id;                        // Line 5: Set its id e.g. "a2"
      squareDiv.classList.add(square.color, "square"); // Line 6: Add color class ("white"/"black") + "square"

      // Assign pieces to correct squares:
      if (square.id[1] == 7) square.piece = pieces.blackPawn(square.id);   // Line 7
      if (square.id == "b8" || square.id == "g8") square.piece = pieces.blackKnight(square.id); // Line 8
      if (square.id == "h8" || square.id == "a8") square.piece = pieces.blackRook(square.id);   // Line 9
      if (square.id == "c8" || square.id == "f8") square.piece = pieces.blackBishop(square.id); // Line 10
      if (square.id == "d8") square.piece = pieces.blackQueen(square.id);  // Line 11
      if (square.id == "e8") square.piece = pieces.blackKing(square.id);   // Line 12
      if (square.id[1] == 2) square.piece = pieces.whitePawn(square.id);   // Line 13
      if (square.id == "b1" || square.id == "g1") square.piece = pieces.whiteKnight(square.id); // Line 14
      if (square.id == "h1" || square.id == "a1") square.piece = pieces.whiteRook(square.id);   // Line 15
      if (square.id == "c1" || square.id == "f1") square.piece = pieces.whiteBishop(square.id); // Line 16
      if (square.id == "d1") square.piece = pieces.whiteQueen(square.id);  // Line 17
      if (square.id == "e1") square.piece = pieces.whiteKing(square.id);   // Line 18

      rowElement.appendChild(squareDiv);               // Line 19: Add this square into the row
    });

    ROOT_DIV.appendChild(rowElement);                  // Line 20: Add the completed row to the page
    rowElement.classList.add("squareRow");              // Line 21: Add CSS class for styling
  });

  pieceRender(data);                                   // Line 22: Now place piece images on squares
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1 | `data.forEach(element =>` | Loop through all 8 rows |
| 2 | `document.createElement("div")` | Create a blank HTML div for the row |
| 4 | `document.createElement("div")` | Create a blank div for each square |
| 5 | `squareDiv.id = square.id` | Give it an id like `"a2"` so JS can find it later |
| 6 | `classList.add(square.color, "square")` | Colors the square white or black via CSS |
| 7–12 | `if (square.id[1] == 7)` | Row 7 = black pawns; specific squares = back rank pieces |
| 13–18 | `if (square.id[1] == 2)` | Row 2 = white pawns; specific squares = white back rank |
| 19 | `rowElement.appendChild(squareDiv)` | Attach square div into row div |
| 20 | `ROOT_DIV.appendChild(rowElement)` | Attach row div into the page |
| 22 | `pieceRender(data)` | Draw piece images after all squares are built |

---

### 20. `pieceRender(data)`
> Places piece `<img>` elements on squares. Called at the end of `initGameRender`.

```js
function pieceRender(data) {
  data.forEach((row) => {                               // Line 1: Loop all 8 rows
    row.forEach((square) => {                           // Line 2: Loop all 8 squares in row
      if (square.piece != "null") {                    // Line 3: Skip empty squares
        const squareElement = document.getElementById(square.id); // Line 4: Find square in DOM
        const piece = document.createElement("img");   // Line 5: Create an <img> element
        piece.src = square.piece.img;                  // Line 6: Set image source path
        piece.classList.add("piece");                  // Line 7: Add "piece" CSS class
        squareElement.appendChild(piece);              // Line 8: Put image inside the square div
      }
    });
  });
}
```

| Line | Code | What it does |
|------|------|-------------|
| 3 | `if (square.piece != "null")` | Only draw squares that actually have a piece |
| 4 | `getElementById(square.id)` | Find the matching HTML div for this square |
| 5 | `createElement("img")` | Make a new image element |
| 6 | `piece.src = square.piece.img` | Point it to the piece's image file (e.g. `"./Assets/Pieces/white/pawn.png"`) |
| 7 | `classList.add("piece")` | Apply CSS sizing/positioning for piece images |
| 8 | `squareElement.appendChild(piece)` | Place the image inside the square's HTML div |

---

### 21. `globalStateRender()`
> Sync highlight dots with the data. Called after any highlight change.

```js
function globalStateRender() {
  globalData.forEach((row) => {                        // Line 1: Loop all 8 rows
    row.forEach((element) => {                         // Line 2: Loop all 8 squares
      if (element.highlight) {                         // Line 3: If data says "add green dot"
        const highlightSpan = document.createElement("span"); // Line 4: Create a <span>
        highlightSpan.classList.add("highlight");      // Line 5: Give it the green dot CSS class
        document.getElementById(element.id).appendChild(highlightSpan); // Line 6: Add to square
      } else if (element.highlight === null) {         // Line 7: If data says "remove green dot"
        const el = document.getElementById(element.id); // Line 8: Find the square
        const highlights = Array.from(el.getElementsByTagName("span")); // Line 9: Find all spans
        highlights.forEach((element) => {
          el.removeChild(element);                     // Line 10: Remove each span (green dot)
        });
      }
    });
  });
}
```

| Line | Code | What it does |
|------|------|-------------|
| 3 | `if (element.highlight)` | Checks if `highlight === true` in data |
| 4–6 | `createElement("span")` + append | Creates the green dot and places it on screen |
| 7 | `else if (element.highlight === null)` | `null` means "clean up this dot" |
| 9–10 | `getElementsByTagName("span")` + `removeChild` | Finds and removes all green dot spans |

---

### 22. `moveElement(piece, id)`
> Moves a piece from one square to another. Updates both data and screen.

```js
function moveElement(piece, id) {
  const flatData = globalData.flat();                  // Line 1: Flatten board to 64-item array

  flatData.forEach((el) => {                           // Line 2: Loop all squares
    if (el.id === piece.current_Position) {            // Line 3: Found the FROM square
      delete el.piece;                                 // Line 4: Remove piece from it
    }
    if (el.id === id) {                                // Line 5: Found the TO square
      el.piece = piece;                                // Line 6: Place piece there in data
    }
  });

  clearHighlight();                                    // Line 7: Remove all green/red dots
  const previousPiece = document.getElementById(piece.current_Position); // Line 8: Get FROM div
  previousPiece.classList.remove("highlightYellow");   // Line 9: Remove yellow glow from old square
  const currentPiece = document.getElementById(id);   // Line 10: Get TO div
  currentPiece.innerHTML = previousPiece.innerHTML;   // Line 11: Copy piece image HTML to new square
  previousPiece.innerHTML = "";                        // Line 12: Clear old square's image
  piece.current_Position = id;                        // Line 13: Update piece's position in data
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1 | `globalData.flat()` | Makes 64-item list to easily search all squares |
| 4 | `delete el.piece` | Removes piece from the old square in data |
| 6 | `el.piece = piece` | Places the piece on the new square in data |
| 7 | `clearHighlight()` | Wipes all visual dots from the board |
| 9 | `classList.remove("highlightYellow")` | Removes the yellow glow from old square |
| 11 | `currentPiece.innerHTML = previousPiece.innerHTML` | Copies piece image from old square to new |
| 12 | `previousPiece.innerHTML = ""` | Clears the old square so no ghost image remains |
| 13 | `piece.current_Position = id` | Updates piece's own position tracker |

---

### 23. `clearPreviousSelfHighlight(piece)`
> Removes yellow glow from a piece when another is selected.

```js
function clearPreviousSelfHighlight(piece) {
  if (piece) {                                         // Line 1: Only run if a piece was selected
    document
      .getElementById(piece.current_Position)          // Line 2: Find the square in DOM
      .classList.remove("highlightYellow");            // Line 3: Remove yellow CSS class
  }
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1 | `if (piece)` | Safety check — if no piece was selected before, skip |
| 2 | `getElementById(piece.current_Position)` | Finds the square the piece is currently on |
| 3 | `.classList.remove("highlightYellow")` | Turns off the yellow border/glow |

---

### 24. `selfHighlight(piece)`
> Adds yellow glow to the piece just clicked — shows it's selected.

```js
function selfHighlight(piece) {
  document
    .getElementById(piece.current_Position)            // Line 1: Find the piece's square in DOM
    .classList.add("highlightYellow");                 // Line 2: Add yellow glow CSS class
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1 | `getElementById(piece.current_Position)` | Finds which square this piece sits on |
| 2 | `.classList.add("highlightYellow")` | Makes the square glow yellow — "this piece is selected" |

---

### 25. `renderHighlight(squareId)` ⚠️ UNUSED

```js
function renderHighlight(squareId) {
  const highlightSpan = document.createElement("span"); // Line 1: Create a <span>
  highlightSpan.classList.add("highlight");              // Line 2: Add green dot CSS class
  document.getElementById(squareId).appendChild(highlightSpan); // Line 3: Add to square
}
```

> ⚠️ **This function is never called in active code.** `globalStateRender()` does this job instead.

---

### 26. `clearHighlight()`
> Removes ALL green dots and red capture highlights from the entire board.

```js
function clearHighlight() {
  const flatArray = globalData.flat();                 // Line 1: Flatten board to 64-item array

  flatArray.forEach((el) => {                          // Line 2: Loop all 64 squares
    if (el.captureHighlight) {                         // Line 3: If this square has a red highlight
      document.getElementById(el.id).classList.remove("captureColor"); // Line 4: Remove red from DOM
      el.captureHighlight = false;                     // Line 5: Reset flag in data
    }

    if (el.highlight) {                                // Line 6: If this square has a green dot
      el.highlight = null;                             // Line 7: Set to null (signals removal)
    }
    globalStateRender();                               // Line 8: Trigger render to remove green spans
  });
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1 | `globalData.flat()` | Flatten board to easy list |
| 3–4 | `el.captureHighlight` → `remove("captureColor")` | Removes red highlight from capture squares |
| 5 | `el.captureHighlight = false` | Resets the flag so it won't trigger again |
| 6–7 | `el.highlight = null` | Signals `globalStateRender` to remove green dot |
| 8 | `globalStateRender()` | Applies the removal of green dots to the DOM |

---

## 📁 `Events/Global.js`

> **State variables set before any function runs:**

```js
let highlightState = false;      // Is a piece currently selected with valid moves shown?
let selfHighlightState = null;   // Which piece is currently glowing yellow?
let moveState = null;            // Which piece is "picked up" and ready to move?
```

---

### 27. `clearHighlightLocal()`
> Local shortcut to clear highlights AND reset the highlight state flag.

```js
function clearHighlightLocal() {
  clearHighlight();              // Line 1: Remove all green dots and red highlights from board
  highlightState = false;        // Line 2: Reset flag — "no piece selected anymore"
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1 | `clearHighlight()` | Cleans up all DOM highlights |
| 2 | `highlightState = false` | Tells the rest of the code that nothing is selected |

---

### 28. `movePieceFromXtoY(from, to)` ⚠️ REPLACED

```js
function movePieceFromXtoY(from, to) {
  to.piece = from.piece;         // Line 1: Copy piece object from 'from' square to 'to' square
  from.piece = null;             // Line 2: Remove piece from old square in data
  globalStateRender();           // Line 3: Re-render highlights on board
}
```

> ⚠️ **Replaced by `moveElement()`** in active code. `movePieceFromXtoY` is exported but the calling line is commented out (`Global.js` line 118).

---

### 29. `whitePawnClick(square)`
> Full logic when a white pawn is clicked. Most complex function in the game.

```js
function whitePawnClick(square) {
  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    moveElement(selfHighlightState, piece.current_Position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // --- STEP 3: Select this piece ---
  selfHighlight(piece);
  highlightState = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_Position;

  let highlightedSquareIds = null;

  if (piece.current_Position[1] == "2") {
    highlightedSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) + 1}`,
      `${current_pos[0]}${Number(current_pos[1]) + 2}`,
    ];
  } else {
    highlightedSquareIds = [`${current_pos[0]}${Number(current_pos[1]) + 1}`];
  }

  highlightedSquareIds.forEach((highlighted) => {
    const element = keySquareMapper[highlighted];
    element.highlight = true;
  });

  const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1]) + 1}`;
  const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1]) + 1}`;

  let captureIds = [col1, col2];

  captureIds.forEach((element) => {
    checkPieceOfOpponentOnElement(element, "white");
  });

  globalStateRender();
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1–4 | `selfHighlight(piece)` + state setup | Select piece and set state flags |
| 8 | `current_Position[1] == "2"` | White starts at row 2 |
| 9–10 | `+ 1`, `+ 2` | White pawns move UP (increasing row numbers) |
| 16 | `keySquareMapper[highlighted]` | O(1) lookup instead of nested loops |
| 22–23 | `charCodeAt(0) ± 1` | Calculate diagonal squares (left and right) |
| 28 | `checkPieceOfOpponentOnElement` | Check for enemy pieces on diagonals |
| 31 | `globalStateRender()` | Update display with highlights

---

### 30. `blackPawnClick(square)`
> Mirror of `whitePawnClick` but moves downward (decreasing rank).

```js
function blackPawnClick(square) {
  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    moveElement(selfHighlightState, piece.current_Position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece);
  highlightState = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_Position;

  let highlightedSquareIds = null;

  if (piece.current_Position[1] == "7") {
    highlightedSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) - 1}`,
      `${current_pos[0]}${Number(current_pos[1]) - 2}`,
    ];
  } else {
    highlightedSquareIds = [`${current_pos[0]}${Number(current_pos[1]) - 1}`];
  }

  highlightedSquareIds.forEach((highlighted) => {
    const element = keySquareMapper[highlighted];
    element.highlight = true;
  });

  const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1]) - 1}`;
  const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1]) - 1}`;

  let captureIds = [col1, col2];

  captureIds.forEach((element) => {
    checkPieceOfOpponentOnElement(element, "black");
  });

  globalStateRender();
}
```

| Line | Code | What it does |
|------|------|-------------|
| 1–4 | `selfHighlight(piece)` + state setup | Select piece and set state flags |
| 8 | `current_Position[1] == "7"` | Black starts at row 7 |
| 9–10 | `- 1`, `- 2` | Black pawns move DOWN (decreasing row numbers) |
| 16 | `keySquareMapper[highlighted]` | O(1) lookup instead of nested loops |
| 22–23 | `charCodeAt(0) ± 1` | Calculate diagonal squares (left and right) |
| 28 | `checkPieceOfOpponentOnElement` | Check for enemy pieces on diagonals |
| 31 | `globalStateRender()` | Update display with highlights
| 24 | `"black"` | Checks for WHITE pieces on diagonals (from black's perspective) |
| 27 | `globalStateRender()` | Actually draw the green dot |

---

### 31. `globalEvent()`
> The main controller. Attaches one click listener to the entire board and routes every click.

```js
function globalEvent() {
  ROOT_DIV.addEventListener("click", function (event) {
    if (event.target.localName === "img") {
      const clickId = event.target.parentNode.id;
      const square = keySquareMapper[clickId];
      const pieceName =
        square && square.piece && typeof square.piece === "object"
          ? square.piece.piece_name
          : null;

      if (square.captureHighlight && moveState) {
        moveElement(moveState, clickId);
        moveState = null;
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
      }

      if (pieceName === "WHITE_PAWN") {
        whitePawnClick(square);
      } else if (pieceName === "BLACK_PAWN") {
        blackPawnClick(square);
      }
    } else {
      const childElementOfClickedElement = Array.from(event.target.childNodes);

      if (
        childElementOfClickedElement.length == 1 ||
        event.target.localName === "span"
      ) {
        if (event.target.localName === "span") {
          clearPreviousSelfHighlight(selfHighlightState);
          const id = event.target.parentNode.id;
          moveElement(moveState, id);
          moveState = null;
        } else {
          clearPreviousSelfHighlight(selfHighlightState);
          const id = event.target.id;
          moveElement(moveState, id);
          moveState = null;
        }
      } else {
        clearHighlightLocal();
        clearPreviousSelfHighlight(selfHighlightState);
      }
    }
  });
}
```

| Line | Code | What it does |
|------|------|-------------|
| 2 | `addEventListener("click"...)` | Attach listener to root — catches ALL clicks |
| 3 | `event.target.localName === "img"` | Check if a piece image was clicked |
| 4–5 | `keySquareMapper[clickId]` | O(1) lookup — get square object directly |
| 6–8 | Extract `piece_name` if piece exists | Get piece type for routing |
| 10–14 | `if (square.captureHighlight && moveState)` | Move selected piece to capture square |
| 16–18 | Route to pawn handlers | Call `whitePawnClick` or `blackPawnClick` |
| 20+ | Empty square/span clicks | Handle move execution and deselection |

