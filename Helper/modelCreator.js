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
}

function pawnPromotion(color) {
  const rook = document.createElement("img");
  rook.src = `../assets/pieces/${color}Rook.png`;

  const knight = document.createElement("img");
  knight.src = `../assets/pieces/${color}Knight.png`;

  const bishop = document.createElement("img");
  bishop.src = `../assets/pieces/${color}Bishop.png`;

  const queen = document.createElement("img");
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
}

export { ModalCreater, pawnPromotion };
