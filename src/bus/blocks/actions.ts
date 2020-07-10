import types from './types';

export const last10BlocksActions = Object.freeze({
  blocksAdd: (data: any) => ({
    type: types.LAST_10BLOCKS,
    payload: data,
  }),
});

export const last50BlocksActions = Object.freeze({
  blocksAdd: (data: any) => ({
    type: types.LAST_50BLOCKS,
    payload: data,
  }),
});
