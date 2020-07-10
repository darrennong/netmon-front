import { event } from '..';
import types from './types';

const initialState = {
  last10blocksList: [],
  last50blocksList: [],
  blocksInfo: {},
};

export const blocksReducer = (state = initialState, { type, payload }:event) => {
  switch (type) {
    case types.LAST_10BLOCKS:
      return {
        ...state,
        last10blocksList: payload,
      };
    case types.LAST_50BLOCKS:
      if (payload.length < 50) {
        payload.push(...state.last50blocksList);
      }
      return {
        ...state,
        last50blocksList: payload,
      };
    default:
      return state;
  }
};
