import { ROOT_DIV } from "../Helper/constant.js";
import * as pieces from "../Data/pieces.js";
import { globalData } from "../index.js";

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
        const highlights = Array.from(el.getElementsByTagName("span"));
        highlights.forEach((element) => {
          el.removeChild(element);
        });
      }

      // Implementation for rendering pieces
      if (element.piece != "null") {
      }
    });
  });
}

// move element with square id
function moveElement(piece, id) {
  const flatData = globalData.flat();

  flatData.forEach((el) => {
    if (el.id === piece.current_Position) {
      delete el.piece;
    }

    if (el.id === id) {
      el.piece = piece;
    }
  });

  clearHighlight();

  const previousPiece = document.getElementById(piece.current_Position);
  previousPiece.classList.remove("highlightYellow");
  const currentPiece = document.getElementById(id);
  currentPiece.innerHTML = previousPiece.innerHTML;
  previousPiece.innerHTML = "";

  piece.current_Position = id;
}

function clearPreviousSelfHighlight(piece) {
  // console.log(piece);
  if (piece) {
    document
      .getElementById(piece.current_Position)
      .classList.remove("highlightYellow");
  }
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

      // Render blackPawn
      if (square.id[1] == 7) {
        square.piece = pieces.blackPawn(square.id);
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
    // if (el.captureHighlight) {
    //   document.getElementById(el.id).classList.remove("captureColor");
    // }

    if (el.highlight) {
      el.highlight = null;
    }
    globalStateRender();
  });
}
export {
  initGameRender,
  renderHighlight,
  clearHighlight,
  selfHighlight,
  clearPreviousSelfHighlight,
  moveElement,
  globalStateRender,
};
