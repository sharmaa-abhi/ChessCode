import { ROOT_DIV } from "../Helper/constant.js";
import { globalData, keySquareMapper } from "../index.js";
import { clearHighlight } from "../Render/main.js";
import { selfHighlight, globalPiece } from "../Render/main.js";
import {
  checkPieceOfOpponentOnElement,
  checkSquareCaptureId,
  giveBishopHighlightedIds,
  giveBishopCaptureIds,
  giveRookHighlightedIds,
  giveRookCaptureIds,
  giveKnightHighlightedIds,
  giveKnightCaptureIds,
  giveQueenHighlightedIds,
  giveQueenCaptureIds,
  giveKingHighlightedIds,
  giveKingCaptureIds,
  checkWhetherPieceExistOrNot,
} from "../Helper/commonHelper.js";
import { globalStateRender } from "../Render/main.js";
import { logMoves } from "../Helper/logging.js";
import { pawnPromotion } from "../Helper/modelCreator.js";

// Whether highlight mode is active.
let highlightState = false;

// Current self-highlighted square state.
let selfHighlightState = null;

// Whether a piece is currently selected to move.
let moveState = null;

// turn variables
let inTurn = "white";

function changeTurn() {
  inTurn = inTurn === "white" ? "black" : "white";
}

// function to check
function checkForCheck() {
  if (inTurn === "white") {
    // const whiteKingCurrentPosition = globalPiece.white_King.current_Position;
    const knight_1 = globalPiece.black_Knight_1.current_Position;
    const knight_2 = globalPiece.black_Knight_2.current_Position;
    const king = globalPiece.black_King.current_Position;
    const rook_1 = globalPiece.black_Rook_1.current_Position;
    const rook_2 = globalPiece.black_Rook_2.current_Position;
    const bishop_1 = globalPiece.black_Bishop_1.current_Position;
    const bishop_2 = globalPiece.black_Bishop_2.current_Position;
    const queen = globalPiece.black_Queen.current_Position;

    const finalCheckList = [];
    finalCheckList.push(giveKnightCaptureIds(knight_1));
    finalCheckList.push(giveKnightCaptureIds(knight_2));
    finalCheckList.push(giveKingCaptureIds(king));
    finalCheckList.push(giveBishopCaptureIds(bishop_1));
    finalCheckList.push(giveBishopCaptureIds(bishop_2));
    finalCheckList.push(giveRookCaptureIds(rook_1));
    finalCheckList.push(giveRookCaptureIds(rook_2));
    finalCheckList.push(giveQueenCaptureIds(queen));
    // console.log(finalCheckList);
  } else {
    const blackKingCurrentPosition = globalPiece.black_King.current_Position;
  }
}

//  capture in turn function
function captureInTurn(square) {
  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    moveElement(selfHighlightState, piece.current_Position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }
  return;
}

function checkForPawnPromotion(piece, id) {
  if (inTurn === "white") {
    if (
      piece?.piece_name?.toLowerCase()?.includes("pawn") &&
      id?.includes("8")
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    if (
      piece?.piece_name?.toLowerCase()?.includes("pawn") &&
      id?.includes("1")
    ) {
      return true;
    } else {
      return false;
    }
  }
}

function callBackPawnPromotion(piece, id) {
  const realPiece = piece(id);
  const currentSquare = keySquareMapper[id];
  piece.current_Position = id;
  currentSquare.piece = realPiece;
  const image = document.createElement("img");
  image.src = realPiece.img;
  image.classList.add("piece");

  const currentSquareElement = document.getElementById(id);
  currentSquareElement.querySelector("img")?.remove();
  currentSquareElement.append(image);
}

// move element with square id
function moveElement(piece, id, castle) {
  // pawnPromotion("white");
  const pawnIsPromoted = checkForPawnPromotion(piece, id);

  if (piece.piece_name.includes("KING") || piece.piece_name.includes("ROOK")) {
    piece.move = true;

    if (
      piece.piece_name.includes("KING") &&
      piece.piece_name.includes("WHITE")
    ) {
      if (id === "c1" || id === "g1") {
        let rook = keySquareMapper[id === "c1" ? "a1" : "h1"];
        moveElement(rook.piece, id === "c1" ? "d1" : "f1", true);
      }
    }
    if (
      piece.piece_name.includes("KING") &&
      piece.piece_name.includes("BLACK")
    ) {
      if (id === "c8" || id === "g8") {
        let rook = keySquareMapper[id === "c8" ? "a8" : "h8"];
        moveElement(rook.piece, id === "c8" ? "d8" : "f8", true);
      }
    }
  }

  const targetSquare = keySquareMapper[id];
  const isCapture = !!(targetSquare && targetSquare.piece);
  logMoves(
    {
      piece: piece.piece_name,
      from: piece.current_Position,
      to: id,
      isCapture,
    },
    inTurn,
  );
  const flatData = globalData.flat();
  flatData.forEach((el) => {
    if (el.id === piece.current_Position) {
      el.piece = null;
    }

    if (el.id === id) {
      // el.piece ? (el.current_Position = null) : null;
      if (el.piece) {
        el.piece.current_Position = null;
      }
      el.piece = piece;
    }
  });
  clearHighlight();
  const previousPiece = document.getElementById(piece.current_Position);
  previousPiece?.classList.remove("highlightYellow");
  const currentPiece = document.getElementById(id);

  // Remove existing piece image (captured piece) if present
  currentPiece?.querySelector("img")?.remove();

  // Move the moving piece's image element to the target square
  const imgElement = previousPiece?.querySelector("img");
  if (imgElement) {
    currentPiece.appendChild(imgElement);
  }

  piece.current_Position = id;
  if (pawnIsPromoted) {
    pawnPromotion(inTurn, callBackPawnPromotion, id);
  }
  checkForCheck();
  if (!castle) {
    changeTurn();
  }
}

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

// white king click event handler
function whiteKingClick(square) {
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

  let highlightedSquareIds = giveKingHighlightedIds(current_pos);

  let temp = [];

  // on initial position movement
  const {
    bottomLeft,
    topLeft,
    bottomRight,
    topRight,
    bottom,
    top,
    right,
    left,
  } = highlightedSquareIds;

  let result = [];

  if (!piece.move) {
    const rook1 = globalPiece.white_Rook_1;
    const rook2 = globalPiece.white_Rook_2;
    if (!rook1.move) {
      const b1 = keySquareMapper["b1"];
      const c1 = keySquareMapper["c1"];
      const d1 = keySquareMapper["d1"];
      if (!b1.piece && !c1.piece && !d1.piece) {
        result.push("c1");
      }
    }
    if (!rook2.move) {
      const f1 = keySquareMapper["f1"];
      const g1 = keySquareMapper["g1"];

      if (!f1.piece && !g1.piece) {
        result.push("g1");
      }
    }
  }

  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  // insert into temp
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);
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
        checkPieceResult.piece.piece_name.startsWith("WHITE_")
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

// black king click event handler
function blackKingClick(square) {
  const piece = square.piece;

  if (piece == selfHighlightState) {
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

  let highlightedSquareIds = giveKingHighlightedIds(current_pos);

  let temp = [];

  // on initial position movement
  const {
    bottomLeft,
    topLeft,
    bottomRight,
    topRight,
    bottom,
    top,
    right,
    left,
  } = highlightedSquareIds;

  let result = [];

  if (!piece.move) {
    const rook1 = globalPiece.black_Rook_1;
    const rook2 = globalPiece.black_Rook_2;
    if (!rook1.move) {
      const b8 = keySquareMapper["b8"];
      const c8 = keySquareMapper["c8"];
      const d8 = keySquareMapper["d8"];
      if (!b8.piece && !c8.piece && !d8.piece) {
        result.push("c8");
      }
    }
    if (!rook2.move) {
      const f8 = keySquareMapper["f8"];
      const g8 = keySquareMapper["g8"];

      if (!f8.piece && !g8.piece) {
        result.push("g8");
      }
    }
  }

  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  // insert into temp
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);
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
        checkPieceResult.piece.piece_name.startsWith("BLACK_")
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

// white queen click event handler
function whiteQueenClick(square) {
  const piece = square.piece;

  if (piece == selfHighlightState) {
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

  let highlightedSquareIds = giveQueenHighlightedIds(current_pos);

  let temp = [];

  // on initial position movement
  const {
    bottomLeft,
    topLeft,
    bottomRight,
    topRight,
    bottom,
    top,
    right,
    left,
  } = highlightedSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  // insert into temp
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);
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
        checkPieceResult.piece.piece_name.startsWith("WHITE_")
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

// black queen click event handler
function blackQueenClick(square) {
  const piece = square.piece;

  if (piece == selfHighlightState) {
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

  let highlightedSquareIds = giveQueenHighlightedIds(current_pos);

  let temp = [];

  // on initial position movement
  const {
    bottomLeft,
    topLeft,
    bottomRight,
    topRight,
    bottom,
    top,
    right,
    left,
  } = highlightedSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  // insert into temp
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);
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
        checkPieceResult.piece.piece_name.startsWith("BLACK_")
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

// white knight click event handler
function whiteKnightClick(square) {
  const piece = square.piece;

  if (piece == selfHighlightState) {
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

  let highlightedSquareIds = giveKnightHighlightedIds(current_pos);

  // let temp = [];

  // // on initial position movement
  // const { bottom, top, right, left } = highlightedSquareIds;

  // let result = [];
  // result.push(checkSquareCaptureId(bottom));
  // result.push(checkSquareCaptureId(top));
  // result.push(checkSquareCaptureId(right));
  // result.push(checkSquareCaptureId(left));

  // // insert into temp
  // temp.push(bottom);
  // temp.push(top);
  // temp.push(right);
  // temp.push(left);

  // highlightedSquareIds = checkSquareCaptureId(highlightedSquareIds);
  // highlightedSquareIds = result.flat();

  // console.log(highlightedSquareIds);
  // console.log(result);

  // highlightedSquareIds.forEach((highlighted) => {
  //   const element = keySquareMapper[highlighted];
  //   element.highlight = true;
  // });

  // let captureIds = [];
  // console.log(temp);

  // for (let index = 0; index < temp.length; index++) {
  //   const arr = temp[index];

  //   for (let j = 0; j < arr.length; j++) {
  //     const element = arr[j];

  //     let checkPieceResult = checkWhetherPieceExistOrNot(element);

  //     if (
  //       checkPieceResult &&
  //       checkPieceResult.piece &&
  //       checkPieceResult.piece.piece_name == "white"
  //     ) {
  //       break;
  //     }

  //     if (checkPieceOfOpponentOnElement(element, "white")) {
  //       break;
  //     }
  //   }
  // }

  highlightedSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    if (element) {
      if (element.piece === null || element.piece === undefined) {
        element.highlight = true;
      } else {
        checkPieceOfOpponentOnElement(highlight, "white");
      }
    }
  });

  globalStateRender();
}

// black knight click event handler
function blackKnightClick(square) {
  const piece = square.piece;

  if (piece == selfHighlightState) {
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

  let highlightedSquareIds = giveKnightHighlightedIds(current_pos);

  // let temp = [];

  // // on initial position movement
  // const { bottom, top, right, left } = highlightedSquareIds;

  // let result = [];
  // result.push(checkSquareCaptureId(bottom));
  // result.push(checkSquareCaptureId(top));
  // result.push(checkSquareCaptureId(right));
  // result.push(checkSquareCaptureId(left));

  // // insert into temp
  // temp.push(bottom);
  // temp.push(top);
  // temp.push(right);
  // temp.push(left);

  // highlightedSquareIds = checkSquareCaptureId(highlightedSquareIds);
  // highlightedSquareIds = result.flat();

  // console.log(highlightedSquareIds);
  // console.log(result);

  // highlightedSquareIds.forEach((highlighted) => {
  //   const element = keySquareMapper[highlighted];
  //   element.highlight = true;
  // });

  // let captureIds = [];
  // console.log(temp);

  // for (let index = 0; index < temp.length; index++) {
  //   const arr = temp[index];

  //   for (let j = 0; j < arr.length; j++) {
  //     const element = arr[j];

  //     let checkPieceResult = checkWhetherPieceExistOrNot(element);

  //     if (
  //       checkPieceResult &&
  //       checkPieceResult.piece &&
  //       checkPieceResult.piece.piece_name == "black"
  //     ) {
  //       break;
  //     }

  //     if (checkPieceOfOpponentOnElement(element, "black")) {
  //       break;
  //     }
  //   }
  // }

  highlightedSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    if (element) {
      if (element.piece === null || element.piece === undefined) {
        element.highlight = true;
      } else {
        checkPieceOfOpponentOnElement(highlight, "black");
      }
    }
  });

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
        checkPieceResult.piece.piece_name.startsWith("BLACK_")
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

  // console.log(temp);

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];

    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistOrNot(element);

      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.startsWith("WHITE_")
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

  highlightedSquareIds = checkSquareCaptureId(highlightedSquareIds);

  highlightedSquareIds.forEach((highlighted) => {
    const element = keySquareMapper[highlighted];
    element.highlight = true;
  });

  // capture id logic
  const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1]) + 1
    }`;
  const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1]) + 1
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
        checkPieceResult.piece.piece_name.startsWith("WHITE_")
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

  highlightedSquareIds.forEach((highlighted) => {
    const element = keySquareMapper[highlighted];
    element.highlight = true;
  });

  // let captureIds = [];
  // console.log(temp);

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];

    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistOrNot(element);

      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.startsWith("BLACK_")
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

// black pawn click event handler
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

  // clear previous self highlight
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

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
  highlightedSquareIds = checkSquareCaptureId(highlightedSquareIds);

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
  if (piece && piece.current_Position) {
    const el = document.getElementById(piece.current_Position);
    if (el) {
      el.classList.remove("highlightYellow");
    }
  }
  selfHighlightState = null;
}

function globalEvent() {
  ROOT_DIV.addEventListener("click", function (event) {
    if (event.target.localName === "img") {
      const clickId = event.target.parentNode.id;
      const square = keySquareMapper[clickId];
      const pieceName =
        square && square.piece && typeof square.piece === "object"
          ? square.piece.piece_name
          : null;

      // Check if clicking on a capture square with opponent's piece
      // by help of haikyu 4.5
      if (square.captureHighlight && moveState) {
        moveElement(moveState, clickId);
        moveState = null;
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
      }

      if (
        (square.piece.piece_name.includes("WHITE") && inTurn === "black") ||
        (square.piece.piece_name.includes("BLACK") && inTurn === "white")
      ) {
        captureInTurn(square);
        return;
      }

      // If the square has a piece, handle the click based on the piece type
      switch (square.piece.piece_name) {
        case "WHITE_PAWN":
          if (inTurn == "white");
          whitePawnClick(square);
          break;
        case "BLACK_PAWN":
          if (inTurn == "black");
          blackPawnClick(square);
          break;
        case "WHITE_BISHOP":
          if (inTurn == "white");
          whiteBishopClick(square);
          break;
        case "BLACK_BISHOP":
          if (inTurn == "black");
          blackBishopClick(square);
          break;
        case "WHITE_ROOK":
          if (inTurn == "white");
          whiteRookClick(square);
          break;
        case "BLACK_ROOK":
          if (inTurn == "black");
          blackRookClick(square);
          break;
        case "WHITE_KNIGHT":
          if (inTurn == "white");
          whiteKnightClick(square);
          break;
        case "BLACK_KNIGHT":
          if (inTurn == "black");
          blackKnightClick(square);
          break;
        case "WHITE_QUEEN":
          if (inTurn == "white");
          whiteQueenClick(square);
          break;
        case "BLACK_QUEEN":
          if (inTurn == "black");
          blackQueenClick(square);
          break;
        case "WHITE_KING":
          if (inTurn == "white");
          whiteKingClick(square);
          break;
        case "BLACK_KING":
          if (inTurn == "black");
          blackKingClick(square);
          break;
        default:
          break;
      }
    } else {
      const childElementOfClickedElement = Array.from(event.target.childNodes);

      if (
        childElementOfClickedElement.length == 1 ||
        event.target.localName === "span"
      ) {
        if (event.target.localName === "span" && moveState) {
          clearPreviousSelfHighlight(selfHighlightState);
          const id = event.target.parentNode.id;
          moveElement(moveState, id);
          moveState = null;
        } else {
          const id = event.target.id;
          const square = keySquareMapper[id];
          if (square && square.highlight && moveState) {
            clearPreviousSelfHighlight(selfHighlightState);
            moveElement(moveState, id);
            moveState = null;
          } else {
            clearHighlightLocal();
            clearPreviousSelfHighlight(selfHighlightState);
          }
        }
      } else {
        //clear highlights
        clearHighlightLocal();
        clearPreviousSelfHighlight(selfHighlightState);
      }
    }
  });
}

// Expose for browser testing
window.getInTurn = () => inTurn;
window.setInTurn = (val) => {
  inTurn = val;
};

export {
  globalEvent,
  movePieceFromXtoY,
  moveElement,
  clearPreviousSelfHighlight,
  inTurn,
};
