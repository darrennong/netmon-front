export default Object.freeze({
  translations: {
    // <NavigationMenu />
    // <Modal/>
    i18nModal: {
      // <AccountInfo />
      i18nAccountInfo: {
        // <Header />
        title: 'ACCOUNT INFO',
        placeholder: 'Account',
        getButton: 'Extract',
        getAccountsTransactionsHistory: 'Get account transaction records',
        historyLink: 'History',
        // <Main />
        balance: 'Balance',
        tokens: 'Token',
        created: 'Create',
        lastCodeUpdate: 'Last code update',
        activeKey: 'Active Key',
        ownerKey: 'Owner Key',
        ramUsed: 'RAM used',
        bytes: 'Bytes',
        quota: 'Total amount',
        // 2 Blocks
        netBandwidth: 'NET bandwidth',
        cpuBandwidth: 'CPU bandwidth',
        staked: 'Mortgage',
        delegated: 'Delegated',
        current: 'current',
        available: 'Available',
        max: 'Maximum value',
        time: 'time',
        // Last block
        voterInfo: 'Voting information',
        proxy: 'Proxy',
        producers: 'producer',
        stakedLB: 'Mortgage',
        lastVoteWeight: 'Last voting weight',
        proxieVoteWeight: 'Proxy voting weight',
        isProxy: 'Whether to proxy',
        deferredTrxId: 'Trx id for deferred confirmation',
        lastUnstakeTime: 'Last time to cancel mortgage',
        unstaking: 'Cancel mortgage',
      },
      // <AccountHistory />
      i18nAccountHistory: {
        // <Header />
        title: 'Account History',
        placeholder: 'Account name',
        getButton: 'Extract',
        GetInformationAboutAccountAndBalance: 'Get account and balance information',
        accountInfoLink: 'Account information',
        // <Main />
        // Pagination
        prev: 'Previous page',
        page: 'Page count',
        next: 'Next',
        // Data Block
        block: 'Block',
        txId: 'TXid',
        date: 'Date',
        action: 'Action',
        from: 'From',
        info: 'Information',
      },
      i18nAccountTop: {
        title: 'The Rich List',
        subTitle: 'Top 100 total assets',
        sort: 'Ranking',
        name: 'Account name',
        amount: 'Total assets',
        marketValue: 'Market value (USD)',
        percentage: 'Account ratio',
      },
      // <Transactions />
      i18nTransactions: {
        // <Header />
        title: 'Transaction',
        placeholder: 'TX id',
        getButton: 'Extract',
        findTransaction: 'Query a transaction',
        // <Main />
        block: 'Block',
        txId: 'TXid',
        date: 'Date',
        action: 'Action',
        from: 'From',
        info: 'Information',
      },
      // <BlockInfo />
      i18nBlockInfo: {
        title: 'BLOCK INFO',
        getButton: 'Extract',
      },
      i18nTokenList: {
        title: 'Token List',
        subTitle: 'Current number of tokens:',
        sn: 'Serial number',
        creater: 'Create account',
        tokenName: 'Token name',
        numHolders: 'Number of holders',
        price: 'Price (USD)',
        maxSupply: 'Maximum supply',
        liquidity: 'Circulation',
        liquidityValue: 'Circulation market value',
      },
      // <Api />
      i18nApi: {
        title: 'API',
        getButton: 'Extract',
      },
      // <P2P />
      i18nP2P: {
        title: 'P2P',
      },
      // <Legend />
      i18nLegend: {
        title: 'Description',
        // About block
        about: 'About',
        content: [
          'All information comes from the public node, the block node is usually hidden',
          'Potato Network Monitor is a tool to check Potato public nodes and display general information',
          'Display all registered producers, extract information from the node\'s bp.json file',
        ],
        tps: ['TPS', 'Transactions per second'],
        aps: ['APS', 'Actions per second'],
        // Colors legend block
        colorsLegend: 'Color description',
        producingRightNow: 'In production',
        halfOrMore: 'Half or more public endpoints are not responding',
        zeroOfpublic: '0 public endpoints are running',
        notProducing: 'Do not produce blocks',
        versionInformation: `Version information is obtained from public node query. Block-producing nodes are usually hidden. Public nodes that "do not show versions" may have reasonable reasons, such as avoiding known vulnerabilities, but these are rare. `,
        unsynced: 'Unsynchronized',
        thisDoesNot: `This does not necessarily mean that there is a fork or a difference. It may be that the nodes are resynchronized and will be synchronized soon`,
        bps: `The nodes marked in gray have errors, or the bp.json file is missing. We will do a periodic check. But we only check the top 60`,
        moreinfo: 'More information',
        // Ping color explanation block
        pingColorExplanation: 'PING color description',
        greyName: 'grey',
        greyPing: 'Ping grey: the latest status has been obtained',
        blackPing: 'Ping black: re-query status',
        // Notes
        note1: 'Note 1',
        ManyBp: `Many nodes use load balancing, so the information returned may be different. `,
        note2: 'Note 2',
        wePull: 'We update the block node list with "clpc system list procedures" every few seconds. ',
      },
      // <Vote />
      i18nVote: {
        title: 'VOTE',
        // Main Text
        byCompletingThisAction: 'Agree',
        eosConstitution: 'Potato Constitution',
        theIntentOf: `The "vote block producer" function is to cast valid votes for more than 30 node candidates. `,
        iAmEitherThe: `I am the actual owner of the voting token, or I have evidence that I have been authorized to vote on behalf of the beneficial owner. `,
        iStipulateThat: `I promise, I do not have, and will not accept anything of value in exchange for these votes, otherwise I will be subject to confiscation of tokens or other penalties. `,
        iStipulateThatIAmNot: `I promise that I will not use any automatic voting, repeated voting or brushing system. Doing so violated the contract. .`,
        thisFeatureWas: `This feature was created to help vote. It creates a crpc command for a trusted block node
        Use `,
        ourclpcWrapper: 'our clpc interface (only configure port and address),',
        selectedProducers: 'Selected producers',
        // Input
        placeholder: 'Your account name...',
        // Button
        installScatter: 'Install Scatter',
        vote: 'Vote',
        initScatter: 'Initialize Scatter',
        // Footer
        voteProducerProds: './clpc.sh system voteproducer prods',
        checkAtLeastOne: 'Check at least one manufacturer (select box)',
      },
      // <BpJson />
      i18nBpJson: {
        title: 'bp.json',
      },
      // <ErrorMessage />
      i18nErrorMessage: {
        title: 'Error message',
      },
      // <RamPrice />
      i18nRamPrice: {
        title: 'POC RAM price',
      },
      // <LiveTps />
      i18nLiveTps: {
        title: 'TPS Live',
      },
    },
    i18nNavigationMenu: {
      home: 'Home',
      block: 'Block',
      trans: 'transaction',
      wallet: 'Wallet',
      account: 'Account',
      token: 'Token',
      searchTips: 'Search transactions, blocks, accounts, contracts',
    },
    // <Top50Trans />
    i18Top50Section: {
      title: 'Transaction List',
      transCnt: 'Total number of transactions',
    },
    // <FirstSection />
    i18nFirstSection: {
      // <CurrentBlockInfo />
      i18nCurrentBlockInfo: {
        currentBlock: 'Latest block',
        title: 'Current block information',
        irreversibleBlock: 'Confirmed Block',
        producedBy: 'The block producer is',
        next: 'Next',
      },
      // <GeneralInfo />
      i18nGeneralInfo: {
        title: 'General Information',
        stakedTotal: 'Total stake',
        activatedStake: 'Number of available mortgages',
        tps: 'Current/Highest TPS',
        aps: 'Current/Highest APS',
        totalAccounts: 'Number of accounts',
        connectedUsers: 'Number of connected users',
        ramUsed: 'RAM (memory) in the chain is occupied/unoccupied',
        totalUnpaidBlocks: 'Unpaid Blocks',
        eosioRamFee: 'POC ram fee',
        eosioSaving: 'POC saving',
      },
      i18nPocPrice: {
        title: 'Current price',
      },
      // <UnregisteredBps />
      i18nUnregisteredBps: {
        title: 'Unregistered BPs in last 24 hours',
      },
      // <Transactions />
      i18nTransactions: {
        title: 'Transaction List',
        transCnt: 'Total number of transactions',
        actionCnt: 'Operation number',
        id: 'Transaction ID',
        cupUsage: 'CPU usage',
        netUsage: 'NET usage',
        expired: 'Expiry time',
        total: 'All',
        transactions: 'Transactions',
        blockNumber: 'Synced up to block #',
        transactionsWillAppear: 'Display transaction information after synchronization',
      },
      i18nBlocks: {
        title: 'Block List',
        headBlockNum: 'Currently produced block',
        id: 'Block',
        headTitle: 'Latest block',
        transNum: 'Number of transactions',
        optionNum: 'Operand',
        producer: 'Producer',
        timeStamp: 'Generate time',
      },
      i18nProducers: {
        localNet: 'Local network',
        sn: 'Serial number',
        name: 'Name',
        status: 'Status',
        location: 'Location',
        votesPercent: 'Vote rate',
        chipCount: 'Online round number',
        totaoVotes: 'Total votes',
        rewardsPreDay: 'Daily rewards',
        thisChips: 'This round of nodes',
        allNodes: 'All nodes',
      },
    },
    i18nAccount: {
      account: "Account",
      copy: "Copy",
      totalBalance: "Total Assets",
      liquid: "Available balance",
      unstaking: "Redemption",
      cpuStaking: "CPU Mortgage",
      netStaking: "NET mortgage",
      otherStaking: "Other people mortgage you",
      producerTitle: "Node information",
      producerSubTitle: "This account has been registered as a block production node",
      producerStat: "Status",
      producerVoteRate: "Vote Rate",
      producerVotes: "Total votes",
      producerLocation: "Location",
      producerReward: "Daily Reward",
      contractTitle: "Smart Contract",
      contractSubTitle: "Smart contract deployed in this account",
      contractViewHistory: "View contract call history",
      contractViewAbi: "View contract ABI",
      returnAccountInfo: "Return account information",
      contractTransInfo: "Transaction Information",
      contractAbi: "ABI",
      contableId: "Transaction ID",
      contableBlock: "Block",
      contableTime: "Call time",
      contableInterface: "Call Interface",
      contableDate: "Data",
      contractNoData: "No such transaction data",
      hisId: "Transaction ID",
      hisBlock: "Block",
      hisTime: "Time",
      hisActType: "Operation Type",
      hisData: "Data",
      tokenTitle: "Hold tokens",
      tokenSubTitle: "Total $1 kinds ≈$2 USD",
      expand: "Expand",
      collapse: "Collapse",
      statReady: "Ready",
      headProducer: "Producing",
      nextProducer: "Next producer",
      inThisRound: "Producer of this chip",
    },
    i18nBlockSection: {
      blockNum: "Block Number",
      status: "Status",
      blockDate: "Block Time",
      producer: "Block production node",
      transCount: "Number of transactions",
      actionCount: "Number of events",
      blockHash: "Block Hash",
      transInfo: "Transaction Information",
      noTrans: "There is no transaction information in this block",
      btnPrev: "Previous block",
      btnNext: "Next block",
    },
    i18nTxinfo: {
      txHash: "Transaction Hash",
      status: "Status",
      blockNum: "Block Number",
      blockDate: "Block Time",
      cpuUsage: "CPU usage",
      netUsage: "NET Usage",
      txExpird: "Transaction Expiry Time",
      actions: "Include actions",
      name: "Name",
      author: "Authorization",
      data: "Data",
    },
    // <SecondSection />
    i18nTopRich: {
      title: "The Rich List",
      subTitle: "Top 100 total assets",
      ranks: "rank",
      name: "Account Name",
      totalValue: "Total Assets",
      marketValue: "Market Value",
      percentage: "Account",
    },
    // <Footer />
    footer: {
      links: 'Common links',
      devloper: 'Developer',
      browser: 'Block browser',
      contectUs: 'Contact us',
      service: 'Contact customer service service@potatocoin.com',
      business: 'Business cooperation business@potatocoin.com',
      suport: 'Technical support support@potatocoin.com',
      group: 'Official community',
      subscribe: 'Subscribe',
      subscribeTips: 'Subscribe by email to learn more. ',
    },
  },
});
