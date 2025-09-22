// Hitnrun thief effect module
// Usage: window.showHitnrunEffect({onSteal, onRestore, duration, fromLeft})

  function showHitnrunEffect({onSteal, onRestore, duration = 15.5, fromLeft = Math.random()<0.5}) {
    const thiefImg = document.createElement('img');
    thiefImg.src = '../img/hitnrun.png';
    thiefImg.className = 'hitnrun-thief thief-spectacular';
    thiefImg.style.position = 'fixed';
    thiefImg.style.top = '30vh';
    thiefImg.style.zIndex = '9999';
    thiefImg.setAttribute('draggable', 'false');
    if (fromLeft) {
      thiefImg.style.left = '-120px';
      thiefImg.style.transform = 'scaleX(-1)';
    } else {
      thiefImg.style.left = '110vw';
      thiefImg.style.transform = 'scaleX(1)';
    }
    document.body.appendChild(thiefImg);
    // Color cycling
    const thiefColors = ['#ff4444',  '#222'];
    let colorIdx = 0;
    const colorInterval = setInterval(() => {
      // Stronger drop-shadow and glowing box-shadow for visibility
      thiefImg.style.filter = `drop-shadow(0 0 48px ${thiefColors[colorIdx]})`;
      thiefImg.style.boxShadow = `0 0 32px 12px ${thiefColors[colorIdx]}, 0 0 8px 2px #fff`;
      colorIdx = (colorIdx + 1) % thiefColors.length;
    }, 120);
    // Zigzag and spin
    setTimeout(() => {
      thiefImg.style.transition = `left ${duration}s cubic-bezier(.7,-0.5,.3,1.5)`;
      thiefImg.classList.add('thief-zigzag-spin');
      if (fromLeft) {
        thiefImg.style.left = '110vw';
      } else {
        thiefImg.style.left = '-120px';
      }
    }, 100);
    // Steal coins at halfway
    let thiefStopped = false;
    let coinsStolen = false;
    setTimeout(() => {
      if (!thiefStopped) {
        coinsStolen = true;
        thiefImg.classList.add('thief-spinout');
        setTimeout(() => {
          thiefImg.classList.remove('thief-spinout');
        }, 900);
        if (typeof onSteal === 'function') onSteal();
      }
    }, duration * 500);
    // Click handler
    thiefImg.addEventListener('mousedown', function() {
      thiefStopped = true;
      clearInterval(colorInterval);
      thiefImg.classList.remove('thief-zigzag-spin');
      thiefImg.classList.remove('thief-spectacular');
      if (coinsStolen) {
        thiefImg.classList.add('thief-shake-fade');
        setTimeout(() => {
          thiefImg.remove();
          if (typeof onRestore === 'function') onRestore(false);
        }, 700);
      } else {
        thiefImg.classList.add('thief-bounce-fade');
        setTimeout(() => {
          thiefImg.remove();
          if (typeof onRestore === 'function') onRestore(true);
        }, 700);
      }
    });
    // Remove after animation
    setTimeout(() => {
      clearInterval(colorInterval);
      if (thiefImg.parentNode && !thiefStopped) thiefImg.remove();
    }, duration * 1000);
  }
 export { showHitnrunEffect };
