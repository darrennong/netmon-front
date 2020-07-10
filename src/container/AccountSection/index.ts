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
    account_name: string;
    balance: string;
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
