function checkOtherOption(){
    const exerciseTypeDropdown = document.getElementById("exerciseType");
    const otherInput = document.getElementById("otherExerciseType");

    // if other is selected, show input field; otherwise, hide it
    otherInput.style.display = (exerciseTypeDropdown.value === "other") ? 'block' : 'none';
}

function logEntry(){
    const breakfast = document.getElementById("breakfast").value;
    const lunch = document.getElementById("lunch").value;
    const dinner = document.getElementById("dinner").value;
    const exerciseType = document.getElementById("exerciseType").value;
    const otherExerciseType = document.getElementById("otherExerciseType").value;

    // if other is selected, then use value from input
    const selectedExerciseType = (exerciseType === 'other') ? otherExerciseType : exerciseType;

    const logOutput = document.getElementById("logOutput");
    logOutput.innerHTML += `<p><strong>Breakfast:</strong> ${breakfast}</p>`;
    logOutput.innerHTML += `<p><strong>Lunch:</strong> ${lunch}</p>`;
    logOutput.innerHTML += `<p><strong>Dinner:</strong> ${dinner}</p>`;
    logOutput.innerHTML += `<p><strong>Exercise Type:</strong> ${selectedExerciseType}</p>`;

    document.getElementById("healthForm").reset();
    document.getElementById("otherExerciseType").style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    const foodSuggestionsList = document.getElementById("foodSuggestions");
    
    // Function to add a new food input field
    function addFoodInput(mealType) {
        const mealInputs = document.getElementById(`${mealType}Inputs`);
        const input = document.createElement("input");
        input.type = "text";
        input.name = mealType;
        input.setAttribute("list", "foodSuggestions");
        mealInputs.appendChild(input);
    }
    
    // Add event listeners to "Add Food" buttons
    const addFoodButtons = document.querySelectorAll(".addFoodButton");
    addFoodButtons.forEach(button => {
        button.addEventListener("click", function() {
            const mealType = this.getAttribute("data-meal");
            addFoodInput(mealType);
        });
    });
    
    // Load food suggestions when the page loads
    loadFoodSuggestions();

    async function loadFoodSuggestions(){
        try{
            const response = await fetch('food.json');
            const data = await response.json();

            // Clear existing options
            foodSuggestionsList.innerHTML = '';

            // Populate the datalist with food suggestions
            data.forEach(food => {
                const option = document.createElement('option');
                option.value = food;
                foodSuggestionsList.appendChild(option);
            });
        } catch(error){
            console.error('Error loading food suggestions:', error);
        }
    }
});

// load food suggestions when the page loads
window.onload = loadFoodSuggestions;