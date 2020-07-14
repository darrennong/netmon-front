import { RedSpan, GreenSpan, DataSpan } from "./styles";
import React from "react";
import { nameHandler, stripHtml } from "../../utils/stringHandler";
import { Link } from "../styles";

export interface Producer {
    blackListHash?: string;
    blocksLeftInLastLoop: number;
    checkedData: { produced: number; tx_count: number };
    checkedData2: { produced: number; tx_count: number; totalMissedBlocks: number; blocksLeftInLastLoop: number; }
    chipcounter_count: number;
    endpoints: []
    expectedIncomeData: {
        producedTimesForDay: number;
        voteRewardsForDay: number;
        expectedBlockRewardsForDay: number;
        expectedRewardsOnThisPosition: number;
        totalBlockUnpaidRewards: number;
    }
    isActive: boolean;
    isSiteAvailable: boolean;
    lastLoopHeadBlockNumber: number;
    last_chipcounter_update: Date;
    last_claim_time: number;
    location: string;
    missedBlocks: number;
    missedBlocksForDay: number;
    missedBlocksForRound: number;
    missedBlocksTotal: number;
    name: string;
    nodes: Array<any>;
    produced_per_day: number;
    producer_key: string;
    rewards_per_day: number;
}
export interface AccountInfo {
    name?: string;
    account_name?: string;
    balance: string;
    balances?: any;
    core_liquid_balance: string;
    cpu_limit: { used: number; available: string; max: string; }
    cpu_weight: string;
    created: Date;
    head_block_num: number;
    head_block_time: Date;
    last_code_update: Date;
    net_limit: { used: number; available: string; max: string; }
    net_weight: string;
    permissions: Array<any>;
    privileged: boolean;
    producer?: Producer;
    ram_quota: number;
    ram_usage: number;
    refund_request?: any;
    rex_info?: any;
    self_delegated_bandwidth: { from: string; to: string, net_weight: string, cpu_weight: string };
    tokenData: any;
    total_resources: { owner: string; net_weight: string; cpu_weight: string; ram_bytes: number };
    voter_info?: {
        flags1: number;
        is_proxy: boolean;
        last_vote_weight: string | number;
        owner: string;
        producers: Array<string>;
        proxied_vote_weight: string | number;
        proxy: string;
        reserved2: number;
        reserved3: string;
        staked: string;
    }
    unstaking?: string | number;
}

export interface Transaction {
    txid: string;
    description: string;
    actionCnt: number;
    cpuUsage: number;
    netUsage: number;
    expired: Date;
}

export function getAction(accountId: string, msg: any) {
    const sender = msg.c4.split('>')[0];
    const receiver = msg.c5;
    switch (msg.c2) {
        case 'transfer':
        case 'issue':
            if (accountId === sender) {
                return <RedSpan>发送代币</RedSpan>;
            }
            return <GreenSpan>接收代币</GreenSpan>;
        case 'voteproducer':
            return <RedSpan>给节点投票</RedSpan>;
        case 'buyram':
        case 'buyrambytes':
            if (accountId === receiver) {
                return <GreenSpan>购买内存</GreenSpan>;
            }
            return <RedSpan>购买内存</RedSpan>;
        case 'sellram':
            return <GreenSpan>出售内存</GreenSpan>;
        case 'delegatebw':
            return <RedSpan>抵押带宽</RedSpan>;
        case 'newaccount':
            return <GreenSpan>新建账户</GreenSpan>;
        case 'regproducer':
            return <GreenSpan>注册矿工</GreenSpan>;
        case 'create':
            return <RedSpan>创建代币</RedSpan>;
        case 'setabi':
            return <GreenSpan>部署合约</GreenSpan>;
        case 'setcode':
            return <GreenSpan>部署合约</GreenSpan>;
        case 'init':
            return <RedSpan>初始化</RedSpan>;
        default:
            return <RedSpan>{msg.c2}</RedSpan>;
    }
};

export function getDescript(item: any, toggleModal: Function) {
    switch (item.msgObject.c2) {
        case 'transfer':
            return (
                <DataSpan>
                    <span>{nameHandler(stripHtml(item.msgObject.c4), toggleModal)}</span>
                    {item.msgObject.c5}
                    <span>{item.msgObject.c6}</span>
                </DataSpan>
            );
        case 'issue':
            const sender = item.msgObject.c3.split('@')[0];
            return (
                <DataSpan>
                    <span>
                        <Link onClick={() => toggleModal('account', sender)}>{sender}</Link>
                        {`>`}
                        <Link onClick={() => toggleModal('account', item.msgObject.c4)}>{item.msgObject.c4}</Link>
                        {item.msgObject.c5}
                    </span>
                    <span>{item.msgObject.c6}</span>
                </DataSpan>
            );
        case 'buyram':
            return (
                <DataSpan>
                    <span>
                    <Link onClick={() => toggleModal('account', item.actions[0].data.payer)}>
                        {item.actions[0].data.payer}
                    </Link>
                    {`>`}
                    <Link onClick={() => toggleModal('account', item.actions[0].data.receiver)}>
                        {item.actions[0].data.receiver}
                    </Link>
                    </span>
                    <span>{item.actions[0].data.quant}</span>
                </DataSpan>
            );
        case `sellram`:
            return <span>{item.msgObject.c4}</span>;
        case `voteproducer`: {
            return (
                <DataSpan>
                    <span>
                    {item.actions[0].data.producers.map((name: string) => (
                        <Link key={name} onClick={() => toggleModal('account', name)}>{name} </Link>
                    ))}
                    </span>
                    <span>{item.msgObject.c6}</span>
                </DataSpan>
            );
        }
        case 'create':
            const issuer = item.actions[0].data.issuer;
            return (
                <DataSpan>
                    <Link onClick={() => toggleModal('account', issuer)}>{issuer}</Link>
                    {`:`}
                    {item.actions[0].data.maximum_supply}
                </DataSpan>
            );
        default:
            return <span>{item.description}</span>;
    }
};