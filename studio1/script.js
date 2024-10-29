(function() {
    "use strict";
    console.log('reading js');

    const form = document.getElementById("madlibsForm");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const adjective = document.getElementById("adjective").value.trim();
            const noun = document.getElementById("noun").value.trim();
            const animal1 = document.getElementById("animal1").value.trim();
            const drink = document.getElementById("drink").value.trim();
            const animal2 = document.getElementById("animal2").value.trim();
            const emotion = document.getElementById("emotion").value.trim();
            const food = document.getElementById("food").value.trim();

            if (!adjective || !noun || !animal1 || !drink || !animal2 || !emotion || !food) {
                document.getElementById("errorMessage").textContent = "Please fill out all fields before creating your potion.";
                return;
            }

            const userInputData = `adjective=${encodeURIComponent(adjective)}&noun=${encodeURIComponent(noun)}&animal1=${encodeURIComponent(animal1)}&drink=${encodeURIComponent(drink)}&animal2=${encodeURIComponent(animal2)}&emotion=${encodeURIComponent(emotion)}&food=${encodeURIComponent(food)}`;
            
            console.log(`Redirecting to: result.html?${userInputData}`);
            window.location.href = `result.html?${userInputData}`;
        });
    }

    const resultStory = document.getElementById("resultStory");

    if (resultStory) {
        const userSelections = new URLSearchParams(window.location.search);

        const adjective = userSelections.get("adjective");
        const noun = userSelections.get("noun");
        const animal1 = userSelections.get("animal1");
        const drink = userSelections.get("drink");
        const animal2 = userSelections.get("animal2");
        const emotion = userSelections.get("emotion");
        const food = userSelections.get("food");

        if (adjective && noun && animal1 && drink && animal2 && emotion && food) {
            const story = `Instructions:<br> 
            1. Start by heating a cauldron over a ${adjective} fire.<br>
            2. Slowly add the ${noun}, stirring counterclockwise with a wand made of ${animal1} bone.<br>
            3. Carefully pour in 3 drops of ${drink} while chanting an ancient spell.<br>
            4. Once the mixture starts to bubble, add the whiskers of a ${animal2} and stir clockwise to balance the magic.<br>
            5. Infuse the potion with a dash of ${emotion} to give it its powerful charm.<br>
            6. Finally, top it off with a sprinkle of ${food} to enhance its flavor.<br>
            <br>
            Drink with caution, as it may grant you strange powers!
            `;

            resultStory.innerHTML = story;
        } else {
            resultStory.innerHTML = "<p>Oops! It looks like some ingredients are missing. Please go back and fill out the form correctly.</p>";
        }
    }
})();
