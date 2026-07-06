// black pieces
function blackPawn(current_Position) {
  return {
    current_Position,
    img: "./Assets/pieces/black/pawn.png",
    piece_name: "BLACK_PAWN",
  };
}

function blackRook(current_Position) {
  return {
    move: false,
    current_Position,
    img: "./Assets/pieces/black/rook.png",
    piece_name: "BLACK_ROOK",
  };
}

function blackBishop(current_Position) {
  return {
    current_Position,
    img: "./Assets/pieces/black/bishop.png",
    piece_name: "BLACK_BISHOP",
  };
}

function blackQueen(current_Position) {
  return {
    current_Position,
    img: "./Assets/pieces/black/queen.png",
    piece_name: "BLACK_QUEEN",
  };
}

function blackKing(current_Position) {
  return {
    move: false,
    current_Position,
    img: "./Assets/pieces/black/king.png",
    piece_name: "BLACK_KING",
  };
}

function blackKnight(current_Position) {
  return {
    current_Position,
    img: "./Assets/pieces/black/knight.png",
    piece_name: "BLACK_KNIGHT",
  };
}

// white pieces
function whitePawn(current_Position) {
  return {
    current_Position,
    img: "./Assets/pieces/white/pawn.png",
    piece_name: "WHITE_PAWN",
  };
}

function whiteRook(current_Position) {
  return {
    move: false,
    current_Position,
    img: "./Assets/pieces/white/rook.png",
    piece_name: "WHITE_ROOK",
  };
}

function whiteKnight(current_Position) {
  return {
    current_Position,
    img: "./Assets/pieces/white/knight.png",
    piece_name: "WHITE_KNIGHT",
  };
}

function whiteBishop(current_Position) {
  return {
    current_Position,
    img: "./Assets/pieces/white/bishop.png",
    piece_name: "WHITE_BISHOP",
  };
}
function whiteKing(current_Position) {
  return {
    move: false,
    current_Position,
    img: "./Assets/pieces/white/king.png",
    piece_name: "WHITE_KING",
  };
}
function whiteQueen(current_Position) {
  return {
    current_Position,
    img: "./Assets/pieces/white/queen.png",
    piece_name: "WHITE_QUEEN",
  };
}

export {
  blackPawn,
  whitePawn,
  blackRook,
  whiteRook,
  blackKnight,
  whiteKnight,
  blackBishop,
  whiteBishop,
  blackKing,
  whiteKing,
  blackQueen,
  whiteQueen,
};
