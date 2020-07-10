import types from './types';

export const transactionActions = Object.freeze({
  transactionsAdd: (data: any) => ({
    type: types.TRANSACTIONS_ADD,
    payload: data,
  }),
});
