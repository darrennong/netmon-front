import { createSelector } from 'reselect';

const selectModal = () => ({ modal }:any) => modal;

export const selectAccountInfo = () => createSelector(selectModal(), ({ accountInfo }:any) => accountInfo);

export const selectAccountHistory = () => createSelector(selectModal(), ({ accountHistory }:any) => accountHistory);

export const selectTopRichAccounts = () => createSelector(selectModal(), ({ topAccounts }:any) => topAccounts);

export const selectTokens = () => createSelector(selectModal(), ({ tokens }:any) => tokens);

export const selectBlockInfo = () => createSelector(selectModal(), ({ blockInfo }:any) => blockInfo);

export const selectTxIdInfo = () => createSelector(selectModal(), ({ txInfo }:any) => txInfo);

export const selectP2PAddresses = () => createSelector(selectModal(), ({ p2pAddresses }:any) => p2pAddresses);

export const selectBpJson = () => createSelector(selectModal(), ({ bpJson }:any) => bpJson);

export const selectRamPrice = () => createSelector(selectModal(), ({ ramPrice }:any) => ramPrice);

export const selectEosApiData = () => createSelector(selectModal(), ({ eosApiData }:any) => eosApiData);
