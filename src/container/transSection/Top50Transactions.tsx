import { PureComponent } from "react";
import { connect } from "react-redux";
import { withTranslation, WithTranslation } from "react-i18next";
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from 'redux';
import { selectTransactionsList, selectTransactionsInfo } from "../../bus/transactions/selectors";
import { modalActions } from "../../bus/modal/actions";
import { uiActions } from "../../bus/ui/actions";
import { Warpper, Title, SubTitle, HeaderBox, FieldSpan, TableBox, RowBox, TableLink } from "../styles";
import React from "react";
import { convertUtcToLocal } from "../../utils/dateUtils";
import { formatBytes, formatDuring } from "../../utils/fromatNumber";
interface Transaction{
    txid:string;
    actionCnt:number;
    expired:Date;
    cpuUsage:number;
    netUsage:number;
}
interface Props extends WithTranslation{
    transactionsList: Array<Transaction>,
    transactionsInfo: {totalTransactionsCount:number},
    actions: {toggleModal:Function};
}
const mapStateToProps = createStructuredSelector({
    transactionsList: selectTransactionsList(),
    transactionsInfo: selectTransactionsInfo(),
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
  
class Top50Transactions extends PureComponent<Props>{
    render(){
        const {t,transactionsInfo,transactionsList,actions:{toggleModal}} = this.props;
        return (
            <Warpper>
                <Title>{t('i18nFirstSection.i18nTransactions.title')}</Title>
                <SubTitle>{`${t('i18nFirstSection.i18nTransactions.transCnt')}    ${transactionsInfo.totalTransactionsCount}`}</SubTitle>
                <HeaderBox>
                    <FieldSpan w={150} align="left">{t('i18nFirstSection.i18nTransactions.id')}</FieldSpan>
                    <FieldSpan w={100} align="left">{t('i18nFirstSection.i18nTransactions.actionCnt')}</FieldSpan>
                    <FieldSpan w={100} align="left">{t('i18nFirstSection.i18nTransactions.cupUsage')}</FieldSpan>
                    <FieldSpan w={150} align="left">{t('i18nFirstSection.i18nTransactions.netUsage')}</FieldSpan>
                    <FieldSpan w={150} align="left">{t('i18nFirstSection.i18nTransactions.expired')}</FieldSpan>
                </HeaderBox>
                <TableBox>
                    {
                        transactionsList.map((trans: Transaction, i: number) => {
                            return (<RowBox key={i}>
                                <TableLink w={150} align="left" onClick={() => toggleModal('trans', trans.txid)}>{trans.txid}</TableLink>
                                <FieldSpan w={100} align="left">{trans.actionCnt}</FieldSpan>
                                <FieldSpan w={100} align="left">{formatDuring(trans.cpuUsage)}</FieldSpan>
                                <FieldSpan w={150} align="left">{formatBytes(trans.netUsage)}</FieldSpan>
                                <FieldSpan w={150} align="left">{convertUtcToLocal(trans.expired)}</FieldSpan>
                            </RowBox>)
                        })
                    }
                </TableBox>
            </Warpper>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withTranslation()(Top50Transactions));