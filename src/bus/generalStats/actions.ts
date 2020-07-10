import types from './types';

export const generalStatsActions = Object.freeze({
  lastBlockStatsUpdate: (data: any) => ({
    type: types.LAST_BLOCK_STATS_UPDATE,
    payload: data,
  }),

  tpsApsStatsUpdate: (data: any) => ({
    type: types.TPS_APS_STATS_UPDATE,
    payload: data,
  }),

  totalStackedUpdate: (data: any) => ({
    type: types.TOTAL_STACKED_UPDATE,
    payload: data,
  }),

  blockChartUpdate: (data: any) => ({
    type: types.BLOCK_CHART_UPDATE,
    payload: data,
  }),

  unregisteredBpsUpdate: (data: any) => ({
    type: types.UNREGISTERED_BPS_UPDATE,
    payload: data,
  }),

  connectedUsersUpdate: (data: any) => ({
    type: types.CONNECTED_USERS_UPDATE,
    payload: data,
  }),
});
