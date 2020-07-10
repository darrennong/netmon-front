// Instruments
import types from './types';
import { HISTORY_ITEMS_PER_PAGE, TOP_RICH_ACCOUNT_PER_PAGE, PotatoRpc, API_URL, } from '../../constants';

export const modalActions = Object.freeze({
  fetchAccountInfo: (producerName: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.FETCHING_ACCOUNT_INFO });
    try {
      const response = await fetch(`${API_URL}/api/v1/accounts/${producerName}`);
      const data = await response.json();
      if (!data.account_name) {
        return dispatch({ type: types.FETCHING_ACCOUNT_INFO_FAILURE });
      }
      return dispatch({
        type: types.FETCHING_ACCOUNT_INFO_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({ type: types.FETCHING_ACCOUNT_INFO_FAILURE });
    }
  },

  fetchAccountHistory: (producerName: any, page: number) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.FETCHING_ACCOUNT_HISTORY });
    try {
      const response = await fetch(
        `${API_URL}/api/v1/accounts/${producerName}/history?skip=${HISTORY_ITEMS_PER_PAGE *
          page}&limit=${HISTORY_ITEMS_PER_PAGE}`
      );
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_ACCOUNT_HISTORY_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({ type: types.FETCHING_ACCOUNT_HISTORY_FAILURE });
    }
  },

  fetchAbiHistory: (accountName: any, action = '-all-', page = 0) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.FETCHING_ABI_HISTORY });
    try {
      const response = await fetch(
        `${API_URL}/api/v1/abiHistory/${accountName}/${action}?skip=${HISTORY_ITEMS_PER_PAGE *
          page}&limit=${HISTORY_ITEMS_PER_PAGE}`
      );
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_ABI_HISTORY_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({ type: types.FETCHING_ABI_HISTORY_FAILURE });
    }
  },

  fetchTopAccounts: (symbol = 'POC', page = 0) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.FETCHING_TOP_ACCOUNTS });
    try {
      const response = await fetch(
        `${API_URL}/api/v1/toprich/${symbol}?skip=${TOP_RICH_ACCOUNT_PER_PAGE *
          page}&limit=${TOP_RICH_ACCOUNT_PER_PAGE}`
      );
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_TOP_ACCOUNTS_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({ type: types.FETCHING_TOP_ACCOUNTS_FAILURE });
    }
  },

  fetchTokensInfo: (txId: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.FETCHING_TOKENS_INFO });
    try {
      const response = await fetch(`${API_URL}/api/v1/tokens_info`);
      const data = await response.json();
      if (!data.length) {
        return dispatch({
          type: types.FETCHING_TOKENS_INFO_FAILURE,
        });
      }
      return dispatch({
        type: types.FETCHING_TOKENS_INFO_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_TOKENS_INFO_FAILURE,
      });
    }
  },

  fetchBlockInfo: (blockNum: string | number) => async (dispatch: (arg0: { type: string; payload?: any; })  => void) => {
    dispatch({ type: types.FETCHING_BLOCK_INFO });
    try {
      const response = await fetch(`${API_URL}/api/v1/get_block_by_num?blockNum=${blockNum}`);
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_BLOCK_INFO_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({ type: types.FETCHING_BLOCK_INFO_FAILURE });
    }
  },

  fetchTxInfo: (txId: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.FETCHING_TX_INFO });
    try {
      const response = await fetch(`${API_URL}/api/v1/transactions/${txId}`);
      const data = await response.json();
      if (!data.txid) {
        return dispatch({
          type: types.FETCHING_TX_INFO_FAILURE,
        });
      }
      return dispatch({
        type: types.FETCHING_TX_INFO_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_TX_INFO_FAILURE,
      });
    }
  },

  fetchP2PAddresses: () => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.FETCHING_P2P_ADDRESSES });

    try {
      const response = await fetch(`${API_URL}/api/v1/p2p/addresses`);
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_P2P_ADDRESSES_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_P2P_ADDRESSES_FAILURE,
      });
    }
  },

  fetchBpJson: (accountName: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.FETCHING_BP_JSON });

    try {
      const response = await fetch(`${API_URL}/api/v1/chain/${accountName}/bp`);
      const data = await response.json();

      return dispatch({
        type: types.FETCHING_BP_JSON_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_BP_JSON_FAILURE,
      });
    }
  },

  fetchRamPrice: (from: any, to: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.FETCHING_RAM_PRICE });

    try {
      const response = await fetch(`${API_URL}/api/v1/ram?from=${from}&to=${to}`);

      const data = await response.json();
      return dispatch({
        type: types.FETCHING_RAM_PRICE_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_RAM_PRICE_FAILURE,
      });
    }
  },

  resetRamPriceStore: () => ({
    type: types.RESET_RAM_PRICE,
  }),

  resetEosApiStore: () => ({
    type: types.RESET_EOS_API,
  }),

  resetBpJsonStore: () => ({
    type: types.RESET_BP_JSON,
  }),

  getInfo: () => async (dispatch: (arg0: { type: string; payload?: import("pcjs/dist/pcjs-rpc-interfaces").GetInfoResult; }) => void) => {
    dispatch({ type: types.POTATO_API_PENDING });

    try {
      const response = await PotatoRpc.get_info();
      return dispatch({
        type: types.POTATO_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.POTATO_API_FAILURE,
      });
    }
  },

  getBlock: (data: { getBlock: any; }) => async (dispatch: (arg0: { type: string; payload?: import("pcjs/dist/pcjs-rpc-interfaces").GetBlockResult; }) => void) => {
    dispatch({ type: types.POTATO_API_PENDING });

    try {
      const { getBlock } = data;

      const response = await PotatoRpc.get_block(getBlock);

      return dispatch({
        type: types.POTATO_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.POTATO_API_FAILURE,
      });
    }
  },
  getBlockHeaderState: (data: { getBlockHeaderState: any; }) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.POTATO_API_PENDING });

    try {
      const { getBlockHeaderState } = data;

      const response = await PotatoRpc.get_block_header_state(getBlockHeaderState);

      return dispatch({
        type: types.POTATO_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.POTATO_API_FAILURE,
      });
    }
  },

  getAccount: (data: { getAccount: any; }) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.POTATO_API_PENDING });

    try {
      const { getAccount } = data;

      const response = await PotatoRpc.get_account(getAccount);

      return dispatch({
        type: types.POTATO_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.POTATO_API_FAILURE,
      });
    }
  },

  getAbi: (account_name: string) => async (dispatch: (arg0: { type: string; payload?: import("pcjs/dist/pcjs-rpc-interfaces").GetAbiResult; }) => void) => {
    dispatch({ type: types.POTATO_API_PENDING });

    try {
      const response = await PotatoRpc.get_abi(account_name);

      return dispatch({
        type: types.POTATO_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.POTATO_API_FAILURE,
      });
    }
  },

  getRawCodeAndAbi: (data: string) => async (dispatch: (arg0: { type: string; payload?: { abi: import("pcjs/dist/pcjs-rpc-interfaces").GetAbiResult; code: import("pcjs/dist/pcjs-rpc-interfaces").GetCodeResult; }; }) => void) => {
    dispatch({ type: types.POTATO_API_PENDING });

    try {
      const abi = await PotatoRpc.get_abi(data);
      const code = await PotatoRpc.get_code(data);

      return dispatch({
        type: types.POTATO_API_SUCCESS,
        payload: { abi, code },
      });
    } catch (e) {
      return dispatch({
        type: types.POTATO_API_FAILURE,
      });
    }
  },

  getTableRows: (data: { getTableRowsJson: any; getTableRowsCode: any; getTableRowsScope: any; getTableRowsTable: any; getTableRowsTableKey: any; getTableRowsLowerBound: any; getTableRowsUpperBound: any; getTableRowsLimit: any; }) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.POTATO_API_PENDING });

    try {
      const {
        getTableRowsJson,
        getTableRowsCode,
        getTableRowsScope,
        getTableRowsTable,
        getTableRowsTableKey,
        getTableRowsLowerBound,
        getTableRowsUpperBound,
        getTableRowsLimit,
      } = data;
      const limit = +getTableRowsLimit;
      const json = getTableRowsJson === 'true';

      const response = await PotatoRpc.get_table_rows(
        {
        json,
        getTableRowsCode,
        getTableRowsScope,
        getTableRowsTable,
        getTableRowsTableKey,
        getTableRowsLowerBound,
        getTableRowsUpperBound,
        limit}
      );

      return dispatch({
        type: types.POTATO_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.POTATO_API_FAILURE,
      });
    }
  },

  getCurrencyBalance: (data: { getCurrencyBalanceСode: any; getCurrencyBalanceAccount: any; getCurrencyBalanceSymbol: any; }) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.POTATO_API_PENDING });

    try {
      const { getCurrencyBalanceСode, getCurrencyBalanceAccount, getCurrencyBalanceSymbol } = data;

      const response = await PotatoRpc.get_currency_balance(
        getCurrencyBalanceСode,
        getCurrencyBalanceAccount,
        getCurrencyBalanceSymbol
      );

      return dispatch({
        type: types.POTATO_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.POTATO_API_FAILURE,
      });
    }
  },

  getCurrencyStats: (data: { getCurrencyStatsСode: any; getCurrencyStatsSymbol: any; }) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.POTATO_API_PENDING });

    try {
      const { getCurrencyStatsСode, getCurrencyStatsSymbol } = data;

      const response = await PotatoRpc.get_currency_stats(getCurrencyStatsСode, getCurrencyStatsSymbol);

      return dispatch({
        type: types.POTATO_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.POTATO_API_FAILURE,
      });
    }
  },

  getProducers: (data: { getProducersJson: any; getProducersLowerBound: any; getProducersLimit: any; }) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    dispatch({ type: types.POTATO_API_PENDING });

    try {
      const { getProducersJson, getProducersLowerBound, getProducersLimit } = data;
      const limit = +getProducersLimit;
      const json = getProducersJson === 'true';

      const response = await PotatoRpc.get_producers(json, getProducersLowerBound, limit);

      return dispatch({
        type: types.POTATO_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.POTATO_API_FAILURE,
      });
    }
  },
});
