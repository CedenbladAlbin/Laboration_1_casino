//document.getElementById("nav").innerHTML = ``;

//för att knapparna ska fungera med iframes.
const thepath = document.getElementById("displayer");

window.addEventListener("message", pickpath);

function pickpath(e) {
  //const thepath = document.getElementById("displayer");

  switch (e.data) {
    case "home":
      thepath.src = "html/Home.html";
      break;
    case "gamble":
      thepath.src = "html/Spel.html";
      break;
    case "history":
      thepath.src = "html/History.html";
      break;
    default:
      console.warn("Okänt meddelande:", e.data);
  }
}


