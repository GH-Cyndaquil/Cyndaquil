import axios from 'axios';

const SET_INGREDIENTS = 'SET_INGREDIENTS';

const setIngredients = (ingredients) => {
  return {
    type: SET_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngredients = () => {
  return async (dispatch) => {
    try {
      let { data } = await axios.get('/api/ingredients');
      dispatch(setIngredients(data));
    } catch (err) {
      console.log(err);
    }
  };
};

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS: {
      return action.ingredients;
    }
    default:
      return state;
  }
};
