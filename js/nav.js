// Sends a message to the parent window (e.g., from inside an iframe)
function sendMessage(event, path) {
    event.preventDefault();
    window.parent.postMessage(path, '*');
}

// Reference to the iframe where content will be displayed
const thepath = document.getElementById("displayer");

// Listens for messages sent to this window
window.addEventListener("message", pickpath);

// Handles incoming messages and updates the iframe source accordingly
function pickpath(e) {
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
      thepath.src = "html/Kidnap.html";
      break;
    case "Devil":
      thepath.src = "html/Kidnap.html";
      break;
    default:
      console.warn("Unknown message:", e.data);
  }
}


