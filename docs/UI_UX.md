# 🎨 ChessCode — UI/UX Design

**Last Updated:** July 9, 2026

Covers: Visual design system, color palette, CSS class system, board layout, timer/logger UI, and the highlighting state model.

---

## 🎨 Color Palette

| Token | Hex | Usage |
|---|---|---|
| Page background | `#302E2B` | Dark charcoal — mimics chess.com dark theme |
| Light square | `#ebecd0` | Cream — classic light tile |
| Dark square | `#779556` | Olive green — classic dark tile |
| Selected piece | `#f7f769` | Bright yellow — self-highlight glow |
| Capture target | `#EE4b2b` | Vivid red-orange — enemy capture square |
| Move dot fill | `rgba(0,0,0,0.2)` | Translucent black — valid move indicator |
| Last move highlight | `rgba(255,255,50,0.38)` | Translucent yellow — source/destination of last move |
| Timer active glow | `rgba(100,255,170,0.3)` | Green glow — active player's timer |
| Timer low-time | `#ff4444` | Red — below 30 seconds warning |
| Global text | `white` | Applied via `* { color: white }` |
| Side panel background | `#262522` | Dark panels — logger, turn indicator |
| Side panel border | `#3d3b37` | Subtle border — separates panels |

---

## 📐 Board Layout

### Desktop Dimensions

```
Board total:  600px × 600px
Square size:   75px ×  75px  (8 × 75 = 600)
Piece image:   75px ×  75px  (fills square completely)
Move dot:      25px ×  25px  (centered via absolute position)
Label font:    12px          (16% of square size)
```

### Mobile Dimensions (Responsive)

All sizes scale proportionally using `calc()` with viewport units:

| Breakpoint | Board Width | Square Size | Dot Size | Label Size |
|---|---|---|---|---|
| Desktop (>1024px) | 600px | 75px | 25px | 12px |
| Tablet (≤1024px) | `min(90vw, 560px)` | `boardWidth / 8` | `square / 3` | `square × 0.16` |
| Phone (≤600px) | `96vw` | `boardWidth / 8` | `square / 3` | `square × 0.16` |
| Small phone (≤400px) | `98vw` | `boardWidth / 8` | `square / 3` | `square × 0.16` |
| Landscape phone | `85vh` (height-based) | `boardHeight / 8` | `square / 3` | `square × 0.16` |

### Page Layout (Flexbox)

**Desktop:**
```
┌─────────────────────────────────────────────────────────┐
│  body#flex (display: flex, gap: 24px)                   │
│                                                          │
│  ┌────────────────────┐  ┌────────────────────────────┐ │
│  │  .board-container  │  │  .side-panel               │ │
│  │                    │  │                            │ │
│  │  ┌──────────────┐  │  │  ┌──────────────────────┐ │ │
│  │  │ #black-timer │  │  │  │ #turn-indicator      │ │ │
│  │  └──────────────┘  │  │  │  ⚪ White's Turn     │ │ │
│  │  ┌──────────────┐  │  │  └──────────────────────┘ │ │
│  │  │    #root     │  │  │  ┌──────────────────────┐ │ │
│  │  │  (8×8 board) │  │  │  │ #chessboardmovelogger│ │ │
│  │  │              │  │  │  │  ┌─ Moves ────────┐  │ │ │
│  │  └──────────────┘  │  │  │  │ 1. e2→e4  e7→e5│  │ │ │
│  │  ┌──────────────┐  │  │  │  │ 2. ...         │  │ │ │
│  │  │ #white-timer │  │  │  │  └────────────────┘  │ │ │
│  │  └──────────────┘  │  │  └──────────────────────┘ │ │
│  └────────────────────┘  └────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Mobile (≤600px):** Board and logger stack vertically (flex-direction: column).

**Landscape phone:** Side-by-side using `vh` units for height-constrained fitting.

---

## 🏷️ CSS Class System

### Base Classes

| Class | Applied To | Effect |
|---|---|---|
| `.square` | Every `div` square | `75×75px`, `position: relative` |
| `.white` | Light tile squares | `background: #ebecd0` |
| `.black` | Dark tile squares | `background: #779556` |
| `.squareRow` | Each row wrapper | `flex, 600×75px` |
| `.piece` | Piece `<img>` tags | `75×75px`, `cursor: pointer` |

### State Classes (added/removed at runtime)

| Class | Applied To | Trigger | Effect |
|---|---|---|---|
| `.highlightYellow` | Square `div` | Piece selected | Yellow background `#f7f769` |
| `.captureColor` | Square `div` | Enemy piece in range | Red-orange background `#EE4b2b` |
| `.lastMoveHighlight` | Square `div` | After move completes | Translucent yellow on source + destination |

### Timer Classes

| Class | Applied To | Trigger | Effect |
|---|---|---|---|
| `.timer` | Timer `div` | Always | Base timer styling |
| `.active-timer` | Timer `div` | Current player's turn | Green border, bright text, glow |
| `.low-time` | Timer `div` | < 30 seconds remaining | Red background, pulsing text |

### Turn Indicator Classes

| Class | Applied To | Trigger | Effect |
|---|---|---|---|
| `.turn-dot-white` | `#turn-dot` | White's turn | White dot with glow |
| `.turn-dot-black` | `#turn-dot` | Black's turn | Dark dot with border |

### DOM Children (highlight dot)

| Element | Class | Trigger | Effect |
|---|---|---|---|
| `<span>` | `.highlight` | `element.highlight = true` | Dark circle centered in square (1/3 of square size) |

---

## 🔦 Highlight State Model

Each square in `globalData` has two flags that drive visual feedback:

```
square.highlight        → null / true
square.captureHighlight → false / true
```

### Rendering Rules

```mermaid
flowchart TD
    A{element.highlight?} -- true --> B[append span.highlight to div]
    A -- null --> C[remove all span elements from div]
    D{element.captureHighlight?} -- true --> E[add .captureColor class to div]
    D -- false --> F[remove .captureColor class from div]
```

### Priority Rule

> **Capture beats move-dot:** When a square is marked as a capture target (`captureHighlight = true`), its `highlight` flag is immediately cleared to `null`. This prevents the green dot from rendering underneath the red background.

---

## 📊 Visual State Table

| Square State | `.highlightYellow` | `.captureColor` | `.lastMoveHighlight` | `span.highlight` | Appearance |
|---|---|---|---|---|---|
| Default (empty) | ❌ | ❌ | ❌ | ❌ | Normal tile color |
| Selected piece | ✅ | ❌ | ❌ | ❌ | Yellow glow |
| Valid move dot | ❌ | ❌ | ❌ | ✅ | Dark circle in center |
| Capture target | ❌ | ✅ | ❌ | ❌ | Red-orange tile |
| Last move square | ❌ | ❌ | ✅ | ❌ | Translucent yellow overlay |

---

## ⏱️ Timer UI

```
┌─────────────────────────────────┐
│  Black         10:00            │  ← #black-timer (top of board)
├─────────────────────────────────┤
│                                 │
│          8×8 Board              │
│                                 │
├─────────────────────────────────┤
│  White         09:42            │  ← #white-timer (bottom, .active-timer)
└─────────────────────────────────┘
```

- **Active timer** has green accent, bright white text with subtle glow
- **Low-time** (<30s) pulses red with `animation: pulse-time 1s infinite`
- **Timeout** shows full-screen overlay with winner announced

---

## 🔮 Design Tokens Cheatsheet

```css
/* Fonts */
--font-ui:       "Inter", sans-serif;
--font-mono:     "JetBrains Mono", monospace;

/* Colors */
--bg-page:       #302E2B;
--sq-light:      #ebecd0;
--sq-dark:       #779556;
--hl-selected:   #f7f769;
--hl-capture:    #EE4b2b;
--hl-dot:        rgba(0, 0, 0, 0.2);
--hl-lastmove:   rgba(255, 255, 50, 0.38);
--panel-bg:      #262522;
--panel-border:  #3d3b37;
--timer-active:  rgba(100, 255, 170, 0.3);
--timer-low:     #ff4444;

/* Sizes (Desktop) */
--board-size:    600px;
--square-size:   75px;
--dot-size:      25px;
```

---

## 📱 Mobile Responsive Stylesheet

The responsive layout lives in `style/mobile.css` (separate from the desktop styles) with 4 breakpoints:

| Breakpoint | Target | Layout | Board Sizing |
|---|---|---|---|
| ≤1024px | Tablets | Vertical stack | `min(90vw, 560px)` |
| ≤600px | Phones | Vertical stack | `96vw` |
| ≤400px | Small phones | Vertical stack | `98vw` |
| Landscape + ≤500px height | Rotated phones | Side-by-side | `85vh` |

All elements (squares, pieces, highlights, labels) scale proportionally using `calc()` — no fixed pixel values on mobile.
