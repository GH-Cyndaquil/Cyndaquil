import React from 'react';

function IngredientsMap(props) {
  return props.ingredients.map((ingredient) => {
    return (
      <label
        key={ingredient.id}
        className={
          props.ingredientFilter == ingredient.id ? 'selected-filter' : ''
        }
      >
        <input
          type="radio"
          name="ingredient-filter"
          value={ingredient.id}
          onChange={(evt) => {
            if (evt.target.checked) {
              props.setIngredientFilter(Number(evt.target.value));
            }
          }}
        />
        {ingredient.name}
      </label>
    );
  });
}

export default IngredientsMap;
