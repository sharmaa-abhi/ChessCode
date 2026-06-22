# Pawn Click Flowchart - Line by Line Sequential Flow

**Updated June 22, 2026:** All piece handlers implemented. These flowcharts show the pawn logic pattern that all other pieces follow (rooks, bishops, knights, queens, kings). 

⏳ **Blocker:** Turn validation not implemented — both colors can move any piece.

---

```mermaid
flowchart TD
    W1([Start: whitePawnClick]) 
    --> W2{"1. piece == selfHighlightState?"}
    
    W2 -->|Yes| W3["2. clearPreviousSelfHighlight()\nclearHighlightLocal()"]
    --> W4(["✓ Return"])
    
    W2 -->|No| W5{"3. square.captureHighlight == true?"}
    
    W5 -->|Yes| W6["4. moveElement()\nclearPreviousSelfHighlight()\nclearHighlightLocal()"]
    --> W7(["✓ Return"])
    
    W5 -->|No| W8["4. clearPreviousSelfHighlight()\nclearHighlightLocal()"]
    --> W9["5. selfHighlight(piece)"]
    --> W10["6. set highlightState = true\nset selfHighlightState = piece\nset moveState = piece"]
    --> W11{"7. rank is 2?"}
    
    W11 -->|Yes| W12["8. Define highlightedSquareIds = +1, +2"]
    --> W14["9. checkSquareCaptureId()"]
    
    W11 -->|No| W13["8. Define highlightedSquareIds = +1"]
    --> W14
    
    W14 --> W15["10. Iterate via keySquareMapper\nSet element.highlight = true"]
    --> W16["11. Build diagonal capture IDs (col1, col2)"]
    --> W17["12. checkPieceOfOpponentOnElement() for 'white'"]
    --> W18["13. globalStateRender()"]
    --> W19(["✓ End"])
```

## Black Pawn Click - Top to Bottom Flow

```mermaid
flowchart TD
    B1([Start: blackPawnClick])
    --> B2{"1. piece == selfHighlightState?"}
    
    B2 -->|Yes| B3["2. clearPreviousSelfHighlight()\nclearHighlightLocal()"]
    --> B4(["✓ Return"])
    
    B2 -->|No| B5{"3. square.captureHighlight == true?"}
    
    B5 -->|Yes| B6["4. moveElement()\nclearPreviousSelfHighlight()\nclearHighlightLocal()"]
    --> B7(["✓ Return"])
    
    B5 -->|No| B8["4. clearPreviousSelfHighlight()\nclearHighlightLocal()"]
    --> B9["5. selfHighlight(piece)"]
    --> B10["6. set highlightState = true\nset selfHighlightState = piece\nset moveState = piece"]
    --> B11{"7. rank is 7?"}
    
    B11 -->|Yes| B12["8. Define highlightedSquareIds = -1, -2"]
    --> B14["9. checkSquareCaptureId()"]
    
    B11 -->|No| B13["8. Define highlightedSquareIds = -1"]
    --> B14
    
    B14 --> B15["10. Iterate via keySquareMapper\nSet element.highlight = true"]
    --> B16["11. Build diagonal capture IDs (col1, col2)"]
    --> B17["12. checkPieceOfOpponentOnElement() for 'black'"]
    --> B18["13. globalStateRender()"]
    --> B19(["✓ End"])
```

---

## Summary Table

| Step | White Pawn | Black Pawn |
|------|-----------|-----------|
| 1 | Check if same pawn clicked | Check if same pawn clicked |
| 2 | Check if square is capture target | Check if square is capture target |
| 3 | Deselect (if same) or Move (if capture) | Deselect (if same) or Move (if capture) |
| 4 | Select pawn & set states | Select pawn & set states |
| 5 | Determine moves (+1/+2) | Determine moves (-1/-2) |
| 6 | Check diagonals for captures | Check diagonals for captures |
| 7 | Render to screen | Render to screen |
