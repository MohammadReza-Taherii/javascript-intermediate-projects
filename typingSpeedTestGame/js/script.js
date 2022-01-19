const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const mistakeTag = document.querySelector(".mistake span");
const timeTag = document.querySelector(".time span b");
const tryAgianBtn = document.querySelector("button");

let charIndex = 0;
let mistakes = 0;
let timer;
let maxTime = 60;
let timeLeft = 60;
let isTyping = false;

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";

  paragraphs[randIndex].split("").forEach((char) => {
    let spanTag = `<span>${char}</span>`;
    typingText.innerHTML += spanTag;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (!isTyping) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }

  if (typedChar == null) {
    charIndex--;
    if (characters[charIndex].classList.contains("incorrect")) {
      mistakes--;
    }
    characters[charIndex].classList.remove("correct", "incorrect");
  } else {
    if (characters[charIndex].innerText === typedChar) {
      characters[charIndex].classList.add("correct");
    } else {
      mistakes++;
      characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
  }

  characters.forEach((span) => span.classList.remove("active"));
  characters[charIndex].classList.add("active");

  mistakeTag.innerText = mistakes;
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    inpField.value = "";
    clearInterval(timer);
  }
}

function resetGame() {
  randomParagraph();
  inpField.value = "";
  clearInterval(timer);
  charIndex = 0;
  mistakes = 0;
  timeLeft = 60;
  isTyping = false;
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistakes;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgianBtn.addEventListener("click", resetGame);
