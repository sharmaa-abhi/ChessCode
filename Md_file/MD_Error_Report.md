# 📋 ChessCode — MD Files Error Report

> Full audit of all 6 markdown files against actual JS source code.
> Legend: ❌ Wrong &nbsp; ⚠️ Misleading/Incomplete &nbsp; ✅ Correct &nbsp; 🐛 Bug in JS (not MD)

---

## 📄 `Flowchart.md` — 2 Errors Found

### ✅ Function name is CORRECT (Line 28)

**Status:** FIXED — Flowchart.md correctly shows:
```
B3[moveElement selfHighlightState to piece current position]
```
Not the old `movePieceFromXtoY`. The error has been corrected.

---

### ✅ Step order is CORRECT (Lines 9–11)

**Status:** FIXED — Flowchart.md correctly shows:
```
W9[clearHighlightLocal]   ← shown BEFORE setting highlights
W10[set highlight = true on +1 and +2 squares]
W11[globalStateRender]
```
The order is correct: clearHighlightLocal → set highlights → globalStateRender.

---

### ⚠️ Incomplete — `highlightState` side-effect not shown (WhitePawnClick)

`clearHighlightLocal()` at line 62 sets `highlightState = false`, even though `highlightState = true` was set just before it (line 47). The flowchart doesn't show this reset. Minor, but can cause confusion when reading.

---

## 📄 `FlowChart2.md` — 4 Errors Found

### ❌ Error 1 — HTML tags `<img>` / `<span>` inside Mermaid edge labels (Chart 2, Lines 40–41)

**MD says:**
```
B -->|"<img> piece image"| C
B -->|"<span> green dot"| G
```
Raw `<img>` and `<span>` HTML tags inside Mermaid labels **break rendering** in standard Mermaid parsers.

> [!NOTE]
> The current `FlowChart2.md` file **already has these as plain text** (`img piece image`, `span - green dot`) — this was already fixed. ✅ Confirmed correct in file.

---

### ✅ Error 2 — FIXED: Click Handler flow now complete (Chart 2)

**Status:** Fixed — FlowChart2.md correctly shows:
```
B -->|"span - green dot"| G["clearPreviousSelfHighlight\nmoveElement to that square\nmoveState = null"]
```
All required steps are now included in the flowchart.

---

### ❌ Error 3 — Misleading label in Black Pawn "Yes" branch (Chart 4, Line 99)

**MD says:** `"Yes - Move selected piece to black pawn's square"` ← label is on the edge

**Actual code (`Global.js` line 119):**
```js
moveElement(selfHighlightState, piece.current_Position);
```
The code moves `selfHighlightState` (any piece, not just white pawn) to the black pawn's square. The chart description says "Yes → Move selected piece" which is correct. ✅ This is **already fixed** in the current file (no mention of "white pawn").

---

### ⚠️ Misleading — Self-loop arrow on `data.js` node in Big Picture chart (Chart 6, Line 178)

**MD says:**
```
DJS -->|"squareRow calls Square() factory"| DJS2["Square() factory"]
```
`squareRow` and `Square` are **two separate functions** inside `data.js`. The extra `DJS2` node represents `Square` as a separate node, but the label "squareRow calls Square() factory" is attached to `DJS` pointing to `DJS2`, which is actually fine logically.

> [!NOTE]
> Current file uses `DJS2["Square() factory"]` as a separate node — this is acceptable. ✅ Not actually broken.

---

### 🐛 Bug in JS — `globalStateRender()` missing from `else` branch (not an MD error)

In both `whitePawnClick` and `blackPawnClick`, the `else` branch (pawn not on starting row) sets `element.highlight = true` but **never calls `globalStateRender()`** afterward.

```js
// Global.js lines 95-108 (whitePawnClick else branch)
clearHighlight();
highlightedSquareIds.forEach(...element.highlight = true...);
// ← NO globalStateRender() here — highlights won't appear on screen!
```
**This is a real bug in the JS code itself.** The green dot for non-starting-row pawn moves is never rendered. The MD files accidentally document this bug correctly by not showing `globalStateRender` in the else branch.

**JS Fix needed:** Add `globalStateRender()` after the `forEach` loop in both else branches.

---

## 📄 `FunctionReference.md` — 1 Warning, Already Fixed

### ✅ `renderHighlight()` note already present (Line 79)

The file already says:
> `renderHighlight(squareId)` — ⚠️ Defined but **never called** in active code. Replaced by `globalStateRender()`.

✅ No action needed.

### ✅ `blackPawnClick` description is correct (Line 96)

The file correctly says:
> "if `highlightState` is true (any piece already selected), moves that selected piece to this square using `moveElement`"

✅ No action needed.

---

## 📄 `README.md` — 1 Error Already Fixed, 1 Issue Remaining

### ✅ No orphan `## branch - move` heading

Checked the current `README.md` (37 lines) — no such heading exists. Already fixed.

### ✅ README.md — Now correctly emphasizes local server requirement

**Status:** FIXED — Getting Started section now clearly states:
```
1. Serve the folder with a local static server (required for ES Modules).
   Examples: Python, Node.js, VS Code Live Server

> ⚠️ Important: Do NOT open index.html directly using file:// 
```
The direct file opening is no longer listed as an option.

### ✅ `Helper/` folder mentioned in README (Line 20)

> `Helper/`: Shared constants (`constant.js`) and utility functions (`commonHelper.js`)

✅ Already present.

---

## 📄 `Function.md` — 0 Errors

`Function.md` is **fully populated** (738 lines, 33,979 bytes). The `MD_CrossCheck.md` incorrectly says it's empty — that check is stale. ✅ No action needed.

---

## 📄 `ProjectSummary.md` — 1 Warning

### ⚠️ Lists `FunctionReference.md` as a documentation file (Line 143)

The file lists `FunctionReference.md` in the documentation table, but `Function.md` duplicates much of that content (and goes deeper). Consider noting the relationship between them.

---

## 📄 `MD_CrossCheck.md` — Stale Information

The cross-check file itself has stale entries:

| Claim in MD_CrossCheck.md | Reality |
|--------------------------|---------|
| `FlowChart2.md` has `<img>/<span>` HTML in labels | Already fixed — uses plain text |
| `Function.md` is empty (0 bytes) | False — it's 738 lines, fully written |
| `README.md` has orphan `## branch - move` | Already removed |
| `FunctionReference.md` doesn't note `renderHighlight` as unused | Already fixed |

**The MD_CrossCheck.md is now outdated and reflects issues that were already corrected.**

---

## 🐛 Actual JS Bug Found (Not a Doc Error)

> [!CAUTION]
> **Real bug in `Global.js`:** `globalStateRender()` is missing from the `else` branch of both `whitePawnClick` and `blackPawnClick`.
>
> Effect: When a pawn is **not** on its starting row, clicking it shows the yellow glow but the **green dot never appears** on screen (the highlight is set in data but never rendered to DOM).
>
> **Locations to fix:**
> - `Global.js` line ~108 (after `whitePawnClick` else forEach)
> - `Global.js` line ~193 (after `blackPawnClick` else forEach)

---

## ✅ Final Summary

| File | ❌ Active Errors | ⚠️ Warnings | 🐛 JS Bug | Status |
|------|----------------|------------|----------|--------|
| `Flowchart.md` | 2 | 1 | — | Needs fix |
| `FlowChart2.md` | 1 | 1 | 1 (JS bug) | 1 fix needed |
| `FunctionReference.md` | 0 | 0 | — | ✅ Clean |
| `README.md` | 0 | 1 | — | Minor update |
| `Function.md` | 0 | 0 | — | ✅ Clean |
| `ProjectSummary.md` | 0 | 1 | — | ✅ Clean |
| `MD_CrossCheck.md` | 4 stale entries | — | — | Needs update |

### 🔧 Priority Fix List

| Priority | File | Fix |
|----------|------|-----|
| 🔴 1 | `Global.js` | Add `globalStateRender()` after else-branch forEach in both pawn click functions |
| 🔴 2 | `Flowchart.md` line 28 | Change `B3[movePieceFromXtoY]` → `B3["moveElement(selfHighlightState, piece.current_Position)"]` |
| 🔴 3 | `Flowchart.md` lines 9–11 | Fix step order: clearHighlightLocal → set highlights → globalStateRender |
| 🟡 4 | `FlowChart2.md` Chart 2 | Add `clearPreviousSelfHighlight` + `moveState = null` nodes to click handler flow |
| 🟡 5 | `MD_CrossCheck.md` | Update stale entries (Function.md is not empty, HTML tags already fixed, etc.) |
| 🟢 6 | `README.md` line 25 | Clarify that direct file:// open won't work for ES modules |
