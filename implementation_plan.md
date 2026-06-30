# Implementation Plan — ChessCode Bug Fixes

This plan outlines the fixes for all identified logic, highlighting, and capture bugs across the ChessCode project files.

## Proposed Changes

### Data and Initialization
---
#### [MODIFY] [data.js](file:///c:/chessCode/ChessCode/Data/data.js)
- Change `"null"` string references to JS native `null` in [`Square`](file:///c:/chessCode/ChessCode/Data/data.js#L9) and [`squareRow`](file:///c:/chessCode/ChessCode/Data/data.js#L19) initialization.

### Rendering Engine
---
#### [MODIFY] [main.js](file:///c:/chessCode/ChessCode/Render/main.js)
- Update [`pieceRender`](file:///c:/chessCode/ChessCode/Render/main.js#L81) to compare against native `null` instead of `"null"`.
- Remove unused import of `movePieceFromXtoY` (Line 4).
- Delete the unused [`renderHighlight`](file:///c:/chessCode/ChessCode/Render/main.js#L188) function.

### Click Handlers & Move Logic
---
#### [MODIFY] [Global.js](file:///c:/chessCode/ChessCode/Events/Global.js)
- **Pawn Click Handlers:** Remove `captureIds = checkSquareCaptureId(captureIds);` in both [`whitePawnClick`](file:///c:/chessCode/ChessCode/Events/Global.js#L858) and [`blackPawnClick`](file:///c:/chessCode/ChessCode/Events/Global.js#L1122). This allows pawns to highlight valid capture targets containing enemy pieces.
- **White Knight Handler:** Fix [`whiteKnightClick`](file:///c:/chessCode/ChessCode/Events/Global.js#L473) capture check logic to call `checkPieceOfOpponentOnElement(element, "white")` instead of `"black"`.
- **Major Piece Blocking Logic:** Update check conditions in all King, Queen, Bishop, and Rook click handlers:
  - For white pieces: Check if `checkPieceResult.piece.piece_name.startsWith("WHITE_")` to break out of blocking.
  - For black pieces: Check if `checkPieceResult.piece.piece_name.startsWith("BLACK_")` to break out of blocking.
- **Pawn Cleanup:** Remove the duplicate, unreachable check `if (piece == selfHighlightState)` at lines 880-884.

### Helper Utilities
---
#### [MODIFY] [commonHelper.js](file:///c:/chessCode/ChessCode/Helper/commonHelper.js)
- Fix [`giveKingHighlightedIds`](file:///c:/chessCode/ChessCode/Helper/commonHelper.js#L371) to map coordinates as a flat array `[element[0]]` instead of a double-nested structure `new Array([element[0]])`. This resolves errors with King move highlighting and mapper mismatches.

#### [MODIFY] [constant.js](file:///c:/chessCode/ChessCode/Helper/constant.js)
- Remove the large commented-out legacy code block (lines 5-73).

---

## Verification Plan

### Manual Verification
1. **Pawn capturing verification:** Place an opposing piece diagonally in front of a white/black pawn. Verify that the square highlights in red and the capture can be executed.
2. **Knight capturing verification:** Verify white knight highlights black pieces as red captures and does not highlight white pieces.
3. **Major piece blocking & capturing verification:** Ensure Rooks, Bishops, and Queens cannot jump over or capture their own pieces, and that blocking works correctly along files, ranks, and diagonals.
4. **King move verification:** Verify that clicking the King highlights all adjacent valid squares (glowing yellow for self, green for empty, red for opponent piece capture).
5. **No Console Errors:** Open the browser console and check for any `null`/`undefined` property read errors.
