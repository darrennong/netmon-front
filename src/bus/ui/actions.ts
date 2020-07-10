/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
// Core
import { store } from '../../init/store';
import { history } from '../../init/middleware';
// Instruments
import types from './types';
import fetchTypes from '../modal/types';

const toggleModal = (type: any, data: { txid: any; }) => {
  try {
    let id = data;
    switch (type) {
      case 'account':
        break;
      case 'block':
        break;
      case 'trans':
        if (typeof data === 'object') {
          id = data.txid;
          console.log(fetchTypes.FETCHING_TX_INFO_SUCCESS);
          store.dispatch({
            type: fetchTypes.FETCHING_TX_INFO_SUCCESS,
            payload: data,
          });
        }
        break;
      case 'tokenInfo':
        break;
      default:
        break;
    }
    scrollTo(0, 0);
    const loc = id ? `/${type}/${id}` : `/${type}`;
    const hisloc = history.location.pathname + history.location.hash;
    if (hisloc !== loc) {
      history.push(loc);
    }
    return {
      type: types.SET_MODAL_STATE,
      payload: {
        type,
        data,
      },
    };
  } catch (e) {
    console.log(e);
  }
};

export const uiActions = Object.freeze({
  // Modal
  setModalDataFetchingState: (modalDataFetchingState: any) => ({
    type: types.SET_MODAL_DATA_FETCHING_STATE,
    payload: modalDataFetchingState,
  }),

  toggleModal,

  // Table
  setTableColumnState: (columnName: any) => ({
    type: types.SET_TABLE_COLUMN_STATE,
    payload: columnName,
  }),

  resetColumnsVisibility: () => ({
    type: types.RESET_COLUMNS_VISIBILITY,
  }),

  // Background init
  setActualBackgroundNumber: (backgroundNumber: any) => ({
    type: types.SET_ACTUAL_BACKGROUND_NUMBER,
    payload: backgroundNumber,
  }),
});
