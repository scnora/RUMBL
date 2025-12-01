import './App.css'
import React, { useState, useEffect } from 'react';
import { Heart, X, ChefHat } from 'lucide-react';

export default function RecipeSwiper() {
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    setLoading(true);
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
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

    setSavedRecipes((prev) => [...prev, current]);

    if (currentIndex < recipes.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      fetchRecipes();
    }
  }

  const currentRecipe = recipes.length > 0 ? recipes[currentIndex] : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-orange-100">
        <div className="text-2xl font-bold text-gray-700">Loading recipes...</div>
      </div>
    );
  }

  if (showSaved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-orange-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Saved Recipes ({savedRecipes.length})</h2>
            <button
              onClick={() => setShowSaved(false)}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
            >
              Back to Swiping
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedRecipes.map((recipe, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">{recipe.strMeal}</h3>
                  <p className="text-gray-600 text-sm">{recipe.strCategory} • {recipe.strArea}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-orange-100 p-4">
      <div className="mb-6 flex items-center gap-3">
        <ChefHat className="chef" />
        <h1 className="text-4xl font-bold text-gray-800">RUMBL</h1>
      </div>

      <button
        onClick={() => setShowSaved(true)}
        className="mb-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
      >
        View Saved Recipes ({savedRecipes.length})
      </button>

      {currentRecipe && (
        <div className="relative w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <img
              src={currentRecipe.strMealThumb}
              alt={currentRecipe.strMeal}
              className="w-full h-96 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{currentRecipe.strMeal}</h2>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                  {currentRecipe.strCategory}
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                  {currentRecipe.strArea}
                </span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">
                {currentRecipe.strInstructions}
              </p>
            </div>
          </div>

          <div className="buttons">
            <button
              onClick={handleDiscard}
              className="discard"
            >
              <X className="w-8 h-8 text-red-500" />
            </button>
            <button
              onClick={handleSave}
              className="right"
            >
              <Heart className="w-8 h-8 text-green-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}