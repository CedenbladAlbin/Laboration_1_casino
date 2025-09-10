function sendMessage(event, path) {
    event.preventDefault();
    window.parent.postMessage(path, '*');
}

const thepath = document.getElementById("displayer");

window.addEventListener("message", pickpath);

function pickpath(e) {
  //const thepath = document.getElementById("displayer");

  switch (e.data) {
    case "home":
      thepath.src = "html/Home.html";
      break;
    case "gamble":
      thepath.src = "html/Game.html";
      break;
    case "getcoins":
      thepath.src = "html/GetCoins.html";
      break;
    case "kidnap":
        thepath.src = "html/Kidnap.html"
    case "Devil":
        thepath.src = "html/Kidnap.html"
    default:
      console.warn("Okänt meddelande:", e.data);
  }
}



/*
function ResetIndex(){
   fetch("../html/Home.html")
         .then(response => response.text())
            .then(data => {
                const mainWindow = document.getElementById('main');
                if (mainWindow) {
                    mainWindow.innerHTML = data;
                     }
                else {
                    console.error('Main element not found');
                }
            })
            .catch(error => console.error('Error loading index:', error));
}

window.ResetIndex = ResetIndex;

*/