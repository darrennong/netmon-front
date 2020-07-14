// Core
import React, { PureComponent } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { createStructuredSelector } from 'reselect';
import store from 'store';

// Components
import FilterInput from '../FilterInput';

// Actions
import { uiActions } from '../../bus/ui/actions';
import { producerActions } from '../../bus/producers/actions';
import { modalActions } from '../../bus/modal/actions';

// Selectors
import { selectFilterInputValue } from '../../bus/producers/selectors';
import { selectLastBlockStats } from '../../bus/generalStats/selectors';
import { selectBlockInfo, selectTxIdInfo, selectAccountInfo } from '../../bus/modal/selectors';
import { selectSearchSucessState } from '../../bus/ui/selectors';

// Styles
import {
  Container,
  LogoImage,
  LangContainer,
  LangSelector,
  NavTab,
  TitleBox,
  LogoBox,
  Nav,
  ALabel,
  TabList,
  Trangle,
} from './styles';
// import { Intumentary } from '../SecondSection/styles';

import logourl from '../images/logo.png';
import { toast } from 'react-toastify';
interface Actions{
  setFilterInputValue: Function;
  toggleModal: Function;
  fetchBlockInfo: Function;
  fetchTransInfo:Function;
  fetchAccountInfo: Function;
  fetchTopAccount: Function;
}
interface Props extends WithTranslation{
  // t: Function;
  // i18n: any;
  // FilterInput
  filterInputValue: string;
  lastBlockStats: any;
  transactionInfo: any;
  accountInfo: any;
  searchSucessState: string;
  actions: Actions;
}
const mapStateToProps = createStructuredSelector({
  // modal filter
  filterInputValue: selectFilterInputValue(),
  lastBlockStats: selectLastBlockStats(),
  transactionInfo: selectTxIdInfo(),
  accountInfo: selectAccountInfo(),
  blockData: selectBlockInfo(),
  searchSucessState: selectSearchSucessState(),
});

const mapDispatchToProps = (dispach: Dispatch<AnyAction>) => ({
  actions: bindActionCreators(
    {
      setFilterInputValue: producerActions.setFilterInputValue,
      toggleModal: uiActions.toggleModal,
      fetchBlockInfo: modalActions.fetchBlockInfo,
      fetchTransInfo: modalActions.fetchTxInfo,
      fetchAccountInfo: modalActions.fetchAccountInfo,
      fetchTopAccount: modalActions.fetchTopAccounts,
    },
    dispach
  ),
});

class NavigationMenu extends PureComponent<Props> {
  constructor(props:any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error:any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error:any, errorInfo:any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  onSearch = (filterInputValue: string) => {
    const {
      lastBlockStats,t,
      actions: { toggleModal },
    } = this.props;
    const keyword = filterInputValue.trim();
    // const {lastSearch}:any = this.state;
    // if (keyword && lastSearch !== keyword) {
      if (keyword.match(/^[0-9]*$/)) {
        const id = parseInt(keyword, 10);
        if (id < lastBlockStats.head_block_num) {
          toggleModal('block',id);
        }else{
          toast(t('i18nNavigationMenu.searchError'));
        }
      } else if (keyword.match(/^[A-Fa-f0-9]{62,64}/)) {
        toggleModal('trans',keyword);
      } else if (keyword.match(/^[a-z.0-9]{2,42}/)) {
        toggleModal('account',keyword);
      }
      // this.setState({ lastSearch: keyword } as any);
    // }
  };

  toggleModalHandler = (modalName: any, data: any) => () => {
    const { toggleModal, setFilterInputValue, fetchTopAccount } = this.props.actions;
    toggleModal(modalName, data);
    setFilterInputValue('');
    fetchTopAccount();
  };

  changeLanguage = (e: { target: { value: any; }; }) => {
    const lng = e.target.value;
    store.set('potatoMonitor_currentLanguage', lng);
    this.props.i18n.changeLanguage(lng);
    this.setState({ lng } as any);
  };

  render() {
    const {lng,hasError}:any = this.state;
    if(hasError){
      return <div>出错了</div>;
    }
    const {
      t,
      filterInputValue,
      actions: { setFilterInputValue },
    } = this.props;
    const match = window.location.pathname.split('/')[1];
    return (
      <Container>
        <TitleBox>
          <LogoBox>
            <LogoImage src={logourl} alt="Logo" onClick={this.toggleModalHandler('index', '')} />
          </LogoBox>
          <Nav>
            <TabList>
              <NavTab isSelected={match === 'index'}>
                <ALabel onClick={this.toggleModalHandler('index', '')}>{t('i18nNavigationMenu.home')}</ALabel>
              </NavTab>
              <NavTab isSelected={match === 'top50block' || match === 'block'}>
                <ALabel onClick={this.toggleModalHandler('top50block', '')}>{t('i18nNavigationMenu.block')}</ALabel>
              </NavTab>
              <NavTab isSelected={match === 'top50Transaction' || match === 'trans'}>
                <ALabel onClick={this.toggleModalHandler('top50Transaction', '')}>
                  {t('i18nNavigationMenu.trans')}
                </ALabel>
              </NavTab>
              <NavTab isSelected={match === 'account' || match === 'toprich'}>
                <ALabel onClick={this.toggleModalHandler('toprich', '')}>{t('i18nNavigationMenu.account')}</ALabel>
              </NavTab>
              <NavTab isSelected={match === 'tokens' || match === 'tokenInfo'}>
                <ALabel onClick={this.toggleModalHandler('tokens', '')}>{t('i18nNavigationMenu.token')}</ALabel>
              </NavTab>
              <NavTab isSelected={false}>
                <ALabel href="https://www.potatocoin.com/" target="zzb">
                  {t('i18nNavigationMenu.wallet')}
                </ALabel>
              </NavTab>
            </TabList>
          </Nav>
          <FilterInput
            t={t}
            filterInputValue={filterInputValue}
            setFilterInputValue={setFilterInputValue}
            onSearch={this.onSearch}
          />
          <LangSelector onChange={this.changeLanguage} value={lng}>
            <option id="opt1" value="zh-cn">
              中文(简体)
            </option>
            <option id="opt2" value="en">
              English
            </option>
            <option id="opt3" value="zh-hk">
              中文(繁體)
            </option>
          </LangSelector>
          <LangContainer>
            <Trangle>
              <path fill="#fff" d="m9,0l-5,5l-4.5,-5l9,0l0,0l0.5,0z" />
            </Trangle>
          </LangContainer>
        </TitleBox>
      </Container>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NavigationMenu));
