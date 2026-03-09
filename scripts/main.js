const modalImg = document.getElementById("modal-image");

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
