import { globalData } from "../index.js";

// function to check if exists of opponent.

function checkPieceOfOpponentOnElement(id, color) {
  const flatData = globalData.flat();
  const opponentColor = color === "white" ? "BLACK" : "WHITE";

  for (let i = 0; i < flatData.length; i++) {
    const element = flatData[i];
    if (element.id === id) {
      if (
        element.piece &&
        element.piece.piece_name &&
        element.piece.piece_name.includes(opponentColor)
      ) {
        const el = document.getElementById(id);
        el.classList.add("captureColor");
        element.captureHighlight = true;
      }
      break; // Exit the loop once the element is found
    }
  }
  return false;
}

export { checkPieceOfOpponentOnElement };
