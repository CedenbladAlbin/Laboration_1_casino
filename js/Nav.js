function sendMessage(event, page) {
  event.preventDefault();
  window.parent.postMessage(page, "*");
}
