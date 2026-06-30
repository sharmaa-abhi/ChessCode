import { globalData, keySquareMapper } from "../index.js";

// function to check if exists of opponent.
function checkPieceOfOpponentOnElement(id, color) {
  // const flatData = globalData.flat();
  const opponentColor = color === "white" ? "BLACK" : "WHITE";

  const element = keySquareMapper[id];

  if (!element) return false;

  if (
    element.piece &&
    element.piece.piece_name &&
    element.piece.piece_name.includes(opponentColor)
  ) {
    const el = document.getElementById(id);
    el.classList.add("captureColor");
    element.captureHighlight = true;
    return true;
  }
  return false;
}

// function to check whether piece exists or not by sqaureId
function checkWhetherPieceExistOrNot(squareId) {
  const square = keySquareMapper[squareId];

  if (square.piece) {
    return square;
  } else {
    return false;
  }
}

// function checkSquare id for capture and return array of capture ids
function checkSquareCaptureId(array) {

  let returnArray = [];

  for (let index = 0; index < array.length; index++) {
    const squareId = array[index];
    const square = keySquareMapper[squareId];
  
    if (!square) break;

    if (square.piece) {
      break; 
    }
    returnArray.push(squareId);
  }

  return returnArray;
}

// function to give highlight ids for bishop
function giveBishopHighlightedIds(id) {
  // find top left ids
  function topLeft(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "a" && num != 8) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }
    return resultArray;
  }

  // find bottom left ids
  function bottomLeft(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "a" && num != 1) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      num = num - 1;
      resultArray.push(`${alpha}${num}`);
    }
    return resultArray;
  }

  // find top right ids
  function topRight(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "h" && num != 8) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }
    return resultArray;
  }

  // find bottom right ids
  function bottomRight(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "h" && num != 1) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      num = num - 1;
      resultArray.push(`${alpha}${num}`);
    }
    return resultArray;
  }

  // console.log(topLeft(id));
  // console.log(topRight(id));
  // console.log(bottomLeft(id));
  // console.log(bottomRight(id));

  return {
    topLeft: topLeft(id),
    topRight: topRight(id),
    bottomLeft: bottomLeft(id),
    bottomRight: bottomRight(id),
  };
}

// function to give highlight ids for rook
function giveRookHighlightedIds(id) {
  // find top left ids
  function top(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (num != 8) {
      // alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }
    return resultArray;
  }

  // find bottom left ids
  function bottom(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (num != 1) {
      // alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      num = num - 1;
      resultArray.push(`${alpha}${num}`);
    }
    return resultArray;
  }

  // find top right ids
  function right(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "h") {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      // num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }
    return resultArray;
  }

  // find bottom right ids
  function left(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "a") {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      // num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }
    return resultArray;
  }
  // console.log("top", top("a1"));

  return {
    top: top(id),
    bottom: bottom(id),
    right: right(id),
    left: left(id),
  };
}

// function to give highlight ids for knight
function giveKnightHighlightedIds(id) {
  if (!id) return;

  function left() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];
    let temp = 0;

    while (alpha != "a") {
      if (temp == 2) {
        break;
      }

      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      // num = num + 1;
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    if (resultArray.length == 2) {
      let finalReturnArray = [];

      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);

      if (number < 8) {
        finalReturnArray.push(`${alpha}${number + 1}`);
      }
      if (number > 1) {
        finalReturnArray.push(`${alpha}${number - 1}`);
      }

      return finalReturnArray;
    } else {
      return [];
    }
  }

  function bottom() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];
    let temp = 0;

    while (num != "1") {
      if (temp == 2) {
        break;
      }

      // alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      num = num - 1;
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    if (resultArray.length == 2) {
      let finalReturnArray = [];

      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);

      if (alpha != "h") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) + 1);
        finalReturnArray.push(`${alpha2}${number}`);
      }
      if (alpha != "a") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) - 1);
        finalReturnArray.push(`${alpha2}${number}`);
      }

      return finalReturnArray;
    } else {
      return [];
    }
  }

  function top() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];
    let temp = 0;

    while (num != "8") {
      if (temp == 2) {
        break;
      }

      // alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    if (resultArray.length == 2) {
      let finalReturnArray = [];

      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);

      if (alpha != "h") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) + 1);
        finalReturnArray.push(`${alpha2}${number}`);
      }
      if (alpha != "a") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) - 1);
        finalReturnArray.push(`${alpha2}${number}`);
      }

      return finalReturnArray;
    } else {
      return [];
    }
  }

  function right() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];
    let temp = 0;

    while (alpha != "h") {
      if (temp == 2) {
        break;
      }

      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      // num = num + 1;
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    if (resultArray.length == 2) {
      let finalReturnArray = [];

      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);

      if (number < 8) {
        finalReturnArray.push(`${alpha}${number + 1}`);
      }
      if (number > 1) {
        finalReturnArray.push(`${alpha}${number - 1}`);
      }

      return finalReturnArray;
    } else {
      return [];
    }
  }

  return [...top(), ...bottom(), ...left(), ...right()];
}

// function to give highlight ids for queen
function giveQueenHighlightedIds(id) {
  const rookMoves = giveRookHighlightedIds(id);
  const bishopMoves = giveBishopHighlightedIds(id);

  return {
    top: rookMoves.top,
    bottom: rookMoves.bottom,
    right: rookMoves.right,
    left: rookMoves.left,
    topLeft: bishopMoves.topLeft,
    topRight: bishopMoves.topRight,
    bottomLeft: bishopMoves.bottomLeft,
    bottomRight: bishopMoves.bottomRight,
  };
}

// function to give highlight ids for king
function giveKingHighlightedIds(id) {
  const rookMoves = giveRookHighlightedIds(id);
  const bishopMoves = giveBishopHighlightedIds(id);

  let returnResult = {
    top: rookMoves.top,
    bottom: rookMoves.bottom,
    right: rookMoves.right,
    left: rookMoves.left,
    topLeft: bishopMoves.topLeft,
    topRight: bishopMoves.topRight,
    bottomLeft: bishopMoves.bottomLeft,
    bottomRight: bishopMoves.bottomRight,
  };

  for (const key in returnResult) {
    if (Object.hasOwnProperty.call(returnResult, key)) {
      const element = returnResult[key];

      if (element.length != 0) {
        returnResult[key] = new Array([element[0]]);
      }
    }
  }

  return returnResult;
}

export {
  checkPieceOfOpponentOnElement,
  checkSquareCaptureId,
  giveBishopHighlightedIds,
  giveRookHighlightedIds,
  giveKnightHighlightedIds,
  giveQueenHighlightedIds,
  giveKingHighlightedIds,
  checkWhetherPieceExistOrNot,
};
