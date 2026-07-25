# 🚀 ChessCode — Future Implementation Roadmap

**Last Updated:** July 20, 2026  
**Current Completion:** ~90% — Fully playable 2-player chess

This document outlines all planned features, their priority, estimated effort, and implementation approach.

---

## 📊 Priority Matrix

| Priority | Feature | Effort | Impact |
|----------|---------|--------|--------|
| 🔴 P0 | Check Detection | ~2 hours | Core rule — blocks checkmate |
| 🔴 P0 | Checkmate Detection | ~1 hour | Game-ending logic |
| 🟠 P1 | Stalemate / Draw Detection | ~1 hour | Prevents infinite games |
| 🟠 P1 | En Passant | ~45 min | Missing pawn rule |
| 🟡 P2 | Move Validation (Pin/Discovery) | ~3 hours | Prevents illegal moves through pins |
| 🟡 P2 | Sound Effects | ~30 min | Move, capture, check sounds |
| 🟢 P3 | Move History / Undo | ~2 hours | Navigate & rewind moves |
| 🟢 P3 | Game State Persistence | ~1 hour | Save/resume games |
| 🟢 P3 | New Game / Resign Buttons | ~30 min | Game control UI |
| 🔵 P4 | AI Opponent (Minimax) | ~6 hours | Single-player mode |
| 🔵 P4 | Online Multiplayer | ~8 hours | WebSocket-based play |
| 🔵 P4 | Move Animation | ~2 hours | Smooth piece sliding |

---

## 🔴 Phase 1 — Check & Checkmate (Core Rules)

### 1.1 Check Detection

**Status:** `checkForCheck()` stub exists in `Events/Global.js`  
**Goal:** After every move, detect if the opponent's king is in check.

**Approach:**
```
After moveElement() completes:
  1. Get opponent king's position from globalPiece
  2. Generate all attack squares for the moving player:
     - Use existing giveXxxCaptureIds() helpers (already built!)
     - Collect all squares attacked by every piece of the current player
  3. If opponent king's square is in the attack set → CHECK
  4. Visual feedback: highlight king square red + play check sound
```

**Files to modify:**
- `Events/Global.js` — Complete `checkForCheck()` implementation
- `style/style.css` — Add `.in-check` CSS class (red king highlight)

**Existing helpers ready to use:**
- `giveRookCaptureIds()`, `giveBishopCaptureIds()`, `giveKnightCaptureIds()`
- `giveQueenCaptureIds()`, `giveKingCaptureIds()`
- `checkPieceOfOpponentOnElementNoDom()` — already does check without DOM side effects

---

### 1.2 Checkmate Detection

**Goal:** After detecting check, determine if the king has no legal escape.

**Approach:**
```
If king is in CHECK:
  1. Can king move to any safe square? (8 directions)
     - For each adjacent square: simulate move → check if still attacked
  2. Can any piece block the check? (interpose)
     - Find the attacking piece
     - Find squares between attacker and king
     - Can any friendly piece move to those squares?
  3. Can the attacking piece be captured?
     - Is the attacker on any friendly piece's attack set?
  
  If all three = NO → CHECKMATE → Game Over
```

**Files to modify:**
- `Events/Global.js` — New `checkForCheckmate()` function
- `Helper/commonHelper.js` — Add `simulateMove()` helper (temporary move + undo)
- `index.html` — Checkmate overlay UI (similar to timeout overlay)

---

### 1.3 Illegal Move Prevention

**Goal:** Block moves that would leave your own king in check.

**Approach:**
```
Before executing any move:
  1. Simulate the move (temporarily update globalData)
  2. Run check detection on your OWN king
  3. If your king would be in check → reject the move, undo simulation
  4. If safe → proceed with the real move
```

This handles:
- **Pinned pieces** — A bishop pinned to the king can't move sideways
- **King walking into check** — King can't move to attacked squares
- **Discovered check** — Moving a piece that exposes your king

---

## 🟠 Phase 2 — Stalemate & En Passant

### 2.1 Stalemate Detection

**Goal:** If a player has no legal moves but is NOT in check → draw.

**Approach:**
```
At start of each turn:
  1. For every piece of the current player:
     - Calculate all possible moves (using existing highlight helpers)
     - For each move: simulate → check if own king is safe
  2. If total legal moves = 0 AND king not in check → STALEMATE
  3. Show "Draw by Stalemate" overlay
```

---

### 2.2 En Passant

**Goal:** Allow pawns to capture an adjacent pawn that just double-moved.

**Approach:**
```
New state variable: lastPawnDoubleMove = null

After pawn double-move (row 2→4 or row 7→5):
  lastPawnDoubleMove = { square: "e4", piece: pawnRef }

In pawnClick():
  Check if adjacent square has a pawn that matches lastPawnDoubleMove
  If yes → add capture highlight on the square BEHIND the enemy pawn
  
After any non-en-passant move:
  lastPawnDoubleMove = null  (expires after one turn)
```

**Files to modify:**
- `Events/Global.js` — Add `lastPawnDoubleMove` state, update `whitePawnClick` / `blackPawnClick`
- `Events/Global.js` — Clear `lastPawnDoubleMove` in `changeTurn()`

---

## 🟡 Phase 3 — Polish & UX

### 3.1 Sound Effects

**Approach:**
```js
// Create audio elements once
const sounds = {
  move:    new Audio('./Assets/Sounds/move.mp3'),
  capture: new Audio('./Assets/Sounds/capture.mp3'),
  check:   new Audio('./Assets/Sounds/check.mp3'),
  castle:  new Audio('./Assets/Sounds/castle.mp3'),
  promote: new Audio('./Assets/Sounds/promote.mp3'),
  gameEnd: new Audio('./Assets/Sounds/game-end.mp3'),
};

// Play in moveElement() based on move type
```

**Files to modify:**
- `Events/Global.js` — Play sounds in `moveElement()` and `changeTurn()`
- New folder: `Assets/Sounds/` with 6 audio files

---

### 3.2 New Game / Resign Buttons

**Approach:**
- Add buttons to the side panel in `index.html`
- "New Game" → Reset `globalData`, re-render board, reset timers
- "Resign" → Declare opponent as winner, show overlay

---

## 🟢 Phase 4 — Advanced Features

### 4.1 Move History & Undo

**Approach:**
```js
// Stack-based history
const moveHistory = [];

// After each move:
moveHistory.push({
  piece, from, to,
  capturedPiece,  // null or piece object
  wasPromotion,
  wasCastle,
  boardSnapshot: JSON.parse(JSON.stringify(globalData))
});

// Undo:
const last = moveHistory.pop();
// Restore globalData from snapshot
// Re-render board
```

---

### 4.2 Game State Persistence

**Approach:**
- Serialize `globalData` + `inTurn` + timer state to `localStorage`
- Auto-save after each move
- On page load: check for saved game → offer "Resume" or "New Game"

---

## 🔵 Phase 5 — AI & Multiplayer

### 5.1 AI Opponent (Minimax)

**Approach:**
```
Minimax with Alpha-Beta Pruning:
  1. Generate all legal moves for AI color
  2. For each move: simulate → evaluate board → recurse
  3. Evaluation function:
     - Material count (pawn=1, knight/bishop=3, rook=5, queen=9)
     - Center control bonus
     - King safety bonus
     - Mobility (number of legal moves)
  4. Search depth: 3-4 moves ahead (adjustable difficulty)
  5. Pick the move with best evaluation score
```

**New files:**
- `AI/minimax.js` — Core AI algorithm
- `AI/evaluation.js` — Board evaluation function

---

### 5.2 Online Multiplayer (WebSocket)

**Approach:**
- Upgrade `server.js` to use `ws` (WebSocket library)
- Room-based matchmaking (create/join game)
- Sync moves between two clients via WebSocket messages
- Each client renders their own board; server validates moves

---

## 📐 Implementation Order

```
Phase 1 (Essential — makes it a "real" chess game)
  ├── 1.1 Check detection
  ├── 1.2 Checkmate detection
  └── 1.3 Illegal move prevention
        │
Phase 2 (Completeness)
  ├── 2.1 Stalemate detection
  └── 2.2 En passant
        │
Phase 3 (Polish)
  ├── 3.1 Sound effects
  └── 3.2 New Game / Resign buttons
        │
Phase 4 (Advanced)
  ├── 4.1 Move history / undo
  └── 4.2 Game state persistence
        │
Phase 5 (Big features)
  ├── 5.1 AI opponent
  └── 5.2 Online multiplayer
```

---

## 🧩 What's Already Built (Reusable)

These existing functions make Phase 1 much easier — most attack-square logic is already done:

| Existing Function | Useful For |
|---|---|
| `giveRookCaptureIds()` | Check detection (rook attacks) |
| `giveBishopCaptureIds()` | Check detection (bishop attacks) |
| `giveKnightCaptureIds()` | Check detection (knight attacks) |
| `giveQueenCaptureIds()` | Check detection (queen attacks) |
| `giveKingCaptureIds()` | Check detection (king attacks) |
| `checkPieceOfOpponentOnElementNoDom()` | Check without DOM side effects |
| `globalPiece.white_King` / `black_King` | Quick king position lookup |
| `keySquareMapper` | O(1) square lookup for simulation |

> 💡 **Key Insight:** The hardest part (move generation and attack-square calculation) is already implemented. Check/checkmate is mainly about *using* these existing helpers in new combinations.
