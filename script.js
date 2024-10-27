let displayValue = '';
let operator = '';
let currentValue = '';
let shouldResetDisplay = false;

const display = document.getElementById('display');

function appendNumber(number) {
    if (shouldResetDisplay) {
        displayValue = '';
        shouldResetDisplay = false;
    }
    displayValue += number;
    updateDisplay();
}

function appendOperator(op) {
    if (displayValue === '') return;
    if (operator) calculate();
    operator = op;
    currentValue = displayValue;
    displayValue = '';
    updateDisplay();
}

function calculate() {
    if (operator && currentValue && displayValue) {
        const result = eval(`${currentValue}${operator}${displayValue}`);
        displayValue = result;
        operator = '';
        shouldResetDisplay = true;
        updateDisplay();
    }
}

function updateDisplay() {
    display.textContent = displayValue || '0';
}

function clearDisplay() {
    displayValue = '';
    operator = '';
    currentValue = '';
    updateDisplay();
}

function deleteLast() {
    displayValue = displayValue.toString().slice(0, -1);
    updateDisplay();
}

function appendDot() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}
async function calculate() {
    const expression = `${currentValue}${operator}${displayValue}`;
    try {
        const response = await fetch('http://127.0.0.1:5000/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ expression }),
        });
        const data = await response.json();
        displayValue = data.result;
        operator = '';
        shouldResetDisplay = true;
        updateDisplay();
    } catch (error) {
        console.error("Error:", error);
    }
}
