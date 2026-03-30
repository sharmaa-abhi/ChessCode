const ROOT_DIV = document.getElementById("root");

function initGameRender(data) {
  // Render each board row and square into the root container.
  // Each element array represents a row, and each square object includes color.
  data.forEach((element) => {
    const rowElement = document.createElement("div");
    element.forEach((square) => {
      const squareDiv = document.createElement("div");
      squareDiv.classList.add(square.color, "square");
      rowElement.appendChild(squareDiv);
    });

    ROOT_DIV.appendChild(rowElement);
    rowElement.classList.add("squareRow");
    //     console.log(rowElement);
  });
}

export { initGameRender };
