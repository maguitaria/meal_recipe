const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event Listeners
searchBtn.addEventListener('click', getMealList); // get meal which matches the ingridient in input
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
mealDetailsContent.parentElement.classList.remove('showRecipe');
});
// get Meal List - create div on the page
function getMealList() {
    let searchInputTxt = document.getElementById('search-input')
        .value.trim();
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=' + searchInputTxt)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                       <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="media-object">
                                <img src="${meal.strMealThumb}" class="img-responsive" class="img-rounded" alt="food">
                            </div>
                            <div class="media-heading">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn"> Get recipe</a>
                            </div>
                        </div> 
                    `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry,we didn`t find any meal :(";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
        })
        .catch((error) => {
            console.log(error);
        })
}
// get Meal recipe - call a modal function
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) { // if the element contains this class attribute
        let mealItem = e.target.parentElement.parentElement; // then set it as this variable
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}
// modal function
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0]; // show one index
    let html = `
    <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
                        <div class="recipe-instruct">
                            <h3>Instructions:</h3>
                            <p> ${meal.strInstructions}</p>
                        </div>
                        <div class="recipe-meal-img">
                            <img src="${meal.strMealThumb}" class="img-responsive" class="img-rounded" alt="food">
                        </div>
                        <div class="recipe-link">
                            <a href="${meal.strYoutube}" target="_blank">Watch video</a>
                        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');

}
