const randomHungry = document.getElementById('random-hungry');
const randomFood = document.getElementById('random');

randomHungry.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(res => res.json())
  .then(res => {
    createFood(res.meals[0]);
  });
});

const createFood = (meal) => {
  const ingredients = [];
	for(let i=1; i<=20; i++) {
		if(meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			break;
		}
  }

	const newInnerHTML = `
		<div class="columns">
      <div class="column">
        <figure class="image is-480x480">
          <img src="${meal.strMealThumb}" alt="Meal Image">
        </figure>
				${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p><strong>Type:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
        <h4 class="title is-3">Ingredients:</h4>
        <div class="content">
          <ul>
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
        </div>
			</div>
			<div class="column">
				<h1 class="title is-1">${meal.strMeal}</h1>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		${meal.strYoutube ? `
    <div class="columns">
      <div class="column">
        <h1 class="title is-3">Video Recipe</h1>
        <figure class="videoReceipe has-text-centered">
				  <iframe width="420" height="315" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"></iframe>
			  </figure>
      </div>
		</div>` : ''}
	`;
	
	randomFood.innerHTML = newInnerHTML;
}