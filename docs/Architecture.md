# 🏗️ ChessCode — Architecture & Design

**Last Updated:** August 29, 2026

This document covers the system architecture, module layers, data structures, and visual flowcharts for the entire ChessCode project.

---

## 📐 Module Layer Map

```
┌──────────────────────────────────────────────────────┐
│                   Browser / DOM                      │
└───────────────────────┬──────────────────────────────┘
                        │  click events
                        ▼
┌──────────────────────────────────────────────────────┐
│              Events Layer  (Events/Global.js)        │
│  • globalEvent()   — single delegated click listener │
│  • 12 piece click handlers (turn-gated)              │
│  • changeTurn()    — toggle turn, update UI, timer   │
│  • updateHeaderStatus() — sync header status bar     │
│  • moveElement()   — execute moves with logging      │
│  • checkForPawnPromotion() / callBackPawnPromotion()  │
│  • checkForCheck() — stub for check detection        │
│  • captureInTurn() — capture validation              │
└──────┬──────────────────────────────────────┬────────┘
       │ calls                                │ calls
       ▼                                      ▼
┌──────────────────┐                ┌──────────────────────┐
│   Helper Layer   │                │   Render Layer        │
│ commonHelper.js  │                │   Render/main.js      │
│ • checkPiece     │                │ • initGameRender()    │
│   OfOpponent     │                │ • pieceRender()       │
│ • checkSquare    │                │ • globalStateRender() │
│   CaptureId      │                │ • selfHighlight()     │
│ • giveXXX        │                │ • clearHighlight()    │
│   Ids()          │                │ • renderHighlight()   │
│ • giveXXX        │                │ • rank/file labels    │
│   CaptureIds()   │                │                       │
│                  │                └────────────┬─────────┘
│ logging.js       │                             │
│ • logMoves()     │                             │
│                  │                             │
│ timer.js         │                             │
│ • ChessTimer     │                             │
│ • switchTurn()   │                             │
│ • updateActive   │                             │
│   PlayerTimer()  │                             │
│                  │                             │
│ modelCreator.js  │                             │
│ • ModalCreater   │                             │
│ • pawnPromotion()│                             │
└──────┬───────────┘                             │
       │                                         │
       │ reads                                   │ reads/writes
       ▼                                         ▼
┌──────────────────────────────────────────────────────┐
│                   Data Layer                         │
│                                                      │
│  index.js — globalData (8×8 array) + keySquareMapper │
│            + globalPiece (named piece refs)           │
│            + chessTimer (timer instance)              │
│            + window.__chess (testing API)             │
│  Data/data.js — Square(), squareRow(), initGame()    │
│  Data/pieces.js — 12 piece factory functions         │
│  Helper/constant.js — ROOT_DIV                       │
└──────────────────────────────────────────────────────┘
```

---

## 🔗 Import / Export Graph

```mermaid
graph TD
    A[index.html] --> B[index.js]
    B --> C[Data/data.js]
    B --> D[Render/main.js]
    B --> E[Events/Global.js]
    B --> K[Helper/timer.js]

    D --> F[Helper/constant.js]
    D --> G[Data/pieces.js]
    D --> B

    E --> F
    E --> B
    E --> D
    E --> H[Helper/commonHelper.js]
    E --> I[Helper/logging.js]
    E --> J[Helper/modelCreator.js]
    E --> K

    H --> B
    J --> G
```

---

## 🚀 Boot Sequence (Startup)

```mermaid
sequenceDiagram
    participant HTML as index.html
    participant JS as index.js
    participant Data as data.js
    participant Render as main.js
    participant Event as Global.js
    participant Timer as timer.js

    HTML->>JS: load as module
    JS->>Data: initGame()
    Data-->>JS: globalData (8x8 array)
    JS->>JS: build keySquareMapper {}
    JS->>Render: initGameRender(globalData)
    Render->>Render: create 64 square divs
    Render->>Render: add rank/file labels
    Render->>Render: pieceRender(data) — place img tags
    Render->>Render: populate globalPiece (piece refs)
    JS->>Timer: new ChessTimer()
    Timer->>Timer: initialize displays (10:00 / 10:00)
    Timer->>Timer: updateActivePlayerTimer("white")
    JS->>Event: globalEvent()
    Event->>Event: updateHeaderStatus()
    Event->>Event: attach single click listener to ROOT_DIV
    JS->>JS: expose window.__chess for testing
```

---

## 🖱️ Click Event Flow

```mermaid
flowchart TD
    A[User clicks ROOT_DIV] --> B{target localName?}

    B -- img --> C{captureHighlight AND moveState?}
    C -- YES --> D[moveElement — execute capture]
    C -- NO --> E{opponent's piece? turn check}
    E -- YES --> F[captureInTurn — handle cross-turn capture]
    E -- NO --> G{switch piece_name}

    G --> H[whitePawnClick / blackPawnClick]
    G --> I[whiteRookClick / blackRookClick]
    G --> J[whiteBishopClick / blackBishopClick]
    G --> K[whiteKnightClick / blackKnightClick]
    G --> L[whiteQueenClick / blackQueenClick]
    G --> M[whiteKingClick / blackKingClick]

    D --> N[changeTurn + updateHeaderStatus + timer switch]

    B -- span --> O{moveState exists?}
    O -- YES --> P[moveElement to span parent square]
    O -- NO --> Q[clear highlights]

    B -- div --> R{square.highlight AND moveState?}
    R -- YES --> S[moveElement to this square]
    R -- NO --> T[clear highlights]

    P --> N
    S --> N
```

---

## 🔄 State Machine (Game State Variables)

```mermaid
stateDiagram-v2
    [*] --> Idle

    Idle --> PieceSelected : click own piece (matching inTurn)
    PieceSelected --> Idle : click same piece again
    PieceSelected --> PieceSelected : click different own piece
    PieceSelected --> Moved : click green dot
    PieceSelected --> Captured : click red capture square
    Moved --> TurnSwitch : move completes
    Captured --> TurnSwitch : capture completes
    TurnSwitch --> Idle : changeTurn() + updateHeaderStatus() + timer switch
```

**Variables:**

| Variable | Type | Meaning |
|---|---|---|
| `highlightState` | `boolean` | `true` when a piece is selected and move dots are visible |
| `selfHighlightState` | `piece or null` | Piece object currently glowing yellow |
| `moveState` | `piece or null` | Piece ready to be moved on next valid click |
| `inTurn` | `string` | Current turn — `"white"` or `"black"` |

---

## 📁 File Responsibility Summary

| File | Layer | Responsibility |
|---|---|---|
| `index.html` | Entry | App header (logo, status), board container, side panel (timers, move logger), footer |
| `index.js` | Bootstrap | Runs 3-step init; exports `globalData`, `keySquareMapper`, `globalPiece`, `chessTimer`; exposes `window.__chess` for testing |
| `Data/data.js` | Data | `Square()`, `squareRow()`, `initGame()` — builds board array |
| `Data/pieces.js` | Data | 12 piece factory functions with `move` flag for castling-tracked pieces |
| `Helper/constant.js` | Shared | Exports `ROOT_DIV` |
| `Helper/commonHelper.js` | Logic | Move range calculators, capture detection, check-detection helpers |
| `Helper/logging.js` | UI | Move logger with Unicode chess symbols and chess notation |
| `Helper/timer.js` | Logic/UI | `ChessTimer` class — countdown, timeout, low-time warnings; `updateActivePlayerTimer()` — toggles timer card active state |
| `Helper/modelCreator.js` | UI | Pawn promotion modal with piece selection |
| `Render/main.js` | Render | All DOM operations: draw, highlight, move, clear, rank/file labels |
| `Events/Global.js` | Events | All click handlers, turn management, move execution, `updateHeaderStatus()`, timer integration; exposes `window.getInTurn()`/`window.setInTurn()` |
| `style/style.css` | Style | Header, board, timers, logger, modals, footer, timeout overlay |
| `style/mobile.css` | Style | Mobile responsive breakpoints (tablet, phone, landscape) |

---

# 🗃️ Data Structures

---

## 🗺️ Big Picture: Two Data Stores

```
globalData          →  source of truth for board state
keySquareMapper     →  O(1) lookup dictionary (id → square)
```

Both are created in `index.js` and exported to every module that needs them.

---

## 📦 `globalData` — The Board Array

### Shape
An **8×8 nested array** where each row is an array of 8 Square objects.

```js
globalData[rowIndex][colIndex] = Square

globalData[0]    // Row 8 — Black pieces start here
globalData[7]    // Row 1 — White pieces start here
globalData[0][0] // Square a8
globalData[7][4] // Square e1 (white king)
```

### Row Mapping

| `globalData[i]` | Chess Row | Contents |
|---|---|---|
| `[0]` | Row 8 | Black rook, knight, bishop, queen, king, bishop, knight, rook |
| `[1]` | Row 7 | Black pawns |
| `[2]` | Row 6 | Empty |
| `[3]` | Row 5 | Empty |
| `[4]` | Row 4 | Empty |
| `[5]` | Row 3 | Empty |
| `[6]` | Row 2 | White pawns |
| `[7]` | Row 1 | White rook, knight, bishop, queen, king, bishop, knight, rook |

---

## 🔲 Square Object Schema

Created by `Square(color, piece, id)` in `Data/data.js`.

```js
{
  id:               "e2",        // String — chess coordinate (column a–h + row 1–8)
  color:            "white",     // String — "white" or "black" (square tile color)
  piece:            null,        // Piece object or null (no piece on this square)

  // Runtime state — added dynamically during gameplay
  highlight:        true,        // Boolean/null — true = show green move dot
  captureHighlight: true,        // Boolean — true = square is a capture target (red)
}
```

### ID Format

```
id = column + row
   = [a–h]  + [1–8]

Examples:
  "a1" → bottom-left (white queen-side rook)
  "h8" → top-right   (black king-side rook)
  "e4" → center square (e file, row 4)
```

---

## ♟️ Piece Object Schema

Created by factory functions in `Data/pieces.js`.

```js
{
  current_Position: "e2",            // String — current square ID (updated on move)
  img:              "./Assets/pieces/white/pawn.png",  // Asset path (lowercase 'pieces')
  piece_name:       "WHITE_PAWN",    // Identifier — format: COLOR_TYPE
}
```

### `piece_name` Values

| piece_name | Color | Type |
|---|---|---|
| `WHITE_PAWN` | White | Pawn |
| `WHITE_ROOK` | White | Rook |
| `WHITE_KNIGHT` | White | Knight |
| `WHITE_BISHOP` | White | Bishop |
| `WHITE_QUEEN` | White | Queen |
| `WHITE_KING` | White | King |
| `BLACK_PAWN` | Black | Pawn |
| `BLACK_ROOK` | Black | Rook |
| `BLACK_KNIGHT` | Black | Knight |
| `BLACK_BISHOP` | Black | Bishop |
| `BLACK_QUEEN` | Black | Queen |
| `BLACK_KING` | Black | King |

### Color Detection Pattern

```js
// Check if piece is white
piece.piece_name.startsWith("WHITE_")

// Check if piece is black
piece.piece_name.startsWith("BLACK_")

// Check if piece contains opponent color
piece.piece_name.includes("BLACK") // used by checkPieceOfOpponentOnElement("white")
```

---

## ⚡ `keySquareMapper` — O(1) Square Lookup

### Purpose
A flat dictionary built from `globalData` that maps every square ID directly to its Square object. Avoids slow O(64) `Array.flat().forEach()` scans on every click.

### Shape
```js
keySquareMapper = {
  "a1": { id: "a1", color: "black", piece: {...} },
  "a2": { id: "a2", color: "white", piece: {...} },
  // ... all 64 squares
  "h8": { id: "h8", color: "black", piece: {...} },
}
```

### How It's Built
```js
// In index.js — O(N) one-time setup
let keySquareMapper = {};
globalData.flat().forEach((square) => {
  keySquareMapper[square.id] = square;
});
```

### Usage Pattern
```js
// Anywhere in the codebase — O(1) lookup
const square = keySquareMapper["e4"];
square.highlight = true;
```

---

## 🔁 Data Flow on Piece Move

```mermaid
sequenceDiagram
    participant Event as Events/Global.js
    participant Render as Render/main.js
    participant Data as globalData + keySquareMapper

    Event->>Render: moveElement(piece, targetId)
    Render->>Data: find square where el.id === piece.current_Position
    Render->>Data: delete el.piece  (vacate old square)
    Render->>Data: find square where el.id === targetId
    Render->>Data: el.piece = piece  (place on new square)
    Render->>Render: clearHighlight()
    Render->>Render: swap innerHTML in DOM
    Render->>Data: piece.current_Position = targetId
```

---

## 🗂️ Asset Path Convention

```
Assets/
  pieces/
    white/
      pawn.png
      rook.png
      knight.png
      bishop.png
      queen.png
      king.png
    black/
      pawn.png
      rook.png
      knight.png
      bishop.png
      queen.png
      king.png
```

Path format in piece objects: `"./Assets/pieces/{color}/{type}.png"`

> ⚠️ Note: The folder is lowercase `pieces/`, not `Pieces/`.

---

# 📊 Flowcharts

---

## 🟢 App Startup Flow

```mermaid
flowchart TD
    A([🌐 Browser loads index.html]) --> B[index.js runs]
    B --> C["initGame()\nData/data.js"]
    C --> D["squareRow() × 8 times\nfor rows 8 → 1"]
    D --> E["Square() × 8 times\nfor columns a → h"]
    E --> F[(globalData\n8×8 board array in memory)]

    F --> G["initGameRender(globalData)\nRender/main.js"]
    G --> H[Create 64 square divs\nwith rank/file labels\nand add to screen]
    H --> I[Assign pieces to squares\nusing pieces.js factories]
    I --> J["pieceRender(data)\nAdd piece images to DOM"]

    J --> K0["new ChessTimer()\nInitialize timers"]
    K0 --> K["globalEvent()\nEvents/Global.js"]
    K --> K1["updateHeaderStatus()\nSync header display"]
    K1 --> L([✅ Game is Ready!\nWaiting for clicks...])

    style A fill:#2d6a4f,color:#fff
    style L fill:#2d6a4f,color:#fff
    style F fill:#1b4332,color:#fff
```

---

## 🖱️ Click Handler Flow

```mermaid
flowchart TD
    A([User clicks on board]) --> B{What was clicked?}

    B -->|"img piece image"| C{Which piece?}
    B -->|"span - green dot"| G["clearPreviousSelfHighlight\nmoveElement to that square\nmoveState = null"]
    B -->|Empty square with one child| G
    B -->|Anything else| H[clearHighlightLocal\nclearPreviousSelfHighlight]

    C -->|WHITE_PAWN| D["whitePawnClick ✅"]
    C -->|BLACK_PAWN| E["blackPawnClick ✅"]
    C -->|WHITE_BISHOP| D2["whiteBishopClick ✅"]
    C -->|BLACK_BISHOP| E2["blackBishopClick ✅"]
    C -->|WHITE_ROOK| D3["whiteRookClick ✅"]
    C -->|BLACK_ROOK| E3["blackRookClick ✅"]
    C -->|WHITE_KNIGHT| D4["whiteKnightClick ✅"]
    C -->|BLACK_KNIGHT| E4["blackKnightClick ✅"]
    C -->|WHITE_QUEEN| D5["whiteQueenClick ✅"]
    C -->|BLACK_QUEEN| E5["blackQueenClick ✅"]
    C -->|WHITE_KING| D6["whiteKingClick ✅"]
    C -->|BLACK_KING| E6["blackKingClick ✅"]

    D --> I["All handlers calculate valid moves\nand highlight them 🟢🔴"]
    E --> I
    D2 --> I
    E2 --> I
    D3 --> I
    E3 --> I
    D4 --> I
    E4 --> I
    D5 --> I
    E5 --> I
    D6 --> I
    E6 --> I

    G --> Z([🔄 Piece Moves!])
    H --> Z2([🔄 Highlights Cleared])
    I --> Z3(["✅ Highlights Shown\nWaiting for next click"])

    style A fill:#023e8a,color:#fff
    style Z fill:#2d6a4f,color:#fff
    style Z2 fill:#555,color:#fff
    style Z3 fill:#2d6a4f,color:#fff
```

---

## ⬜ White Pawn Click Flow

```mermaid
flowchart TD
    A([Click on White Pawn]) --> B{Same pawn\nclicked again?}

    B -->|Yes| C["clearHighlightLocal()\nclearPreviousSelfHighlight()"]
    C --> D([Done - deselected])

    B -->|No| E{Is square a capture target?}
    
    E -->|Yes| F["moveElement()\nMove piece to square"]
    F --> G([Done - piece captured])
    
    E -->|No| H["selfHighlight()\nGlow this pawn yellow ✨"]
    H --> I[Set moveState = this pawn]
    I --> J{Is pawn on\nstarting row 2?}

    J -->|Yes| K[Show 2 squares ahead\nas valid moves 🟢🟢]
    J -->|No| L[Show 1 square ahead\nas valid move 🟢]
    
    K --> M["checkPieceOfOpponentOnElement()\nCheck diagonals for enemy pieces"]
    L --> M
    M --> N[Show diagonal captures\nin red 🔴]

    N --> O["globalStateRender()\nUpdate screen with dots"]
    O --> P([Waiting for next click...])

    style A fill:#023e8a,color:#fff
    style D fill:#555,color:#fff
    style G fill:#2d6a4f,color:#fff
    style P fill:#2d6a4f,color:#fff
```

---

## 🏃 Piece Move Flow

```mermaid
flowchart TD
    A(["moveElement(piece, targetId) called"]) --> B[Find piece's old square in globalData\nDelete piece from it]
    B --> C[Find new target square in globalData\nSet piece on it]
    C --> D["clearHighlight()\nRemove all green dots from board"]
    D --> E[Remove yellow glow from old square]
    E --> F[Move piece img element\nto new square in DOM]
    F --> G[Clear old square's piece img]
    G --> H[Update piece.current_Position = targetId]
    H --> I([✅ Move Complete!])

    style A fill:#6a1c1c,color:#fff
    style I fill:#2d6a4f,color:#fff
```

---

## 🗺️ Complete Big Picture

```mermaid
flowchart LR
    IDX["📄 index.js\nApp Entry Point"]

    subgraph DATA ["📦 Data Layer"]
        DJS["data.js\ninitGame\nsquareRow\nSquare"]
        PJS["pieces.js\n12 piece factories\n(white & black)"]
    end

    subgraph HELPER ["🔧 Helper Layer"]
        CONST["constant.js\nROOT_DIV"]
        COMMON["commonHelper.js\nMove calculation\nfunctions"]
        TIMER["timer.js\nChessTimer\nupdateActivePlayerTimer"]
    end

    subgraph RENDER ["🖥️ Render Layer"]
        MAIN["main.js\ninitGameRender\npieceRender\nglobalStateRender\nmoveElement\nselfHighlight\nclearHighlight\nrank/file labels"]
    end

    subgraph EVENTS ["🖱️ Event Layer - ALL HANDLERS ✅"]
        GLOB["Global.js\n12 piece handlers\nupdateHeaderStatus\nAll wired to globalEvent"]
    end

    IDX -->|"calls initGame()"| DJS
    IDX -->|"calls initGameRender()"| MAIN
    IDX -->|"calls globalEvent()"| GLOB
    IDX -->|"creates ChessTimer"| TIMER

    MAIN -->|"uses piece factories"| PJS
    MAIN -->|"uses ROOT_DIV"| CONST
    GLOB -->|"uses ROOT_DIV"| CONST
    GLOB -->|"calls render functions"| MAIN
    GLOB -->|"calls move calculators"| COMMON
    GLOB -->|"calls updateActivePlayerTimer"| TIMER
    COMMON -->|"reads globalData"| IDX
    MAIN -->|"reads globalData"| IDX

    style IDX fill:#023e8a,color:#fff
    style DATA fill:#1b263b,color:#fff
    style HELPER fill:#2d3a1e,color:#fff
    style RENDER fill:#3a1e2d,color:#fff
    style EVENTS fill:#0d472d,color:#fff
```

---

## Pawn Click Summary Table

| Step | White Pawn | Black Pawn |
|------|-----------|-----------| 
| 1 | Check if same pawn clicked | Check if same pawn clicked |
| 2 | Check if square is capture target | Check if square is capture target |
| 3 | Deselect (if same) or Move (if capture) | Deselect (if same) or Move (if capture) |
| 4 | Select pawn & set states | Select pawn & set states |
| 5 | Determine moves (+1/+2) | Determine moves (-1/-2) |
| 6 | Check diagonals for captures | Check diagonals for captures |
| 7 | Render to screen | Render to screen |

---

## Flow Summary

| Flow | Triggered By | Key Functions Called |
|------|-------------|---------------------|
| **App Start** | Browser loads page | `initGame` → `initGameRender` → `new ChessTimer()` → `globalEvent` → `updateHeaderStatus` |
| **Click ANY piece img** | User clicks pawn, rook, bishop, knight, queen, or king | Dispatches to appropriate handler (whitePawnClick, whiteRookClick, etc.) |
| **Click green dot** | User clicks valid move square | `moveElement` → `clearHighlight` → `globalStateRender` |
| **Any piece selected** | Any click handler runs | `clearPreviousSelfHighlight` → `selfHighlight` → `globalStateRender` |
| **Piece moves** | `moveElement` runs | `clearHighlight` → DOM swap → update `current_Position` |
