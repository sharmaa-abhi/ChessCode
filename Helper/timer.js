class ChessTimer {
  constructor() {
    this.whiteTime = 600; // 10 minutes in seconds
    this.blackTime = 600;
    this.activeColor = "white";
    this.timerId = null;
    this.hasStarted = false;

    this.whiteElement = document.getElementById("white-timer");
    this.blackElement = document.getElementById("black-timer");
  }

  start() {
    if (this.timerId) return;

    this.hasStarted = true;
    this.updateUI();

    this.timerId = setInterval(() => {
      if (this.activeColor === "white") {
        this.whiteTime--;
        if (this.whiteTime <= 0) {
          this._onTimeout("white");
        }
      } else {
        this.blackTime--;
        if (this.blackTime <= 0) {
          this._onTimeout("black");
        }
      }
      this.updateUI();
    }, 1000);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  reset() {
    this.stop();
    this.whiteTime = 600;
    this.blackTime = 600;
    this.activeColor = "white";
    this.hasStarted = false;
    this.updateUI();

    if (this.whiteElement) {
      this.whiteElement.classList.remove("active", "low-time");
    }
    if (this.blackElement) {
      this.blackElement.classList.remove("active", "low-time");
    }
  }

  switchTurn() {
    // White starts counting down on their turn, Black starts on their turn.
    // If not started yet, start it.
    if (!this.hasStarted) {
      this.start();
    } else {
      this.activeColor = this.activeColor === "white" ? "black" : "white";
      this.updateUI();
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  updateUI() {
    if (this.whiteElement) {
      this.whiteElement.textContent = this.formatTime(this.whiteTime);
      if (this.hasStarted && this.activeColor === "white") {
        this.whiteElement.classList.add("active");
      } else {
        this.whiteElement.classList.remove("active");
      }
      if (this.whiteTime <= 30) {
        this.whiteElement.classList.add("low-time");
      } else {
        this.whiteElement.classList.remove("low-time");
      }
    }

    if (this.blackElement) {
      this.blackElement.textContent = this.formatTime(this.blackTime);
      if (this.hasStarted && this.activeColor === "black") {
        this.blackElement.classList.add("active");
      } else {
        this.blackElement.classList.remove("active");
      }
      if (this.blackTime <= 30) {
        this.blackElement.classList.add("low-time");
      } else {
        this.blackElement.classList.remove("low-time");
      }
    }
  }

  _onTimeout(loserColor) {
    this.stop();
    const winner = loserColor === "white" ? "Black" : "White";

    const overlay = document.createElement("div");
    overlay.className = "timeout-overlay";

    const content = document.createElement("div");
    content.className = "timeout-overlay-content";

    const title = document.createElement("h2");
    title.textContent = "Game Over";

    const msg = document.createElement("p");
    msg.textContent = `${winner} wins on time!`;

    const button = document.createElement("button");
    button.textContent = "Restart Game";
    button.onclick = () => {
      location.reload();
    };

    content.appendChild(title);
    content.appendChild(msg);
    content.appendChild(button);
    overlay.appendChild(content);

    document.body.appendChild(overlay);
  }
}

export { ChessTimer };
