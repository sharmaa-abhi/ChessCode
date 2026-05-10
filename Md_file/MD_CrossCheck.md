# 🔬 Deep Cross-Check — MD Files vs Actual JS Code

Every claim in every MD file verified line-by-line against the real JavaScript.

Legend: ✅ Correct &nbsp; ❌ Wrong &nbsp; ⚠️ Misleading / Incomplete

---

## 📄 `Flowchart.md`

### ❌ Error 1 — Wrong function name (Line 29, BlackPawnClick branch)

**MD says:**
```
B3[movePieceFromXtoY]
```
**Actual code (`Global.js` line 119):**
```js
moveElement(selfHighlightState, piece.current_Position);
```
`movePieceFromXtoY` is **commented out** (line 118). The real call is `moveElement`. The flowchart shows the old/replaced function.

---

### ❌ Error 2 — Wrong ORDER of steps (Lines 9–11, WhitePawnClick, Row 2 branch)

**MD shows this order:**
```
W9[highlight +1 and +2 squares]
  ↓
W10[clearHighlightLocal]   ← clears AFTER setting
  ↓
W11[globalStateRender]
```
**Actual code (`Global.js` lines 56–77):**
```js
// Step 1: Define IDs
const highlightedSquareIds = [ ... ];

// Step 2: Clear FIRST
clearHighlightLocal();

// Step 3: Then set highlight
highlightedSquareIds.forEach(...element.highlight = true...);

// Step 4: Render
globalStateRender();
```
**Real order:** define IDs → **clearHighlightLocal** → set highlight → globalStateRender.
The MD has `clearHighlightLocal` AFTER setting highlights. This is **reversed**.

---

### ⚠️ Incomplete — `highlightState` not reset after `selfHighlight` (WhitePawnClick)

In `whitePawnClick`, `clearHighlightLocal()` is called on line 62 which sets `highlightState = false`. But then there is no code to set `highlightState = true` again after. However `highlightState = true` was set earlier (line 47) before the if/else. The flowchart does not show that `clearHighlightLocal` at line 62 **also resets `highlightState` back to false** even though it was just set to true. Minor but can cause confusion.

---

## 📄 `FlowChart2.md`

### ❌ Error 1 — HTML tags inside Mermaid edge labels (Chart 2, Lines 40–41)

**MD says:**
```
B -->|"<img> piece image"| C
B -->|"<span> green dot"| G
```
Raw `<img>` and `<span>` HTML tags inside Mermaid labels **break rendering** in standard Mermaid parsers. These must be plain text.

**Fix:**
```
B -->|"img piece image"| C
B -->|"span green dot"| G
```

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

---

### ❌ Error 3 — Wrong label in Black Pawn "Yes" branch (Chart 4, Line 99)

**MD says:** `"Yes → Move the white pawn here"`

**Actual code (`Global.js` line 119):**
```js
moveElement(selfHighlightState, piece.current_Position);
```
It moves `selfHighlightState` (whatever piece is selected) to the **black pawn's current square**. It does NOT check whether it is a white pawn. Any piece in `selfHighlightState` gets moved.
Label should say: `"Yes → Move selected piece to black pawn's square"`

---

### ❌ Error 4 — `globalStateRender` missing from `else` branch (Chart 3 & 4)

**Both White and Black pawn flows:** when pawn is NOT on starting row (the `else` branch):

**MD shows:** the flow ends after highlight is set — no `globalStateRender()` call shown.

**Actual code:** In the `else` branch there is also **no** `globalStateRender()` call. So the MD is actually **accidentally correct** here, but it means highlights set in the else branch are never rendered on screen unless something else triggers a render. This is a **bug in the JS code itself**, not in the MD.

---

### ⚠️ Misleading — Self-loop arrow on data.js node (Chart 6, Line 178)

**MD says:**
```
DJS -->|"Square() factory"| DJS
```
`squareRow` and `Square` are **two separate functions** inside `data.js`. The self-loop makes it look like one function calls itself (recursion), which is wrong. It should show:
```
squareRow --> Square
```

---

## 📄 `FunctionReference.md`

### ❌ Error 1 — `renderHighlight()` described as active but it is NEVER called

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

| File | ❌ Wrong | ⚠️ Misleading | Total Issues |
|------|---------|--------------|-------------|
| `Flowchart.md` | 2 | 1 | **3** |
| `FlowChart2.md` | 3 | 1 | **4** |
| `FunctionReference.md` | 1 | 1 | **2** |
| `README.md` | 1 | 1 | **2** |
| `Function.md` | 1 | — | **1** |
| **Total** | **8** | **4** | **12** |

---

## 🔧 Fix List (Priority Order)

| Priority | File | Fix |
|----------|------|-----|
| 🔴 1 | `Function.md` | Delete or fill the empty file |
| 🔴 2 | `Flowchart.md` ln 29 | Change `movePieceFromXtoY` → `moveElement(selfHighlightState, piece.current_Position)` |
| 🔴 3 | `Flowchart.md` ln 9–11 | Fix step order: clearHighlightLocal → set highlights → globalStateRender |
| 🟡 4 | `FlowChart2.md` ln 40–41 | Remove `<img>` and `<span>` HTML tags from Mermaid labels |
| 🟡 5 | `FlowChart2.md` ln 99 | Fix label: "Yes → Move selected piece to black pawn's square" |
| 🟡 6 | `FlowChart2.md` ln 292–301 | Add `clearPreviousSelfHighlight` + `moveState = null` steps |
| 🟡 7 | `FunctionReference.md` ln 79 | Add note that `renderHighlight` is unused/dead code |
| 🟢 8 | `README.md` ln 40 | Remove or fill `## branch - move` section |
| 🟢 9 | `README.md` | Add mention of `Helper/` folder in project structure |
