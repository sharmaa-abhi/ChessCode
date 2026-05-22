import { initGame } from "./Data/data.js";
import { initGameRender } from "./Render/main.js";
import { globalEvent } from "./Events/Global.js";

// console.log(initGame());

const globalData = initGame();

let keySquareMapper = {};

globalData.flat().forEach((square) => {
      keySquareMapper[square.id] = square;
});

initGameRender(globalData);
globalEvent();

export { globalData , keySquareMapper };
