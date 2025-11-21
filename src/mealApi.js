
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function fetchRandomMeal() {
  const res = await axios.get(`${BASE_URL}/random.php`);
  return res.data.meals[0];
}