import { ROOT_DIV } from "../Helper/constant.js";
import { gobalData } from "../index.js";
import { renderHightlight } from "../Render/main.js";
import { clearHighlight } from "../Render/main.js";
import { selfHighLight } from "../Render/main.js";
import { clearPreviousSelfHighlight } from "../Render/main.js";
import { moveElement } from "../Render/main.js";
// import { sqaure } from "../Data/data.js";

//hightlight or not => state.
let highlightState = false;

// current self-highlighted square state
let selfHighlightState = null;

//  In move state or not
let moveState = null;

// white pawn click event handler
function whitePawnClick({ piece }) {
  // if clicked on same element twuce.
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    selfHighlightState = null;
    clearHighlight();
    return;
  }

  //higlight clicked element
  selfHighLight(piece);
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_Position;
  //on initial position
  if (piece.current_Position[1] == "2") {
    const highlightedSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) + 1}`,
      `${current_pos[0]}${Number(current_pos[1]) + 2}`,
    ];

    // clear board for any  previous highlights.
    clearHighlight();

    highlightedSquareIds.forEach((highLight) => {
      gobalData.forEach((row) => {
        row.forEach((element) => {
          if (element.id === highLight) {
            element.hightLight(true);
          }
        });
      });
    });
  } else {
    const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${current_pos[0]}${Number(current_pos[1]) + 1}`;
    const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${current_pos[0]}${Number(current_pos[1]) + 1}`;

    console.log(col1, col2);
    console.log(current_pos);

    const captureIds = [];

    const highlightedSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) + 1}`,
    ];

    // clear board for any  previous highlights.
    clearHighlight();

    highlightedSquareIds.forEach((highLight) => {
      gobalData.forEach((row) => {
        row.forEach((element) => {
          if (element.id === highLight) {
            element.hightLight(true);
          }
        });
      });
    });
  }

  // console.log(gobalData);
}

// black pawn click event handler
function blackPawnClick({ piece }) {
  // if clicked on same element twuce.
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    selfHighlightState = null;
    clearHighlight();
    return;
  }

  //higlight clicked element
  selfHighLight(piece);
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_Position;
  //on initial position
  if (piece.current_Position[1] == "7") {
    const highlightedSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) - 1}`,
      `${current_pos[0]}${Number(current_pos[1]) - 2}`,
    ];

    // clear board for any  previous highlights.
    clearHighlight();

    highlightedSquareIds.forEach((highLight) => {
      gobalData.forEach((row) => {
        row.forEach((element) => {
          if (element.id === highLight) {
            element.hightLight(true);
          }
        });
      });
    });
  } else {
    const highlightedSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) - 1}`,
    ];

    // clear board for any  previous highlights.
    clearHighlight();

    highlightedSquareIds.forEach((highLight) => {
      gobalData.forEach((row) => {
        row.forEach((element) => {
          if (element.id === highLight) {
            element.hightLight(true);
          }
        });
      });
    });
  }

  // console.log(gobalData);
}

function globalEvent() {
  ROOT_DIV.addEventListener("click", function (event) {
    if (event.target.localName === "img") {
      const clickId = event.target.parentNode.id;
      const flatArray = gobalData.flat();
      const sqaure = flatArray.find((el) => el.id === clickId);
      // console.log(sqaure.piece.piece_name);

      if (sqaure.piece.piece_name === "WHITE_PAWN") {
        whitePawnClick(sqaure);
      } else if (sqaure.piece.piece_name === "BLACK_PAWN") {
        blackPawnClick(sqaure);
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
        // clear highlight
        clearHighlight();
        clearPreviousSelfHighlight(selfHighlightState);
        selfHighlightState = null;
      } else {
        // clear highlight
        clearHighlight();
        clearPreviousSelfHighlight(selfHighlightState);
        selfHighlightState = null;
      }
    }
  });
}

export { globalEvent };
