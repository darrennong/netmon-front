// Core
import React, { PureComponent } from 'react';
import {
    THIcon,
    ProduceTitle,
    TableContent,
    RowData,
    YellowSpan,
    GreenSpan,
    TabRow,
    TabSpan,
    SeriTxt,
} from './styles';

// import EosPrice from './EosPrice';

import icon from './icons/producers.png';
import PageNav from '../../components/PageNav';
import { HeaderBox, FieldSpan, TableLink, Warpper } from '../styles';

export interface Producer {
    name: string;
    totalVotes: number;
    votesPercentage: number;
    rewards_per_day: number;
    specialNodeEndpoint: { host: string, port: number, use: boolean };
    producedTimestamp: any;
    chipcounter_count: number;
}

interface Props {
    t: Function;
    producers: Array<Producer>;
    toggleModal: Function;
    blockStats: any;
}

export default class Producers extends PureComponent<Props> {

    constructor(props: any) {
        super(props);
        this.state = { page: 1 ,showCurrentRound: true};
    }

    getStatus(producer: Producer,idx:number){
        const { blockStats } = this.props;
        if (blockStats.head_block_producer === producer.name) return <YellowSpan>出块中</YellowSpan>;
        if (blockStats.next_producer === producer.name) return <YellowSpan>准备出块</YellowSpan>;
        if (idx<21) {
            return <GreenSpan>已入选</GreenSpan>;
        }
        return <GreenSpan>备选</GreenSpan>;
    };

    pageTo=(page: number)=>{
        this.setState({ page });
    };

    showCurrentRound(showCurrentRound:boolean){
        this.setState({showCurrentRound});
    }

    render() {
        const {
            t,
            producers,
            toggleModal,
        }: Props = this.props;
        const { page,showCurrentRound }: any = this.state;
        const totalProducer = producers.length;
        const len = showCurrentRound?Math.min(21,totalProducer):totalProducer;
        const tp = Math.ceil(len / 10) || 1;
        let i = (page - 1) * 10;
        const end = Math.min(i + 10, len);
        const items = [];
        for (; i < end; i++) {
            const producer = producers[i];
            items.push(
                <RowData key={i}>
                    <FieldSpan w={50} align="center"><SeriTxt>{i + 1}</SeriTxt></FieldSpan>
                    <TableLink w={100} align="left" onClick={() => { toggleModal('account', producer.name) }}>{producer.name}</TableLink>
                    <FieldSpan w={80} align="left">{this.getStatus(producer,i)}</FieldSpan>
                    <FieldSpan w={80} align="left">{t('i18nFirstSection.i18nProducers.localNet')}</FieldSpan>
                    <FieldSpan w={80} align="right">{producer.votesPercentage.toFixed(2)}%</FieldSpan>
                    <FieldSpan w={80} align="right">{producer.chipcounter_count}</FieldSpan>
                    <FieldSpan w={150} align="right">{producer.totalVotes}</FieldSpan>
                    <FieldSpan w={100} align="right">{producer.rewards_per_day.toFixed(4)}</FieldSpan>
                </RowData>
            );
        }
        return (
            <Warpper>
                <ProduceTitle>
                    <THIcon src={icon} />
                  生产节点
                  {totalProducer}个
              </ProduceTitle>
              <TabRow>
                  <TabSpan selected={showCurrentRound} onClick={()=>this.showCurrentRound(true)}>本轮节点</TabSpan>
                  <TabSpan selected={!showCurrentRound} onClick={()=>this.showCurrentRound(false)}>全部节点</TabSpan>
              </TabRow>
                <HeaderBox>
                    <FieldSpan w={50} align="center">{t('i18nFirstSection.i18nProducers.sn')}</FieldSpan>
                    <FieldSpan w={100} align="left">{t('i18nFirstSection.i18nProducers.name')}</FieldSpan>
                    <FieldSpan w={80} align="left">{t('i18nFirstSection.i18nProducers.status')}</FieldSpan>
                    <FieldSpan w={80} align="left">{t('i18nFirstSection.i18nProducers.location')}</FieldSpan>
                    <FieldSpan w={80} align="right">{t('i18nFirstSection.i18nProducers.votesPercent')}</FieldSpan>
                    <FieldSpan w={80} align="right">{t('i18nFirstSection.i18nProducers.chipCount')}</FieldSpan>
                    <FieldSpan w={150} align="right">{t('i18nFirstSection.i18nProducers.totaoVotes')}</FieldSpan>
                    <FieldSpan w={100} align="right">{t('i18nFirstSection.i18nProducers.rewardsPreDay')}</FieldSpan>
                </HeaderBox>
                <TableContent>{items}</TableContent>
                <ProduceTitle><PageNav totalPages={tp} page={page} pageTo={this.pageTo} /></ProduceTitle>
            </Warpper>
        );
    }
}
