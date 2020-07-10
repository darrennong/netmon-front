// Core
import store from 'store';

import types from './types';
import { event } from '..';
interface ProduceState{
  producers: any[],
  selectedProducers:any[],
  filterInputValue: string,
  blackList: any,
}
const initialState:ProduceState = {
  producers: [],
  selectedProducers: store.get('checkedProducers') || [],
  // Filter input value
  filterInputValue: '',
  blackList: {},
};

export const producersReducer = (state = initialState, { type, payload }:event) => {
  switch (type) {
    case types.FETCH_PRODUCERS_SUCCESS:
      return {
        ...state,
        producers: payload.producers.map((producer: any, index: any) => ({ ...producer, index })),
      };

    case types.FETCH_BLACK_LIST_SUCCESS:
      return {
        ...state,
        blackList: payload.blackList,
      };

    case types.PRODUCERS_RELOAD:
      return {
        ...state,
        producers: payload.producers.map((producer: any, index: any) => ({ ...producer, index })),
      };

    case types.PRODUCERS_UPDATE:
      if (!payload.data || !payload.data.length) {
        return state;
      }

      return {
        ...state,
        producers: state.producers.map(producer => {
          const nextProducerData = payload.data.find((changedProducer: { name: any; }) => producer.name === changedProducer.name);
          return nextProducerData ? { ...nextProducerData, index: producer.index } : producer;
        }),
      };

    case types.TOGGLE_PRODUCER_SELECTION:
      if (!state.selectedProducers.some((item: any) => item === payload))
        return {
          ...state,
          selectedProducers: [...state.selectedProducers, payload],
        };

      return {
        ...state,
        selectedProducers: state.selectedProducers.filter((item: any) => item !== payload),
      };

    // Filter input value
    case types.SET_FILTER_INPUT_VALUE:
      return {
        ...state,
        filterInputValue: payload,
      };

    case types.BLACK_LIST_UPDATE:
      return {
        ...state,
        blackList: payload,
      };

    default:
      return state;
  }
};
