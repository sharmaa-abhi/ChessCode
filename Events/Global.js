import { ROOT_DIV } from "../Helper/constant.js";
import { globalData } from "../index.js";
import { renderHighlight } from "../Render/main.js";
import { clearHighlight } from "../Render/main.js";
import { selfHighlight } from "../Render/main.js";
import { clearPreviousSelfHighlight } from "../Render/main.js";
import { moveElement } from "../Render/main.js";
import { checkPieceOfOpponentOnElement } from "../Helper/commonHelper.js";
import { globalStateRender } from "../Render/main.js";
import { Square } from "../Data/data.js";

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
  // console.log(from, to);
}

// white pawn click event handler
function whitePawnClick({ piece }) {
  // globalStateRender();
  if (highlightState) return;

  clearPreviousSelfHighlight(selfHighlightState);

  // If clicked on same element twice.
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    selfHighlightState = null;
    clearHighlight();
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

    captureIds.forEach((element) => {
      checkPieceOfOpponentOnElement(element, "white");
    });

    clearHighlight();

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
  }

  // console.log(globalData);
}

// black pawn click event handler
function blackPawnClick({ piece }) {
  // globalStateRender();
  if (highlightState) {
    movePieceFromXtoY(selfHighlightState, piece);
    return;
  }
  clearPreviousSelfHighlight(selfHighlightState);
  // If clicked on same element twice.
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    selfHighlightState = null;
    clearHighlight();
    return;
  }

  // highlight clicked element
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
    // clearHighlight();

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
  } else {
    const highlightedSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) - 1}`,
    ];

    // // clear board for any  previous highlights.
    // clearHighlight();

    highlightedSquareIds.forEach((highlightId) => {
      globalData.forEach((row) => {
        row.forEach((element) => {
          if (element.id === highlightId) {
            element.highlight = true;
          }
        });
      });
    });
  }

  // console.log(globalData);
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

      if (pieceName === "WHITE_PAWN") {
        whitePawnClick(square);
      } else if (pieceName === "BLACK_PAWN") {
        blackPawnClick(square);
      }
    } else {
      const childElementOfClickedElement = Array.from(event.target.childNodes);

      if (
        childElementOfClickedElement.length == 1 ||
        event.target.localName === "span"
      ) {
        if (event.target.localName === "span") {
          const id = event.target.parentNode.id;
          moveElement(moveState, id);
          moveState = null;
        } else {
          const id = event.target.id;
          moveElement(moveState, id);
          moveState = null;
        }
        // Clear highlights and reset state after move
        clearHighlightLocal();
        clearPreviousSelfHighlight(selfHighlightState);
        selfHighlightState = null;
      } else {
        clearHighlightLocal();
        clearPreviousSelfHighlight(selfHighlightState);
        selfHighlightState = null;
      }
    }
  });
}

export { globalEvent };
