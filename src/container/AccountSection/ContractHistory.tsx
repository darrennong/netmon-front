import { WithTranslation, withTranslation } from "react-i18next";
import { PureComponent, Fragment, } from "react";
import { Warpper, SectionBox, KeyLable, MainValueField, TitleLable, SubTitle, TabSpan, HeaderBox, FieldSpan, RowBox, TableLink, TableBox } from "../styles";
import React from "react";
import { ContactTabBtn, Selector, JsonBox } from "./styles";
import { Arrow } from "../../components/svg/arrow";
import { AccountInfo, Transaction, getAction, getDescript } from ".";
import { Producer } from "../FirstPage/Producers";
import { createStructuredSelector } from "reselect";
import { selectAccountInfo, selectAccountHistory, selectEosApiData } from "../../bus/modal/selectors";
import { selectModalDataFetchingState } from "../../bus/ui/selectors";
import { selectLastBlockStats } from "../../bus/generalStats/selectors";
import { selectProducers } from "../../bus/producers/selectors";
import { bindActionCreators } from "redux";
import { modalActions } from "../../bus/modal/actions";
import { uiActions } from "../../bus/ui/actions";
import { connect } from "react-redux";
import { convertUtcToLocal } from "../../utils/dateUtils";
import ReactJson from 'react-json-view';
import PageNav from "../../components/PageNav";

interface Props extends WithTranslation {
    account: AccountInfo;
    lastStats: { head_block_num: number; price: { price: number } };
    match: any;
    producers: Array<Producer>;
    abiData: any;
    accountHistory: { totalNum: number, list: Array<Transaction> };
    actions: {
        fetchBlockInfo: Function;
        toggleModal: Function;
        fetchTansInfo: Function;
        fetchAbiHistory: Function;
        getAbi: Function;
        getAccount: Function;
    },
}
const ACT_ALL = `-all-`;
const mapStateToProps = createStructuredSelector({
    account: selectAccountInfo(),
    modalDataFetchingState: selectModalDataFetchingState(),
    accountHistory: selectAccountHistory(),
    lastStats: selectLastBlockStats(),
    producers: selectProducers(),
    abiData: selectEosApiData(),
});

const mapDispatchToProps = (dispach: any) => ({
    actions: bindActionCreators(
        {
            fetchBlockInfo: modalActions.fetchBlockInfo,
            fetchTansInfo: modalActions.fetchTxInfo,
            fetchAbiHistory: modalActions.fetchAbiHistory,
            getAbi: modalActions.getAbi,
            getAccount: modalActions.getAccount,
            toggleModal: uiActions.toggleModal,
        },
        dispach
    ),
});
class ContractHistory extends PureComponent<Props>{
    constructor(props: Readonly<Props>) {
        super(props);
        const accountId = props.match.params.id;
        const { getAbi, fetchAbiHistory } = props.actions;
        getAbi(accountId);
        fetchAbiHistory(accountId, ACT_ALL, 0);
        this.state = { accountId, action: ACT_ALL } as any;
    }
    componentDidUpdate() {
        const { match, actions: { getAbi, fetchAbiHistory } } = this.props;
        const accountId = match.params.id;
        const params = window.location.hash.split('#');
        const action = params[1] || ACT_ALL;
        const page = parseInt(params[2]) || 1;
        const state: any = this.state;
        const path = match.path.split("/")[1];
        if (accountId !== state.accountId) {
            getAbi(accountId);
            fetchAbiHistory(accountId, action, page - 1);
        }
        if (page !== state.page || action !== state.action) {
            fetchAbiHistory(accountId, action, page - 1);
        }
        this.setState({ accountId, page, action, path } as any);
    }
    actionChange = (evt: any) => {
        const action = evt.target.value;
        const { accountId, path }: any = this.state;
        const toggleModal = this.props.actions.toggleModal;
        toggleModal(path, `${accountId}#${action}#${0}`);
    }
    pageTo = (page: number) => {
        const { accountId, path, action }: any = this.state;
        const { actions: { toggleModal } } = this.props;
        toggleModal(path, `${accountId}#${action}#${page}`);
    }
    render() {
        const { t, abiData, accountHistory, actions: { toggleModal } } = this.props;
        const { accountId, path, action, page }: any = this.state;
        const { totalNum, list } = accountHistory;
        const tp = Math.ceil(totalNum / 10) || 1;
        return (
            <Fragment>
                <Warpper>
                    <SectionBox margin="10px 24px 10px 24px">
                        <ContactTabBtn onClick={() => toggleModal(`account`, accountId)}><Arrow><path d="M0,5l13,0M6,0l-6,5M0,5l6,5"></path></Arrow>{t('i18nAccount.returnAccountInfo')}</ContactTabBtn>
                    </SectionBox>
                </Warpper>
                <Warpper>
                    <SectionBox ul={true} margin="10px 24px 0px 24px">
                        <TitleLable>{t('i18nAccount.contractTitle')}</TitleLable>
                        <SubTitle>{t('i18nAccount.contractSubTitle')}</SubTitle>
                    </SectionBox>
                    <SectionBox margin="0px 24px 10px 24px">
                        <KeyLable>{t('i18nAccount.account')}</KeyLable>
                        <MainValueField id="accountText">{accountId}</MainValueField>
                    </SectionBox>
                </Warpper>
                <Warpper>
                    <SectionBox ul={true} margin="10px 24px 0px 24px">
                        <TabSpan selected={path === 'contractHistory'} onClick={() => toggleModal('contractHistory', accountId)}>{t('i18nAccount.contractTransInfo')}</TabSpan>
                        <TabSpan selected={path === 'contractAbi'} onClick={() => toggleModal('contractAbi', accountId)}>{t('i18nAccount.contractAbi')}</TabSpan>
                    </SectionBox>
                    {path === 'contractHistory' && abiData.abi &&
                        <Fragment>
                            <SectionBox margin="10px 24px 0px 24px">
                                <Selector onChange={this.actionChange} value={action}>
                                    <option value="-all-">--全部接口--</option>
                                    {abiData.abi.actions.map((act: any, i: number) => (
                                        <option key={i}>{act.name}</option>
                                    ))}
                                </Selector>
                            </SectionBox>
                            <HeaderBox>
                                <FieldSpan w={200} align="left">{t('i18nAccount.hisId')}</FieldSpan>
                                <FieldSpan w={100} align="left">{t('i18nAccount.hisBlock')}</FieldSpan>
                                <FieldSpan w={140} align="left">{t('i18nAccount.hisTime')}</FieldSpan>
                                <FieldSpan w={60} align="left">{t('i18nAccount.hisActType')}</FieldSpan>
                                <FieldSpan w={450} align="left">{t('i18nAccount.hisData')}</FieldSpan>
                            </HeaderBox>
                            {totalNum === 0 &&
                                <SectionBox ul={true} margin="10px 24px 0px 24px">{t('i18nAccount.contractNoData')}</SectionBox>
                            }
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
                        </Fragment>}
                    {path === 'contractAbi' &&
                        (<JsonBox><ReactJson src={abiData.abi} /></JsonBox>)
                    }
                </Warpper>
            </Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ContractHistory));