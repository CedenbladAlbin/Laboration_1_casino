

const CURRENCY_KEY = 'casino_currency';
const DEFAULT_CURRENCY = 1000;
const TOTALLOSS_KEY = 'total_loss';
const DEFAULT_LOSS = 0;

function getCurrency() {
	let value = parseInt(localStorage.getItem(CURRENCY_KEY), 10);
	if (isNaN(value)) {
		value = DEFAULT_CURRENCY;
		setCurrency(value);
	}
	return value;
}

function setCurrency(amount) {
	localStorage.setItem(CURRENCY_KEY, amount);
	updateCurrencyDisplay();
}

function addCurrency(amount) {
	setCurrency(getCurrency() + amount);
	setLoss(Math.max(0, getLoss() - amount));
}

function subtractCurrency(amount) {
	setCurrency(Math.max(0, getCurrency() - amount));
	setLoss(Math.max(0, getLoss() + amount));
}

function updateCurrencyDisplay() {
	const el = document.getElementById('currencyDisplay');
	const ls = document.getElementById('lossDisplay');
	if (el && ls) {
		el.textContent = getCurrency() + ' coins';
		ls.textContent = getLoss() + ' coins lost';
	}
}

function getLoss(){
	let loss = parseInt(localStorage.getItem(TOTALLOSS_KEY), 10);
	if(isNaN(loss)){
		loss = DEFAULT_LOSS;
	}
	return loss;
}

function setLoss(amount){
	localStorage.setItem(TOTALLOSS_KEY, amount);
	updateCurrencyDisplay();
}


document.addEventListener('DOMContentLoaded', updateCurrencyDisplay);

export { getCurrency, setCurrency, addCurrency, subtractCurrency, updateCurrencyDisplay };