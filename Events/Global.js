import { ROOT_DIV } from "../Helper/constant.js";
import { globalData } from "../index.js";
import { renderHighlight } from "../Render/main.js";
import { clearHighlight } from "../Render/main.js";
import { selfHighlight } from "../Render/main.js";
import { moveElement } from "../Render/main.js";
import { checkPieceOfOpponentOnElement } from "../Helper/commonHelper.js";
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

  clearPreviousSelfHighlight(selfHighlightState);

  // If clicked on same element twice.
  if (piece == selfHighlightState) {
    clearHighlightLocal();
    return;
  }

  if (piece.captureHighlight) {
    // movePieceFromXtoY(selfHighlightState, piece);
    moveElement(selfHighlightState, piece.current_Position);
    clearPreviousSelfHighlight(selfHighlightState);
    return;
  }

  // clear previous self highlight
  clearPreviousSelfHighlight(selfHighlightState);

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
  // On initial position.
  if (piece.current_Position[1] == "2") {
    const highlightedSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) + 1}`,
      `${current_pos[0]}${Number(current_pos[1]) + 2}`,
    ];

    // Clear board for any previous highlights.
    clearHighlightLocal();
    // clearHighlight();

    highlightedSquareIds.forEach((highlightId) => {
      globalData.forEach((row) => {
        row.forEach((element) => {
          if (element.id === highlightId) {
            // element.highlight = true;
            element.highlight = true;
            // console.log(element);
          }
        });
      });
    });

    globalStateRender();
  } else {
    const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1]) + 1}`;
    const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1]) + 1}`;

    // console.log(checkPieceOfOpponentOnElement(col1, "WHITE"));
    // console.log(checkPieceOfOpponentOnElement(col2, "WHITE"));

    const captureIds = [col1, col2];

    const highlightedSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) + 1}`,
    ];

    clearHighlight();

    captureIds.forEach((element) => {
      checkPieceOfOpponentOnElement(element, "white");
    });

    // console.log(current_pos);
    // console.log(highlightedSquareIds);

    highlightedSquareIds.forEach((highlightId) => {
      globalData.forEach((row) => {
        row.forEach((element) => {
          if (element.id === highlightId) {
            element.highlight = true;
          }
        });
      });
    });

    globalStateRender();
  }

  // console.log(globalData);
}

// black pawn function
function blackPawnClick(square) {
  const piece = square.piece;

  clearPreviousSelfHighlight(selfHighlightState);

  // If clicked on same element twice.
  if (piece == selfHighlightState) {
    clearHighlightLocal();
    return;
  }

  if (piece.captureHighlight) {
    // movePieceFromXtoY(selfHighlightState, piece);
    moveElement(selfHighlightState, piece.current_Position);
    clearPreviousSelfHighlight(selfHighlightState);
    return;
  }

  // clear previous self highlight
  clearPreviousSelfHighlight(selfHighlightState);

  // highlight clicked element / highlighting logic
  selfHighlight(piece);
  highlightState = true;
  selfHighlightState = piece;

  // Add piece as move state.
  moveState = piece;

  const current_pos = piece.current_Position;
  // On initial position.
  if (piece.current_Position[1] == "7") {
    const highlightedSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) - 1}`,
      `${current_pos[0]}${Number(current_pos[1]) - 2}`,
    ];

    // Clear board for any previous highlights.
    clearHighlightLocal();
    // clearHighlight();

    highlightedSquareIds.forEach((highlightId) => {
      globalData.forEach((row) => {
        row.forEach((element) => {
          if (element.id === highlightId) {
            // element.highlight = true;
            element.highlight = true;
            // console.log(element);
          }
        });
      });
    });

    globalStateRender();
  } else {
    const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1]) - 1}`;
    const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1]) - 1}`;

    const captureIds = [col1, col2];

    const highlightedSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) - 1}`,
    ];

    clearHighlight();

    captureIds.forEach((element) => {
      checkPieceOfOpponentOnElement(element, "black");
    });

    // console.log(current_pos);
    // console.log(highlightedSquareIds);

    highlightedSquareIds.forEach((highlightId) => {
      globalData.forEach((row) => {
        row.forEach((element) => {
          if (element.id === highlightId) {
            element.highlight = true;
          }
        });
      });
    });

    globalStateRender();
  }

  // console.log(globalData);
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
      const flatArray = globalData.flat();
      const square = flatArray.find((el) => el.id === clickId);
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
