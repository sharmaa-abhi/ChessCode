# ♟️ ChessCode — Visual Flowcharts

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

    C -->|WHITE_PAWN| D[whitePawnClick]
    C -->|BLACK_PAWN| E[blackPawnClick]
    C -->|Other pieces| F[Nothing yet - not implemented]

    G --> Z([🔄 Piece Moves!])
    H --> Z2([🔄 Highlights Cleared])

    style A fill:#023e8a,color:#fff
    style Z fill:#2d6a4f,color:#fff
    style Z2 fill:#555,color:#fff
```

---

## ⬜ 3. White Pawn Click Flow

> What happens step by step when you click a white pawn.

```mermaid
flowchart TD
    A([Click on White Pawn]) --> B["clearPreviousSelfHighlight()\nRemove yellow glow from old piece"]
    B --> C{Same pawn\nclicked again?}

    C -->|Yes| D["clearHighlightLocal()\nRemove all green dots"]
    D --> E([Done - deselected])

    C -->|No| F["selfHighlight()\nGlow this pawn yellow ✨"]
    F --> G[Set moveState = this pawn]
    G --> H{Is pawn on\nstarting row 2?}

    H -->|Yes| I[Show 2 squares ahead\nas valid moves 🟢🟢]
    H -->|No| J[Show 1 square ahead\nas valid move 🟢]
    J --> K["checkPieceOfOpponentOnElement()\nCheck diagonals for enemy pieces"]
    K --> L[Show diagonal captures\nin red 🔴]

    I --> M["globalStateRender()\nUpdate screen with dots"]
    L --> M
    M --> N([Waiting for next click...])

    style A fill:#023e8a,color:#fff
    style E fill:#555,color:#fff
    style N fill:#2d6a4f,color:#fff
```

---

## ⬛ 4. Black Pawn Click Flow

> What happens when you click a black pawn.

```mermaid
flowchart TD
    A([Click on Black Pawn]) --> B{Is a white pawn\nalready selected?\nhighlightState = true?}

    B -->|Yes - Move selected piece to black pawns square| C["moveElement(selfHighlightState, piece.current_Position)\nMove selected piece to black pawn's square"]
    C --> D([✅ White Pawn Moved!])

    B -->|No → Select this black pawn| E["clearPreviousSelfHighlight()\nRemove previous yellow glow"]
    E --> F{Same pawn\nclicked again?}

    F -->|Yes| G["clearHighlightLocal()"]
    G --> H([Done - deselected])

    F -->|No| I["selfHighlight()\nGlow black pawn yellow ✨"]
    I --> J[Set moveState = this pawn]
    J --> K{Is pawn on\nstarting row 7?}

    K -->|Yes| L[Show 2 squares below\nas valid moves 🟢🟢]
    K -->|No| M[Show 1 square below 🟢\nCheck diagonals for white pieces 🔴]

    L --> N["globalStateRender()\nUpdate screen"]
    M --> N
    N --> O([Waiting for next click...])

    style A fill:#1a1a2e,color:#fff
    style D fill:#2d6a4f,color:#fff
    style H fill:#555,color:#fff
    style O fill:#2d6a4f,color:#fff
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

> All files and how they connect.

```mermaid
flowchart LR
    IDX["📄 index.js\nApp Entry Point"]

    subgraph DATA ["📦 Data Layer"]
        DJS["data.js\ninitGame\nsquareRow\nSquare"]
        PJS["pieces.js\nblackPawn whitePawn\nblackRook whiteRook\n...etc"]
    end

    subgraph HELPER ["🔧 Helper Layer"]
        CONST["constant.js\nROOT_DIV"]
        COMMON["commonHelper.js\ncheckPieceOfOpponent\nOnElement"]
    end

    subgraph RENDER ["🖥️ Render Layer"]
        MAIN["main.js\ninitGameRender\npieceRender\nglobalStateRender\nmoveElement\nselfHighlight\nclearHighlight\nclearPreviousSelfHighlight\nrenderHighlight"]
    end

    subgraph EVENTS ["🖱️ Event Layer"]
        GLOB["Global.js\nglobalEvent\nwhitePawnClick\nblackPawnClick\nclearHighlightLocal\nmovePieceFromXtoY"]
    end

    IDX -->|"calls initGame()"| DJS
    IDX -->|"calls initGameRender()"| MAIN
    IDX -->|"calls globalEvent()"| GLOB

    DJS -->|"squareRow calls Square()"| DJS2["Square() factory"]
    MAIN -->|"uses piece factories"| PJS
    MAIN -->|"uses ROOT_DIV"| CONST
    GLOB -->|"uses ROOT_DIV"| CONST
    GLOB -->|"calls render functions"| MAIN
    GLOB -->|"calls checkOpponent"| COMMON
    COMMON -->|"reads globalData"| IDX
    MAIN -->|"reads globalData"| IDX

    style IDX fill:#023e8a,color:#fff
    style DATA fill:#1b263b,color:#fff
    style HELPER fill:#2d3a1e,color:#fff
    style RENDER fill:#3a1e2d,color:#fff
    style EVENTS fill:#1e2d3a,color:#fff
```

---

## 📋 Quick Summary Table

| Flow | Triggered By | Key Functions Called |
|------|-------------|---------------------|
| **App Start** | Browser loads page | `initGame` → `squareRow` → `Square` → `initGameRender` → `pieceRender` → `globalEvent` |
| **Click piece img** | User clicks pawn image | `whitePawnClick` or `blackPawnClick` |
| **Click green dot** | User clicks valid move square | `moveElement` → `clearHighlight` → `globalStateRender` |
| **White Pawn selected** | `whitePawnClick` runs | `clearPreviousSelfHighlight` → `selfHighlight` → `globalStateRender` |
| **Black Pawn selected** | `blackPawnClick` runs | Same as white OR `moveElement` if white was already selected |
| **Piece moves** | `moveElement` runs | `clearHighlight` → DOM swap → update `current_Position` |
