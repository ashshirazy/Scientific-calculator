class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+': computation = prev + current; break;
            case '-': computation = prev - current; break;
            case '*': computation = prev * current; break;
            case '/': computation = prev / current; break;
            case '**': computation = Math.pow(prev, current); break;
            default: return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    scientific(type) {
        const val = parseFloat(this.currentOperand);
        if (isNaN(val)) return;
        
        // Dynamic execution of Math methods
        const method = type.replace('Math.', '');
        this.currentOperand = Math[method](val).toString();
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

// --- INITIALIZATION ---
const numBtns = document.querySelectorAll('.num');
const opBtns = document.querySelectorAll('[data-type="operator"]');
const funcBtns = document.querySelectorAll('[data-type="function"]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const acBtn = document.querySelector('[data-all-clear]');
const prevText = document.querySelector('[data-previous-operand]');
const currText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(prevText, currText);

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.value);
        calculator.updateDisplay();
    });
});

opBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.value);
        calculator.updateDisplay();
    });
});

funcBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.scientific(btn.value);
        calculator.updateDisplay();
    });
});

equalsBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

acBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});