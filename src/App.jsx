import "./App.css";
import React, { useState, useEffect } from "react";
import { Heart, X, ChefHat, Trash2, Utensils, Circle } from "lucide-react";

export default function RecipeSwiper() {
  const [showSplash, setShowSplash] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedRecipes, setSavedRecipes] = useState(()  => {
    const saved = localStorage.getItem("savedRecipes");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    // Wait 3 seconds, then hide splash screen
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    setLoading(true);
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      if (data.meals) {
        setRecipes(data.meals);
        setCurrentIndex(0);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleDiscard() {
    if (currentIndex < recipes.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      fetchRecipes();
    }
  }

  function handleSave() {
    const current = recipes[currentIndex];
    if (!current) return;

    setSavedRecipes((prev) => {
      if (prev.some((r) => r.idMeal === current.idMeal)) {
        alert("You already saved this!"); // Optional alert
        return prev;
      }
      return [...prev, current];
    });

    if (currentIndex < recipes.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      fetchRecipes();
    }
  }

  function handleRemove(id) {
    // Keep only the recipes that DO NOT match the ID we want to remove
    setSavedRecipes((prev) => prev.filter((recipe) => recipe.idMeal !== id));
  }

  const currentRecipe = recipes.length > 0 ? recipes[currentIndex] : null;

  if (loading) {
    return (
      <div className="loader">
        <h2>Loading recipes...</h2>
      </div>
    );
  }
  if (showSplash) {
  return (
    <div className="splash-screen">
      <div className="splash-scene">
          <Utensils className="cutlery" size={54} />
          <div className="plate-wrapper">
            <Circle className="plate-icon" size={120} strokeWidth={1.5} />
            <Heart className="splash-heart" size={48} fill="#ff4d6d" />
          </div>
          <Utensils className="cutlery flipped" size={54} />
        </div>
      <h1 className="splash-title">RUMBL</h1>
      <p className="splash-caption">A Recipe Dating App!</p>
    </div>
  );
}

  if (showSaved) {
    return (
      <div className="saved-page">
        <div className="saved-container">
          <div className="saved-header">
            <h2>Saved Recipes ({savedRecipes.length})</h2>
            <button onClick={() => setShowSaved(false)}>
              Back to Swiping
            </button>
          </div>

          <div className="saved-grid">
            {savedRecipes.map((recipe, index) => (
              <div key={index} className="saved-card">
                <button
                  className="delete-btn"
                  onClick={() => handleRemove(recipe.idMeal)}
                  title="Remove Recipe"
                >
                  <Trash2 size={20}/>
                </button>

                <img src={recipe.strMealThumb} alt={recipe.strMeal} />

                <div className="saved-info">
                  <h3 className="saved-title">{recipe.strMeal}</h3>
                  <p className="saved-meta">
                    {recipe.strCategory} • {recipe.strArea}
                  </p>
                </div>
                <div className="saved-instructions">
                  {recipe.strInstructions}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <ChefHat className="chef" />
        <h1>RUMBL</h1>
      </div>

      <button
        onClick={() => setShowSaved(true)}
        className="view-saved-btn"
      >
        View Saved Recipes ({savedRecipes.length})
      </button>

      {currentRecipe && (
        <div className="card-wrapper">
          <div className="card">
            <img
              src={currentRecipe.strMealThumb}
              alt={currentRecipe.strMeal}
            />

            <div className="card-info">
              <h2>{currentRecipe.strMeal}</h2>

              <div className="tags">
                <span className="tag pink">
                  {currentRecipe.strCategory}
                </span>
                <span className="tag orange">
                  {currentRecipe.strArea}
                </span>
              </div>

              <p>{currentRecipe.strInstructions}</p>
            </div>
          </div>

          <div className="buttons">
            <button onClick={handleDiscard} className="discard">
              <X />
            </button>
            <button onClick={handleSave} className="right">
              <Heart />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
