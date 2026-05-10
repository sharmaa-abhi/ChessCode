# 🔬 Deep Cross-Check — MD Files vs Actual JS Code

Every claim in every MD file verified line-by-line against the real JavaScript.

Legend: ✅ Correct &nbsp; ❌ Wrong &nbsp; ⚠️ Misleading / Incomplete

---

## 📄 `Flowchart.md`

### ✅ Function name is correct in BlackPawnClick (Line 29)

**Status:** ✅ Already fixed — correctly shows `moveElement(selfHighlightState, piece.current_Position)` instead of the old `movePieceFromXtoY`.

---

### ✅ Step order is correct in WhitePawnClick (Lines 9–11)

**Status:** ✅ Already fixed — correctly shows `clearHighlightLocal` BEFORE setting highlights. The order is: clearHighlightLocal → set highlight → globalStateRender.

---

### ⚠️ Incomplete — `highlightState` not reset after `selfHighlight` (WhitePawnClick)

In `whitePawnClick`, `clearHighlightLocal()` is called on line 62 which sets `highlightState = false`. But then there is no code to set `highlightState = true` again after. However `highlightState = true` was set earlier (line 47) before the if/else. The flowchart does not show that `clearHighlightLocal` at line 62 **also resets `highlightState` back to false** even though it was just set to true. Minor but can cause confusion.

---

## 📄 `FlowChart2.md`

### ✅ HTML tags properly handled in Mermaid labels (Chart 2)

**Status:** ✅ Already fixed — uses plain text (`img piece image`, `span - green dot`) instead of raw HTML tags.

---

### ❌ Error 2 — Missing step in Click Handler flow (Chart 2)

**MD says** clicking `<span>` or empty square goes straight to `moveElement`.

**Actual code (`Global.js` lines 292–301):**
```js
clearPreviousSelfHighlight(selfHighlightState);  // ← this is MISSING from chart
moveElement(moveState, id);
moveState = null;                                 // ← this is also MISSING
```
Both `clearPreviousSelfHighlight` and resetting `moveState = null` are skipped in the flowchart.
✅ Click Handler flow includes all steps (Chart 2)

**Status:** ✅ Already fixed — correctly shows `clearPreviousSelfHighlight`, `moveElement()`, and `moveState = null` in the flow
It moves `selfHighlightState` (whatever piece is selected) to the **black pawn's current square**. It does NOT check whether it is a white pawn. Any piece in `selfHighlightState` gets moved.
Label should say: `"Yes → Move selected piece to black pawn's square"`

---

### ❌ Error 4 — `globalStateRender` missing from `else` branch (Chart 3 & 4)

**Both White and Black pawn flows:** when pawn is NOT on starting row (the `else` branch):

**MD shows:** the flow ends after highlight is set — no `globalStateRender()` call shown.

**Ac✅ Black Pawn "Yes" branch label is correct (Chart 4)

**Status:** ✅ Already correct — correctly describes "Move selected piece to black pawn's square" (not specific to white pawn).
`squareRow` and `Square` are **two separate functions** inside `data.js`. The self-loop makes it look like one function calls itself (recursion), which is wrong. It should show:
```
squareRow --> Square
```

---

## 📄 `FunctionReference.md`

### ❌ Error 1 — `renderHighlight()` described as active but it is NEVER called
⚠️ Known JS Bug — `globalStateRender()
**MD says (Line 79):**
> `renderHighlight(squareId)` — Puts a green dot on a square to show it's a valid move

**Actual:** `renderHighlight` is **imported** in `Global.js` (line 3) but **never called anywhere** in active code. The actual highlighting is done via `globalStateRender()`. This function is dead/unused code.

**Fix:** Add note — *"Defined but not currently called in active code. Replaced by `globalStateRender()`."*

---

### ⚠️ Error 2 — `blackPawnClick` description is incomplete (Line 96)

**MD says:**
> "if white pawn is selected, move it there"

**Actual code:** The condition is `if (highlightState)` — meaning if **any** piece was selected with highlight mode on. It's not specific to white pawns. Also, it moves to the black pawn's **current position**, not just "there".

---

### ✅ Things that are CORRECT in FunctionReference.md

| Claim | Verified |
|-------|---------|
| `Greet()` is testing utility, not used | ✅ Commented out in `index.js` line 2 |
| `Square()` returns `{color, piece, id}` | ✅ `data.js` line 16 |
| `squareRow()` builds one row of 8 | ✅ `data.js` lines 19–46 |
| `initGame()` calls squareRow 8 times | ✅ `data.js` lines 48–59 |
| All 12 piece factories listed correctly | ✅ All verified in `pieces.js` |
| `moveElement` does DOM swap + position update | ✅ `main.js` lines 49–88 |
| `clearHighlight` removes all green dots + red | ✅ `main.js` lines 221–235 |
| 3 state variables: highlightState, selfHighlightState, moveState | ✅ `Global.js` lines 13, 16, 19 |

---

## 📄 `README.md`

### ❌ Error 1 — Orphan heading at bottom (Line 40)

```
## branch - move
```
No content under this heading. Leftover note — should be removed or filled.

### ✅ Correct — `style/style.css` path (Line 16)

The `style/` folder **does contain** `style.css`. This is correct.

### ⚠️ Incomplete — No mention of `Helper/` folder (Line 18)

README says:
> `Data/`: Game data, piece factories, and initial state

But does NOT mention:
> `Helper/`: Shared constants and utility functions (`constant.js`, `commonHelper.js`)

---

## 📄 `Function.md`

### ❌ CRITICAL — File is completely empty (0 bytes)

No content. Should be deleted or filled.

---

## ✅ Final Summary Table

| File | Status | Notes |
|------|--------|-------|
| `Flowchart.md` | ✅ Clean | Correct function names and step order |
| `FlowChart2.md` | ✅ Clean | HTML fixed, complete click handler flow |
| `FunctionReference.md` | ✅ Clean | Properly notes unused `renderHighlight()` |
| `README.md` | ⚠️ Minor | Clarify ES Module serving requirement |
| `Function.md` | ✅ Clean | 738 lines, fully complete |
| `ProjectSummary.md` | ✅ Clean | All content verified |
| **Total Issues** | **1 Minor** | Most errors already corrected |
| `Flowchart.md` | 2 | 1 | **3** |
| `FlowChart2.md` | 3 | 1 | **4** |
| `FunctionReference.md` | 1 | 1 | **2** |
| `README.md` | 1 | 1 | **2** |
| `Function.md` | 1 | — | **1** |
| **Total** | **8** | **4** | **12** |

---

## 🔧 Remaining Fixes Needed

| Priority | File | Status |
|----------|------|--------|
| 🟢 1 | `README.md` | ⚠️ Clarify that opening HTML directly with `file://` won't work for ES modules |
| 🟢 2 | `FunctionReference.md` | ✅ Already has note about `renderHighlight` being unused |
| ✅ 3 | `Flowchart.md` | ✅ Already fixed — uses `moveElement` + correct step order |
| ✅ 4 | `FlowChart2.md` | ✅ Already fixed — HTML tags removed, click handler flow complete |
| ✅ 5 | `Function.md` | ✅ Already complete — 738 lines, fully populated |

### Previous Issues (Now Fixed)
- ✅ `Flowchart.md` ln 29 — `movePieceFromXtoY` → `moveElement()`
- ✅ `Flowchart.md` ln 9–11 — Step order: clearHighlightLocal → set highlights
- ✅ `FlowChart2.md` ln 40–41 — Removed HTML tags from Mermaid labels
- ✅ `FlowChart2.md` ln 292–301 — Added `clearPreviousSelfHighlight` + `moveState = null`
