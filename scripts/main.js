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
