function blackPawn(current_Position) {
  return {
    current_Position,
    img: "./assets/pieces/blackPawn.png",
  };
}

function whitePawn(current_Position) {
  return {
    current_Position,
    img: "./assets/pieces/whitePawn.png",
  };
}

export { blackPawn };
export { whitePawn };
