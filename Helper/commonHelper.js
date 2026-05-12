import { globalData, keySquareMapper } from "../index.js";

// function to check if exists of opponent.

function checkPieceOfOpponentOnElement(id, color) {
  // const flatData = globalData.flat();
  const opponentColor = color === "white" ? "BLACK" : "WHITE";

  const element = keySquareMapper[id];

  if (!element) return false;

  if (
    element.piece &&
    element.piece.piece_name &&
    element.piece.piece_name.includes(opponentColor)
  ) {
    const el = document.getElementById(id);
    el.classList.add("captureColor");
    element.captureHighlight = true;
    return true;
  }
  return false;
}

// function checksqaure id for capture and return array of capture ids
function checkSquareCaptureId(array) {
  let returnArray = [];

  for (let index = 0; index < array.length; index++) {
    const sqaureId = array[index];
    const square = keySquareMapper[sqaureId];

    if (square.piece) {
      break;
    }
    returnArray.push(sqaureId);
  }};
  

  export { checkPieceOfOpponentOnElement, checkSquareCaptureId };
