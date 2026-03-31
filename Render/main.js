// import { blackPawn } from "../Data/pieces.js";
// import { whitePawn } from "../Data/pieces.js";

import * as pieces from "../Data/pieces.js";

const ROOT_DIV = document.getElementById("root");
// Use when you want to render pieces on board (after first time when you start game).
function pieceRender(data) {
  // Implementation for rendering pieces
  data.forEach((row) => {
    row.forEach((square) => {
      // console.log(square);

      // if square has a piece, render it
      if (square.piece != "null") {
        // console.log(square.piece);

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
  // OR
  // Each element array represents a row, and each square object includes color.
  data.forEach((element) => {
    const rowElement = document.createElement("div");
    element.forEach((square) => {
      const squareDiv = document.createElement("div");
      squareDiv.id = square.id;
      squareDiv.classList.add(square.color, "square");

      // Render blackPawn
      if (square.id[1] == 7) {
        square.piece = pieces.blackPawn(square.id);
        // console.log("black pawn,", square.piece);
      }

      // Render blackKnight
      if (square.id == "b8" || square.id == "g8") {
        square.piece = pieces.blackKnight(square.id);
      }
      // Render blackRook
      if (square.id == "h8" || square.id == "a8") {
        square.piece = pieces.blackRook(square.id);
      }

      // Render blackBishop
      if (square.id == "c8" || square.id == "f8") {
        square.piece = pieces.blackBishop(square.id);
      }
      // Render blackQueen
      if (square.id == "d8") {
        square.piece = pieces.blackQueen(square.id);
      }
      // Render blackKing
      if (square.id == "e8") {
        square.piece = pieces.blackKing(square.id);
      }

      // Render whitePawn
      if (square.id[1] == 2) {
        square.piece = pieces.whitePawn(square.id);
        // console.log("white pawn,", square.piece);
      }

      // Render whiteKnight
      if (square.id == "b1" || square.id == "g1") {
        square.piece = pieces.whiteKnight(square.id);
      }

      // Render whiteRook
      if (square.id == "h1" || square.id == "a1") {
        square.piece = pieces.whiteRook(square.id);
      }

      // Render whiteBishop
      if (square.id == "c1" || square.id == "f1") {
        square.piece = pieces.whiteBishop(square.id);
      }

      // Render whiteQueen
      if (square.id == "d1") {
        square.piece = pieces.whiteQueen(square.id);
      }

      // Render whiteKing
      if (square.id == "e1") {
        square.piece = pieces.whiteKing(square.id);
      }

      rowElement.appendChild(squareDiv);
    });

    ROOT_DIV.appendChild(rowElement);
    rowElement.classList.add("squareRow");
    //     console.log(rowElement);
  });
  // console.log(data);
  pieceRender(data);
}

export { initGameRender };
