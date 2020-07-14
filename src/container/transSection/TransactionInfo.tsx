import { PureComponent, Fragment } from "react";
import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { Warpper, SectionBox, KeyLable, ValueField, MainValueField, HalfBox, SectionRow, Link, TitleLable, HeaderBox, FieldSpan, TableBox, RowBox, TableLink } from "../styles";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTxIdInfo } from "../../bus/modal/selectors";
import { selectLastBlockStats } from "../../bus/generalStats/selectors";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { modalActions } from "../../bus/modal/actions";
import { uiActions } from "../../bus/ui/actions";
import { convertUtcToLocal } from "../../utils/dateUtils";
import { formatDuring, formatBytes } from "../../utils/fromatNumber";
import { ParseAction } from "../../utils/stringHandler";
import BlockState from "../../components/BlockState";
interface Transaction {
    txid: string;
    description: string;
    actionCnt: number;
    cpuUsage: number;
    netUsage: number;
    expired: Date;
    account: string;
    action: string;
    actions: Array<{ name: string; auth: Array<string>; data: any; }>;
    block: number;
    date?: Date;
    createdAt?: Date;
    mentionedAccounts: Array<string>;
    msgObject: {
        c1: number;
        c2: string;
        c3: string;
        c4: string;
        c5: string;
        c6: string;
    };
    to: string;
    txStatus: string;
}
interface Props extends WithTranslation {
    txInfo: Transaction;
    lastStats: { head_block_num: number; };
    match: any;
    actions: {
        fetchTransInfo: Function;
        toggleModal: Function;
    },
}
const mapStateToProps = createStructuredSelector({
    txInfo: selectTxIdInfo(),
    lastStats: selectLastBlockStats(),
});

const mapDispatchToProps = (dispach: Dispatch<AnyAction>) => ({
    actions: bindActionCreators(
        {
            fetchBlockInfo: modalActions.fetchBlockInfo,
            fetchTransInfo: modalActions.fetchTxInfo,
            fetchAccountInfo: modalActions.fetchAccountInfo,
            toggleModal: uiActions.toggleModal,
        },
        dispach
    ),
});
class TransactionInfo extends PureComponent<Props>{
    constructor(props: Readonly<Props>) {
        super(props);
        const txid = props.match.params.id;
        props.actions.fetchTransInfo(txid);
        this.state = { txid } as any;
    }
    componentDidUpdate() {
        const { match, actions: { fetchTransInfo } } = this.props;
        const txid = match.params.id;
        if ((this.state as any).txid !== txid) {
            fetchTransInfo(txid);
            this.setState({ txid } as any);
        }
    }

    render() {
        const { t, txInfo, actions: { toggleModal } } = this.props;
        if (!txInfo) return null;
        const { txid }: any = this.state;
        return (
            <Fragment>
                <Warpper>
                    <SectionBox ul={true} margin="10px 24px 0 24px">
                        <KeyLable>{t('i18nTxinfo.txHash')}</KeyLable>
                        <MainValueField>{txid}</MainValueField>
                    </SectionBox>
                    <SectionBox ul={true} rows={3} margin="0 24px">
                        <HalfBox>
                            <SectionRow>
                                <KeyLable>{t('i18nTxinfo.status')}</KeyLable>
                                <ValueField><BlockState blockNum={txInfo.block}></BlockState></ValueField>
                            </SectionRow>
                            <SectionRow>
                                <KeyLable>{t('i18nTxinfo.blockNum')}</KeyLable>
                                <Link onClick={()=>{toggleModal('block',txInfo.block)}}>{txInfo.block}</Link>
                            </SectionRow>
                            <SectionRow>
                                <KeyLable>{t('i18nTxinfo.blockDate')}</KeyLable>
                                <ValueField>{convertUtcToLocal(txInfo.date || txInfo.createdAt)}</ValueField>
                            </SectionRow>
                        </HalfBox>
                        <HalfBox>
                            <SectionRow />
                            <SectionRow>
                                <KeyLable>{t('i18nTxinfo.cpuUsage')}</KeyLable>
                                <ValueField>{formatDuring(txInfo.cpuUsage)}</ValueField>
                            </SectionRow>
                            <SectionRow>
                                <KeyLable>{t('i18nTxinfo.netUsage')}</KeyLable>
                                <ValueField>{formatBytes(txInfo.netUsage)}</ValueField>
                            </SectionRow>
                        </HalfBox>
                    </SectionBox>
                    <SectionBox margin="0 24px 10px 24px">
                        <KeyLable>{t('i18nTxinfo.txExpird')}</KeyLable>
                        <ValueField>{convertUtcToLocal(txInfo.expired)}</ValueField>
                    </SectionBox>
                </Warpper>
                <Warpper>
                    <SectionBox margin="10px 24px 0 24px">
                        <TitleLable>{t('i18nTxinfo.actions')}</TitleLable>
                    </SectionBox>
                    <HeaderBox>
                        <FieldSpan w={150} align="left">{t('i18nTxinfo.name')}</FieldSpan>
                        <FieldSpan w={150} align="left">{t('i18nTxinfo.author')}</FieldSpan>
                        <FieldSpan w={300} align="left">{t('i18nTxinfo.data')}</FieldSpan>
                    </HeaderBox>
                    <TableBox>
                        {txInfo.actions && txInfo.actions.map((act, i: number) =>
                            <RowBox key={i}>
                                <FieldSpan w={150} align="left">{act.name}</FieldSpan>
                                <FieldSpan w={150} align="left">{act.auth.map((name: string, i: number) =>{
                                    const n = name.split('@')[0];
                                    return (<Link onClick={()=>toggleModal('account', n)}>{name} </Link>)})}
                                </FieldSpan>
                                <FieldSpan w={300} align="left">{ParseAction(act, toggleModal)}</FieldSpan>
                            </RowBox>
                        )
                        }
                    </TableBox>
                </Warpper>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TransactionInfo));