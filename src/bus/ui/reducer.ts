import { event } from '..';
// Core
import store from 'store';

// Types
import types from './types';
import modalTypes from '../modal/types';

const DEFAULT_COLUMNS_STATE = {
  name: true,
  ping: false,
  answered: true,
  blkSeen: true,
  produced: true,
  blkProduced: false,
  version: true,
  address: false,
  http: false,
  p2p: false,
  location: false,
  numberProduced: false,
  txs: false,
  organisation: false,
  votes: true,
  expectedIncome: false,
  actualIncome: false,
  missedBlocksAll: false,
  missedBlocksRound: false,
  missedBlocksDay: false,
  voteRewards: false,
  blockRewards: false,
  totalUnpaidRewards: false,
  publicEndpoints: false,
  blackListHash: false,
};

const initialState = {
  searchSucessState: 0,
  modalDataFetchingState: false,
  modal: {
    type: '',
    data: null,
  },
  tableColumnState: store.get('tableColumnState') || DEFAULT_COLUMNS_STATE,
  // Background
  actualBackgroundNumber: store.get('actualBackgroundNumber') || 0,
};

export const uiReducer = (state = initialState, { type, payload }:event) => {
  switch (type) {
    case types.SET_MODAL_STATE:
      return {
        ...state,
        modal: {
          ...payload,
        },
      };

    case types.SET_ACTIVE_TAB_INDEX_STATE:
      return {
        ...state,
        activeTabIndex: payload,
      };

    case types.SET_TABLE_COLUMN_STATE:
      return {
        ...state,
        tableColumnState: {
          ...state.tableColumnState,
          [payload]: !state.tableColumnState[payload],
        },
      };
    case types.RESET_COLUMNS_VISIBILITY:
      return {
        ...state,
        tableColumnState: DEFAULT_COLUMNS_STATE,
      };
    // modal fetching state
    case modalTypes.FETCHING_ACCOUNT_INFO:
    case modalTypes.FETCHING_ACCOUNT_HISTORY:
    case modalTypes.FETCHING_BLOCK_INFO:
    case modalTypes.FETCHING_TX_INFO:
    case modalTypes.FETCHING_P2P_ADDRESSES:
    case modalTypes.FETCHING_BP_JSON:
    case modalTypes.FETCHING_RAM_PRICE:
    case modalTypes.POTATO_API_PENDING:
      return {
        ...state,
        modalDataFetchingState: true,
      };
    case modalTypes.FETCHING_ACCOUNT_HISTORY_SUCCESS:
    case modalTypes.FETCHING_P2P_ADDRESSES_SUCCESS:
    case modalTypes.FETCHING_P2P_ADDRESSES_FAILURE:
    case modalTypes.FETCHING_BP_JSON_SUCCESS:
    case modalTypes.FETCHING_BP_JSON_FAILURE:
    case modalTypes.FETCHING_RAM_PRICE_SUCCESS:
    case modalTypes.FETCHING_RAM_PRICE_FAILURE:
    case modalTypes.POTATO_API_SUCCESS:
    case modalTypes.POTATO_API_FAILURE:
      return {
        ...state,
        modalDataFetchingState: false,
      };
    case modalTypes.FETCHING_BLOCK_INFO_SUCCESS:
    case modalTypes.FETCHING_ACCOUNT_INFO_SUCCESS:
    case modalTypes.FETCHING_TX_INFO_SUCCESS:
    case modalTypes.FETCHING_BLOCK_INFO_FAILURE:
    case modalTypes.FETCHING_ACCOUNT_INFO_FAILURE:
    case modalTypes.FETCHING_TX_INFO_FAILURE:
      return {
        ...state,
        searchSucessState: type,
        modalDataFetchingState: false,
      };
    // Background
    case types.SET_ACTUAL_BACKGROUND_NUMBER:
      return {
        ...state,
        actualBackgroundNumber: payload,
      };

    default:
      return state;
  }
};
