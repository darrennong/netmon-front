import { createSelector } from 'reselect';

const selectUi = () => ({ ui }:any) => ui;

// Modal
export const selectModalDataFetchingState = () =>
  createSelector(selectUi(), ({ modalDataFetchingState }) => modalDataFetchingState);

export const selectSearchSucessState = () => createSelector(selectUi(), ({ searchSucessState }) => searchSucessState);

export const selectModal = () => createSelector(selectUi(), ({ modal }) => modal);

// Table
export const selectTableColumnState = () => createSelector(selectUi(), ({ tableColumnState }) => tableColumnState);

// Background
export const selectActualBackgroundNumber = () =>
  createSelector(selectUi(), ({ actualBackgroundNumber }) => actualBackgroundNumber);
