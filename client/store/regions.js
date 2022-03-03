import axios from 'axios';

const SET_REGIONS = 'SET_REGIONS';

const setRegions = (regions) => {
  return {
    type: SET_REGIONS,
    regions,
  };
};

export const fetchRegions = () => {
  return async (dispatch) => {
    try {
      let { data } = await axios.get('/api/regions');
      dispatch(setRegions(data));
    } catch (err) {
      console.log(err);
    }
  };
};

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REGIONS: {
      return action.regions;
    }
    default:
      return state;
  }
};
