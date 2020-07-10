import { createSelector } from 'reselect';

const selectGeneralStats = () => ({ generalStats }:any) => generalStats;

export const selectTpsApsStats = () => createSelector(selectGeneralStats(), ({ tpsApsStats }:any) => tpsApsStats);

export const selectConnectedUsers = () => createSelector(selectGeneralStats(), ({ connectedUsers }:any) => connectedUsers);

export const selectLastBlockStats = () => createSelector(selectGeneralStats(), ({ lastBlockStats }:any) => lastBlockStats);

export const selectAdditionalInfoStats = () => createSelector(selectGeneralStats(), (data: { additionalInfoStats: any; }) => data.additionalInfoStats);

export const selectBlockChart = () => createSelector(selectGeneralStats(), (data: { blockChart: any; }) => data.blockChart);

export const selectUnregisteredBps = () => createSelector(selectGeneralStats(), (data: { unregisteredBps: any; }) => data.unregisteredBps);

export const selectHeadBlockNum = () =>
  createSelector(selectGeneralStats(), ({ lastBlockStats }:any) => lastBlockStats.head_block_num);
