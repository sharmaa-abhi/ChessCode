import { initGame } from "./Data/data.js";
import { initGameRender, globalPiece } from "./Render/main.js";
import { globalEvent } from "./Events/Global.js";

// console.log(initGame());

const globalData = initGame();

let keySquareMapper = {};

globalData.flat().forEach((square) => {
      keySquareMapper[square.id] = square;
});

initGameRender(globalData);
globalEvent();

// Expose state globally so test.html can access it via iframe
window.globalData = globalData;
window.keySquareMapper = keySquareMapper;
window.globalPiece = globalPiece;
window.__chess = { globalData, keySquareMapper, globalPiece };

export { globalData , keySquareMapper, globalPiece };
