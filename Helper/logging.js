const orderList = document.querySelector("ol");

// Mappings for each chess piece name to its respective high-fidelity unicode chess symbol
const pieceSymbols = {
  "WHITE_PAWN": "♙",
  "WHITE_ROOK": "♖",
  "WHITE_KNIGHT": "♘",
  "WHITE_BISHOP": "♗",
  "WHITE_QUEEN": "♕",
  "WHITE_KING": "♔",
  "BLACK_PAWN": "♟",
  "BLACK_ROOK": "♜",
  "BLACK_KNIGHT": "♞",
  "BLACK_BISHOP": "♝",
  "BLACK_QUEEN": "♛",
  "BLACK_KING": "♚"
};

/**
 * Logs chess moves into the moves logger UI.
 * Groups move records into two-column rows (White move left, Black move right).
 * 
 * @param {Object} move - The move details
 * @param {string} move.piece - The piece name (e.g. "WHITE_PAWN")
 * @param {string} move.from - The starting square (e.g. "e2")
 * @param {string} move.to - The target square (e.g. "e4")
 * @param {boolean} move.isCapture - Whether the move was a capture
 * @param {string} turn - Current turn color ("white" or "black")
 */
function logMoves(move, turn) {
  if (!orderList) return;

  const symbol = pieceSymbols[move.piece] || "";
  const action = move.isCapture ? "×" : "→";
  const moveString = `${symbol} ${move.from}${action}${move.to}`;

  if (turn === "white") {
    const list = document.createElement("li");
    list.innerHTML = `<span class="leftSide">${moveString}</span>`;
    orderList.appendChild(list);
  } else {
    const allLiArray = orderList.querySelectorAll("li");
    const lastLi = allLiArray[allLiArray.length - 1];
    if (lastLi) {
      // Append black's move to the existing row
      lastLi.innerHTML += `<span class="rightSide">${moveString}</span>`;
    } else {
      // Fallback if black moves first or no list item exists
      const list = document.createElement("li");
      list.innerHTML = `<span class="leftSide"></span><span class="rightSide">${moveString}</span>`;
      orderList.appendChild(list);
    }
  }

  // Auto-scroll to the bottom of the moves list
  orderList.scrollTop = orderList.scrollHeight;
}

export { logMoves };
