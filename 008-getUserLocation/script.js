const button = document.querySelector("button");

const apiKey = "d89e883e760344af8871596e67cc78d7";

button.addEventListener("click", () => {
  console.log(navigator.geolocation);
  if (navigator.geolocation) {
    button.innerText = "Allow to detect location";
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    button.innerText = "Your browser not support";
  }
});

function onSuccess(position) {
  button.innerText = "Detecting your location...";
  let { latitude, longitude } = position.coords;
  console.log(latitude, longitude);
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
  )
    .then((res) => res.json())
    .then((result) => {
      let { county, postcode, country } = result.results[0].components;
      button.innerText = `${county} ${postcode}, ${country}`;
    });
}

function onError(error) {
  console.log(error);
  if (error.code == 1) {
    button.innerText = "You denied the request";
  } else if (error.code == 2) {
    button.innerText = "Location not available";
  } else {
    button.innerText = "Something went wrong";
  }
  button.setAttribute("disable", "true");
}
