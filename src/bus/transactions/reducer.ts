import types from './types';

import { TRANSACTIONS_LIMIT } from '../../constants';
import { event } from '..';

interface TransactionState{  
  transactionsList: any[],
  last50TransList: any[],
  transactionsInfo: any,
}

const initialState:TransactionState = {
  transactionsList: [],
  last50TransList: [],
  transactionsInfo: {},
};

export const transactionsReducer = (state = initialState, { type, payload }:event) => {
  switch (type) {
    case types.TRANSACTIONS_ADD:
      const trans = state.transactionsList;
      trans.push(...payload.transactions);
      trans.sort((a, b) => b.block - a.block);
      let info = state.transactionsInfo;
      if (payload.totalTransactionsCount) {
        info = {
          totalTransactionsCount: payload.totalTransactionsCount,
          notEmptyBlocksCount: payload.notEmptyBlocksCount,
          totalBlockCount: payload.totalBlockCount,
        };
      }
      return {
        ...state,
        transactionsList: [...trans.slice(0, TRANSACTIONS_LIMIT)],
        transactionsInfo: info,
      };
    default:
      return state;
  }
};
