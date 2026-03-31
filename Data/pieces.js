function blackPawn(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/black/pawn.png",
  };
}

function whitePawn(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/white/pawn.png",
  };
}

export { blackPawn, whitePawn };
