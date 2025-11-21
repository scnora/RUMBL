export default function Recipe({ meal }) {
  return (
    <div className="card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />

      <div className="info">
        <h2>{meal.strMeal}</h2>
        <p>{meal.strInstructions.substring(0, 200)}...</p>
      </div>
    </div>
  );
}