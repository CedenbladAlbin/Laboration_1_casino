console.log("Spel.js är laddad!");

  window.addEventListener('DOMContentLoaded', function() {
      if (window.initGame) window.initGame();
  });

function initGame() {


  const divar = document.querySelectorAll('.slots');
  const intervall = 300;
  const blinkIntervaller = [];
  const resultat = [];
  const colors = ["../img/coinpile.png", "../img/grishuvud.png", "../img/gsc.png", "../img/hitnrun.png", "../img/roulette.png", "../img/royal.png"];

    const restartButton = document.getElementById("restartButton");
    const stopButton = document.getElementById("stoppButton");
    stopButton.disabled = true;
    restartButton.disabled = false;


    divar.forEach(div => {
      if (!div.hasChildNodes()) {
          colors.forEach((color, i) => {
              const face = document.createElement('div');
              face.className = `face face${i + 1}`;
              face.style.backgroundImage = `url('${color}')`; 
              face.style.backgroundSize = 'cover';
              face.style.backgroundPosition = 'center';
              div.appendChild(face);
          });
      }
    });

 function spinnAction() {
        resultat.length = 0;
        blinkIntervaller.forEach(id => clearInterval(id));
        blinkIntervaller.length = 0;

        divar.forEach((div) => {
            let angle = 0;
            const intervalId = setInterval(() => {
                angle += 60; 
                div.style.transform = `rotateX(${angle}deg)`;
            }, intervall);
            blinkIntervaller.push(intervalId);
        });
        stopButton.disabled = false;
        restartButton.disabled = true;
    }

    function stopAction() {
        restartButton.disabled = false;
        stopButton.disabled = true;
        divar.forEach((div, index) => {
            setTimeout(() => {
                clearInterval(blinkIntervaller[index]);
                const colorIndex = Math.floor(Math.random() * colors.length);
                resultat.push(colorIndex);
                div.style.transform = `rotateX(${colorIndex * 60}deg)`;
            }, index * 1000); 
        });

    setTimeout(() => {
      const vinst = resultat.every(nr => nr === resultat[0]);
     
      alert(vinst ? "Du vann!" : "Loser!");
    }, divar.length * 1500 + 5);

  
  }

  function randomcolor() {
    return Math.floor(Math.random() * colors.length);
  }

  // Koppla knapparna om du vill undvika inline onclick
  document.getElementById("restartButton").addEventListener("click", spinnAction);
  document.getElementById("stoppButton").addEventListener("click", stopAction);
};

window.initGame = initGame;

