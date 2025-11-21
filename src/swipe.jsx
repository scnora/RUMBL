import { useState } from "react";
import TinderCard from "react-tinder-card";
import Recipe from "recipe";

export default function SwipeDeck({ meals, onSwipeRight }) {
  const [currentIndex, setCurrentIndex] = useState(meals.length - 1);

  const swiped = (direction, meal, index) => {
    if (direction === "right") {
      onSwipeRight(meal);
    }
    setCurrentIndex(index - 1);
  };

  return (
    <div className="deck-container">
      {meals.map((meal, index) => (
        <TinderCard
          key={meal.idMeal}
          className="swipe"
          preventSwipe={["up", "down"]}
          onSwipe={(dir) => swiped(dir, meal, index)}
        >
          <RecipeCard meal={meal} />
        </TinderCard>
      ))}
    </div>
  );
}