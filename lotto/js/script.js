// Variable to store the validated count across function calls
let numCount = 0;

// Function to prompt user and validate entry (Limit: max 7 numbers)
function getUserInput() {
    let input = prompt("How many lottery numbers do you want to pick? (Enter a number between 1 and 7)");
    let parsedInput = parseInt(input);

    // Advanced Content validation: check if invalid, <= 0, or >= 8
    while (isNaN(parsedInput) || parsedInput < 1 || parsedInput >= 8) {
        alert("Error: Please enter a valid number that is less than 8!");
        input = prompt("How many lottery numbers do you want to pick? (Must be between 1 and 7)");
        parsedInput = parseInt(input);
    }

    numCount = parsedInput;
    generateLotteryNumbers();
}

// Function to calculate random numbers, populate array, and output to DOM
function generateLotteryNumbers() {
    let numbersArray = [];

    // Loop to fill array with random numbers between 1 and 99
    for (let i = 0; i < numCount; i++) {
        let randomNum = Math.floor(Math.random() * 99) + 1;
        
        // Pad single digits with a leading zero (e.g. 05 instead of 5)
        if (randomNum < 10) {
            randomNum = "0" + randomNum;
        }

        numbersArray.push(randomNum);
    }

    // Join array into required xx-xx-xx format and output to DOM
    let displayElement = document.getElementById("lottery-numbers");
    displayElement.textContent = numbersArray.join("-");
}

// Attach event listener to button to generate new numbers without re-prompting
document.getElementById("re-roll-btn").addEventListener("click", generateLotteryNumbers);

// Trigger initial prompt when page loads
getUserInput();