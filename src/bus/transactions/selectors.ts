import { createSelector } from 'reselect';

const selectTransactions = () => ({ transactions }:any) => transactions;

export const selectTransactionsList = () =>
  createSelector(selectTransactions(), ({ transactionsList }:any) => transactionsList);

export const selectTransactionsInfo = () =>
  createSelector(selectTransactions(), ({ transactionsInfo }:any) => transactionsInfo);
