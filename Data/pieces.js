// black pieces
function blackPawn(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/black/pawn.png",
    piece_name: "BLACK_PAWN",
  };
}

function blackRook(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/black/rook.png",
    piece_name: "BLACK_ROOK",
  };
}

function blackBishop(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/black/bishop.png",
    piece_name: "BLACK_BISHOP",
  };
}

function blackQueen(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/black/queen.png",
    piece_name: "BLACK_QUEEN",
  };
}

function blackKing(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/black/king.png",
    piece_name: "BLACK_KING",
  };
}

function blackKnight(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/black/knight.png",
    piece_name: "BLACK_KNIGHT",
  };
}

// white pieces
function whitePawn(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/white/pawn.png",
    piece_name: "WHITE_PAWN",
  };
}

function whiteRook(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/white/rook.png",
    piece_name: "WHITE_ROOK",
  };
}

function whiteKnight(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/white/knight.png",
    piece_name: "WHITE_KNIGHT",
  };
}

function whiteBishop(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/white/bishop.png",
    piece_name: "WHITE_BISHOP",
  };
}
function whiteKing(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/white/king.png",
    piece_name: "WHITE_KING",
  };
}
function whiteQueen(current_Position) {
  return {
    current_Position,
    img: "./Assets/Pieces/white/queen.png",
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
