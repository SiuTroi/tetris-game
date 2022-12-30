/*** CONSTANT ***/
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
  "red",
  "orange",
  "green",
  "purple",
  "blue",
  "cyan",
  "yellow",
  "white",
];

const BRICK_LAYOUT = [
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];

const KEY_CODES = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
};

const WHITE_COLOR_ID = 7;

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.generateWhiteBoard();
    this.score = 0;
    this.gameOver = false;
    this.isPlaying = false;
    this.clearAudio = new Audio("../sounds/sounds_clear.wav")
  }

  reset() {
    this.grid = this.generateWhiteBoard();
    this.score = 0;
    this.gameOver = true;
    this.isPlaying = false;
    this.handleScore(0)
    this.drawBoard()
  }

  generateWhiteBoard() {
    // when this function called it will return 20 element corresponding
    // with 20 rows, and each row is an array with 10 items corresponding with 10 column,
    // and default it fill white color
    return Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID));
  }

  // Draw Rect follow corresponding axis
  drawCell(xAxis, yAxis, colorId) {
    this.ctx.fillStyle =
      COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
    this.ctx.fillRect(
      xAxis * BLOCK_SIZE,
      yAxis * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
    this.ctx.fillStyle = "black";
    this.ctx.strokeRect(
      xAxis * BLOCK_SIZE,
      yAxis * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
  }

  // Draw board default white color
  drawBoard() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        this.drawCell(col, row, this.grid[row][col]);
      }
    }
  }

  // Handle complete row and score
  handleCompleteRows() {
    const latestGrid = board.grid.filter(row => { // row => [] 10 items col
      return row.some(col => col === WHITE_COLOR_ID)
    })

    const newScore = ROWS - latestGrid.length; // newScore = total copleted rows
    const newRows = Array.from({ length: newScore }, () => Array(COLS).fill(WHITE_COLOR_ID));

    if(newScore) {
      this.handleScore(newScore * 10)
      this.clearAudio.play()
      board.grid = [...newRows, ...latestGrid]
    }
  }

  // score
  handleScore(newScore) {
    this.score += newScore
    document.getElementById("score").innerHTML = this.score
  }

  // handle Game over
  handleGameOver() {
    this.gameOver = true;
    this.isPlaying = false;
    alert("GAME OVER !!!")
  }
}

// Class Brick
class Brick {
  constructor(id) {
    this.id = id;
    this.layout = BRICK_LAYOUT[id]; // 1 array have 4 items array
    this.activeIndex = 0; // Derection of brick
    this.colPos = 3; // position of brick on the board
    this.rowPos = -2; // position of brick on the board
  }

  draw() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, this.id);
        }
      }
    }
  }

  // Clear brick become white color
  clear() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
        }
      }
    }
  }

  // Move left minus 1 col
  moveLeft() {
    if (
      !this.checkCollision(
        this.rowPos,
        this.colPos - 1,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.colPos--;
      this.draw();
    }
  }

  // Move right plus 1 col
  moveRight() {
    if (
      !this.checkCollision(
        this.rowPos,
        this.colPos + 1,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.colPos++;
      this.draw();
    }
  }

  // Move down plus 1 row
  moveDown() {
    if (
      !this.checkCollision(
        this.rowPos + 1,
        this.colPos,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.rowPos++;
      this.draw();

      return;
    }

    this.handleLanded();
    if(!board.gameOver) {
      generateNewBrick();
    }
  }

  // Rotate brick when click keyup
  rotate() {
    if (
      !this.checkCollision(
        this.rowPos,
        this.colPos,
        this.layout[(this.activeIndex + 1) % 4]
      )
    ) {
      this.clear();
      this.activeIndex = (this.activeIndex + 1) % 4;
      /**
       * activeIndex = 0
       * 0 + 1 = 1; 1 % 4 = 1
       *
       * activeIndex = 3
       * 3 + 1 = 4; 4 % 4 = 0
       */
      this.draw();
    }
  }

  // handle check collision
  checkCollision(nextRow, nextCol, nextLayout) {
    for (let row = 0; row < nextLayout.length; row++) {
      for (let col = 0; col < nextLayout[0].length; col++) {
        if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
          if (
            col + nextCol < 0 ||
            col + nextCol >= COLS ||
            row + nextRow >= ROWS ||
            board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID
          )
            return true;
        }
      }
    }

    return false;
  }

  // handle landed
  handleLanded() {
    if(this.rowPos <= 0) {
      board.handleGameOver();
      return;
    }

    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.grid[row + this.rowPos][col + this.colPos] = this.id;
        }
      }
    }

    
    board.handleCompleteRows();
    board.drawBoard();
  }
}

// function random id clas Brick
function generateNewBrick() {
  brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length); // create random id from 0 -> 6
}

board = new Board(ctx);
board.drawBoard();

document.getElementById("reset").addEventListener("click", () => {
  board.reset()
})

document.getElementById("play").addEventListener("click", () => {
  board.isPlaying = true;
  board.gameOver = false
  generateNewBrick();
  
  const refresh =  setInterval(() => {
    if(!board.gameOver){
      brick.moveDown()
    } else {
      clearInterval(refresh)
    }
  }, 1000)
})

document.addEventListener("keydown", (e) => {
  if(!board.gameOver && board.isPlaying) {
    switch (e.code) {
      case KEY_CODES.LEFT:
        brick.moveLeft();
        break;
      case KEY_CODES.RIGHT:
        brick.moveRight();
        break;
      case KEY_CODES.UP:
        brick.rotate();
        break;
      case KEY_CODES.DOWN:
        brick.moveDown();
        break;
      default:
        break;
    }
  }
});
