const quotetext = document.querySelector(".quote");
const authorName = document.querySelector(".author .name");
const qouteBtn = document.querySelector("button");
const soundBtn = document.querySelector(".speech");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");

function randomQoute() {
  qouteBtn.classList.add("loading");
  qouteBtn.innerHTML = "Loading...";
  fetch("http://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      quotetext.innerHTML = result.content;
      authorName.innerHTML = result.author;
      qouteBtn.classList.remove("loading");
      qouteBtn.innerHTML = "New Quote";
    });
}

soundBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(
    `${quotetext.innerHTML} by ${authorName.innerHTML}`
  );
  speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quotetext.innerHTML);
});

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quotetext.innerHTML}`;
  window.open(tweetUrl, "_blank");
});

qouteBtn.addEventListener("click", randomQoute);
