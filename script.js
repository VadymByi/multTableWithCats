let userAnswer = document.getElementById("userAnswer");
let randomExamp = document.getElementById("randomExamp");
let start = document.getElementById("start");
let submitButton = document.getElementById("submitButton");
let rightAnswer = document.getElementById("rightAnswer");
let wrongAnswer = document.getElementById("wrongAnswer");

let currentKey = "";

// Save the multiplication table into a const
const multiplicationTable = {};
for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    multiplicationTable[`${i}x${j}`] = i * j;
  }
}

// Function of receiving an image and displaying it
function showCat(isHappy) {
  const apiKey =
    "live_OYY7AkC7ueU0Kx9oNuJAfrC4yH5LImv60uzF4S5tQ0kHi3cSchoOqUfdLyDhkavU";
  const url = "https://api.thecatapi.com/v1/images/search";

  fetch(url, {
    headers: {
      "x-api-key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data[0].url;
      const catImage = document.createElement("img");
      catImage.src = imageUrl;
      catImage.alt = isHappy ? "Happy cat" : "Sad cat";

      const container = document.getElementById("catImage");
      container.innerHTML = "";
      container.appendChild(catImage);
    })
    .catch((error) => console.error("Error while receiving cat", error));
}

// Launching the application
start.addEventListener("click", () => {
  getRandomQuestion();
  userAnswer.focus();
});

// Random Query Function
function getRandomQuestion() {
  const keys = Object.keys(multiplicationTable);
  currentKey = keys[Math.floor(Math.random() * keys.length)];
  randomExamp.textContent = currentKey;
}

// Function to check user response
function checkAnswer() {
  const userValue = userAnswer.value;
  const correctAnswer = multiplicationTable[currentKey];

  submitButton.classList.remove("correct", "mistake");

  if (Number(userValue) === correctAnswer) {
    submitButton.classList.add("correct");
    wrongAnswer.textContent = "";
    rightAnswer.textContent = "Correct!!! :)";
    showCat(true);
  } else {
    submitButton.classList.add("mistake");
    rightAnswer.textContent = "";
    wrongAnswer.textContent = "Mistake :(";
    showCat(false);
  }

  setTimeout(() => {
    submitButton.classList.remove("correct", "mistake");
  }, 1500);

  userAnswer.value = "";
  getRandomQuestion();
  userAnswer.focus();
}

// Processing user actions after entering a response
userAnswer.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkAnswer();
  }
});

submitButton.addEventListener("click", function () {
  checkAnswer();
});
