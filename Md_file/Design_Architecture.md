# 🏗️ ChessCode — System Architecture Design

**Project:** ChessCode  
**Stack:** Vanilla HTML + CSS + JavaScript (ES Modules)  
**Pattern:** MVC-style layered architecture, event delegation, centralized state  
**Last Updated:** July 4, 2026 — 08:40 PM IST

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
│   Ids()          │                │                       │
│ • giveXXX        │                └────────────┬─────────┘
│   CaptureIds()   │                             │
│                  │                             │
│ logging.js       │                             │
│ • logMoves()     │                             │
│                  │                             │
│ timer.js         │                             │
│ • ChessTimer     │                             │
│ • switchTurn()   │                             │
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

    D --> F[Helper/constant.js]
    D --> G[Data/pieces.js]
    D --> B

    E --> F
    E --> B
    E --> D
    E --> H[Helper/commonHelper.js]
    E --> I[Helper/logging.js]
    E --> J[Helper/modelCreator.js]
    E --> K[Helper/timer.js]

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
    Render->>Render: pieceRender(data) — place img tags
    Render->>Render: populate globalPiece (piece refs)
    JS->>Event: globalEvent()
    Event->>Event: attach single click listener to ROOT_DIV
    Timer->>Timer: initialize displays (10:00 / 10:00)
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

    D --> N[changeTurn + timer switch]

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
    TurnSwitch --> Idle : changeTurn() + timer switch
```

**Variables:**

| Variable | Type | Meaning |
|---|---|---|
| `highlightState` | `boolean` | `true` when a piece is selected and move dots are visible |
| `selfHighlightState` | `piece or null` | Piece object currently glowing yellow |
| `moveState` | `piece or null` | Piece ready to be moved on next valid click |
| `inTurn` | `string` | Current turn — `"white"` or `"black"` |
| `lastMoveFrom` | `string or null` | Square ID of last move origin (for `.lastMoveHighlight`) |
| `lastMoveTo` | `string or null` | Square ID of last move destination (for `.lastMoveHighlight`) |

---

## 📁 File Responsibility Summary

| File | Layer | Responsibility |
|---|---|---|
| `index.html` | Entry | Board layout with timer panel, turn indicator, move logger |
| `index.js` | Bootstrap | Runs 3-step init; exports `globalData`, `keySquareMapper`, `globalPiece` |
| `Data/data.js` | Data | `Square()`, `squareRow()`, `initGame()` — builds board array |
| `Data/pieces.js` | Data | 12 piece factory functions with `move` flag for castling-tracked pieces |
| `Helper/constant.js` | Shared | Exports `ROOT_DIV` |
| `Helper/commonHelper.js` | Logic | Move range calculators, capture detection, check-detection helpers |
| `Helper/logging.js` | UI | Move logger with Unicode chess symbols and chess notation |
| `Helper/timer.js` | Logic/UI | `ChessTimer` class — countdown, timeout, low-time warnings |
| `Helper/modelCreator.js` | UI | Pawn promotion modal with piece selection |
| `Render/main.js` | Render | All DOM operations: draw, highlight, move, clear |
| `Events/Global.js` | Events | All click handlers, turn management, move execution, timer integration |
| `style/style.css` | Style | Board, timers, logger, modals, last-move highlights, timeout overlay |
