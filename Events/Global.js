import { ROOT_DIV } from "../Helper/constant.js";
import { globalData, keySquareMapper } from "../index.js";
import { renderHighlight } from "../Render/main.js";
import { clearHighlight } from "../Render/main.js";
import { selfHighlight } from "../Render/main.js";
import { moveElement } from "../Render/main.js";
import {
  checkPieceOfOpponentOnElement,
  checkSquareCaptureId,
  giveBishopHighlightedIds,
  giveRookHighlightedIds,
  giveKnightHighlightedIds,
  checkWhetherPieceExistOrNot,
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

// black rook click event handler
function blackRookClick(square) {
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

  // highlighting logic
  selfHighlight(piece);
  highlightState = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_Position;
  const flatArray = globalData.flat();

  let highlightedSquareIds = giveRookHighlightedIds(current_pos);

  let temp = [];

  // on initial position movement
  const { bottom, top, right, left } = highlightedSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  // insert into temp
  temp.push(bottom);
  temp.push(top);
  temp.push(right);
  temp.push(left);

  // highlightedSquareIds = checkSquareCaptureId(highlightedSquareIds);
  highlightedSquareIds = result.flat();

  // console.log(highlightedSquareIds);
  // console.log(result);

  highlightedSquareIds.forEach((highlighted) => {
    const element = keySquareMapper[highlighted];
    element.highlight = true;
  });

  let captureIds = [];
  // console.log(temp);

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];

    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistOrNot(element);

      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name == "black"
      ) {
        break;
      }

      if (checkPieceOfOpponentOnElement(element, "black")) {
        break;
      }
    }
  }

  globalStateRender();
}

// white rook click event handler
function whiteRookClick(square) {
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

  // highlighting logic
  selfHighlight(piece);
  highlightState = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_Position;
  const flatArray = globalData.flat();

  let highlightedSquareIds = giveRookHighlightedIds(current_pos);

  let temp = [];

  // on initial position movement
  const { bottom, top, right, left } = highlightedSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  // insert into temp
  temp.push(bottom);
  temp.push(top);
  temp.push(right);
  temp.push(left);

  // highlightedSquareIds = checkSquareCaptureId(highlightedSquareIds);
  highlightedSquareIds = result.flat();

  // console.log(highlightedSquareIds);
  // console.log(result);

  highlightedSquareIds.forEach((highlighted) => {
    const element = keySquareMapper[highlighted];
    element.highlight = true;
  });

  let captureIds = [];
  // console.log(temp);

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];

    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistOrNot(element);

      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name == "white"
      ) {
        break;
      }

      if (checkPieceOfOpponentOnElement(element, "white")) {
        break;
      }
    }
  }

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

  highlightedSquareIds.forEach((highlighted) => {
    const element = keySquareMapper[highlighted];
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

// white bishop click event handler
function whiteBishopClick(square) {
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

  // highlighting logic
  selfHighlight(piece);
  highlightState = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_Position;
  const flatArray = globalData.flat();

  let highlightedSquareIds = giveBishopHighlightedIds(current_pos);

  let temp = [];

  // on initial position movement
  const { bottomLeft, topLeft, bottomRight, topRight } = highlightedSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));

  // insert into temp
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);

  // highlightedSquareIds = checkSquareCaptureId(highlightedSquareIds);
  highlightedSquareIds = result.flat();

  // console.log(highlightedSquareIds);
  // console.log(result);

  highlightedSquareIds.forEach((highlighted) => {
    const element = keySquareMapper[highlighted];
    element.highlight = true;
  });

  let captureIds = [];
  // console.log(temp);

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];

    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistOrNot(element);

      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name == "white"
      ) {
        break;
      }

      if (checkPieceOfOpponentOnElement(element, "white")) {
        break;
      }
    }
  }

  globalStateRender();
}

// black bishop click event handler
function blackBishopClick(square) {
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

  // highlighting logic
  selfHighlight(piece);
  highlightState = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_Position;
  const flatArray = globalData.flat();

  let highlightedSquareIds = giveBishopHighlightedIds(current_pos);

  let temp = [];

  // on initial position movement
  const { bottomLeft, topLeft, bottomRight, topRight } = highlightedSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));

  // insert into temp
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);

  // highlightedSquareIds = checkSquareCaptureId(highlightedSquareIds);
  highlightedSquareIds = result.flat();

  console.log(highlightedSquareIds);
  // console.log(result);

  highlightedSquareIds.forEach((highlighted) => {
    const element = keySquareMapper[highlighted];
    element.highlight = true;
  });

  let captureIds = [];
  // console.log(temp);

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];

    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistOrNot(element);

      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name == "black"
      ) {
        break;
      }

      if (checkPieceOfOpponentOnElement(element, "black")) {
        break;
      }
    }
  }

  globalStateRender();
}

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
      const square = keySquareMapper[clickId];
      // const flatArray = globalData.flat();
      // const square = flatArray.find((el) => el.id === clickId);
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

      // const square = keySquareMapper[clickId];

      if (square.piece.piece_name === "WHITE_PAWN") {
        whitePawnClick(square);
      } else if (square.piece.piece_name === "BLACK_PAWN") {
        blackPawnClick(square);
      } else if (square.piece.piece_name === "WHITE_BISHOP") {
        whiteBishopClick(square);
      } else if (square.piece.piece_name === "BLACK_BISHOP") {
        blackBishopClick(square);
      } else if (square.piece.piece_name === "WHITE_ROOK") {
        whiteRookClick(square);
      } else if (square.piece.piece_name === "BLACK_ROOK") {
        blackRookClick(square);
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
