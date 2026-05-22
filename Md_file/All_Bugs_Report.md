# 🪲 Complete Bug History & Resolutions

This document catalogs all the bugs—both old and new—that were discovered and resolved across the ChessCode project during the audits.

---

## 🛑 1. White Pawn Reverse Direction Bug (Old Bug)
**Type:** Mathematical Logic Error
**Location:** `Events/Global.js` (`whitePawnClick`)

**The Problem:**
When a white pawn was on its starting row (`piece.current_Position[1] == "2"`), the code calculated its available forward moves by **subtracting** 1 and 2 from its current row (`-1`, `-2`). Because white pawns start at the bottom and move UP the board, the row numbers should be increasing. The code was making white pawns attempt to move backwards off the board.

**The Fix:**
Replaced `- 1` and `- 2` with `+ 1` and `+ 2` in the `whitePawnClick` starting row condition.

---

## 🛑 2. Pawn Captures Blocked (New Bug)
**Type:** Logical Sequence Error
**Location:** `Events/Global.js` (both pawn click functions) & `Helper/commonHelper.js`

**The Problem:**
After generating the diagonal `captureIds`, the code passed them through `checkSquareCaptureId(captureIds)`. 
The `checkSquareCaptureId` function uses a `break` statement to stop returning squares the moment it hits a piece (which is correct behavior for regular forward movement so pawns don't jump over pieces). 
However, capture squares **must** contain enemy pieces. By passing capture IDs through this function, any valid capture square containing an enemy piece was immediately discarded. Pawns were entirely unable to capture.

**The Fix:**
Removed the `captureIds = checkSquareCaptureId(captureIds);` line entirely. The diagonal IDs are now passed directly to `checkPieceOfOpponentOnElement()`, which safely handles checking for enemy colors.

---

## 🛑 3. Edge Pawn Fatal Crash (New Bug)
**Type:** Runtime Exception (`TypeError`)
**Location:** `Helper/commonHelper.js` (`checkSquareCaptureId`)

**The Problem:**
When a pawn is on the edge of the board (e.g., the `h` file), calculating its right diagonal results in a column that does not exist (e.g., the `i` column). When `keySquareMapper` tries to look up this invalid ID (like `i3`), it returns `undefined`. 
The next line of code executed `if (square.piece) { break; }`. Attempting to read `.piece` on an `undefined` object caused a fatal JavaScript crash (`Cannot read properties of undefined`).

**The Fix:**
Added a safety guard clause: `if (!square) break;` just before checking for a piece. If the square is off the board, it safely halts execution without crashing.

---

## 🛑 4. Severe Render Performance Loop (New Bug)
**Type:** Performance Bottleneck ($O(N^2)$ Complexity)
**Location:** `Render/main.js` (`clearHighlight`)

**The Problem:**
To clear highlights, the `clearHighlight` function used a `forEach` loop over all 64 squares on the board. Inside this loop, it modified the data flag, but it also executed `globalStateRender()`. 
Because `globalStateRender()` itself contains a loop over all 64 squares, the code was forcing the browser to perform $64 \times 64 = 4,096$ operations every single time a highlight was cleared.

**The Fix:**
Moved the call to `globalStateRender()` **outside** and below the `forEach` loop. It now rapidly flags all 64 squares in memory first, and then triggers a single DOM render update at the end, returning the operation to lightning-fast $O(N)$ speed.

---

## ✅ Current Project Status
All 4 of these bugs have been successfully patched in the live `.js` files. The pawn movement, boundary interactions, capturing mechanics, and rendering engine are now robust and functioning as expected.
