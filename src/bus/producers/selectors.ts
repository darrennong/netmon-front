import { createSelector } from 'reselect';

const selectProducersData = () => ({ producers }:any) => producers;

export const selectProducers = () => createSelector(selectProducersData(), ({ producers }:any) => producers);

export const selectLastHash = () => createSelector(selectProducersData(), ({ blackList }:any) => blackList.lastHash);

export const selectCheckedProducers = () =>
  createSelector(selectProducersData(), ({ selectedProducers }:any) => selectedProducers);

// Filter input value
export const selectFilterInputValue = () =>
  createSelector(selectProducersData(), ({ filterInputValue }:any) => filterInputValue);
