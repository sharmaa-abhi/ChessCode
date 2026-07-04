import { ROOT_DIV } from "../Helper/constant.js";
import * as pieces from "../Data/pieces.js";
import { globalData, keySquareMapper } from "../index.js";

const globalPiece = new Object(); // global object to store piece data

// function globalStateRender (this function is useful to render pieces from globalStateData) => use when updating globalState
function globalStateRender() {
  globalData.forEach((row) => {
    row.forEach((element) => {
      // if square highlight is true
      if (element.highlight) {
        const highlightSpan = document.createElement("span");
        highlightSpan.classList.add("highlight");
        document.getElementById(element.id).appendChild(highlightSpan);
      } else if (element.highlight === null) {
        const el = document.getElementById(element.id);
        const highlights = Array.from(el.getElementsByClassName("highlight"));
        highlights.forEach((element) => {
          el.removeChild(element);
        });
      }

      // Implementation for rendering pieces
      // if (element.piece?.change != "null" && element.piece != null) {

      //   const square = element;
      //   const squareElement = document.getElementById(square.id);
      //   squareElement.innerHTML = ""; // Clear existing content
      //   // Create piece element
      //   const piece = document.createElement("img");

      //   piece.src = square.piece.img;
      //   piece.classList.add("piece");

      //   // insert into square element
      //   squareElement.appendChild(piece);
      // } else if (element.change != "null" && element.piece != null) {
      //   const el = document.getElementById(element.id);
      //   const piece = Array.from(el.getElementsByClassName("piece"));
      //   piece.forEach((element) => {
      //     el.removeChild(element);
      //   });
      // }
    });
  });
}

function selfHighlight(piece) {
  document
    .getElementById(piece.current_Position)
    .classList.add("highlightYellow");
}

// Use when you want to render pieces on board (after first time when you start game).
function pieceRender(data) {
  // Implementation for rendering pieces
  data.forEach((row) => {
    row.forEach((square) => {
      // console.log(square);

      // if square has a piece, render it
      if (square.piece != null) {
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
// (OR) use when you want to render board for first time when you start game.
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

      const labelId = document.createElement("span");
      labelId.textContent = square.id;
      labelId.classList.add("labelId", `${square.color}-label-id`);
      squareDiv.appendChild(labelId);

      // Render blackPawn
      if (square.id[1] == 7) {
        square.piece = pieces.blackPawn(square.id);
        globalPiece.black_Pawn = square.piece; // store black pawn piece in global object
      }

      // Render blackKnight
      if (square.id == "b8" || square.id == "g8") {
        square.piece = pieces.blackKnight(square.id);
        if ((globalPiece.black_Knight_1 = square.piece)) {
          globalPiece.black_Knight_2 = square.piece;
        } else {
          globalPiece.black_Knight_1 = square.piece;
        }
      }
      // Render blackRook
      if (square.id == "h8" || square.id == "a8") {
        square.piece = pieces.blackRook(square.id);
        if ((globalPiece.black_Rook_1 = square.piece)) {
          globalPiece.black_Rook_2 = square.piece;
        } else {
          globalPiece.black_Rook_1 = square.piece;
        }
      }

      // Render blackBishop
      if (square.id == "c8" || square.id == "f8") {
        square.piece = pieces.blackBishop(square.id);
        if ((globalPiece.black_Bishop_1 = square.piece)) {
          globalPiece.black_Bishop_2 = square.piece;
        } else {
          globalPiece.black_Bishop_1 = square.piece;
        }
      }
      // Render blackQueen
      if (square.id == "d8") {
        square.piece = pieces.blackQueen(square.id);
        globalPiece.black_Queen = square.piece;
      }
      // Render blackKing
      if (square.id == "e8") {
        square.piece = pieces.blackKing(square.id);
        globalPiece.black_King = square.piece; // store black king piece in global object
      }

      // Render whitePawn
      if (square.id[1] == 2) {
        square.piece = pieces.whitePawn(square.id);
        globalPiece.white_Pawn = square.piece; // store white pawn piece in global object
      }

      // Render whiteKnight
      if (square.id == "b1" || square.id == "g1") {
        square.piece = pieces.whiteKnight(square.id);
        if ((globalPiece.white_Knight_1 = square.piece)) {
          globalPiece.white_Knight_2 = square.piece;
        } else {
          globalPiece.white_Knight_1 = square.piece;
        }
      }

      // Render whiteRook
      if (square.id == "h1" || square.id == "a1") {
        square.piece = pieces.whiteRook(square.id);
        if ((globalPiece.white_Rook_1 = square.piece)) {
          globalPiece.white_Rook_2 = square.piece;
        } else {
          globalPiece.white_Rook_1 = square.piece;
        }
      }

      // Render whiteBishop
      if (square.id == "c1" || square.id == "f1") {
        square.piece = pieces.whiteBishop(square.id);
        if ((globalPiece.white_Bishop_1 = square.piece)) {
          globalPiece.white_Bishop_2 = square.piece;
        } else {
          globalPiece.white_Bishop_1 = square.piece;
        }
      }

      // Render whiteQueen
      if (square.id == "d1") {
        square.piece = pieces.whiteQueen(square.id);
        globalPiece.white_Queen = square.piece; // store white queen piece in global object
      }

      // Render whiteKing
      if (square.id == "e1") {
        square.piece = pieces.whiteKing(square.id);
        globalPiece.white_King = square.piece; // store white king piece in global object
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

// render highlight circle.
function renderHighlight(squareId) {
  // console.log(squareId);
  const highlightSpan = document.createElement("span");
  highlightSpan.classList.add("highlight");
  document.getElementById(squareId).appendChild(highlightSpan);
}

// clear all highlights circle from the board
function clearHighlight() {
  const flatArray = globalData.flat();

  flatArray.forEach((el) => {
    if (el.captureHighlight) {
      document.getElementById(el.id).classList.remove("captureColor");
      el.captureHighlight = false;
    }

    if (el.highlight) {
      el.highlight = null;
    }
  });
  globalStateRender();
}
export {
  initGameRender,
  clearHighlight,
  selfHighlight,
  globalStateRender,
  globalPiece,
};
