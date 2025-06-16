let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let turnText = document.querySelector("#turn-indicator");
let scoreXEl = document.querySelector("#score-x");
let scoreOEl = document.querySelector("#score-o");
let themeToggle = document.querySelector("#theme-toggle");

let turnO = true;
let scoreX = 0, scoreO = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("win", "x", "o");
  });
};

const disableBoxes = () => {
  boxes.forEach((box) => box.disabled = true);
};

const updateScores = () => {
  scoreXEl.innerText = scoreX;
  scoreOEl.innerText = scoreO;
};

const showWinner = (winner, winBoxes) => {
  msg.innerText = ` Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");

  winBoxes.forEach(i => boxes[i].classList.add("win"));

  if (winner === "X") scoreX++;
  else scoreO++;

  updateScores();
  disableBoxes();
};

const checkWinner = () => {
  let winnerFound = false;

  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      boxes[a].innerText !== "" &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText, [a, b, c]);
      winnerFound = true;
      return;
    }
  }

  let filledBoxes = [...boxes].every(box => box.innerText !== "");
  if (!winnerFound && filledBoxes) {
    msg.innerText = " Match Draw!";
    msgContainer.classList.remove("hide");
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.add("o");
      turnText.innerText = "Player X's Turn";
    } else {
      box.innerText = "X";
      box.classList.add("x");
      turnText.innerText = "Player O's Turn";
    }
    turnO = !turnO;
    box.disabled = true;
    checkWinner();
  });
});

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  turnText.innerText = "Player O's Turn";
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});