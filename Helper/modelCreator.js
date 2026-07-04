import {
  blackRook,
  whiteRook,
  blackKnight,
  whiteKnight,
  blackBishop,
  whiteBishop,
  blackQueen,
  whiteQueen,
} from "../Data/pieces.js";

class ModalCreater {
  constructor(body) {
    if (!body) {
      throw new Error("Modal body is required");
    }

    this.open = false;
    this.body = body;
  }
  show() {
    //     alert("show");
    this.open = true;
    document.body.appendChild(this.body);
    document.getElementById("root").classList.add("blur");
  }
  hide() {
    this.open = false;
    document.body.removeChild(this.body);
    document.getElementById("root").classList.remove("blur");
  }
}

function pawnPromotion(color, callback, id) {
  const rook = document.createElement("img");
  rook.onclick = rookCallback;
  rook.src = `../assets/pieces/${color}Rook.png`;

  const knight = document.createElement("img");
  knight.onclick = knightCallback;
  knight.src = `../assets/pieces/${color}Knight.png`;

  const bishop = document.createElement("img");
  bishop.onclick = bishopCallback;
  bishop.src = `../assets/pieces/${color}Bishop.png`;

  const queen = document.createElement("img");
  queen.onclick = queenCallback;
  queen.src = `../assets/pieces/${color}Queen.png`;    

  const imagesConatiner = document.createElement("div");
  imagesConatiner.appendChild(rook);
  imagesConatiner.appendChild(knight);
  imagesConatiner.appendChild(bishop);
  imagesConatiner.appendChild(queen);

  const msg = document.createElement("p");
  msg.textContent = "Choose a piece to promote your pawn to:";

  const finalContainer = document.createElement("div");
  finalContainer.appendChild(msg);
  finalContainer.appendChild(imagesConatiner);
  finalContainer.classList.add("modal-container");
  const model = new ModalCreater(finalContainer);
  
  model.show();

  //callbacks
  function rookCallback ()  {
    if (color === "white") {
      callback(whiteRook, id);
    } else {
      callback(blackRook, id);
    }
    model.hide();
  };
  function knightCallback() {
    if (color === "white") {
      callback(whiteKnight, id);
    } else {
      callback(blackKnight, id);
    }
    model.hide();
  };
  function bishopCallback() {
    if (color === "white") {
      callback(whiteBishop, id);
    } else {
      callback(blackBishop, id);
    }
    model.hide();
  };
  function queenCallback() {
    if (color === "white") {
      callback(whiteQueen, id);
    } else {
      callback(blackQueen, id);
    }
    model.hide();
  };

}

export { ModalCreater, pawnPromotion };
