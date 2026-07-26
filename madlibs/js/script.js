// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
    const madlibForm = document.getElementById("madlib-form");
    const randomBtn = document.getElementById("random-btn");
    const storyContainer = document.getElementById("story-container");
    const storyText = document.getElementById("story-text");

    // Arrays of random words for the Advanced Content feature
    const nouns1 = ["keyboard", "dragon", "robot", "pizza", "coffee mug"];
    const nouns2 = ["castle", "server room", "dungeon", "spaceship", "library"];
    const verbs1 = ["danced", "scrambled", "teleported", "crashed", "stumbled"];
    const verbs2 = ["exploded", "whispered", "celebrated", "vanished", "glitched"];
    const adjectives1 = ["glowing", "eccentric", "chaotic", "gigantic", "mysterious"];
    const adjectives2 = ["bewildered", "thrilled", "sleepy", "heroic", "furious"];

    // Helper function to pick a random item from an array
    function getRandomWord(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    // Advanced Content: Auto-fill form fields with random words
    randomBtn.addEventListener("click", () => {
        document.getElementById("noun1").value = getRandomWord(nouns1);
        document.getElementById("noun2").value = getRandomWord(nouns2);
        document.getElementById("verb1").value = getRandomWord(verbs1);
        document.getElementById("verb2").value = getRandomWord(verbs2);
        document.getElementById("adj1").value = getRandomWord(adjectives1);
        document.getElementById("adj2").value = getRandomWord(adjectives2);
    });

    // Basic Content: Form submission and story generation
    madlibForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent full page reload

        // Capture user input into variables
        const noun1Val = document.getElementById("noun1").value.trim();
        const noun2Val = document.getElementById("noun2").value.trim();
        const verb1Val = document.getElementById("verb1").value.trim();
        const verb2Val = document.getElementById("verb2").value.trim();
        const adj1Val = document.getElementById("adj1").value.trim();
        const adj2Val = document.getElementById("adj2").value.trim();

        // Story setup (4 sentences matching proper parts of speech)
        // Sentences use string concatenation and span tags for highlighting variables
        const sentence1 = "Yesterday, a very " + "<span class='highlight'>" + adj1Val + "</span> " + "<span class='highlight'>" + noun1Val + "</span> " + "<span class='highlight'>" + verb1Val + "</span> into the middle of the room. ";
        const sentence2 = "Everyone in the " + "<span class='highlight'>" + noun2Val + "</span> stopped what they were doing and stared in awe. ";
        const sentence3 = "Without warning, the object suddenly " + "<span class='highlight'>" + verb2Val + "</span> across the floor! ";
        const sentence4 = "By the end of the day, all the witnesses felt completely " + "<span class='highlight'>" + adj2Val + "</span> by what had just happened.";

        const fullStory = sentence1 + sentence2 + sentence3 + sentence4;

        // Display output inside the body using the DOM
        storyText.innerHTML = fullStory;
        storyContainer.classList.remove("hidden");

        // Scroll smoothly to the story output
        storyContainer.scrollIntoView({ behavior: "smooth" });
    });
});