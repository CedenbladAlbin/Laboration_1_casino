const CURRENCY_KEY = 'casino_currency';
const DEFAULT_CURRENCY = 1000;
const TOTALLOSS_KEY = 'total_loss';
const DEFAULT_LOSS = 0;
// Get current currency, initialize if not set
function getCurrency() {
	let value = parseInt(localStorage.getItem(CURRENCY_KEY), 10);
	if (isNaN(value)) {
		value = DEFAULT_CURRENCY;
		setCurrency(value);
	}
	return value;
}
// Set currency and update display
function setCurrency(amount) {
	localStorage.setItem(CURRENCY_KEY, amount);
	updateCurrencyDisplay();
}
// Add to current currency
function addCurrency(amount) {
	setCurrency(getCurrency() + amount);
	
}
// Subtract from current currency, ensuring it doesn't go below zero and updating total loss
function subtractCurrency(amount) {
	setCurrency(Math.max(0, getCurrency() - amount));
	setLoss(Math.max(0, getLoss() + amount));
}
// Update currency display in the UI and total loss display
function updateCurrencyDisplay() {
	const el = document.getElementById('currencyDisplay');
	const ls = document.getElementById('lossDisplay');
	if (el && ls) {
		el.textContent = getCurrency() + ' coins';
		ls.textContent = getLoss() + ' loss';
	}
}
// Get total loss, initialize if not set
function getLoss(){
	let loss = parseInt(localStorage.getItem(TOTALLOSS_KEY), 10);
	if(isNaN(loss)){
		loss = DEFAULT_LOSS;
	}
	return loss;
}
// Set total loss
function setLoss(amount){
	localStorage.setItem(TOTALLOSS_KEY, amount);
	updateCurrencyDisplay();
}
function restoreLoss(){
	setLoss(Math.max(0, getLoss() - amount));

}

// Initialize display on page load
document.addEventListener('DOMContentLoaded', updateCurrencyDisplay);

export { getCurrency, setCurrency, addCurrency, subtractCurrency, updateCurrencyDisplay, restoreLoss };