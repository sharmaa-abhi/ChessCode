import { ROOT_DIV } from "../Helper/constant.js";
import { globalData, keySquareMapper } from "../index.js";
// import { renderHighlight } from "../Render/main.js";
import { clearHighlight } from "../Render/main.js";
import { selfHighlight } from "../Render/main.js";
import { moveElement } from "../Render/main.js";
import {
  checkPieceOfOpponentOnElement,
  checkSquareCaptureId,
} from "../Helper/commonHelper.js";
import { globalStateRender } from "../Render/main.js";

// Whether highlight mode is active.
let highlightState = false;

// Current self-highlighted square state.
let selfHighlightState = null;

// Whether a piece is currently selected to move.
let moveState = null;

// Local helper that clears highlights and resets highlight state.
function clearHighlightLocal() {
  clearHighlight();
  highlightState = false;
}

// Move a piece from X-square to Y-square.
function movePieceFromXtoY(from, to) {
  to.piece = from.piece;
  from.piece = null;
  globalStateRender();
}

// white pawn click event handler
function whitePawnClick(square) {
  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_Position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear all highlights
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // If clicked on same element twice.
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // highlighting logic
  selfHighlight(piece);
  highlightState = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_Position;
  const flatArray = globalData.flat();

  let highlightedSquareIds = null;

  // on initial position movement
  if (piece.current_Position[1] == "2") {
    highlightedSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) + 1}`,
      `${current_pos[0]}${Number(current_pos[1]) + 2}`,
    ];
  } else {
    highlightedSquareIds = [`${current_pos[0]}${Number(current_pos[1]) + 1}`];
  }

  // highlightedSquareIds = checkSquareCaptureId(highlightedSquareIds);

  highlightedSquareIds.forEach((hightlighted) => {
    const element = keySquareMapper[hightlighted];
    element.highlight = true;
  });

  // capture id logic
  const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${
    Number(current_pos[1]) + 1
  }`;
  const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${
    Number(current_pos[1]) + 1
  }`;

  let captureIds = [col1, col2];
  // Note: Do NOT use checkSquareCaptureId for captureIds. 
  // checkSquareCaptureId uses 'break' if it finds a piece, which is correct for forward movement, 
  // but wrong for captures (where we WANT to find pieces, and diagonals are independent).

  captureIds.forEach((element) => {
    checkPieceOfOpponentOnElement(element, "white");
  });

  globalStateRender();
}

// black pawn function
function blackPawnClick(square) {
  // Clear board for any previous highlights.
  // clearHighlightLocal();

  const piece = square.piece;

  // If clicked on same element twice.
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXtoY(selfHighlightState, piece);
    moveElement(selfHighlightState, piece.current_Position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear previous self highlight
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // If clicked on same element twice.
  if (piece == selfHighlightState) {
    clearHighlightLocal();
    selfHighlightState = null;
    return;
  }

  // highlight clicked element / highlighting logic
  selfHighlight(piece);
  highlightState = true;
  selfHighlightState = piece;

  // Add piece as move state.
  moveState = piece;

  const current_pos = piece.current_Position;
  const flatArray = globalData.flat();

  let highlightedSquareIds = null;

  // On initial position.
  if (piece.current_Position[1] == "7") {
    highlightedSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) - 1}`,
      `${current_pos[0]}${Number(current_pos[1]) - 2}`,
    ];
  } else {
    highlightedSquareIds = [`${current_pos[0]}${Number(current_pos[1]) - 1}`];
  }
  // highlightedSquareIds = checkSquareCaptureId(highlightedSquareIds);

  highlightedSquareIds.forEach((highlighted) => {
    const element = keySquareMapper[highlighted];
    element.highlight = true;
  });

  // capture logic id
  const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1]) - 1}`;
  const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1]) - 1}`;

  let captureIds = [col1, col2];

  // Note: Do NOT use checkSquareCaptureId for captureIds. 
  // checkSquareCaptureId uses 'break' if it finds a piece, which is correct for forward movement, 
  // but wrong for captures (where we WANT to find pieces, and diagonals are independent).

  captureIds.forEach((element) => {
    checkPieceOfOpponentOnElement(element, "black");
  });

  globalStateRender();
}

function clearPreviousSelfHighlight(piece) {
  // console.log(piece);
  if (piece) {
    document
      .getElementById(piece.current_Position)
      .classList.remove("highlightYellow");
    selfHighlightState = null;
  }
}

function globalEvent() {
  ROOT_DIV.addEventListener("click", function (event) {
    if (event.target.localName === "img") {
      const clickId = event.target.parentNode.id;
      // const flatArray = globalData.flat();
      // const square = flatArray.find((el) => el.id === clickId);
      const square = keySquareMapper[clickId];
      const pieceName =
        square && square.piece && typeof square.piece === "object"
          ? square.piece.piece_name
          : null;
      // console.log(square.piece.piece_name);

      // Check if clicking on a capture square with opponent's piece
      // by help of haikyu 4.5
      if (square.captureHighlight && moveState) {
        moveElement(moveState, clickId);
        moveState = null;
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
      }

      if (pieceName === "WHITE_PAWN") {
        whitePawnClick(square);
      } else if (pieceName === "BLACK_PAWN") {
        blackPawnClick(square);
      }
    } else {
      // selfHighlightState = null;
      const childElementOfClickedElement = Array.from(event.target.childNodes);

      if (
        childElementOfClickedElement.length == 1 ||
        event.target.localName === "span"
      ) {
        if (event.target.localName === "span") {
          clearPreviousSelfHighlight(selfHighlightState);
          const id = event.target.parentNode.id;
          moveElement(moveState, id);
          moveState = null;
        } else {
          clearPreviousSelfHighlight(selfHighlightState);
          const id = event.target.id;
          moveElement(moveState, id);
          moveState = null;
        }
        // globalStateRender();
      } else {
        //clear highlights
        clearHighlightLocal();
        clearPreviousSelfHighlight(selfHighlightState);
      }
    }
  });
}

export { globalEvent, movePieceFromXtoY };
