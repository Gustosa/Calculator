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
        const displayElements = currentDisplay.innerText.split("")

        if (displayElements.length < 14) {
            if (currentDisplay.innerText == 0) {
                currentDisplay.innerText = storedDigit
            } else {
                currentDisplay.innerText += storedDigit
            }
        }

    } else if (classes.contains("operator")) {
        const displayElements = currentDisplay.innerText.split("")

        if (displayElements.length <= 14) {
            if (currentDisplay.innerText && !operator) {
                operator = storedDigit
                currentDisplay.innerText += operator
            } else {
                let displayElements = currentDisplay.innerText.split(operator)

                if (displayElements[1] !== "Real smartie") {
                    let num2Check = displayElements[1]

                    if (!num2Check) {
                        operator = storedDigit
                        currentDisplay.innerText = displayElements[0] + operator
                    } else {
                        if (num2Check || num2Check == 0) {
                            num1 = +displayElements[0]
                            num2 = +displayElements[1]

                            if (num2 == 0 && operator === "/") currentDisplay.innerText = "Real smartie"
                            else {
                                num1 = operate(num1, num2, operator).toString()
                                operator = storedDigit
                                num2 = ""

                                const num1Check = num1.split("")

                                if (num1Check.length >= 14) {
                                    num1 = num1Check.substring(0, 14).join("")
                                    currentDisplay.innerText = num1
                                } else currentDisplay.innerText = num1 + operator
                            }
                        }
                    }
                }
            }
        }

    } else if (classes.contains("equals")) {
        if (!currentDisplay.innerText || !operator) currentDisplay.innerText = "Error"
        else {
            const displayElements = currentDisplay.innerText.split(operator)

            if (!displayElements[1]) currentDisplay.innerText = "Error"
            else {
                num1 = +displayElements[0]
                num2 = +displayElements[1]

                if (num2 == 0 && operator === "/") currentDisplay.innerText = "Real smartie"
                else {
                    const operation = operate(num1, num2, operator)
                    currentDisplay.innerText = operation
                    num1 = operation
                    operator = ""
                }
            }
        }

    } else if (classes.contains("obliterate")) {
        currentDisplay.innerText = 0
        num1 = 0, num2 = "", operator = ""

    } else if (classes.contains("delete")) {
        displayElements = currentDisplay.innerText.split("")
        removedElement = displayElements.at(-1)
        removedElementIndex = displayElements.lastIndexOf(removedElement)

        if (removedElementIndex == 0) currentDisplay.innerText = 0
        else {
            currentDisplay.innerText = currentDisplay.innerText.substring(0, removedElementIndex)
            if (removedElement == operator) operator = ""
        }
    }
}

let num1
let num2
let operator

const digits = Array.from(document.querySelectorAll(".digit"))
digits.forEach(digit => digit.addEventListener("click", getDigit))

