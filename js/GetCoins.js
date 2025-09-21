let startcoins = 100;

function showSection(id) {
  const sections = ['sectionCoin', 'sectionWho', 'sectionHow', 'sectionSafehouse','sectionEarnings'];
  sections.forEach(sec => {
    document.getElementById(sec).style.display = 'none';
  });
 
  document.getElementById(id).style.display = 'flex';
}

function updateCoinsEarned(multiplier){
  startcoins = startcoins * multiplier
  thediv = document.getElementById("coinsEarned");
  thediv.innerText = "Earned coins: " + startcoins
}