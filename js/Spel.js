console.log("Spel.js är laddad!");
document.addEventListener("DOMContentLoaded", () => {
  const divar = document.querySelectorAll('.slots');
  const intervall = 300;
  const blinkIntervaller = [];
  const resultat = [];
  const colors = ["blue", "magenta", "yellow", "yellow", "red", "green", "pink", "purple"];

  function spinnAction() {
    resultat.length = 0;
    blinkIntervaller.forEach(id => clearInterval(id));
    blinkIntervaller.length = 0;

    divar.forEach((div, index) => {
        let isSvart = false;
    setTimeout(() => {
        const intervalId = setInterval(() => {
          div.style.backgroundColor = isSvart ? 'white' : 'black';
          isSvart = !isSvart;
        }, intervall);
        blinkIntervaller.push(intervalId);
      }, (index * intervall) / 1.5);
    });
  }

  function stopAction() {
    divar.forEach((div, index) => {
      setTimeout(() => {
        clearInterval(blinkIntervaller[index]);
        const colorIndex = randomcolor();
        resultat.push(colorIndex);
        div.style.backgroundColor = colors[colorIndex];
      }, index * 1500);
    });

    setTimeout(() => {
      const vinst = resultat.every(nr => nr === resultat[0]);
      alert(vinst ? "Du vann!" : "Loser!");
    }, divar.length * 1500 + 500);
  }

  function randomcolor() {
    return Math.floor(Math.random() * colors.length);
  }

  // Koppla knapparna om du vill undvika inline onclick
  document.getElementById("restartButton").addEventListener("click", spinnAction);
  document.getElementById("stoppButton").addEventListener("click", stopAction);
});