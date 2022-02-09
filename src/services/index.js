export function getQuiz() {
  const API_URL =
    "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

  return fetch(API_URL)
    .then((response) => response.json())
    .then(({ results }) => results);
}
