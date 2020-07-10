// Core
import io from 'socket.io-client';
import throttle from 'lodash/throttle';

// Actions
import { producerActions } from '../bus/producers/actions';
import { transactionActions } from '../bus/transactions/actions';
import { generalStatsActions } from '../bus/generalStats/actions';
import { uiActions } from '../bus/ui/actions';

// Constants
import { THROTTLE_TIMEOUT, API_URL } from '../constants';

class SocketClient {
  getState: any;
  socket!: SocketIOClient.Socket;
  dispatch!: Function;
  transactions: never[] | undefined;
  init = ({ dispatch, getState }:any) => {
    this.dispatch = dispatch;
    this.getState = getState;
    const url:string = API_URL||'';
    this.socket = io(url);
    this.transactions = [];
  };

  disconnect() {
    this.socket.disconnect();
  }

  connect() {
    this.socket.on('connect', () => {
      // Producers fetch
      this.dispatch(producerActions.fetchProducers());
      // Black list fetch
      this.dispatch(producerActions.fetchBlackList());
      // Producers update
      this.socket.on('table', (data: any) => {
        this.dispatch(producerActions.producersUpdate(data));
        // console.log("table ----> " + data)
      });
    });

    this.socket.on('disconnect', () => {
      console.log('disconnect');
    });

    // Background init
    this.socket.once('info', (data: { head_block_num: number; }) => {
      this.dispatch(uiActions.setActualBackgroundNumber(Math.floor(data.head_block_num / 5000000)));
      console.log('info[once] ----> ', data);
    });

    // Transactions
    this.socket.on('transactions', (data: any) => {
      this.dispatch(transactionActions.transactionsAdd(data));
      // console.log('transactions ----> ', data);
    });

    // Reload producers
    this.socket.on('reload_producers', (data: any) => {
      this.dispatch(producerActions.producersReload(data));
      // console.log("theblacklist ----> " + data)
    });

    // The blacklist
    this.socket.on('theblacklist', (data: any) => {
      this.dispatch(producerActions.blackListUpdate(data));
      // console.log("theblacklist ----> " + data)
    });

    // general stats
    this.socket.on(
      'totalstaked',
      throttle(data => {
        this.dispatch(generalStatsActions.totalStackedUpdate(data));
        // console.log("totalstaked ----> " + data)
      }, THROTTLE_TIMEOUT)
    );

    this.socket.on(
      'unregistereds',
      throttle(data => {
        this.dispatch(generalStatsActions.unregisteredBpsUpdate(data));
        // console.log("unregistereds ----> " + data)
      }, THROTTLE_TIMEOUT)
    );

    this.socket.on(
      'blockupdate',
      throttle(data => {
        this.dispatch(generalStatsActions.tpsApsStatsUpdate(data));
        // console.log('blockupdate ----> ', data);
      }, THROTTLE_TIMEOUT)
    );

    this.socket.on('blockchart', (data: any) => {
      this.dispatch(generalStatsActions.blockChartUpdate(data));
      // console.log('blockchart ----> ', data);
    });

    this.socket.on('usersonline', (data: any) => {
      this.dispatch(generalStatsActions.connectedUsersUpdate(data));
      // console.log("usersonline ----> " + data)
    });

    // CurrentBlockInfo & tracking background change

    this.socket.on('info', (data: { head_block_num: number; }) => {
      const rest = data.head_block_num % 5000000;
      if (rest === 0) {
        this.dispatch(uiActions.setActualBackgroundNumber(data.head_block_num / 5000000));
      }
      this.dispatch(generalStatsActions.lastBlockStatsUpdate(data));
      // console.log('info ----> ', data);
    });

    // // Modal
    // this.socket.on('api', (data: any) => {
    //   this.dispatch(modalActions.soketFetchingApiResponseSuccess(data));
    //   this.dispatch(uiActions.setModalDataFetchingState(false));
    //   // console.log("api ----> " + data)
    // });

    // this.socket.on('TXinfo_res', (data: any) => {
    //   this.dispatch(modalActions.soketFetchingTxInfoSuccess(data));
    //   this.dispatch(uiActions.setModalDataFetchingState(false));
    //   // console.log('TXinfo_res ----> ', data);
    // });

    // Reload page
    this.socket.on('reload_page', () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            registration.unregister();
          });
        });
        if (window.caches) {
          window.caches.keys().then(res => {
            if (!res) {
              console.log('No cache === ', res);
            }
            console.log(res);
            res.forEach(elem => {
              window.caches.delete(elem);
            });
            window.location.reload();
          });
        }
      }
      // console.log("reload_page ----> " + data)
    });

    // Debug
    this.socket.on('reload', () => {
      window.location.reload();
      // console.log("reload ----> " + data)
    });

    this.socket.on('console', (msg: any) => {
      console.log('console', msg);
    });

    this.socket.on('error', (msg: any) => {
      console.log('error', msg);
    });

    /** ************************************************************************************* */
    this.socket.on('basicInfo', (msg: any) => {
      // console.log('basicInfo', JSON.stringify(msg));
    });
  }

  // transactions toggle
  emitTransactionsSocketOn = () =>
    this.socket.on('transactions', (data: any) => {
      this.dispatch(transactionActions.transactionsAdd(data));
    });

  emitTransactionsSocketOff = () => this.socket.off('transactions');
}

export default new SocketClient();
