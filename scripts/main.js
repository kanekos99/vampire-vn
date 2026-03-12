const modalImg = document.getElementById("modal-image");
const sections = ["#about", "#credits", "#others", "#gallery", "#characters"];
const home_section = document.querySelector("#about");
const chara_sprite_gallery = document.getElementById("chara-sprite-gallery");
const chara_name = document.getElementById("chara-name");
const chara_profile_text = document.getElementById("chara-profile-text");
const chara_likes = document.getElementById("likes");
const chara_dislikes = document.getElementById("dislikes");
const chara_story = document.getElementById("story-text");
const chara_image = document.getElementById("character-image");

const app = {
  init: function () {
    console.log("Hello world :)");
    loadCharaImages();
  },
};

app.init();

function loadGame() {
  document.getElementById("game-container").innerHTML =
    '<iframe frameborder="0" src="https://itch.io/embed-upload/16288679?color=000000" allowfullscreen="" width="1024" height="576"><a href="https://kanekos99.itch.io/how-not-to-kill-a-vampire-lord">Play How (Not) To Kill A Vampire Lord on itch.io</a></iframe>';
  document.getElementById("load-btn").style.display = "none";
}

function showNextOrPrevImg(direction) {
  const currentSection = window.location.hash;
  let visibleImages = [];
  if (currentSection == "#gallery") {
    visibleImages = [...document.querySelectorAll(".gallery-thumbnail-v2")];
  } else if (currentSection == "#characters") {
    visibleImages = [...document.querySelectorAll(".chara-thumbnail")];
  } else {
    visibleImages = [...document.querySelectorAll(".gallery-thumbnail")];
  }
  console.log(visibleImages);
  const currentSrc = modalImg.src;

  console.log(currentSrc);

  let currentIndex = visibleImages.findIndex((img) => img.src === currentSrc);
  let nextIndex = currentIndex + direction;

  if (direction === 1 && nextIndex >= visibleImages.length) {
    nextIndex = 0;
  } else if (direction === -1 && nextIndex === -1) {
    nextIndex = visibleImages.length - 1;
  }

  console.log(visibleImages[nextIndex]);

  showImage(visibleImages[nextIndex]);
}

function showImage(image) {
  modalImg.style.display = "none";
  modalImg.src = image.src;

  console.log(image.src);

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
  const newActiveBtn = document.querySelector(
    `.nav-bar-btn[href="${sectionId}"]`,
  );
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

/*-------------------- character switching handling -----------------------*/

// function switchCharacter(id, iconName) {
//   const selectedCharacter = characters[id];
//   activeCharacter = id;
//   chara_name.innerHTML = selectedCharacter.displayName;
//   chara_profile_text.innerHTML = selectedCharacter.profileText;
//   chara_likes.innerHTML = selectedCharacter.likes;
//   chara_dislikes.innerHTML = selectedCharacter.dislikes;
//   chara_story.innerHTML = selectedCharacter.story;
//   chara_image.src = selectedCharacter.defaultImage;
//   loadCharaImages();

//   const characterIcons = document.querySelectorAll(".chara-icon");
//   characterIcons.forEach((el) => {
//     el.classList.remove("active-icon");
//   });
//   const activeIcon = document.getElementById(iconName);
//   activeIcon.classList.add("active-icon");
// }

function switchCharacter(id, iconName) {
  if (activeCharacter != id) {
    const selectedCharacter = characters[id];
    activeCharacter = id;
    const profileContainer = document.getElementById("characters");
    profileContainer.classList.remove("fade-in-bottom");
    profileContainer.classList.add("fade-out-bottom");

    setTimeout(() => {
      chara_name.innerHTML = selectedCharacter.displayName;
      chara_profile_text.innerHTML = selectedCharacter.profileText;
      chara_likes.innerHTML = selectedCharacter.likes;
      chara_dislikes.innerHTML = selectedCharacter.dislikes;
      chara_story.innerHTML = selectedCharacter.story;
      chara_image.src = selectedCharacter.defaultImage;
      loadCharaImages();

      const charaRow = document.querySelector(".chara-row");
      charaRow.style.setProperty(
        "--row-bg",
        `url(${selectedCharacter.bgImage})`,
      );

      const characterIcons = document.querySelectorAll(".chara-icon");
      characterIcons.forEach((el) => {
        el.classList.remove("active-icon");
      });
      const activeIcon = document.getElementById(iconName);
      if (activeIcon) activeIcon.classList.add("active-icon");

      profileContainer.classList.remove("fade-out-bottom");
      profileContainer.classList.add("fade-in-bottom");
    }, 200);
  }
}

/*---------------------Loading character sprite gallery-------------------------*/

function loadCharaImages() {
  chara_sprite_gallery.innerHTML = "";
  characters[activeCharacter].images.forEach((image) => {
    const imageThumbnailHTML = `
      <img
        src="${image}"
        loading="lazy"
        class="chara-thumbnail"
        onclick="showImage(this)"
        data-bs-toggle="modal"
        data-bs-target="#galleryModal"
      />`;

    chara_sprite_gallery.insertAdjacentHTML("beforeend", imageThumbnailHTML);
  });
}
