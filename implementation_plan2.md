# ChessCode — Comprehensive Update Plan

Full audit of the codebase with all bugs, timing issues, and functional upgrades identified.

---

## User Review Required

> [!IMPORTANT]
> This plan covers **15+ changes** across all files. Some are critical bug fixes that break gameplay, others are new features. Please review which ones you want.

> [!WARNING]
> **Critical Bug — Turn system is completely broken.** The `switch` statement in `globalEvent()` has `if (inTurn == "white");` with a **semicolon** instead of a block — this means every piece handler runs regardless of whose turn it is. This is the #1 priority fix.

---

## Proposed Changes

### 🔴 Critical Bug Fixes (Gameplay-Breaking)

---

#### 1. [MODIFY] [Global.js](file:///c:/chessCode/ChessCode/Events/Global.js) — Fix Broken Turn Enforcement

**Lines 1350–1397**: Every `case` in the switch has `if (inTurn == "white");` — the semicolon makes the `if` do nothing, so the piece click handler runs unconditionally.

```diff
 case "WHITE_PAWN":
-  if (inTurn == "white");
-  whitePawnClick(square);
+  whitePawnClick(square);
   break;
```

The turn check is already handled above in the `captureInTurn` guard (lines 1340–1346), so these redundant (and broken) `if` statements should simply be removed from all 12 cases.

---

#### 2. [MODIFY] [Global.js](file:///c:/chessCode/ChessCode/Events/Global.js) — Black King Missing Capture-on-Highlighted-Square

**Lines 344–463**: `blackKingClick()` is missing the `if (square.captureHighlight)` block that `whiteKingClick()` has at line 223. This means clicking a black king on a capture-highlighted square does nothing instead of capturing.

```diff
 function blackKingClick(square) {
   const piece = square.piece;
   if (piece == selfHighlightState) { ... return; }
+
+  if (square.captureHighlight) {
+    moveElement(selfHighlightState, piece.current_Position);
+    clearPreviousSelfHighlight(selfHighlightState);
+    clearHighlightLocal();
+    return;
+  }
   // clear all highlights
```

---

#### 3. [MODIFY] [Global.js](file:///c:/chessCode/ChessCode/Events/Global.js) — `checkForPawnPromotion` Matches Wrong Rank Digits

**Lines 87–107**: `id?.includes("8")` and `id?.includes("1")` will falsely match squares like `a8`→`a1` but also any id substring. For example, a pawn on `h1` (id="h1") — the `includes("1")` matches even for white, which is wrong. More critically, `includes("8")` matches the square "a8" column character too. The fix: check only `id?.[1] === "8"` (the rank digit).

```diff
- piece?.piece_name?.toLowerCase()?.includes("pawn") && id?.includes("8")
+ piece?.piece_name?.toLowerCase()?.includes("pawn") && id?.[1] === "8"

- piece?.piece_name?.toLowerCase()?.includes("pawn") && id?.includes("1")
+ piece?.piece_name?.toLowerCase()?.includes("pawn") && id?.[1] === "1"
```

---

### 🟡 Functional Bugs (Incorrect Behavior)

---

#### 4. [MODIFY] [Global.js](file:///c:/chessCode/ChessCode/Events/Global.js) — Queen/Bishop/Rook/King Missing Capture-Move for Same-Color Reselection

In handlers like `whiteQueenClick`, `blackQueenClick`, `whiteRookClick`, `blackRookClick`, `whiteBishopClick`, `blackBishopClick` — when a piece is already selected and you click another piece of the same color that sits on a capture-highlighted square, the `captureInTurn` fallback handles it. But these handlers don't check `square.captureHighlight` for capture-moves like the king/pawn handlers do. This can cause subtle issues where clicking a capture square with an opponent's piece doesn't always trigger a move. **No change needed** — the `captureInTurn` guard at line 1332 handles this globally before the switch statement. This is working correctly.

---

#### 5. [MODIFY] [Render/main.js](file:///c:/chessCode/ChessCode/Render/main.js) — `globalPiece` Only Stores Last Pawn Reference

**Lines 100–148**: `globalPiece.black_Pawn = square.piece` overwrites on every pawn — so `globalPiece.black_Pawn` only holds the last black pawn (h7), not all 8. Same for `white_Pawn`. This matters for `checkForCheck()` which would need all pawns.

```diff
- globalPiece.black_Pawn = square.piece;
+ if (!globalPiece.black_Pawns) globalPiece.black_Pawns = [];
+ globalPiece.black_Pawns.push(square.piece);

- globalPiece.white_Pawn = square.piece;
+ if (!globalPiece.white_Pawns) globalPiece.white_Pawns = [];
+ globalPiece.white_Pawns.push(square.piece);
```

---

#### 6. [MODIFY] [Global.js](file:///c:/chessCode/ChessCode/Events/Global.js) — `checkForCheck()` is Incomplete (Stub)

**Lines 41–66**: The function computes capture lists for black pieces but never actually checks if the white king is in those lists. The `else` branch for black's turn does nothing at all. This should be completed or left as a stub with a `// TODO`.

For now, add a clear TODO comment to avoid confusion:

```diff
 function checkForCheck() {
+  // TODO: Incomplete — needs to check if king position is in opponent's attack squares
   if (inTurn === "white") {
```

---

### 🟢 New Feature: Chess Timers (Clock System)

---

#### 7. [MODIFY] [index.html](file:///c:/chessCode/ChessCode/index.html) — Add Timer UI

Add a timer panel above or beside the board showing both players' remaining time.

```html
<div id="timer-panel">
  <div id="black-timer" class="timer">
    <span class="timer-label">Black</span>
    <span class="timer-time" id="black-time">10:00</span>
  </div>
  <div id="white-timer" class="timer active-timer">
    <span class="timer-label">White</span>
    <span class="timer-time" id="white-time">10:00</span>
  </div>
</div>
```

---

#### 8. [NEW] [Helper/timer.js](file:///c:/chessCode/ChessCode/Helper/timer.js) — Chess Timer Module

Create a timer module with:
- `ChessTimer` class with configurable initial time (default 10 minutes)
- `start()`, `stop()`, `switchTurn()` methods
- Countdown per player, pausing the inactive player's clock
- Timeout detection (flag fall) — alert or disable the timed-out player
- Integration with `changeTurn()` in Global.js

---

#### 9. [MODIFY] [style/style.css](file:///c:/chessCode/ChessCode/style/style.css) — Timer Styling

Add premium-styled timer UI with:
- Active player timer highlighted/glowing
- Countdown digits in monospace
- Low-time warning (red glow when < 30 seconds)
- Smooth transitions between active states

---

#### 10. [MODIFY] [Global.js](file:///c:/chessCode/ChessCode/Events/Global.js) — Integrate Timer with Turn Changes

Call `chessTimer.switchTurn()` inside `changeTurn()` so the clock switches on every move.

---

### 🔵 UI & Quality-of-Life Improvements

---

#### 11. [MODIFY] [index.html](file:///c:/chessCode/ChessCode/index.html) — Add Turn Indicator

Add a visual turn indicator showing whose turn it is with the player's color.

```html
<div id="turn-indicator">
  <span id="turn-dot"></span>
  <span id="turn-text">White's Turn</span>
</div>
```

---

#### 12. [MODIFY] [Global.js](file:///c:/chessCode/ChessCode/Events/Global.js) — Update Turn Indicator on Turn Change

Update `changeTurn()` to also update the turn indicator DOM element.

---

#### 13. [MODIFY] [style/style.css](file:///c:/chessCode/ChessCode/style/style.css) — Add Last-Move Highlight

After a move, highlight both the source and destination squares with a subtle color (like chess.com's light yellow/green) so the player can see what the last move was.

---

#### 14. [MODIFY] [Global.js](file:///c:/chessCode/ChessCode/Events/Global.js) — Track and Render Last-Move Highlight

Store `lastMoveFrom` and `lastMoveTo` in state, apply/remove CSS class on each move.

---

#### 15. [MODIFY] [ProjectSummary.md](file:///c:/chessCode/ChessCode/ProjectSummary.md) — Update Documentation

Update the "What's Not Yet Implemented" table since many features are now implemented:
- Turn management ✅
- Castling ✅  
- Pawn promotion ✅
- Timer system ✅ (new)

---

### 🧹 Code Cleanup

---

#### 16. [MODIFY] [Data/data.js](file:///c:/chessCode/ChessCode/Data/data.js) — Remove Dead `Greet()` Function

The `Greet()` function at line 1 is never called or exported.

#### 17. [MODIFY] [Render/main.js](file:///c:/chessCode/ChessCode/Render/main.js) — Remove Dead `renderHighlight()` Function

`renderHighlight()` at line 204 is unused — `globalStateRender()` handles highlights.

---

## Verification Plan

### Manual Verification
1. Start the server with `node server.js` and open `http://localhost:8082`
2. Verify turn enforcement — white moves first, then black, alternating
3. Verify timers count down for the active player and pause for the inactive player
4. Verify pawn promotion triggers only on rank 8 (white) and rank 1 (black)
5. Verify last-move highlighting shows source and destination squares
6. Verify castling still works for both colors
7. Verify the turn indicator updates on each move
8. Verify timer runs out → game ends with timeout message
