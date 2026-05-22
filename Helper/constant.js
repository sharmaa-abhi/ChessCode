const ROOT_DIV = document.getElementById("root");

export { ROOT_DIV };

// extra file
{
  // globalData.forEach((row) => {
  //   row.forEach((element) => {
  //     if (element.id === highlightId) {
  //       // element.highlight = true;
  // element.highlight = true;
  //       // console.log(element);
  //     }
  //   });
  // });
  // function whitePawnClick(square) {
  //   const piece = square.piece;
  //   // If clicked on same element twice.
  //   if (piece == selfHighlightState) {
  //     clearPreviousSelfHighlight(selfHighlightState);
  //     clearHighlightLocal();
  //     return;
  //   }
  //   if (square.captureHighlight) {
  //     // movePieceFromXtoY(selfHighlightState, piece);
  //     moveElement(selfHighlightState, piece.current_Position);
  //     clearPreviousSelfHighlight(selfHighlightState);
  //     clearHighlightLocal();
  //     return;
  //   }
  //   // clear previous self highlight
  //   // clearPreviousSelfHighlight(selfHighlightState);
  //   // clearHighlightLocal();
  //   // If clicked on same element twice.
  //   if (piece == selfHighlightState) {
  //     clearHighlightLocal();
  //     selfHighlightState = null;
  //     return;
  //   }
  //   // highlight clicked element / highlighting logic
  //   selfHighlight(piece);
  //   highlightState = true;
  //   selfHighlightState = piece;
  //   // Add piece as move state.
  //   moveState = piece;
  //   const current_pos = piece.current_Position;
  //   // const flatArray = globalData.flat();
  //   let highlightedSquareIds = null;
  //   // On initial position.
  //   if (piece.current_Position[1] == "2") {
  //     highlightedSquareIds = [
  //       `${current_pos[0]}${Number(current_pos[1]) + 1}`,
  //       `${current_pos[0]}${Number(current_pos[1]) + 2}`,
  //     ];
  //   } else {
  //     highlightedSquareIds = [`${current_pos[0]}${Number(current_pos[1]) + 1}`];
  //   }
  //   highlightedSquareIds.forEach((highlight) => {
  //     const element = keySquareMapper[highlight];
  //     element.highlight = true;
  //   });
  //   // capture logic id
  //   const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1]) + 1}`;
  //   const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1]) + 1}`;
  //   let captureIds = [col1, col2];
  //   captureIds = checkSquareCaptureId(captureIds);
  //   // console.log("captureIds:", captureIds);
  //   captureIds.forEach((element) => {
  //     checkPieceOfOpponentOnElement(element, "white");
  //   });
  //   globalStateRender();
  // }
}
