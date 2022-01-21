var imageURLs = [];
var displayedImageIndex = 0;

async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
  } catch (e) {
    console.log("There was a problem fetching the breed list.");
  }
}

start();

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
  <select onchange="loadByBreed(this.value)">
        <option>Please select a dog breed</option>
        ${Object.keys(breedList)
          .map(function (breed) {
            return `<option>${breed}</option>`;
          })
          .join("")}
      </select>
  `;
}

async function loadByBreed(breed) {
  if (breed != "Please select a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    imageURLs = data.message;
    displayedImageIndex = 0; // reset back to the first image displayed

    if (imageURLs.length) {
      // Make sure we have an image
      loadImage(imageURLs[0]); // load the first image in the response
    }
  }
}

function loadImage(imageURL) {
  const slide = document.getElementById("slide");
  slide.innerHTML = '<img src="' + imageURL + '">';
}

function loadPreviousImage() {
  if (displayedImageIndex > 0) {
    displayedImageIndex = displayedImageIndex - 1;
    loadImage(imageURLs[displayedImageIndex]);
  }
}

function loadNextImage() {
  if (displayedImageIndex < imageURLs.length - 1) {
    displayedImageIndex = displayedImageIndex + 1;
    loadImage(imageURLs[displayedImageIndex]);
  }
}
