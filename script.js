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

function displayDigit(event) {
    if (display.innerText == 0) display.innerText = ""

    const digitClicked = event.target.innerText
    display.innerText += digitClicked
}

let num1
let num2
let operator

const digits = Array.from(document.querySelectorAll(".digit"))
const display = document.querySelector("#result")

digits.forEach(digit => digit.addEventListener("click", displayDigit))

