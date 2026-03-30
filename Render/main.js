import { blackPawn } from "../Data/pieces.js";
import { whitePawn } from "../Data/pieces.js";

const ROOT_DIV = document.getElementById("root");
// Use when you want to render pieces on board (after first time when you start game).
function pieceRender(data) {
  // Implementation for rendering pieces
  data.forEach((row) => {
    row.forEach((square) => {
      // if square has a piece, render it
      if (square.piece) {
        const squareElement = document.getElementById(square.id);

        // Create piece element
        const piece = document.createElement("img");
        piece.src = square.piece.img;
        piece.classList.add("piece");

        // insert into square element
        squareElement.appendChild(piece);
      }
    });
  });
}

// this function calls when game starts (only for one time)
// (OR) use whwn you want to render board for first time when you start game.
function initGameRender(data) {
  // Render each board row and square into the root container.

  // Each element array represents a row, and each square object includes color.
  data.forEach((element) => {
    const rowElement = document.createElement("div");
    element.forEach((square) => {
      const squareDiv = document.createElement("div");
      squareDiv.id = square.id;
      squareDiv.classList.add(square.color, "square");

      // Render blackPawn
      if (square.id[1] == 7) {
        square.piece = blackPawn(square.id);
        // console.log("black pawn,", square.piece);
      }

      // Render whitePawn
      if (square.id[1] == 2) {
        square.piece = whitePawn(square.id);
        // console.log("white pawn,", square.piece);
      }

      rowElement.appendChild(squareDiv);
    });

    ROOT_DIV.appendChild(rowElement);
    rowElement.classList.add("squareRow");
    //     console.log(rowElement);
  });
  console.log(data);
  pieceRender(data);
}

export { initGameRender };
