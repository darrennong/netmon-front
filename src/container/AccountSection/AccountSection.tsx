import { PureComponent, Fragment } from "react";
import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { Warpper, SectionBox, KeyLable, ValueField, MainValueField, HalfBox, SectionRow, TitleLable, HeaderBox, FieldSpan, TableBox, RowBox, TableLink, SubTitle, PERCENT, POC_STYLE, VALUE_STYLE, INT_STYLE } from "../styles";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAccountInfo, selectAccountHistory, selectEosApiData } from "../../bus/modal/selectors";
import { selectLastBlockStats } from "../../bus/generalStats/selectors";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { modalActions } from "../../bus/modal/actions";
import { uiActions } from "../../bus/ui/actions";
import { Arrow } from "../../components/svg/arrow";
import { convertUtcToLocal } from "../../utils/dateUtils";
import { selectModalDataFetchingState } from "../../bus/ui/selectors";
import { selectProducers } from "../../bus/producers/selectors";
import { CopyBtn, AmountField, UnitField, MarkValueField, BarItem, LineGreen, GDataRow, LineBlue, LineYellow, LineGray, BetweenBox, ContactTabs, ContactTabBtn, ExportBtn, Trangle, TokenContents, TokenBox, Badage, Line, TokenSymbSpan, TokenValSpan, TokenNameSpan, SymbolSpan, TokenMarkValueSpan, StateSpan } from "./styles";
import { AccountInfo, Transaction, getAction, getDescript } from ".";
import { formatBytes, formatDuring, formatPOC } from "../../utils/fromatNumber";
import { Producer } from "../FirstPage/Producers";
import PageNav from "../../components/PageNav";
import { toast } from "react-toastify";

interface Props extends WithTranslation {
    account: AccountInfo;
    modalDataFetchingState: boolean;
    lastStats: {
        head_block_num: number;
        price: { price: number };
        head_block_producer: string;
        next_producer: string;
    };
    match: any;
    producers: Array<Producer>;
    abiData: any;
    accountHistory: { totalNum: number, list: Array<Transaction> };
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
        const { fetchAccountInfo, getAbi, fetchAccountHistory } = props.actions;
        fetchAccountInfo(accountId);
        getAbi(accountId);
        fetchAccountHistory(accountId, 0);
        this.state = { accountId, expand: true, producerStat: `i18nAccount.statReady` } as any;
    }
    componentDidUpdate() {
        const { match, account, abiData, modalDataFetchingState, producers, lastStats, actions: { fetchAccountInfo, getAbi, fetchAccountHistory } } = this.props;
        const accountId = match.params.id;
        const paramas = window.location.hash.split('#page#');
        const page = parseInt(paramas[1]) || 1;
        if ((this.state as any).accountId !== accountId) {
            fetchAccountInfo(accountId);
            fetchAccountHistory(accountId, 0);
            if (!abiData||abiData.account_name !== accountId) {
                getAbi(accountId);
            }
        }
        if (page !== (this.state as any).page) {
            if (!modalDataFetchingState) fetchAccountHistory(accountId, page - 1);
        }
        this.setState({ accountId, page } as any);
        const price = lastStats && lastStats.price ? lastStats.price.price : undefined;
        price && this.setState({ price });
        this.setState({ producer: undefined });
        for (const i in producers) {
            let producer = producers[i];
            let producerStat = `i18nAccount.statReady`;
            if (producer.name === accountId) {
                if (lastStats.head_block_producer === accountId) {
                    producerStat = `i18nAccount.headProducer`;
                } else if (lastStats.next_producer === accountId) {
                    producerStat = `i18nAccount.nextProducer`;
                } else if (parseInt(i) < 21) {
                    producerStat = `i18nAccount.inThisRound`;
                }
                this.setState({ producer, accountId, producerStat });
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
            toast('文本已复制到剪切板');
        }
    }
    formatTokenTitle(str: string, numToken: number, value: number): string {
        return str.replace('$1', numToken.toFixed(0)).replace('$2', value.toLocaleString('zh', VALUE_STYLE));
    }

    pageTo = (page: number) => {
        const { actions: { toggleModal } } = this.props;
        const { accountId }: any = this.state;
        toggleModal('account', `${accountId}#page#${page}`);
    }

    render() {
        const { t, account, lastStats, accountHistory, actions: { toggleModal } } = this.props;
        if (!account.balance) {
            return null;
        }
        const { accountId, producer, page, price, expand, producerStat }: any = this.state;
        const [amount, symbol] = account.balance.split(" ");
        const otherDelegate = account.voter_info
            ? ((parseFloat(account.net_weight) + parseInt(account.cpu_weight) - parseInt(account.voter_info.staked)) / 10000).toLocaleString('zh', POC_STYLE)
            : '0.0000';
        const withSuper = account.account_name === "eosio";
        const perCpu = account.cpu_limit.used / parseFloat(account.cpu_limit.max);
        const perNet = account.net_limit.used / parseFloat(account.net_limit.max);
        const abiData = this.props.abiData || {};
        const { totalNum, list } = accountHistory;
        const tp = Math.ceil(totalNum / 10) || 1;
        let tks = (account.tokenData && Object.keys(account.tokenData)) || [];
        const numToken = tks.length;
        let value = 0.0;
        for (const tk of tks) {
            const [val, symb] = account.tokenData[tk].split(' ');
            if (symb === 'POC') {
                value += val * price;
            } else {
                value += val * 0.1;
            }
        }
        if (numToken > 4 && expand) {
            tks = tks.slice(0, 4);
        }
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
                                <AmountField>{formatPOC(amount)}</AmountField>
                                <UnitField>{symbol}</UnitField>
                                <MarkValueField>≈${lastStats.price ? (lastStats.price.price * parseFloat(amount)).toLocaleString('zh', VALUE_STYLE) : 0}</MarkValueField>
                            </SectionRow>
                            <SectionRow>
                                <KeyLable>{t('i18nAccount.liquid')}</KeyLable>
                                <ValueField>{formatPOC(account.core_liquid_balance)}</ValueField>
                            </SectionRow>
                            <SectionRow>
                                <KeyLable>{t('i18nAccount.unstaking')}</KeyLable>
                                <ValueField>{formatPOC(account.unstaking)}</ValueField>
                            </SectionRow>
                            <SectionRow>
                                <KeyLable>{t('i18nAccount.cpuStaking')}</KeyLable>
                                <ValueField>{formatPOC(account.self_delegated_bandwidth && account.self_delegated_bandwidth.cpu_weight) || '0.0000 POC'}</ValueField>
                            </SectionRow>
                            <SectionRow>
                                <KeyLable>{t('i18nAccount.netStaking')}</KeyLable>
                                <ValueField>{formatPOC(account.self_delegated_bandwidth && account.self_delegated_bandwidth.net_weight) || '0.0000 POC'}</ValueField>
                            </SectionRow>
                            <SectionRow>
                                <KeyLable>{t('i18nAccount.otherStaking')}</KeyLable>
                                <ValueField>{formatPOC(otherDelegate)} POC</ValueField>
                            </SectionRow>
                        </HalfBox>
                        <BetweenBox>
                            <KeyLable>RAM</KeyLable>
                            <BarItem>
                                <LineGray>
                                    <LineGreen per={account.ram_usage * 100 / account.ram_quota} />
                                </LineGray>
                                <span>{withSuper ? '0.00' : (account.ram_usage / account.ram_quota).toLocaleString('zh', PERCENT)}</span>
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
                                <span>{withSuper ? '0.00' : perCpu.toLocaleString('zh', PERCENT)}</span>
                            </BarItem>
                            <GDataRow>
                                {withSuper ? '∞ / ∞' : `${formatDuring(account.cpu_limit.used)} / ${formatDuring(parseInt(account.cpu_limit.max))}`}
                            </GDataRow>
                            <KeyLable>NET</KeyLable>
                            <BarItem>
                                <LineGray>
                                    <LineYellow per={perNet} />
                                </LineGray>
                                <span>{withSuper ? '0.00' : perNet.toLocaleString('zh', PERCENT)}</span>
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
                                    <ValueField><StateSpan>{t(producerStat)}</StateSpan></ValueField>
                                </SectionRow>
                                <SectionRow>
                                    <KeyLable>{t('i18nAccount.producerVoteRate')}</KeyLable>
                                    <ValueField>{producer.votesPercentage.toFixed(2)}%</ValueField>
                                </SectionRow>
                                <SectionRow>
                                    <KeyLable>{t('i18nAccount.producerVotes')}</KeyLable>
                                    <ValueField>{producer.totalVotes.toLocaleString('zh', INT_STYLE)}</ValueField>
                                </SectionRow>
                            </HalfBox>
                            <HalfBox>
                                <SectionRow /><SectionRow>
                                    <KeyLable>{t('i18nAccount.producerLocation')}</KeyLable>
                                    <ValueField>{t('i18nFirstSection.i18nProducers.localNet')}</ValueField>
                                </SectionRow><SectionRow>
                                    <KeyLable>{t('i18nAccount.producerReward')}</KeyLable>
                                    <ValueField>{producer.rewards_per_day.toLocaleString('zh', POC_STYLE)} POC</ValueField>
                                </SectionRow>
                            </HalfBox>
                        </SectionBox>
                    </Warpper>
                }

                {abiData.abi &&
                    <Warpper>
                        <SectionBox ul={true} margin="10px 24px 0 24px">
                            <TitleLable>{t('i18nAccount.contractTitle')}</TitleLable>
                            <SubTitle>{t('i18nAccount.contractSubTitle')}</SubTitle>
                        </SectionBox>
                        <SectionBox margin="0 24px 10px 24px">
                            <ContactTabs>
                                <ContactTabBtn onClick={() => toggleModal(`contractHistory`, accountId)}>{t('i18nAccount.contractViewHistory')}<Arrow><path d="M0,5l13,0M7,0l6,5M13,5l-6,5"></path></Arrow></ContactTabBtn>
                                <ContactTabBtn onClick={() => toggleModal(`contractAbi`, accountId)}>{t('i18nAccount.contractViewAbi')}<Arrow><path d="M0,5l13,0M7,0l6,5M13,5l-6,5"></path></Arrow></ContactTabBtn>
                            </ContactTabs>
                        </SectionBox>
                    </Warpper>
                }

                {numToken > 0 &&
                    <Warpper>
                        <SectionBox ul={true} margin="10px 24px 0 24px">
                            <TitleLable>{t('i18nAccount.tokenTitle')}</TitleLable>
                            <SubTitle>{this.formatTokenTitle(t('i18nAccount.tokenSubTitle'), numToken, value)}</SubTitle>
                            {numToken > 4 && (
                                <ExportBtn onClick={() => { this.setState({ expand: !expand }); }}>
                                    {expand ? t('i18nAccount.expand') : t('i18nAccount.collapse')}
                                    <Trangle expaned={expand}>
                                        <path fill="#777777" d="m0,5l5,-5l4.5,5l-9,0l0,0l-0.5,0z" />
                                    </Trangle>
                                </ExportBtn>
                            )}
                        </SectionBox>
                        <TokenContents>
                            {tks.map((tk, i) => {
                                const [val, symb] = account.tokenData[tk].split(' ');
                                return (
                                    <TokenBox key={i}>
                                        <Line>
                                            <Badage />
                                            <SymbolSpan onClick={() => toggleModal('tokenInfo', tk)}>{symb}</SymbolSpan>
                                            <TokenNameSpan>({tk})</TokenNameSpan>
                                        </Line>
                                        <Line>
                                            <TokenValSpan>{val}</TokenValSpan>
                                            <TokenSymbSpan>{symb}</TokenSymbSpan>
                                        </Line>
                                        <Line>
                                            <TokenMarkValueSpan>{' '}≈{symb === 'POC' ? (val * price).toLocaleString('zh', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true }) : (val * 0.1).toLocaleString('zh', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })} USD</TokenMarkValueSpan>
                                        </Line>
                                    </TokenBox>
                                );
                            })}
                        </TokenContents>
                    </Warpper>
                }

                <Warpper>
                    <SectionBox margin="10px 24px 0 24px">
                        <TitleLable>{t('i18nBlockSection.transInfo')}</TitleLable>
                    </SectionBox>
                    <HeaderBox>
                        <FieldSpan w={200} align="left">{t('i18nAccount.hisId')}</FieldSpan>
                        <FieldSpan w={100} align="left">{t('i18nAccount.hisBlock')}</FieldSpan>
                        <FieldSpan w={140} align="left">{t('i18nAccount.hisTime')}</FieldSpan>
                        <FieldSpan w={60} align="left">{t('i18nAccount.hisActType')}</FieldSpan>
                        <FieldSpan w={450} align="left">{t('i18nAccount.hisData')}</FieldSpan>
                    </HeaderBox>
                    {accountId === 0 && <SectionBox ul={true} margin="0 24px">{t('i18nBlockSection.noTrans')}</SectionBox>}
                    <TableBox>
                        {list && list.map((trans: any, i: number) => {
                            return (<RowBox key={i}>
                                <TableLink w={200} align="left"
                                    onClick={() => toggleModal('trans', trans.txid)}>{trans.txid}</TableLink>
                                <TableLink w={100} align="left"
                                    onClick={() => { toggleModal('block', trans.msgObject.c1) }}>{trans.msgObject.c1}</TableLink>
                                <FieldSpan w={140} align="left">{convertUtcToLocal(trans.date)}</FieldSpan>
                                <FieldSpan w={60} align="left">{getAction(accountId, trans.msgObject)}</FieldSpan>
                                <FieldSpan w={450} align="left">{getDescript(trans, toggleModal)}</FieldSpan>
                            </RowBox>)
                        })
                        }
                        {totalNum > 0 && <PageNav totalPages={tp} page={page} pageTo={this.pageTo} />}
                    </TableBox>
                </Warpper>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AccountSection));