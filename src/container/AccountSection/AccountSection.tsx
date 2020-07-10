import { PureComponent, Fragment } from "react";
import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { Warpper, SectionBox, KeyLable, ValueField, MainValueField, HalfBox, SectionRow, Link, TitleLable, HeaderBox, FieldSpan, TableBox, RowBox, TableLink, SubTitle } from "../styles";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectBlockInfo, selectAccountInfo, selectAccountHistory, selectEosApiData } from "../../bus/modal/selectors";
import { selectLastBlockStats } from "../../bus/generalStats/selectors";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { modalActions } from "../../bus/modal/actions";
import { uiActions } from "../../bus/ui/actions";
import { Arrow } from "../../components/svg/arrow";
import { convertUtcToLocal } from "../../utils/dateUtils";
import { selectModalDataFetchingState } from "../../bus/ui/selectors";
import { selectProducers } from "../../bus/producers/selectors";
import { CopyBtn, AmountField, UnitField, MarkValueField, BarItem, LineGreen, GDataRow, LineBlue, LineYellow, LineGray, BetweenBox } from "./styles";
import { AccountInfo } from ".";
import { formatBytes, formatDuring } from "../../utils/fromatNumber";
import { Producer } from "../FirstPage/Producers";

interface Props extends WithTranslation {
    account: AccountInfo;
    lastStats: { head_block_num: number; price: { price: number } };
    match: any;
    producers: Array<Producer>;
    actions: {
        fetchBlockInfo: Function;
        toggleModal: Function;
        fetchTansInfo: Function;
        fetchAccountInfo: Function;
        fetchAccountHistory: Function;
        fetchAbiHistory: Function;
        getAbi: Function;
        getAccount: Function;
    },
}

const mapStateToProps = createStructuredSelector({
    account: selectAccountInfo(),
    modalDataFetchingState: selectModalDataFetchingState(),
    accountHistory: selectAccountHistory(),
    lastStats: selectLastBlockStats(),
    producers: selectProducers(),
    abiData: selectEosApiData(),
});

const mapDispatchToProps = (dispach: Dispatch<AnyAction>) => ({
    actions: bindActionCreators(
        {
            fetchBlockInfo: modalActions.fetchBlockInfo,
            fetchTansInfo: modalActions.fetchTxInfo,
            fetchAccountInfo: modalActions.fetchAccountInfo,
            fetchAccountHistory: modalActions.fetchAccountHistory,
            fetchAbiHistory: modalActions.fetchAbiHistory,
            getAbi: modalActions.getAbi,
            getAccount: modalActions.getAccount,
            toggleModal: uiActions.toggleModal,
        },
        dispach
    ),
});
class AccountSection extends PureComponent<Props>{
    constructor(props: Readonly<Props>) {
        super(props);
        const accountId = props.match.params.id;
        props.actions.fetchAccountInfo(accountId);
        this.state = { accountId } as any;
    }
    componentDidUpdate() {
        const { match, producers, actions: { fetchAccountInfo } } = this.props;
        const accountId = match.params.id;
        if ((this.state as any).accountId !== accountId) {
            fetchAccountInfo(accountId);
            this.setState({ accountId } as any);
        }
        for (const producer of producers) {
            if (producer.name === accountId) {
                this.setState({producer,accountId});
                break;
            }
        }
    }
    copyText() {
        const val = document.getElementById('accountText');
        const selection = window.getSelection();
        if (val && selection) {
            selection.selectAllChildren(val);
            document.execCommand('Copy');
            selection.empty();
        }
    }
    render() {
        const { t, account, lastStats, actions: { toggleModal } } = this.props;
        if (!account.balance) {
            return null;
        }
        const { accountId, producer }: any = this.state;
        const [amount, symbol] = account.balance.split(" ");
        const otherDelegate = account.voter_info
            ? ((parseFloat(account.net_weight) + parseInt(account.cpu_weight) - parseInt(account.voter_info.staked)) / 10000).toFixed(4)
            : '0.0000';
        const withSuper = account.account_name === "eosio";
        const perCpu = account.cpu_limit.used / parseFloat(account.cpu_limit.max);
        const perNet = account.net_limit.used / parseFloat(account.net_limit.max);
        return (
            <Fragment>
                <Warpper>
                    <SectionBox ul={true} margin="10px 24px 0 24px">
                        <KeyLable>{t('i18nAccount.account')}</KeyLable>
                        <MainValueField id="accountText">{accountId}</MainValueField>
                        <CopyBtn onClick={this.copyText}>{t('i18nAccount.copy')}</CopyBtn>
                    </SectionBox>
                    <SectionBox rows={6} margin="0 24px 10px 24px">
                        <HalfBox>
                            <SectionRow>
                                <KeyLable>{t('i18nAccount.totalBalance')}</KeyLable>
                                <AmountField>{amount}</AmountField>
                                <UnitField>{symbol}</UnitField>
                                <MarkValueField>≈${lastStats.price ? (lastStats.price.price * parseFloat(amount)).toFixed(2) : 0}</MarkValueField>
                            </SectionRow>
                            <SectionRow>
                                <KeyLable>{t('i18nAccount.liquid')}</KeyLable>
                                <ValueField>{account.core_liquid_balance}</ValueField>
                            </SectionRow>
                            <SectionRow>
                                <KeyLable>{t('i18nAccount.unstaking')}</KeyLable>
                                <ValueField>{account.unstaking || '0.0000 POC'}</ValueField>
                            </SectionRow>
                            <SectionRow>
                                <KeyLable>{t('i18nAccount.cpuStaking')}</KeyLable>
                                <ValueField>{account.self_delegated_bandwidth && account.self_delegated_bandwidth.cpu_weight}</ValueField>
                            </SectionRow>
                            <SectionRow>
                                <KeyLable>{t('i18nAccount.netStaking')}</KeyLable>
                                <ValueField>{account.self_delegated_bandwidth && account.self_delegated_bandwidth.net_weight}</ValueField>
                            </SectionRow>
                            <SectionRow>
                                <KeyLable>{t('i18nAccount.otherStaking')}</KeyLable>
                                <ValueField>{otherDelegate} POC</ValueField>
                            </SectionRow>
                        </HalfBox>
                        <BetweenBox>
                            <KeyLable>RAM</KeyLable>
                            <BarItem>
                                <LineGray>
                                    <LineGreen per={account.ram_usage * 100 / account.ram_quota} />
                                </LineGray>
                                <span>{(account.ram_usage * 100 / account.ram_quota).toFixed(2)}%</span>
                            </BarItem>
                            <GDataRow>
                                {withSuper
                                    ? `${formatBytes(account.ram_usage)} / ∞`
                                    : `${formatBytes(account.ram_usage)} / ${formatBytes(account.ram_quota)}`}
                            </GDataRow>
                            <KeyLable>CPU</KeyLable>
                            <BarItem>
                                <LineGray>
                                    <LineBlue per={perCpu} />
                                </LineGray>
                                <span>{perCpu.toFixed(2)}%</span>
                            </BarItem>
                            <GDataRow>
                                {withSuper ? '∞ / ∞' : `${formatDuring(account.cpu_limit.used)} / ${formatDuring(parseInt(account.cpu_limit.max))}`}
                            </GDataRow>
                            <KeyLable>NET</KeyLable>
                            <BarItem>
                                <LineGray>
                                    <LineYellow per={perNet} />
                                </LineGray>
                                <span>{perNet.toFixed(2)}%</span>
                            </BarItem>
                            <GDataRow>
                                {withSuper ? '∞ / ∞' : `${formatBytes(account.net_limit.used)} / ${formatBytes(parseInt(account.net_limit.max))}`}
                            </GDataRow>
                        </BetweenBox>
                    </SectionBox>
                </Warpper>

                {producer &&
                    <Warpper>
                        <SectionBox ul={true} margin="10px 24px 0 24px">
                            <TitleLable>{t('i18nAccount.producerTitle')}</TitleLable>
                            <SubTitle>{t('i18nAccount.producerSubTitle')}</SubTitle>
                        </SectionBox>
                        <SectionBox rows={3} margin="0 24px 10px 24px">
                            <HalfBox>
                                <SectionRow>
                                    <KeyLable>{t('i18nAccount.producerStat')}</KeyLable>
                                    <ValueField>{producer.name}</ValueField>
                                </SectionRow>
                                <SectionRow>
                                    <KeyLable>{t('i18nAccount.producerVoteRate')}</KeyLable>
                                    <ValueField>{producer.votesPercentage.toFixed(2)}%</ValueField>
                                </SectionRow>
                                <SectionRow>
                                    <KeyLable>{t('i18nAccount.producerVotes')}</KeyLable>
                                    <ValueField>{producer.totalVotes}</ValueField>
                                </SectionRow>
                            </HalfBox>
                            <HalfBox>
                                <SectionRow /><SectionRow>
                                    <KeyLable>{t('i18nAccount.producerLocation')}</KeyLable>
                                    <ValueField>{t('i18nFirstSection.i18nProducers.localNet')}</ValueField>
                                </SectionRow><SectionRow>
                                    <KeyLable>{t('i18nAccount.producerReward')}</KeyLable>
                                    <ValueField>{producer.rewards_per_day.toFixed(4)} POC</ValueField>
                                </SectionRow>
                            </HalfBox>
                        </SectionBox>
                    </Warpper>
                }

                <Warpper>
                    <SectionBox margin="10px 24px 0 24px">
                        <TitleLable>{t('i18nBlockSection.transInfo')}</TitleLable>
                    </SectionBox>
                    <HeaderBox>
                        <FieldSpan w={150} align="left">{t('i18nFirstSection.i18nTransactions.id')}</FieldSpan>
                        <FieldSpan w={100} align="left">{t('i18nFirstSection.i18nTransactions.actionCnt')}</FieldSpan>
                        <FieldSpan w={100} align="left">{t('i18nFirstSection.i18nTransactions.cupUsage')}</FieldSpan>
                        <FieldSpan w={150} align="left">{t('i18nFirstSection.i18nTransactions.netUsage')}</FieldSpan>
                        <FieldSpan w={150} align="left">{t('i18nFirstSection.i18nTransactions.expired')}</FieldSpan>
                    </HeaderBox>
                    {accountId === 0 && <SectionBox ul={true} margin="0 24px">{t('i18nBlockSection.noTrans')}</SectionBox>}
                    <TableBox>
                        {/* {blockData.transactions && blockData.transactions.map((trans: Transaction, i: number) => {
              return (<RowBox key={i}>
                <TableLink w={150} align="left"
                  onClick={() => toggleModal('trans', trans.txid)}>{trans.txid}</TableLink>
                <FieldSpan w={100} align="left">{trans.actionCnt}</FieldSpan>
                <FieldSpan w={100} align="left">{trans.cpuUsage}</FieldSpan>
                <FieldSpan w={150} align="left">{trans.netUsage}</FieldSpan>
                <FieldSpan w={150} align="left">{convertUtcToLocal(trans.expired)}</FieldSpan>
              </RowBox>)
            })
            } */}
                    </TableBox>
                </Warpper>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AccountSection));