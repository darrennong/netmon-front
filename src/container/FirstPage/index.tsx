import { PureComponent, Fragment } from "react";
import { createStructuredSelector } from "reselect";
import { selectAdditionalInfoStats, selectLastBlockStats, selectTpsApsStats, selectConnectedUsers, selectBlockChart } from "../../bus/generalStats/selectors";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { InfoBox, InfoList, DataItem, PTitle, PData, PData2, TopBox, HistoryBox, TableTitle, HeaderSpan1, THIcon, PMore, AMore, RowData } from "./styles";
import React from "react";
import { formatNumber, formatDuring, formatBytes } from "../../utils/fromatNumber";
import blockIcon from './icons/square.png';
import transIcon from './icons/hammer.png';
import { selectTransactionsList } from "../../bus/transactions/selectors";
import { modalActions } from "../../bus/modal/actions";
import { uiActions } from "../../bus/ui/actions";
import { selectProducers } from "../../bus/producers/selectors";
import Producers from "./Producers";
import { FieldSpan, TableLink } from "../styles";
export interface Block{
  blockNumber:number;
  blockTransCount:number;
  blockActionCount:number;
}
export interface Transaction {
    txid: string;
    cpuUsage: number;
    netUsage: number;
}
interface Props extends WithTranslation {
  additionalInfoStats: any;
  tpsApsStats: any;
  connectedUsers: any;
  lastBlockStats: any;
  transactionsList: Array<Transaction>;
  blocksList: Array<Block>;
  producers: Array<any>;
  actions: { toggleModal: Function };
}
const mapStateToProps = createStructuredSelector({
  additionalInfoStats: selectAdditionalInfoStats(),
  tpsApsStats: selectTpsApsStats(),
  connectedUsers: selectConnectedUsers(),
  lastBlockStats: selectLastBlockStats(),
  transactionsList: selectTransactionsList(),
  blocksList: selectBlockChart(),
  producers: selectProducers(),
});
const mapDispatchToProps = (dispach: any) => ({
  actions: bindActionCreators(
    {
      fetchTransInfo: modalActions.fetchTxInfo,
      toggleModal: uiActions.toggleModal,
    },
    dispach
  ),
});
class FirstPage extends PureComponent<Props>{
  render() {
    const { t, lastBlockStats, tpsApsStats, blocksList, transactionsList, producers, actions: { toggleModal } } = this.props;
    const blocks = blocksList.slice(0, 10);
    const transactions = transactionsList.slice(0, 10);
    return (
      <Fragment>
        {/* 顶行状态栏 */}
        <InfoBox>
          <InfoList>
            <DataItem>
              <PTitle>{t('i18nFirstSection.i18nCurrentBlockInfo.currentBlock')}</PTitle>
              <PData>{formatNumber(lastBlockStats.head_block_num)}</PData>
              <PData2>
                {formatNumber(lastBlockStats.last_irreversible_block_num)}[
              {formatNumber(lastBlockStats.last_irreversible_block_num - lastBlockStats.head_block_num)}]
            </PData2>
            </DataItem>
            <DataItem>
              <Fragment>
                <PTitle>{t('i18nFirstSection.i18nGeneralInfo.tps')}: </PTitle>
                <PData>
                  {tpsApsStats.liveTps}/{tpsApsStats.maxTps}
                </PData>
              </Fragment>
            </DataItem>
            <DataItem>
              <PTitle>{t('i18nFirstSection.i18nGeneralInfo.aps')}: </PTitle>
              <PData>
                {tpsApsStats.liveAps}/{tpsApsStats.maxAps}
              </PData>
            </DataItem>
            <DataItem>
              <PTitle>{t('i18nFirstSection.i18nGeneralInfo.totalAccounts')}: </PTitle>
              <PData>{lastBlockStats.accountCount}</PData>
            </DataItem>
            <DataItem>
              <PTitle>{t('i18nFirstSection.i18nPocPrice.title')}: </PTitle>
              <PData>
                {'$'} {lastBlockStats.price && lastBlockStats.price.price}
              </PData>
            </DataItem>
          </InfoList>
        </InfoBox>
        <TopBox>
          <HistoryBox>
            <TableTitle>
              <FieldSpan w={150} align="left">
                <THIcon src={blockIcon} />
                <HeaderSpan1>{t('i18nFirstSection.i18nBlocks.headTitle')}</HeaderSpan1>
              </FieldSpan>
              <FieldSpan w={80} align="right"> {t('i18nFirstSection.i18nBlocks.transNum')} </FieldSpan>
              <FieldSpan w={80} align="right"> {t('i18nFirstSection.i18nBlocks.optionNum')} </FieldSpan>
            </TableTitle>
            {
              blocks.map((block, i) => (
                <RowData key={i}>
                  <TableLink w={150} align="left" onClick={()=>toggleModal('block',block.blockNumber)}>{block.blockNumber}</TableLink>
                  <FieldSpan w={80} align="right">{block.blockTransCount}</FieldSpan>
                  <FieldSpan w={80} align="right">{block.blockActionCount}</FieldSpan>
                </RowData>
              ))
            }
            <PMore>
              <AMore
                onClick={() => {
                  toggleModal('top50block', '');
                }}
              >
                查看更多
              </AMore>
            </PMore>
          </HistoryBox>
          <HistoryBox>
          <TableTitle>
              <FieldSpan w={150} align="left">
                <THIcon src={transIcon} />
                <HeaderSpan1>{t('i18nFirstSection.i18nTransactions.id')}</HeaderSpan1>
              </FieldSpan>
              <FieldSpan w={80} align="right"> {t('i18nFirstSection.i18nTransactions.cupUsage')} </FieldSpan>
              <FieldSpan w={80} align="right"> {t('i18nFirstSection.i18nTransactions.netUsage')} </FieldSpan>
            </TableTitle>
            {transactions.map((transaction, i) => (
              <RowData key={i}>
                <TableLink w={150} align="left" onClick={()=>toggleModal('trans',transaction.txid)}>{transaction.txid}</TableLink>
                <FieldSpan w={80} align="right">{formatDuring(transaction.cpuUsage)}</FieldSpan>
                <FieldSpan w={80} align="right">{formatBytes(transaction.netUsage)}</FieldSpan>
              </RowData>
              // <TransactionRow key={i} transaction={transaction} toggleModal={toggleModal} />
            ))}
            <PMore>
              <AMore
                onClick={() => {
                  toggleModal('top50Transaction', '');
                }}
              >
                查看更多
              </AMore>
            </PMore>
          </HistoryBox>
        </TopBox>
        <Producers t={t} blockStats={lastBlockStats} producers={producers} toggleModal={toggleModal} />
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FirstPage));