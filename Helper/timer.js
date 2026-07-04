/**
 * ChessTimer — Per-player countdown timer for chess.
 *
 * Usage:
 *   import { chessTimer } from "./timer.js";
 *   chessTimer.switchTurn();  // called by changeTurn() in Global.js
 */

const INITIAL_TIME_SECONDS = 10 * 60; // 10 minutes per player
const LOW_TIME_THRESHOLD = 30; // seconds — triggers warning style

class ChessTimer {
  constructor(initialTime) {
    this.initialTime = initialTime;
    this.whiteTime = initialTime;
    this.blackTime = initialTime;
    this.activeColor = null; // null until first move
    this.intervalId = null;
    this.gameOver = false;
  }

  /**
   * Format seconds into MM:SS string.
   */
  _formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  /**
   * Update the DOM timer displays.
   */
  _updateDisplay() {
    const whiteEl = document.getElementById("white-time");
    const blackEl = document.getElementById("black-time");
    const whiteTimer = document.getElementById("white-timer");
    const blackTimer = document.getElementById("black-timer");

    if (whiteEl) whiteEl.textContent = this._formatTime(this.whiteTime);
    if (blackEl) blackEl.textContent = this._formatTime(this.blackTime);

    // Active timer styling
    if (whiteTimer) {
      whiteTimer.classList.toggle("active-timer", this.activeColor === "white");
      whiteTimer.classList.toggle("low-time", this.whiteTime <= LOW_TIME_THRESHOLD && this.whiteTime > 0);
    }
    if (blackTimer) {
      blackTimer.classList.toggle("active-timer", this.activeColor === "black");
      blackTimer.classList.toggle("low-time", this.blackTime <= LOW_TIME_THRESHOLD && this.blackTime > 0);
    }
  }

  /**
   * Start the countdown interval.
   */
  _startInterval() {
    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      if (this.gameOver) {
        clearInterval(this.intervalId);
        return;
      }

      if (this.activeColor === "white") {
        this.whiteTime--;
        if (this.whiteTime <= 0) {
          this.whiteTime = 0;
          this._onTimeout("white");
        }
      } else if (this.activeColor === "black") {
        this.blackTime--;
        if (this.blackTime <= 0) {
          this.blackTime = 0;
          this._onTimeout("black");
        }
      }

      this._updateDisplay();
    }, 1000);
  }

  /**
   * Handle timeout (flag fall).
   */
  _onTimeout(color) {
    this.gameOver = true;
    clearInterval(this.intervalId);
    this._updateDisplay();

    const winner = color === "white" ? "Black" : "White";

    // Show timeout overlay
    const overlay = document.createElement("div");
    overlay.id = "timeout-overlay";
    overlay.innerHTML = `
      <div class="timeout-modal">
        <div class="timeout-icon">\u23F1\uFE0F</div>
        <div class="timeout-title">Time's Up!</div>
        <div class="timeout-message">${color.charAt(0).toUpperCase() + color.slice(1)} ran out of time</div>
        <div class="timeout-winner">${winner} wins on time</div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById("root")?.classList.add("blur");
  }

  /**
   * Switch the active timer to the other player.
   * Called by changeTurn() after each move.
   */
  switchTurn() {
    if (this.gameOver) return;

    if (this.activeColor === null) {
      // First move: white just moved, start black's clock
      this.activeColor = "black";
    } else {
      this.activeColor = this.activeColor === "white" ? "black" : "white";
    }

    this._updateDisplay();
    this._startInterval();
  }

  /**
   * Stop the timer entirely.
   */
  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.activeColor = null;
  }

  /**
   * Reset the timer to initial state.
   */
  reset() {
    this.stop();
    this.whiteTime = this.initialTime;
    this.blackTime = this.initialTime;
    this.gameOver = false;
    this._updateDisplay();
  }
}

const chessTimer = new ChessTimer(INITIAL_TIME_SECONDS);

// Initial display render
document.addEventListener("DOMContentLoaded", () => {
  chessTimer._updateDisplay();
});

export { chessTimer, ChessTimer };
