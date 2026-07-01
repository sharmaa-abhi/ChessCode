# ♟️ ChessCode — Visual Flowcharts

**Last Updated:** June 30, 2026 — 08:25 PM IST (All piece handlers are now implemented! See updated Click Handler Flow below.)

⏳ **Current Status:** Handlers exist for all pieces but turn validation blocks full gameplay.

---

## 🟢 1. App Startup Flow

> What happens the moment you open the game.

```mermaid
flowchart TD
    A([🌐 Browser loads index.html]) --> B[index.js runs]
    B --> C["initGame()\nData/data.js"]
    C --> D["squareRow() × 8 times\nfor rows 8 → 1"]
    D --> E["Square() × 8 times\nfor columns a → h"]
    E --> F[(globalData\n8×8 board array in memory)]

    F --> G["initGameRender(globalData)\nRender/main.js"]
    G --> H[Create 64 square divs\nand add to screen]
    H --> I[Assign pieces to squares\nusing pieces.js factories]
    I --> J["pieceRender(data)\nAdd piece images to DOM"]

    J --> K["globalEvent()\nEvents/Global.js"]
    K --> L([✅ Game is Ready!\nWaiting for clicks...])

    style A fill:#2d6a4f,color:#fff
    style L fill:#2d6a4f,color:#fff
    style F fill:#1b4332,color:#fff
```

---

## 🖱️ 2. Click Handler Flow

> What happens when you click anywhere on the board.

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
    I --> Z3(["⏳ BLOCKED: Turn not validated\nBoth colors can move"])

    style A fill:#023e8a,color:#fff
    style Z fill:#2d6a4f,color:#fff
    style Z2 fill:#555,color:#fff
    style Z3 fill:#d62828,color:#fff
```

**June 22 Update:** All piece handlers now exist and are wired into the switch statement. The blocker is turn validation—without it, both white and black can move any piece.

---

## ⬜ 3. White Pawn Click Flow

> What happens step by step when you click a white pawn.

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

## ⬛ 4. Black Pawn Click Flow

> What happens when you click a black pawn.

```mermaid
flowchart TD
    A([Click on Black Pawn]) --> B{Same pawn\nclicked again?}

    B -->|Yes| C["clearHighlightLocal()\nclearPreviousSelfHighlight()"]
    C --> D([Done - deselected])

    B -->|No| E{Is square a capture target?}
    
    E -->|Yes| F["moveElement()\nMove piece to square"]
    F --> G([Done - piece captured])
    
    E -->|No| H["selfHighlight()\nGlow this pawn yellow ✨"]
    H --> I[Set moveState = this pawn]
    I --> J{Is pawn on\nstarting row 7?}

    J -->|Yes| K[Show 2 squares ahead\nas valid moves 🟢🟢]
    J -->|No| L[Show 1 square ahead\nas valid move 🟢]
    
    K --> M["checkPieceOfOpponentOnElement()\nCheck diagonals for enemy pieces"]
    L --> M
    M --> N[Show diagonal captures\nin red 🔴]

    N --> O["globalStateRender()\nUpdate screen with dots"]
    O --> P([Waiting for next click...])

    style A fill:#1a1a2e,color:#fff
    style D fill:#555,color:#fff
    style G fill:#2d6a4f,color:#fff
    style P fill:#2d6a4f,color:#fff
```

---

## 🏃 5. Piece Move Flow

> What happens when `moveElement()` is called.

```mermaid
flowchart TD
    A(["moveElement(piece, targetId) called"]) --> B[Find piece's old square in globalData\nDelete piece from it]
    B --> C[Find new target square in globalData\nSet piece on it]
    C --> D["clearHighlight()\nRemove all green dots from board"]
    D --> E[Remove yellow glow from old square]
    E --> F[Copy old square's HTML\ninto new square's HTML on screen]
    F --> G[Clear old square's HTML]
    G --> H[Update piece.current_Position = targetId]
    H --> I([✅ Move Complete!])

    style A fill:#6a1c1c,color:#fff
    style I fill:#2d6a4f,color:#fff
```

---

## 🗺️ 6. Complete Big Picture

> All files and how they connect. Updated June 22, 2026 to show all piece handlers.

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
    end

    subgraph RENDER ["🖥️ Render Layer"]
        MAIN["main.js\ninitGameRender\npieceRender\nglobalStateRender\nmoveElement\nselfHighlight\nclearHighlight"]
    end

    subgraph EVENTS ["🖱️ Event Layer - ALL HANDLERS ✅"]
        GLOB["Global.js\n12 piece handlers\n(white & black)\nAll wired to globalEvent"]
    end

    IDX -->|"calls initGame()"| DJS
    IDX -->|"calls initGameRender()"| MAIN
    IDX -->|"calls globalEvent()"| GLOB

    MAIN -->|"uses piece factories"| PJS
    MAIN -->|"uses ROOT_DIV"| CONST
    GLOB -->|"uses ROOT_DIV"| CONST
    GLOB -->|"calls render functions"| MAIN
    GLOB -->|"calls move calculators"| COMMON
    COMMON -->|"reads globalData"| IDX
    MAIN -->|"reads globalData"| IDX

    style IDX fill:#023e8a,color:#fff
    style DATA fill:#1b263b,color:#fff
    style HELPER fill:#2d3a1e,color:#fff
    style RENDER fill:#3a1e2d,color:#fff
    style EVENTS fill:#0d472d,color:#fff
```

**June 22 Update:** Event Layer now shows all piece handlers are implemented! ⏳ Blocker: Turn validation needed.

---

## ⏳ 7. Turn Management Flow (To Be Implemented)

> What SHOULD happen when turn validation is implemented.

```mermaid
flowchart TD
    A([User clicks piece]) --> B{Is it piece's\ncolor turn?}
    
    B -->|❌ Wrong color| C["Show error message\nor highlight red"]
    C --> D([❌ Move blocked])
    
    B -->|✅ Correct color| E["Calculate valid moves\nShow green dots 🟢"]
    E --> F([Waiting for move...])
    
    F --> G{User clicks\nvalid square?}
    
    G -->|Yes| H["moveElement()\nMove piece\nclearHighlight()"]
    H --> I["Toggle currentTurn\n'white' ↔ 'black'"]
    I --> J([✅ Move Complete!\nNext turn...])
    
    G -->|No| K([Deselect])
    
    style A fill:#023e8a,color:#fff
    style C fill:#d62828,color:#fff
    style D fill:#d62828,color:#fff
    style J fill:#2d6a4f,color:#fff
```

**What needs to happen:**
1. Add `let currentTurn = "white"` state in Global.js
2. In each piece handler: check if `piece.piece_name` color matches `currentTurn`
3. In `moveElement()`: toggle `currentTurn` after successful move

**Timeline:** ~30 minutes to implement

---

| Flow | Triggered By | Key Functions Called |
|------|-------------|---------------------|
| **App Start** | Browser loads page | `initGame` → `initGameRender` → `globalEvent` |
| **Click ANY piece img** | User clicks pawn, rook, bishop, knight, queen, or king | Dispatches to appropriate handler (whitePawnClick, whiteRookClick, etc.) |
| **Click green dot** | User clicks valid move square | `moveElement` → `clearHighlight` → `globalStateRender` |
| **Any piece selected** | Any click handler runs | `clearPreviousSelfHighlight` → `selfHighlight` → `globalStateRender` |
| **Piece moves** | `moveElement` runs | `clearHighlight` → DOM swap → update `current_Position` |

**June 22 Update:** All 12 piece handlers now have click handlers in the system. ⏳ **Blocker:** No turn validation — both colors can move any piece.
