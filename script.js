document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');

    let expression = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            if (value) {
                if (value === '.') {
                    // Allow only one dot in a number
                    if (!/\.\d*$/.test(expression)) {
                        expression += value;
                    }
                } else if (['+', '-', '*', '/', '%'].includes(value)) {
                    // Prevent multiple operators in a row
                    if (/[+\-*/%]$/.test(expression)) {
                        expression = expression.slice(0, -1);
                    }
                    expression += value;
                } else {
                    expression += value;
                }
                display.value = expression;
            }
        });
    });

    clearButton.addEventListener('click', () => {
        expression = '';
        display.value = '';
    });

    equalsButton.addEventListener('click', () => {
        try {
            // Evaluate the expression and display the result
            display.value = eval(expression);
            expression = display.value;
        } catch (error) {
            display.value = 'Error';
        }
    });

    // Handle keyboard events
    document.addEventListener('keydown', (event) => {
        if (event.key >= '0' && event.key <= '9' || ['+', '-', '*', '/', '%', '.'].includes(event.key)) {
            expression += event.key;
            display.value = expression;
        } else if (event.key === 'Enter') {
            try {
                display.value = eval(expression);
                expression = display.value;
            } catch (error) {
                display.value = 'Error';
            }
        } else if (event.key === 'Backspace') {
            expression = expression.slice(0, -1);
            display.value = expression;
        } else if (event.key === 'Escape') {
            expression = '';
            display.value = '';
        } else {
            alert('Only numbers are allowed');
        }
    });
});
