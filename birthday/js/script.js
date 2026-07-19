// 1. Gather inputs using JS Prompts
var userName = prompt("Please enter your name:");
var userAge = prompt("Please enter your age:");
var birthMonth = prompt("Please enter your birth month (e.g., January, February, etc.):");

// 2. Display the initial required alert message
alert("Hello " + userName + ". You are " + userAge + " Years Old!");

// 3. Normalize the month text to lowercase to prevent capitalization typos from breaking the switch
var normalizedMonth = birthMonth.toLowerCase().trim();

// 4. Declare variables to store our switch outputs
var birthstone = "";
var season = "";
var properMonthName = ""; // To print cleanly (e.g., "June")

// 5. Advanced Content: The Switch Statement
switch (normalizedMonth) {
    case "january":
        properMonthName = "January";
        birthstone = "Garnet";
        season = "winter";
        break;
    case "february":
        properMonthName = "February";
        birthstone = "Amethyst";
        season = "winter";
        break;
    case "march":
        properMonthName = "March";
        birthstone = "Aquamarine";
        season = "spring";
        break;
    case "april":
        properMonthName = "April";
        birthstone = "Diamond";
        season = "spring";
        break;
    case "may":
        properMonthName = "May";
        birthstone = "Emerald";
        season = "spring";
        break;
    case "june":
        properMonthName = "June";
        birthstone = "Pearl";
        season = "summer";
        break;
    case "july":
        properMonthName = "July";
        birthstone = "Ruby";
        season = "summer";
        break;
    case "august":
        properMonthName = "August";
        birthstone = "Peridot";
        season = "summer";
        break;
    case "september":
        properMonthName = "September";
        birthstone = "Sapphire";
        season = "autumn";
        break;
    case "october":
        properMonthName = "October";
        birthstone = "Opal";
        season = "autumn";
        break;
    case "november":
        properMonthName = "November";
        birthstone = "Topaz";
        season = "autumn";
        break;
    case "december":
        properMonthName = "December";
        birthstone = "Turquoise";
        season = "winter";
        break;
    default:
        properMonthName = birthMonth; // Fallback if they mistyped
        birthstone = "Unknown";
        season = "an unknown season";
}

// 6. Update individual page elements via the DOM after OK is clicked
document.getElementById("displayName").textContent = userName;
document.getElementById("displayAge").textContent = userAge;
document.getElementById("displayMonth").textContent = properMonthName;
document.getElementById("displaySeason").textContent = season;
document.getElementById("displayStone").textContent = birthstone;

// 7. Inject the final combined sentence summary example format requested:
// "Howdy Beavis. You are 28 years old, and you were born in June which is in the summer and your birthstone is a pearl."
var summary = "Howdy " + userName + ". You are " + userAge + " years old, and you were born in " + properMonthName + " which is in the " + season + " and your birthstone is a " + birthstone + ".";
document.getElementById("summaryText").textContent = summary;