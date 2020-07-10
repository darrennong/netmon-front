import { PureComponent } from "react";
import { connect } from "react-redux";
import { withTranslation, WithTranslation } from "react-i18next";
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from "redux";
import { selectTopRichAccounts, selectTokens } from "../../bus/modal/selectors";
import { selectLastBlockStats } from "../../bus/generalStats/selectors";
import { modalActions } from "../../bus/modal/actions";
import { uiActions } from "../../bus/ui/actions";
import { Warpper, Title, SubTitle, HeaderBox, FieldSpan, TableBox, RowBox, TableLink } from "../styles";
import React from "react";
interface Account{
    balances: {POC:number};
    name: string;
    tokens: Array<string>;
}

interface Props extends WithTranslation{
    accountList: Array<Account>;
    lastBlockStats: {price:{price:number}};
    tokens: Array<any>;
    actions: {
        fetchTopAccounts: Function;
        fetchTokens: Function;
        toggleModal: Function;
    }
}

const mapStateToProps = createStructuredSelector({
    accountList: selectTopRichAccounts(),
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
class TopRichs extends PureComponent<Props>{
    constructor(props:any){
        super(props);
        const {actions:{fetchTopAccounts,fetchTokens}} = this.props;
        fetchTopAccounts();
        fetchTokens();
    }
    render(){
        const {t,accountList,lastBlockStats,tokens,actions:{toggleModal}} = this.props;
        if(lastBlockStats.price===undefined){
            return null;
        }
        const price = lastBlockStats.price.price;
        let sum = 1;
        for (const tk of tokens) {
          if (tk.name === 'eosio.token') {
            sum = tk.supply/100;
            break;
          }
        }
        return (
            <Warpper>
                <Title>{t('i18nTopRich.title')}</Title>
                <SubTitle>{t('i18nTopRich.subTitle')}</SubTitle>
                <HeaderBox>
                    <FieldSpan w={50} align="center">{t('i18nTopRich.ranks')}</FieldSpan>
                    <FieldSpan w={100} align="left">{t('i18nTopRich.name')}</FieldSpan>
                    <FieldSpan w={150} align="right">{t('i18nTopRich.totalValue')}</FieldSpan>
                    <FieldSpan w={150} align="right">{t('i18nTopRich.marketValue')}</FieldSpan>
                    <FieldSpan w={80} align="right" padding-right="18px">{t('i18nTopRich.percentage')}</FieldSpan>
                </HeaderBox>
                <TableBox>
                    {
                        accountList.map((account:Account, i: number) => {
                            return (<RowBox key={i}>
                                <FieldSpan w={50} align="center">{i+1}</FieldSpan>
                                <TableLink w={100} align="left" onClick={()=>toggleModal('account',account.name)}>{account.name}</TableLink>
                                <FieldSpan w={150} align="right">{account.balances.POC}POC</FieldSpan>
                                <FieldSpan w={150} align="right">{account.balances.POC*price}</FieldSpan>
                                <FieldSpan w={80} align="right" padding-right="18px">{(account.balances.POC/sum).toFixed(2)}%</FieldSpan>
                            </RowBox>)
                        })
                    }
                </TableBox>
            </Warpper>
        );
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withTranslation()(TopRichs));
