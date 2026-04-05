import { renderHightlight } from "../Render/main.js";
import { gobalData } from "../index.js";

function Greet() {
  alert("Hello");
}

// for each square
function Square(color, piece, id) {
  const hightLight = function () {
    renderHightlight(this.id);
    this.highlighted = true;
    // console.log(gobalData);
  };

  return { color, piece, id, hightLight };
}

function squareRow(rowId) {
  const squareRow = [];
  const abcd = ["a", "b", "c", "d", "e", "f", "g", "h"];

  if (rowId % 2 == 0) {
    abcd.forEach((element, index) => {
      if (index % 2 == 0) {
        squareRow.push(Square("white", "null", element + rowId));
      } else {
        squareRow.push(Square("black", "null", element + rowId));
      }

      // console.log(index);
    });
  } else {
    abcd.forEach((element, index) => {
      if (index % 2 == 0) {
        squareRow.push(Square("black", "null", element + rowId));
      } else {
        squareRow.push(Square("white", "null", element + rowId));
      }

      // console.log(index);
    });
  }

  return squareRow;
}

function initGame() {
  return [
    squareRow(8),
    squareRow(7),
    squareRow(6),
    squareRow(5),
    squareRow(4),
    squareRow(3),
    squareRow(2),
    squareRow(1),
  ];
}

export { initGame };
