// jQuery
$(document).ready(function () {
    $('.header').height($(window).height());
})
let ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    document.querySelector(".header").getElementsByClassName.height = window.innerHeight + "px";
})

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsCOntent = document.querySelector('.meal-details-content');
const resipeCLoseBtn = document.getElementById('resipe-close-btn');
const url = ('www.themealdb.com/api/json/v1/1/filter.php?s=Arrabiata')

// event Listeners
searchBtn.addEventListener('click', getMealList);
// get meal which matches the ingridient in input
function getMealList() {
    let searchInputTxt = document.getElementById
        ('input').value.trim();
    fetch(`www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => console.log(data));
}
