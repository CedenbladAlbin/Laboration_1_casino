
import { addCurrency } from './Currency.js';

let startcoins = 100;
let counter = 0;


function showSection(id) {
  const sections = ['sectionCoin', 'sectionWho', 'sectionHow', 'sectionSafehouse','sectionEarnings'];
  sections.forEach(sec => {
    document.getElementById(sec).style.display = 'none';
  });
  document.getElementById(id).style.display = 'flex';
}
window.showSection = showSection;

function updateCoinsEarned(multiplier){
  startcoins = startcoins * multiplier;
  counter += 1;
  if(startcoins < 1){
    startcoins = 1;
  }
  const thediv = document.getElementById("coinsEarned");
  thediv.innerText = "Earned coins: " + startcoins;
  if(counter ===3){
    addCurrency(startcoins);
    }
  
}
window.updateCoinsEarned = updateCoinsEarned;