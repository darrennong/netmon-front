import { createSelector } from 'reselect';

const selectBlocks = () => ({ blockStats }:any) => blockStats;

export const selectBlocksList = () => createSelector(selectBlocks(), ({ last10blocksList }:any) => last10blocksList);
export const selectBlocks50List = () => createSelector(selectBlocks(), ({ last50blocksList }:any) => last50blocksList);
