const wrapper = document.querySelector(".wrapper");
const searchInput = wrapper.querySelector("input");
const infoText = wrapper.querySelector(".info-text");
const synonyms = wrapper.querySelector(".synonyms .list");
const volumeIcon = wrapper.querySelector(".word i");
const removeIcon = wrapper.querySelector(".search span");

let audio;

function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
  } else {
    wrapper.classList.add("active");

    let definitions = result[0].meanings[0].definitions[0];
    let phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;

    document.querySelector(".word p").innerHTML = result[0].word;
    document.querySelector(".word span").innerHTML = phonetics;
    document.querySelector(".meaning span").innerHTML = definitions.definition;
    document.querySelector(".example span").innerHTML = definitions.example;
    audio = new Audio("https:" + result[0].phonetics[0].audio);

    if (definitions.synonyms[0] == undefined) {
      synonyms.parentElement.style.dispaly = "none";
    } else {
      synonyms.parentElement.style.dispaly = "block";
      synonyms.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        synonyms.insertAdjacentHTML(
          "beforeend",
          `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]},</span>`
          // `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]},</span>`
        );
      }
    }
  }
}

function search(word) {
  searchInput.value = word;
  fetchApi(word);
}

function fetchApi(word) {
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  // let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => res.json())
    .then((result) => data(result, word));
}

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    fetchApi(e.target.value);
  }
});

volumeIcon.addEventListener("click", () => {
  audio.play();
});

removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  wrapper.classList.remove("active");
  infoText.innerHTML =
    "Type any existing word and press enter to get meaning, example, synonyms, etc.";
  infoText.style.color = "#9a9a9a";
});
