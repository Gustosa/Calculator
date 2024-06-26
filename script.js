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

function updateDisplay(event) {
    let currentDisplay = document.querySelector("#result")

    if (currentDisplay.innerText === "Error" || currentDisplay.innerText === "Smart") {
        currentDisplay.innerText = 0, num1 = 0, num2 = "", operator = "", num1HasDot = false, num2HasDot = false
    } else {
        const classes = event.target.classList
        const storedDigit = event.target.innerText

        if (classes.contains("number")) {
            let isDot = classes.contains("dot")

            numberClicked(currentDisplay, storedDigit, isDot)

        } else if (classes.contains("operator")) {
            operatorClicked(currentDisplay, storedDigit)

        } else if (classes.contains("equals")) {
            equalsClicked(currentDisplay)

        } else if (classes.contains("obliterate")) {
            obliterateClicked(currentDisplay)

        } else if (classes.contains("delete")) {
            deleteClicked(currentDisplay)
        }
    }
}

function numberClicked(currentDisplay, storedDigit, isDot) {
    const displayElements = currentDisplay.innerText.split("")

    if (displayElements.length < 14) {
        if (isDot) {
            if (!num1HasDot && !operator) {
                num1HasDot = true
                currentDisplay.innerText += storedDigit
            }

            if (!num2HasDot && operator) {
                num2HasDot = true
                currentDisplay.innerText += storedDigit
            }
        } else if (currentDisplay.innerText == 0 && !num1HasDot) {
            currentDisplay.innerText = storedDigit
        } else {
            currentDisplay.innerText += storedDigit
        }
    }
}

function operatorClicked(currentDisplay, storedDigit) {
    const displayElements = currentDisplay.innerText.split("")

    if (displayElements.length <= 14) {
        if (currentDisplay.innerText && !operator) {
            operator = storedDigit
            currentDisplay.innerText += operator
        } else {
            operandsCheck(currentDisplay)

            if (!operands[1]) {
                operator = storedDigit
                currentDisplay.innerText = operands[0] + operator
            }

            if (operands[1]) {
                updateOperands(currentDisplay, operands)
                operator = storedDigit
                overflowCheck(currentDisplay)
            }
        }
    }
}

function equalsClicked(currentDisplay) {
    if (!currentDisplay.innerText || !operator) currentDisplay.innerText = "Error"
    else {
        operandsCheck(currentDisplay)

        if (!operands[1]) currentDisplay.innerText = "Error"
        else {
            updateOperands(currentDisplay, operands)
            operator = ""
            overflowCheck(currentDisplay)
        }
    }
}

function obliterateClicked(currentDisplay) {
    currentDisplay.innerText = 0
    num1 = 0, num2 = "", operator = "", num1HasDot = false, num2HasDot = false
}

function deleteClicked(currentDisplay) {
    displayElements = currentDisplay.innerText.split("")

    removedElement = displayElements.at(-1)
    removedElementIndex = displayElements.lastIndexOf(removedElement)

    if (removedElementIndex == 0) currentDisplay.innerText = 0
    else {
        currentDisplay.innerText = currentDisplay.innerText.substring(0, removedElementIndex)

        if (removedElement === operator) operator = ""
        if (removedElement === "." && !operator) num1HasDot = false
        if (removedElement === "." && operator) num2HasDot = false
    }
}

function updateOperands(currentDisplay, operands) {
    num1 = +operands[0]
    num2 = +operands[1]

    if (num2 == 0 && operator === "/") currentDisplay.innerText = "Smart"

    num1 = operate(num1, num2, operator)
    num2 = ""
    if (num1 % 1 == 0) num1HasDot = false
    num2HasDot = false
}

function overflowCheck(currentDisplay) {
    const num1Check = num1.toString().split("")

    if (num1Check.length >= 14) {
        num1 = num1Check.join("").substring(0, 14)
        currentDisplay.innerText = num1
    } else {
        currentDisplay.innerText = num1 + operator
    }
}

function operandsCheck(currentDisplay) {
    const displayElements = currentDisplay.innerText.split("")
    const operatorPosition = displayElements.lastIndexOf(operator)

    num1 = displayElements.join("").substring(0, operatorPosition)
    num2 = displayElements.join("").substring(operatorPosition + 1)
    operands = [num1, num2]
}

function keyboardSupport(event) {
    let currentDisplay = document.querySelector("#result")

    if (currentDisplay.innerText === "Error" || currentDisplay.innerText === "Smart") {
        currentDisplay.innerText = 0, num1 = 0, num2 = "", operator = "", num1HasDot = false, num2HasDot = false
    } else {
        const keyPressed = event.key

        switch (keyPressed) {
            case "0": numberClicked(currentDisplay, keyPressed, false); break
            case "1": numberClicked(currentDisplay, keyPressed, false); break
            case "2": numberClicked(currentDisplay, keyPressed, false); break
            case "3": numberClicked(currentDisplay, keyPressed, false); break
            case "4": numberClicked(currentDisplay, keyPressed, false); break
            case "5": numberClicked(currentDisplay, keyPressed, false); break
            case "6": numberClicked(currentDisplay, keyPressed, false); break
            case "7": numberClicked(currentDisplay, keyPressed, false); break
            case "8": numberClicked(currentDisplay, keyPressed, false); break
            case "9": numberClicked(currentDisplay, keyPressed, false); break
            case ".": numberClicked(currentDisplay, keyPressed, true); break
            case "+": operatorClicked(currentDisplay, keyPressed); break
            case "-": operatorClicked(currentDisplay, keyPressed); break
            case "*": operatorClicked(currentDisplay, keyPressed); break
            case "/": operatorClicked(currentDisplay, keyPressed); break
            case "=": equalsClicked(currentDisplay); break
            case "Enter": equalsClicked(currentDisplay); break
            case "Backspace": deleteClicked(currentDisplay); break
            case "Delete": obliterateClicked(currentDisplay); break
            default:
        }
    }
}

let num1 = 0
let num2
let operands
let operator
let num1HasDot = false
let num2HasDot = false

document.addEventListener("keydown", keyboardSupport)

const digits = Array.from(document.querySelectorAll(".digit"))
digits.forEach(digit => digit.addEventListener("click", updateDisplay))

