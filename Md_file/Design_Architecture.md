# 🏗️ ChessCode — System Architecture Design

**Project:** ChessCode  
**Stack:** Vanilla HTML + CSS + JavaScript (ES Modules)  
**Pattern:** MVC-style layered architecture, event delegation, centralized state  
**Last Updated:** June 30, 2026 — 08:25 PM IST

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
│  • 12 piece click handlers                           │
│  • clearPreviousSelfHighlight()                      │
│  • clearHighlightLocal()                             │
└──────┬──────────────────────────────────────┬────────┘
       │ calls                                │ calls
       ▼                                      ▼
┌──────────────┐                   ┌──────────────────────┐
│  Helper Layer│                   │   Render Layer        │
│ commonHelper │                   │   Render/main.js      │
│ • checkPiece │                   │ • initGameRender()    │
│   OfOpponent │                   │ • pieceRender()       │
│ • checkSquare│                   │ • globalStateRender() │
│   CaptureId  │                   │ • moveElement()       │
│ • giveXXX    │                   │ • selfHighlight()     │
│   Ids()      │                   │ • clearHighlight()    │
└──────┬───────┘                   └────────────┬─────────┘
       │                                        │
       │ reads                                  │ reads/writes
       ▼                                        ▼
┌──────────────────────────────────────────────────────┐
│                   Data Layer                         │
│                                                      │
│  index.js — globalData (8×8 array) + keySquareMapper │
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

    H --> B
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

    HTML->>JS: load as module
    JS->>Data: initGame()
    Data-->>JS: globalData (8x8 array)
    JS->>JS: build keySquareMapper {}
    JS->>Render: initGameRender(globalData)
    Render->>Render: create 64 square divs
    Render->>Render: pieceRender(data) — place img tags
    JS->>Event: globalEvent()
    Event->>Event: attach single click listener to ROOT_DIV
```

---

## 🖱️ Click Event Flow

```mermaid
flowchart TD
    A[User clicks ROOT_DIV] --> B{target localName?}

    B -- img --> C{square.captureHighlight AND moveState?}
    C -- YES --> D[moveElement — execute capture]
    C -- NO --> E{switch piece_name}

    E --> F[whitePawnClick / blackPawnClick]
    E --> G[whiteRookClick / blackRookClick]
    E --> H[whiteBishopClick / blackBishopClick]
    E --> I[whiteKnightClick / blackKnightClick]
    E --> J[whiteQueenClick / blackQueenClick]
    E --> K[whiteKingClick / blackKingClick]

    B -- span --> L{moveState exists?}
    L -- YES --> M[moveElement to spans parent square]
    L -- NO --> N[clear highlights]

    B -- div --> O{square.highlight AND moveState?}
    O -- YES --> P[moveElement to this square]
    O -- NO --> Q[clear highlights]
```

---

## 🔄 State Machine (3 State Variables)

```mermaid
stateDiagram-v2
    [*] --> Idle

    Idle --> PieceSelected : click own piece
    PieceSelected --> Idle : click same piece again
    PieceSelected --> PieceSelected : click different own piece
    PieceSelected --> Moved : click green dot
    PieceSelected --> Captured : click red capture square
    Moved --> Idle : move completes
    Captured --> Idle : capture completes
```

**Variables:**

| Variable | Type | Meaning |
|---|---|---|
| `highlightState` | `boolean` | `true` when a piece is selected and move dots are visible |
| `selfHighlightState` | `piece or null` | Piece object currently glowing yellow |
| `moveState` | `piece or null` | Piece ready to be moved on next valid click |

---

## 📁 File Responsibility Summary

| File | Layer | Responsibility |
|---|---|---|
| `index.html` | Entry | Loads CSS and `index.js` as ES module |
| `index.js` | Bootstrap | Runs 3-step init; exports `globalData` + `keySquareMapper` |
| `Data/data.js` | Data | `Square()`, `squareRow()`, `initGame()` — builds board array |
| `Data/pieces.js` | Data | 12 piece factory functions returning `{ current_Position, img, piece_name }` |
| `Helper/constant.js` | Shared | Exports `ROOT_DIV` — used by both Render and Events layers |
| `Helper/commonHelper.js` | Logic | Move range calculators + capture detection utilities |
| `Render/main.js` | Render | All DOM operations: draw, highlight, move, clear |
| `Events/Global.js` | Events | All click handlers, game state variables, `globalEvent()` listener |
