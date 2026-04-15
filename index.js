/*
import { Greet } from "./data/data.js";
Greet();

import { Square } from "./data/data.js";
console.log(Square("white", "pawn", "a2"));

*/
// above code is for testing purposes, will be removed in the future.

import { initGame } from "./Data/data.js";
import { initGameRender } from "./Render/main.js";
import { globalEvent } from "./Events/Global.js";

// console.log(initGame());

const globalData = initGame();

initGameRender(globalData);
globalEvent();

export { globalData };
