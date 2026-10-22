export default (pizzaParts, data) => {
  const doughPrice =
    data.doughItems.find((item) => item.id === pizzaParts.doughId)?.price ?? 0;
  const sizeMultiplier =
    data.sizeItems.find((item) => item.id === pizzaParts.sizeId)?.multiplier ?? 1;
  const saucePrice =
    data.sauceItems.find((item) => item.id === pizzaParts.sauceId)?.price ?? 0;

  const ingredientsPrice = data.ingredientItems
    .map((item) => item.price * (pizzaParts.ingredients[item.value] ?? 0))
    .reduce((total, number) => total + number, 0);

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
};
