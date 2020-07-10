import types from './types';
import { API_URL } from '../../constants';

export const producerActions = Object.freeze({
  fetchProducers: () => async (dispatch: (arg0: { type: string; payload: { producers: any; }; }) => any) => {
    const response = await fetch(`${API_URL}/api/v1/table`);
    const producers = await response.json();

    return dispatch({
      type: types.FETCH_PRODUCERS_SUCCESS,
      payload: {
        producers,
      },
    });
  },

  fetchBlackList: () => async (dispatch: (arg0: { type: string; payload: { blackList: any; }; }) => any) => {
    const response = await fetch(`${API_URL}/api/v1/theblacklist`);
    const blackList = await response.json();

    return dispatch({
      type: types.FETCH_BLACK_LIST_SUCCESS,
      payload: {
        blackList,
      },
    });
  },

  producersReload: (data: any) => ({
    type: types.PRODUCERS_RELOAD,
    payload: {
      producers: data,
    },
  }),

  producersUpdate: (data: any) => ({
    type: types.PRODUCERS_UPDATE,
    payload: {
      data,
    },
  }),

  blackListUpdate: (data: any) => ({
    type: types.PRODUCERS_UPDATE,
    payload: {
      data,
    },
  }),

  toggleProducerSelection: (producerName: any) => ({
    type: types.TOGGLE_PRODUCER_SELECTION,
    payload: producerName,
  }),

  // Filter input value
  setFilterInputValue: (filterInputValue: any) => ({
    type: types.SET_FILTER_INPUT_VALUE,
    payload: filterInputValue,
  }),
});
