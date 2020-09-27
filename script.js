class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }
        if (this.previousOperand !== '') {
            return this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        let prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
            case '+':
                computation = (prev * 10 + current * 10) / 10;
                break;

            case '-':
                computation = prev - current;
                break;

            case '×':
                computation = (prev * 100 * current * 100) / 10000;
                break;

            case '÷':
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;

            case '√':
                if (current >= 0) {
                    computation = Math.pow(current, 1 / prev);
                }
                break;
            case '±':
                computation = 0 - prev;
                break;
            default:
                return;
        }
        this.currentOperand = computation /* .toFixed(4); */
        this.operation = null;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(
            this.currentOperand
        );
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
          this.previousOperand
        )} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    operation(operation, number) {
        memoryCurrentNumber = currentOperandTextElement.innerText;
        if ((memoryNewNumber && operation === '-' && previousOperandTextElement.innerText !== '0' &&
                currentOperandTextElement.innerText === '0') || (previousOperandTextElement.innerText === '' && currentOperandTextElement.innerText === '0')) {
            currentOperandTextElement.innerText = '-';
            memoryNewNumber = false;
        }
    }


}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const pmEl = document.querySelector('.pm');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

let valueStrInMemory = null;
let operatorInMemory = null;

const getValueAsStr = () => currentOperandTextElement.textContent.split(',').join('');

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.') {
        valueEl.textContent += '.';
        return;
    }
};

pmEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const currentValueStr = getValueAsStr();

    if (currentValueStr === '-0') {
        setStrAsValue('0');
        return;
    }
    if (currentValueNum >= 0) {
        setStrAsValue('-' + currentValueStr);
    } else {
        setStrAsValue(currentValueStr.substring(1));
    }
});