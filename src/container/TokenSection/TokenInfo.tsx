import { PureComponent, Fragment } from "react"
import { Warpper, Title, HeaderBox, TableBox, RowBox, FieldSpan, TableLink, SectionBox, MainValueField, HalfBox, SectionRow, KeyLable, ValueField, Link } from "../styles";
import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from 'redux';
import { modalActions } from "../../bus/modal/actions";
import { uiActions } from "../../bus/ui/actions";
import { selectLastBlockStats } from "../../bus/generalStats/selectors";
import { connect } from "react-redux";
import { selectTokens, selectTopRichAccounts } from "../../bus/modal/selectors";
import { formatNumber } from "../../utils/fromatNumber";
import { Token } from ".";
import { AccountInfo } from "../AccountSection";
interface Props extends WithTranslation {
    tokens: Array<Token>;
    lastBlockStats: any;
    accountList: Array<AccountInfo>;
    match: any;
    actions: {
        fetchTopAccounts: Function;
        toggleModal: Function;
        fetchTokens: Function;
    },
}
interface State{
    token:Token;
    price:number;
}
const mapStateToProps = createStructuredSelector({
    lastBlockStats: selectLastBlockStats(),
    tokens: selectTokens(),
    accountList: selectTopRichAccounts(),
});

const mapDispatchToProps = (dispach: any) => ({
    actions: bindActionCreators(
        {
            fetchTopAccounts: modalActions.fetchTopAccounts,
            fetchTokens: modalActions.fetchTokensInfo,
            toggleModal: uiActions.toggleModal,
        },
        dispach
    ),
});

class TokenInfo extends PureComponent<Props>{
    constructor(props: any) {
        super(props);
        props.actions.fetchTokens();
        this.state = {price:0.1};
    }
    componentDidUpdate() {
        const { tokens, match,lastBlockStats, actions: { fetchTopAccounts } } = this.props;
        const tokenId = match.params.id;
        let token;
        for (const tk of tokens) {
            if (tk.name === tokenId || tk.symbol === tokenId) {
                token = tk;
                break;
            }
        }
        if (!token) return;
        const price = lastBlockStats.price&&lastBlockStats.price.price;
        if(price){
            if(token.symbol==="POC"){
                token.price = price;
            }else{
                token.price = 0.1;
            }
            if ((this.state as State).token !== token) {
                fetchTopAccounts(token.symbol);
                this.setState({ token,price });
            }
        }
    }
    render() {
        if(!this.state) return null;
        const { t, accountList, lastBlockStats, actions: { toggleModal } }: any = this.props;
        const { token,price } = this.state as State;
        if(!token) return null;
        return (
            <Fragment>
                <Warpper>
                    <SectionBox ul={true} margin="10px 24px 0 24px">
                        <MainValueField>{token.name}</MainValueField>
                    </SectionBox>
                    <SectionBox rows={3} margin="0 24px 10px 24px">
                            <HalfBox>
                                <SectionRow>
                                    <KeyLable>{t('i18nModal.i18nTokenList.creater')}</KeyLable>
                                    <ValueField>{token.createdAccounts.map((name,i)=>
                                        <Link key={i} onClick={()=>toggleModal('account',name)}>{name} </Link>
                                    )}</ValueField>
                                </SectionRow>
                                <SectionRow>
                                    <KeyLable>{t('i18nModal.i18nTokenList.price')}</KeyLable>
                                    <ValueField>{token.price.toFixed(2)}</ValueField>
                                </SectionRow>
                                <SectionRow>
                                    <KeyLable>{t('i18nModal.i18nTokenList.numHolders')}</KeyLable>
                                    <ValueField>{token.numHolders}</ValueField>
                                </SectionRow>
                            </HalfBox>
                            <HalfBox>
                                <SectionRow>
                                    <KeyLable>{t('i18nModal.i18nTokenList.liquidity')}</KeyLable>
                                    <ValueField>{token.supply.toLocaleString('zh', {useGrouping:true })}</ValueField>
                                </SectionRow>
                                <SectionRow>
                                    <KeyLable>{t('i18nModal.i18nTokenList.maxSupply')}</KeyLable>
                                    <ValueField>{token.maxSupply.toLocaleString('zh', {useGrouping:true })}</ValueField>
                                </SectionRow><SectionRow>
                                    <KeyLable>{t('i18nModal.i18nTokenList.liquidityValue')}</KeyLable>
                                    <ValueField>$ {(token.supply * token.price).toLocaleString('zh', {minimumFractionDigits:2, maximumFractionDigits: 2, useGrouping:true })}</ValueField>
                                </SectionRow>
                            </HalfBox>
                        </SectionBox>
                </Warpper>
                <Warpper>
                    <Title>{t('i18nTopRich.title')}</Title>
                    <HeaderBox>
                        <FieldSpan w={50} align="center">{t('i18nTopRich.ranks')}</FieldSpan>
                        <FieldSpan w={100} align="left">{t('i18nTopRich.name')}</FieldSpan>
                        <FieldSpan w={150} align="right">{t('i18nTopRich.totalValue')}</FieldSpan>
                        <FieldSpan w={150} align="right">{t('i18nTopRich.marketValue')}</FieldSpan>
                        <FieldSpan w={80} align="right" padding-right="18px">{t('i18nTopRich.percentage')}</FieldSpan>
                    </HeaderBox>
                    <TableBox>
                        {
                            accountList.map((account: AccountInfo, i: number) => {
                                const balance = account.balances[token.symbol];
                                console.log(account);
                                if(balance===undefined) return null;
                                return (<RowBox key={i}>
                                    <FieldSpan w={50} align="center">{i + 1}</FieldSpan>
                                    <TableLink w={100} align="left" onClick={() => toggleModal('account', account.name)}>{account.name}</TableLink>
                                    <FieldSpan w={150} align="right">{balance.toLocaleString('zh', { minimumFractionDigits:4,maximumFractionDigits: 4, useGrouping:true })}</FieldSpan>
                                    <FieldSpan w={150} align="right">{(balance * price).toLocaleString('zh', { maximumFractionDigits: 2, useGrouping:true })}</FieldSpan>
                                    <FieldSpan w={80} align="right" padding-right="18px">{(balance / token.supply).toLocaleString('zh', {style: 'percent',minimumFractionDigits:2, maximumFractionDigits: 2, useGrouping:true })}</FieldSpan>
                                </RowBox>)
                            })
                        }
                    </TableBox>
                </Warpper>
            </Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TokenInfo));