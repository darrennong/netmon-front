// Types
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  location: null,
};

export const routeReducer = (state = initialState, { type, payload }:any) => {
  switch (type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: {
          ...payload,
        },
      };
    default:
      return state;
  }
};
