/* eslint-disable prefer-destructuring */
// Core
import React, { PureComponent, Fragment, } from 'react';
import { MainContainer, ContentArea } from './styles';
import { Switch, Route, Router } from 'react-router-dom';
import { history } from '../../init/middleware';
import NavigationMenu from '../../components/NavigationMenu';
import Footer from '../../components/Footer';
import FirstPage from '../FirstPage';
import Top50Blocks from '../BlockSection/Top50Blocks';
import Top50Transactions from '../TransSection/Top50Transactions';
import TopRichs from '../AccountSection/TopRichs';
import TokenList from '../TokenSection/TokenList';
import BlockSection from '../BlockSection/BlockSection';
import AccountSection from '../AccountSection/AccountSection';
import ContractHistory from '../AccountSection/ContractHistory';
import TransactionInfo from '../TransSection/TransactionInfo';
import TokenInfo from '../TokenSection/TokenInfo';
import NotFound from '../NotFound';
// Components

export default class HomePage extends PureComponent {
    render() {
        return (
            <Fragment>
                <NavigationMenu />
                <MainContainer>
                    <ContentArea>
                        <Router history={history}>
                            <Switch>
                                <Route path="/index/" component={FirstPage} />
                                <Route path="/top50block/" component={Top50Blocks} />
                                <Route path="/top50Transaction/" component={Top50Transactions} />
                                <Route path="/toprich/" component={TopRichs} />
                                <Route path="/tokens/" component={TokenList} />
                                <Route path="/account/:id" component={AccountSection} />
                                <Route path="/block/:id" component={BlockSection} />
                                <Route path="/contractAbi/:id" component={ContractHistory}/>
                                <Route path="/contractHistory/:id" component={ContractHistory}/>
                                <Route path="/contractHistory/:id/:action/:page" component={ContractHistory}/>
                                <Route path="/trans/:id" component={TransactionInfo} />
                                <Route path="/tokenInfo/:id" component={TokenInfo} />
                                <Route component={NotFound} />
                            </Switch>
                        </Router>
                    </ContentArea>
                </MainContainer>
                <Footer />
            </Fragment>
        );
    }
}
