function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+": return add(num1, num2)
        case "-": return subtract(num1, num2)
        case "*": return multiply(num1, num2)
        case "/": return divide(num1, num2)
    }
}

function getDigit(event) {
    let currentDisplay = document.querySelector("#result")

    if (currentDisplay.innerText === "Error" || currentDisplay.innerText === "Real smartie") {
        currentDisplay.innerText = 0, num1 = 0, num2 = "", operator = ""
    }

    const digitClicked = event.target
    const storedDigit = digitClicked.innerText
    const classes = digitClicked.classList

    if (classes.contains("number")) {
        if (currentDisplay.innerText == 0) {
            currentDisplay.innerText = storedDigit
        } else {
            currentDisplay.innerText += storedDigit
        }

    } else if (classes.contains("operator")) {
        let display = currentDisplay.innerText.split(operator)
        if (display[1] !== "Real smartie") {
            let num2Check = display[1]

            if (num2Check === "") {
                currentDisplay.innerText = display[0] + storedDigit
                operator = storedDigit
            } else {
                if (num2Check || num2Check == 0) {
                    num1 = +display[0]
                    num2 = +display[1]

                    if (num2 == 0 && operator === "/") currentDisplay.innerText = "Real smartie"
                    else {
                        num1 = operate(num1, num2, operator)
                        currentDisplay.innerText = num1
                        num2 = ""
                        operator = ""
                    }
                }

                if (currentDisplay.innerText && !operator) {
                    currentDisplay.innerText += storedDigit
                    operator = storedDigit
                }
            }
        }

    } else if (classes.contains("equals")) {
        if (!currentDisplay.innerText || !operator) currentDisplay.innerText = "Error"
        else {
            const display = currentDisplay.innerText.split(operator)

            if (!display[1]) currentDisplay.innerText = "Error"
            else {
                num1 = +display[0]
                num2 = +display[1]

                if (num2 == 0 && operator === "/") currentDisplay.innerText = "Real smartie"
                else {
                    const operation = operate(num1, num2, operator)
                    currentDisplay.innerText = operation
                    num1 = operation
                }
            }
        }
    }
}

let num1
let num2
let operator

const digits = Array.from(document.querySelectorAll(".digit"))
digits.forEach(digit => digit.addEventListener("click", getDigit))

