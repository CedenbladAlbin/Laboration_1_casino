

const CURRENCY_KEY = 'casino_currency';
const DEFAULT_CURRENCY = 1000;

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
}

function subtractCurrency(amount) {
	setCurrency(Math.max(0, getCurrency() - amount));
}

function updateCurrencyDisplay() {
	const el = document.getElementById('currencyDisplay');
	if (el) {
		el.textContent = getCurrency() + ' coins';
	}
}

document.addEventListener('DOMContentLoaded', updateCurrencyDisplay);

export { getCurrency, setCurrency, addCurrency, subtractCurrency, updateCurrencyDisplay };