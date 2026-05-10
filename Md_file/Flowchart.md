# Pawn Click Flowchart - Line by Line Sequential Flow

## White Pawn Click - Top to Bottom Flow

```mermaid
flowchart TD
    W1([Start: whitePawnClick]) 
    --> W2["1. clearPreviousSelfHighlight()"]
    --> W3{"2. piece == selfHighlightState?"}
    
    W3 -->|Yes| W4["3. set selfHighlightState = null"]
    --> W5["4. clearHighlightLocal()"]
    --> W6(["✓ Return"])
    
    W3 -->|No| W7["3. selfHighlight(piece)"]
    --> W8["4. set highlightState = true"]
    --> W9["5. set selfHighlightState = piece"]
    --> W10["6. set moveState = piece"]
    --> W11{"7. rank is 2?"}
    
    W11 -->|Yes| W12["8. clearHighlightLocal()"]
    --> W13["9. Define highlightedSquareIds = +1, +2"]
    --> W14["10. Set highlight = true on squares"]
    --> W15["11. globalStateRender()"]
    --> W16(["✓ End"])
    
    W11 -->|No| W17["8. clearHighlight()"]
    --> W18["9. Build diagonal capture IDs"]
    --> W19["10. checkPieceOfOpponentOnElement()"]
    --> W20["11. Set highlight = true"]
    --> W21["12. globalStateRender()"]
    --> W16
```

## Black Pawn Click - Top to Bottom Flow

```mermaid
flowchart TD
    B1([Start: blackPawnClick])
    --> B2{"1. highlightState == true?"}
    
    B2 -->|Yes| B3["2. moveElement(selfHighlightState, piece.current_Position)"]
    --> B4(["✓ Return"])
    
    B2 -->|No| B5["2. clearPreviousSelfHighlight()"]
    --> B6{"3. piece == selfHighlightState?"}
    
    B6 -->|Yes| B7["4. set selfHighlightState = null"]
    --> B8["5. clearHighlightLocal()"]
    --> B9(["✓ Return"])
    
    B6 -->|No| B10["4. selfHighlight(piece)"]
    --> B11["5. set highlightState = true"]
    --> B12["6. set selfHighlightState = piece"]
    --> B13["7. set moveState = piece"]
    --> B14{"8. rank is 7?"}
    
    B14 -->|Yes| B15["9. clearHighlightLocal()"]
    --> B16["10. Define highlightedSquareIds = -1, -2"]
    --> B17["11. Set highlight = true on squares"]
    --> B18["12. globalStateRender()"]
    --> B19(["✓ End"])
    
    B14 -->|No| B20["9. clearHighlight()"]
    --> B21["10. Build diagonal capture IDs"]
    --> B22["11. checkPieceOfOpponentOnElement()"]
    --> B23["12. Set highlight = true"]
    --> B24["13. globalStateRender()"]
    --> B19
```

---

## Summary Table

| Step | White Pawn | Black Pawn |
|------|-----------|-----------|
| 1 | Clear previous highlight | Check if any piece selected |
| 2 | Check if same pawn clicked | Clear previous highlight |
| 3a | Deselect (if same) | Check if same pawn clicked |
| 3b | Select & show moves (if different) | Deselect (if same) |
| 4b-7b | Highlight based on rank | Select & show moves (if different) |
| 8+ | Render to screen | Highlight based on rank |
