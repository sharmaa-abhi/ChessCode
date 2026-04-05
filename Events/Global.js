import { ROOT_DIV } from "../Helper/constant.js";
import { gobalData } from "../index.js";
import { renderHightlight } from "../Render/main.js";
import { clearHighlight } from "../Render/main.js";
// import { sqaure } from "../Data/data.js";

//hightlight or not => state.
let highlightState = false;

function whitePawnClick({ piece }) {
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

      // if (highlightState) clearHighlight();
      // renderHightlight(highLight);
      // highlightState = true;
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
      }
    }
  });
}

export { globalEvent };
