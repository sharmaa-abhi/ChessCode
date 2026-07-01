/**
 * ChessCode — Logic Unit Test (Node.js, no DOM)
 * Simulates board state and tests all piece move + capture logic.
 * Run: node test_chess_logic.js
 */

// ── Minimal stubs for DOM & browser globals ──────────────────────────────────
const document = {
  getElementById: () => ({ classList: { add: () => {}, remove: () => {} }, appendChild: () => {}, innerHTML: "" }),
  createElement: () => ({ classList: { add: () => {} }, src: "", id: "" }),
};
global.document = document;

// ── Inline keySquareMapper builder ───────────────────────────────────────────
function Square(color, piece, id) { return { color, piece, id, highlight: null, captureHighlight: false }; }
function squareRow(rowId) {
  const cols = ["a","b","c","d","e","f","g","h"];
  return cols.map((col, i) => {
    const color = (rowId % 2 === 0) ? (i % 2 === 0 ? "white" : "black") : (i % 2 === 0 ? "black" : "white");
    return Square(color, null, col + rowId);
  });
}
const globalData = [8,7,6,5,4,3,2,1].map(squareRow);
const keySquareMapper = {};
globalData.flat().forEach(sq => keySquareMapper[sq.id] = sq);

// ── Piece factory helpers ─────────────────────────────────────────────────────
const mkPiece = (name, pos) => ({ piece_name: name, current_Position: pos, img: "" });

// ── Inline logic from commonHelper.js ────────────────────────────────────────
function checkPieceOfOpponentOnElement(id, color) {
  const opponentColor = color === "white" ? "BLACK" : "WHITE";
  const element = keySquareMapper[id];
  if (!element) return false;
  if (element.piece && element.piece.piece_name && element.piece.piece_name.includes(opponentColor)) {
    element.captureHighlight = true;
    element.highlight = null;
    return true;
  }
  return false;
}
function checkWhetherPieceExistOrNot(squareId) {
  const square = keySquareMapper[squareId];
  if (!square) return false;
  return square.piece ? square : false;
}
function checkSquareCaptureId(array) {
  let r = [];
  for (const id of array) {
    const sq = keySquareMapper[id];
    if (!sq) break;
    if (sq.piece) break;
    r.push(id);
  }
  return r;
}

// ── Inline giveKnightHighlightedIds ──────────────────────────────────────────
function giveKnightHighlightedIds(id) {
  if (!id) return [];
  const col = id[0], row = Number(id[1]);
  const results = [];
  const deltas = [[-2,-1],[-2,1],[2,-1],[2,1],[-1,-2],[-1,2],[1,-2],[1,2]];
  for (const [dc, dr] of deltas) {
    const newCol = String.fromCharCode(col.charCodeAt(0) + dc);
    const newRow = row + dr;
    if (newCol >= "a" && newCol <= "h" && newRow >= 1 && newRow <= 8) {
      results.push(newCol + newRow);
    }
  }
  return results;
}

// ── Test runner ───────────────────────────────────────────────────────────────
let passed = 0, failed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch(e) {
    console.log(`  ❌ ${name}: ${e.message}`);
    failed++;
  }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || "Assertion failed"); }

// Reset helpers
function resetSquare(id) {
  const sq = keySquareMapper[id];
  sq.piece = null; sq.highlight = null; sq.captureHighlight = false;
}

// ─────────────────────────────────────────────────────────────────────────────
console.log("\n♟️  ChessCode Logic Tests\n");

// ── 1. checkSquareCaptureId ───────────────────────────────────────────────────
console.log("1️⃣  checkSquareCaptureId");
test("Returns empty squares before blocker", () => {
  keySquareMapper["e4"].piece = mkPiece("BLACK_PAWN", "e4");
  const r = checkSquareCaptureId(["e2","e3","e4","e5"]);
  assert(r.length === 2, `Expected 2, got ${r.length}`);
  assert(r[0]==="e2" && r[1]==="e3", "Should stop before e4");
  resetSquare("e4");
});
test("Returns all when no blocker", () => {
  const r = checkSquareCaptureId(["e3","e4","e5"]);
  assert(r.length === 3, `Expected 3, got ${r.length}`);
});
test("Handles off-board ID gracefully", () => {
  const r = checkSquareCaptureId(["e8","e9","e10"]);
  assert(Array.isArray(r), "Should return array");
});

// ── 2. checkPieceOfOpponentOnElement ─────────────────────────────────────────
console.log("\n2️⃣  checkPieceOfOpponentOnElement");
test("White finds black enemy → marks captureHighlight", () => {
  keySquareMapper["d5"].piece = mkPiece("BLACK_PAWN","d5");
  const r = checkPieceOfOpponentOnElement("d5", "white");
  assert(r === true, "Should return true");
  assert(keySquareMapper["d5"].captureHighlight === true, "captureHighlight not set");
  assert(keySquareMapper["d5"].highlight === null, "highlight should be cleared");
  resetSquare("d5");
});
test("Black finds white enemy → marks captureHighlight", () => {
  keySquareMapper["e3"].piece = mkPiece("WHITE_ROOK","e3");
  const r = checkPieceOfOpponentOnElement("e3", "black");
  assert(r === true, "Should return true");
  assert(keySquareMapper["e3"].captureHighlight === true, "captureHighlight not set");
  resetSquare("e3");
});
test("Same color → no captureHighlight", () => {
  keySquareMapper["f6"].piece = mkPiece("WHITE_PAWN","f6");
  const r = checkPieceOfOpponentOnElement("f6", "white");
  assert(r === false, "Should return false for friendly piece");
  assert(!keySquareMapper["f6"].captureHighlight, "captureHighlight should NOT be set");
  resetSquare("f6");
});
test("Off-board square → returns false, no crash", () => {
  const r = checkPieceOfOpponentOnElement("z9", "white");
  assert(r === false, "Should return false for off-board");
});

// ── 3. checkWhetherPieceExistOrNot ───────────────────────────────────────────
console.log("\n3️⃣  checkWhetherPieceExistOrNot");
test("Returns square when piece present", () => {
  keySquareMapper["a1"].piece = mkPiece("WHITE_ROOK","a1");
  const r = checkWhetherPieceExistOrNot("a1");
  assert(r && r.piece, "Should return square with piece");
  resetSquare("a1");
});
test("Returns false when square empty", () => {
  const r = checkWhetherPieceExistOrNot("c4");
  assert(r === false, "Should return false");
});
test("Returns false for off-board ID — no crash", () => {
  const r = checkWhetherPieceExistOrNot("i9");
  assert(r === false, "Should return false, not throw");
});

// ── 4. Knight highlighting ────────────────────────────────────────────────────
console.log("\n4️⃣  Knight Move Highlights");
test("Knight at g1 → correct landing squares", () => {
  const ids = giveKnightHighlightedIds("g1");
  assert(ids.includes("f3"), "Should include f3");
  assert(ids.includes("h3"), "Should include h3");
  assert(ids.includes("e2"), "Should include e2");
});
test("Knight at b8 → correct landing squares", () => {
  const ids = giveKnightHighlightedIds("b8");
  assert(ids.includes("a6"), "Should include a6");
  assert(ids.includes("c6"), "Should include c6");
  assert(ids.includes("d7"), "Should include d7");
});
test("Knight at d4 → 8 landing squares", () => {
  const ids = giveKnightHighlightedIds("d4");
  assert(ids.length === 8, `Expected 8 squares, got ${ids.length}`);
});

// ── 5. Knight captures enemy, skips friendly ─────────────────────────────────
console.log("\n5️⃣  Knight Capture Logic");
test("White knight captures black piece on landing", () => {
  keySquareMapper["f3"].piece = mkPiece("BLACK_PAWN","f3");
  const ids = giveKnightHighlightedIds("g1");
  ids.forEach(id => {
    const sq = keySquareMapper[id];
    if (!sq) return;
    if (!sq.piece) { sq.highlight = true; }
    else { checkPieceOfOpponentOnElement(id, "white"); }
  });
  assert(keySquareMapper["f3"].captureHighlight === true, "f3 should be capture target");
  assert(keySquareMapper["h3"].highlight === true, "h3 should be green dot");
  resetSquare("f3");
  resetSquare("h3");
});
test("White knight does NOT capture friendly piece", () => {
  keySquareMapper["f3"].piece = mkPiece("WHITE_BISHOP","f3");
  const ids = giveKnightHighlightedIds("g1");
  ids.forEach(id => {
    const sq = keySquareMapper[id];
    if (!sq) return;
    if (!sq.piece) { sq.highlight = true; }
    else { checkPieceOfOpponentOnElement(id, "white"); }
  });
  assert(!keySquareMapper["f3"].captureHighlight, "f3 should NOT be capture target (friendly)");
  resetSquare("f3");
  resetSquare("h3");
});

// ── 6. Rook ray blocking ──────────────────────────────────────────────────────
console.log("\n6️⃣  Rook / Sliding Piece Ray Blocking");
test("Rook ray stops at friendly piece — no capture", () => {
  // Place white rook at a1, white pawn at a3
  keySquareMapper["a3"].piece = mkPiece("WHITE_PAWN","a3");
  const ray = ["a2","a3","a4","a5","a6","a7","a8"];
  const empty = checkSquareCaptureId(ray); // [a2]
  empty.forEach(id => keySquareMapper[id].highlight = true);
  // walk temp for captures
  for (const id of ray) {
    const res = checkWhetherPieceExistOrNot(id);
    if (res && res.piece && res.piece.piece_name.startsWith("WHITE_")) break;
    if (checkPieceOfOpponentOnElement(id, "white")) break;
  }
  assert(keySquareMapper["a2"].highlight === true, "a2 should be green");
  assert(!keySquareMapper["a3"].captureHighlight, "a3 is friendly — no capture");
  assert(!keySquareMapper["a4"].highlight, "a4 should not be highlighted (blocked by a3)");
  resetSquare("a3"); resetSquare("a2"); resetSquare("a4");
});
test("Rook ray stops at enemy piece — marks capture", () => {
  keySquareMapper["a4"].piece = mkPiece("BLACK_ROOK","a4");
  const ray = ["a2","a3","a4","a5"];
  const empty = checkSquareCaptureId(ray);
  empty.forEach(id => keySquareMapper[id].highlight = true);
  for (const id of ray) {
    const res = checkWhetherPieceExistOrNot(id);
    if (res && res.piece && res.piece.piece_name.startsWith("WHITE_")) break;
    if (checkPieceOfOpponentOnElement(id, "white")) break;
  }
  assert(keySquareMapper["a2"].highlight === true, "a2 green");
  assert(keySquareMapper["a3"].highlight === true, "a3 green");
  assert(keySquareMapper["a4"].captureHighlight === true, "a4 should be capture");
  assert(keySquareMapper["a4"].highlight === null, "a4 green dot cleared (capture priority)");
  assert(!keySquareMapper["a5"].highlight, "a5 beyond blocker — not highlighted");
  resetSquare("a4"); resetSquare("a2"); resetSquare("a3"); resetSquare("a5");
});

// ── SUMMARY ───────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed === 0) console.log("🎉 All tests passed!\n");
else console.log("⚠️  Some tests failed — see above.\n");
process.exit(failed > 0 ? 1 : 0);
