import { PureComponent } from "react"
import { Warpper, Title, SubTitle, HeaderBox, TableBox, RowBox, FieldSpan, TableLink } from "../styles";
import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from 'redux';
import { modalActions } from "../../bus/modal/actions";
import { uiActions } from "../../bus/ui/actions";
import { selectLastBlockStats } from "../../bus/generalStats/selectors";
import { connect } from "react-redux";
import { selectTokens } from "../../bus/modal/selectors";
import { formatNumber } from "../../utils/fromatNumber";
interface Token {
    contact: string;
    createdAccounts: Array<string>;
    date: Date;
    maxSupply: number;
    name: string;
    numHolders: number;
    supply: number;
    symbol: string;
    
}
interface Props {
    tokens: Array<Token>;
    lastBlockStats: any;
    actions: {
        fetchTopAccounts: Function;
        toggleModal: Function;
        fetchTokens: Function;
    },
}
const mapStateToProps = createStructuredSelector({
    lastBlockStats: selectLastBlockStats(),
    tokens: selectTokens(),
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

class TokenList extends PureComponent<WithTranslation, Props>{
    constructor(props:any){
        super(props);
        props.actions.fetchTokens();
    }
    render() {
        const { t, tokens, lastBlockStats, actions:{toggleModal}}: any = this.props;
        if(lastBlockStats.price===undefined){
            return null;
        }
        return (
            <Warpper>
                <Title>{t('i18nModal.i18nTokenList.title')}</Title>
                <SubTitle>{t('i18nModal.i18nTokenList.subTitle')}    {tokens.length}</SubTitle>
                <HeaderBox>
                    <FieldSpan w={50} align="center">{t('i18nModal.i18nTokenList.sn')}</FieldSpan>
                    <FieldSpan w={100} align="left">{t('i18nModal.i18nTokenList.tokenName')}</FieldSpan>
                    <FieldSpan w={80} align="right">{t('i18nModal.i18nTokenList.numHolders')}</FieldSpan>
                    <FieldSpan w={80} align="right">{t('i18nModal.i18nTokenList.price')}</FieldSpan>
                    <FieldSpan w={150} align="right">{t('i18nModal.i18nTokenList.liquidity')}</FieldSpan>
                    <FieldSpan w={150} align="right">{t('i18nModal.i18nTokenList.liquidityValue')}</FieldSpan>
                </HeaderBox>
                <TableBox>
                    {
                        tokens.map((token: Token, i: number) => {
                            const price = token.name==='eosio.token'?lastBlockStats.price.price:0.1;
                            return (<RowBox key={i}>
                                <FieldSpan w={50} align="center">{i + 1}</FieldSpan>
                                <TableLink w={100} align="left" onClick={()=>toggleModal("account",token.name)}>{token.name}</TableLink>
                                <FieldSpan w={80} align="right">{token.numHolders}</FieldSpan>
                                <FieldSpan w={80} align="right">{price}</FieldSpan>
                                <FieldSpan w={150} align="right">{formatNumber(token.supply)} {token.symbol}</FieldSpan>
                                <FieldSpan w={150} align="right">${formatNumber((token.supply*price).toFixed(2))}</FieldSpan>
                            </RowBox>)
                        })
                    }
                </TableBox>
            </Warpper>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TokenList));