const modalImg = document.getElementById("modal-image");
const sections = ["#about", "#credits", "#others"];
const home_section = document.querySelector("#about");

const app = {
  init: function () {
    console.log("Hello world :)");
  },
};

app.init();

function loadGame() {
  document.getElementById("game-container").innerHTML =
    '<iframe frameborder="0" src="https://itch.io/embed-upload/16288679?color=000000" allowfullscreen="" width="1024" height="576"><a href="https://kanekos99.itch.io/how-not-to-kill-a-vampire-lord">Play How (Not) To Kill A Vampire Lord on itch.io</a></iframe>';
  document.getElementById("load-btn").style.display = "none";
}

function showNextOrPrevImg(direction) {
  const visibleImages = [...document.querySelectorAll(".gallery-thumbnail")];
  const currentSrc = modalImg.src;

  let currentIndex = visibleImages.findIndex((img) => img.src === currentSrc);
  let nextIndex = currentIndex + direction;

  if (direction === 1 && nextIndex >= visibleImages.length) {
    nextIndex = 0;
  } else if (direction === -1 && nextIndex === -1) {
    nextIndex = visibleImages.length - 1;
  }

  showImage(visibleImages[nextIndex]);
}

function showImage(image) {
  modalImg.style.display = "none";
  modalImg.src = image.src;

  modalImg.onload = function () {
    modalImg.style.display = "block";
  };
}

function jumpToSection(sectionId) {
  const selectedSection = document.querySelector(sectionId);

  const activeElements = document.querySelectorAll(".active");

  activeElements.forEach((el) => {
    el.style.display = "none";
    el.classList.remove("active");
  });

  selectedSection.style.display = "block";
  selectedSection.classList.add("active");

  updateActiveBtn(sectionId);

  location.hash = sectionId;
}

function backToHome() {
  const activeElements = document.querySelectorAll(".active");
  activeElements.forEach((el) => {
    el.style.display = "none";
    el.classList.remove("active");
  });

  home_section.style.display = "block";
  home_section.classList.add("active");
  updateActiveBtn("#about");

  location.hash = "";
}

function updateActiveBtn(sectionId) {
  const currentActiveBtn = document.querySelector(".active-btn");
  currentActiveBtn.classList.remove("active-btn");
  const newActiveBtn = document.querySelector(`a[href="${sectionId}"]`);
  newActiveBtn.classList.add("active-btn");
}

function handleHashChange() {
  if (sections.includes(window.location.hash)) {
    const selectedSection = window.location.hash;
    jumpToSection(selectedSection);
  } else {
    backToHome();
  }
}

window.addEventListener("hashchange", handleHashChange);
window.addEventListener("DOMContentLoaded", () => {
  const currentHash = window.location.hash;
  handleHashChange(currentHash);
});
