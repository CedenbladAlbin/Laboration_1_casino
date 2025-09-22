


import { getCurrency, subtractCurrency, addCurrency, updateCurrencyDisplay } from './Currency.js';
import { showHitnrunEffect } from './HitnrunEffect.js';

  window.addEventListener('DOMContentLoaded', function() {
      if (window.initGame) window.initGame();
  });


function initGame() {
  const divar = document.querySelectorAll('.slots');
  const intervall = 300;
  const blinkIntervaller = [];
  const resultat = [];
 const colors = ["../img/coinpile.png", "../img/grishuvud.png", "../img/gsc.png", "../img/hitnrun.png", "../img/roulette.png", "../img/royal.png"];
  const WIN_MULTIPLIER = 12;

  const restartButton = document.getElementById("restartButton");
  const stopButton = document.getElementById("stoppButton");
  const stakeSelect = document.getElementById("stakeSelect");
  stopButton.disabled = true;
  restartButton.disabled = false;

  divar.forEach(div => {
    if (!div.hasChildNodes()) {
      colors.forEach((imgSrc, i) => {
        const face = document.createElement('div');
        face.className = `face face${i + 1}`;
        face.style.backgroundColor = '#222';
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `slot-face-${i + 1}`;
        img.style.width = '90%';
        img.style.height = '90%';
        img.style.objectFit = 'contain';
        face.appendChild(img);
        div.appendChild(face);
      });
    }
  });

  function getStake() {
    return parseInt(stakeSelect.value, 10);
  }

  function spinnAction() {
    resultat.length = 0;
    blinkIntervaller.forEach(id => clearInterval(id));
    blinkIntervaller.length = 0;
    divar.forEach((div) => {
      let angle = 0;
      const intervalId = setInterval(() => {
        angle += 60; // 360/6 for 6 faces
        div.style.transform = `rotateX(${angle}deg)`;
      }, intervall);
      blinkIntervaller.push(intervalId);
    });
    stopButton.disabled = false;
    restartButton.disabled = true;
  }

  function stopAction() {

    const BET_COST = getStake();
    if (typeof getCurrency !== 'function' || typeof subtractCurrency !== 'function') {
      alert('Currency system not loaded!');
      return;
    }
    if (getCurrency() < BET_COST) {
      alert('Not enough coins to spin!');
      return;
    }
    subtractCurrency(BET_COST);

    restartButton.disabled = false;
    stopButton.disabled = true;
    divar.forEach((div, index) => {
      setTimeout(() => {
        clearInterval(blinkIntervaller[index]);
        const imgIndex = Math.floor(Math.random() * colors.length);
        resultat.push(imgIndex);
        const anglePerFace = 360 / colors.length;
        div.style.transform = `rotateX(${- (360 + imgIndex * anglePerFace)}deg)`;
      }, index * 800);
    });

    setTimeout(() => {
      const stake = getStake();
      // Count occurrences of each color
      const colorCounts = {};
      resultat.forEach(idx => {
        colorCounts[idx] = (colorCounts[idx] || 0) + 1;
      });
      const counts = Object.values(colorCounts);
      let winType = null;
      let winAmount = 0;

      // Big win: all 4 the same
      if (counts.includes(4)) {

        winType = 'big';
        winAmount = stake * WIN_MULTIPLIER;
        // Jackpot gold ray effect
        
        const currencyEl = document.getElementById('currencyDisplay');
        if (currencyEl) {
          currencyEl.classList.remove('pulse');
          void currencyEl.offsetWidth;
          currencyEl.classList.add('pulse');
          setTimeout(() => currencyEl.classList.remove('pulse'), 800);
        }
            
            const jackpotRay = document.createElement('div');
            jackpotRay.className = 'jackpot-ray';
            document.body.appendChild(jackpotRay);
            setTimeout(() => {
              if (jackpotRay.parentNode) jackpotRay.parentNode.removeChild(jackpotRay);
            }, 1300);
        
      
       
      // Small win: all different
      } else if (counts.length === 4) {

        
        winType = 'small';
        winAmount = Math.floor(stake * 1.2);
          const currencyEl = document.getElementById('currencyDisplay');
        if (currencyEl) {
          currencyEl.classList.remove('pulse');
          void currencyEl.offsetWidth;
          currencyEl.classList.add('pulse');
          setTimeout(() => currencyEl.classList.remove('pulse'), 800);
        }

   
      }
        // Small win: exactly 3 the same and 1 different
      else if (counts.includes(3) && counts.includes(1)) {
        winType = 'small';
        winAmount = Math.floor(stake * 2.5);
          const currencyEl = document.getElementById('currencyDisplay');
        if (currencyEl) {
          currencyEl.classList.remove('pulse');
          void currencyEl.offsetWidth;
          currencyEl.classList.add('pulse');
          setTimeout(() => currencyEl.classList.remove('pulse'), 800);
        }
      }
      addCurrency(winAmount);

        // Hitnrun thief effect: if any slot lands on hitnrun, thief steals coins
        const hitnrunIndex = colors.findIndex(src => src.includes('hitnrun'));
        if (resultat.includes(hitnrunIndex)) {
          const coins = getCurrency();
          let thiefDuration = 7.5;
          if (coins > 100) thiefDuration = Math.max(2, 15.5 - Math.log10(coins) * 1.2);
          // Show effect using module
          showHitnrunEffect({
            duration: thiefDuration,
            onSteal: () => {
              const stolenCoins = getCurrency();
              setCurrency(0);
              updateCurrencyDisplay();
            },
            onRestore: (restored) => {
              if (restored) {
                // Restore coins if caught before stolen
                setCurrency(getCurrency());
                updateCurrencyDisplay();
              }
            }
          });
          // Show effect text
          const effectDiv = document.createElement('div');
          effectDiv.className = 'hitnrun-effect';
          effectDiv.textContent = 'HIT N RUN!';
          effectDiv.style.position = 'fixed';
          effectDiv.style.zIndex = '9999';
          effectDiv.style.top = '20%';
          effectDiv.style.left = '50%';
          effectDiv.style.transform = 'translateX(-50%)';
          document.body.appendChild(effectDiv);
          setTimeout(() => {
            if (effectDiv.parentNode) effectDiv.parentNode.removeChild(effectDiv);
          }, 1800);
        }

  }, divar.length * 1100);
  }

  

  restartButton.addEventListener("click", spinnAction);
  stopButton.addEventListener("click", stopAction);
}

window.initGame = initGame;



