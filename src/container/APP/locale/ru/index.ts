export default Object.freeze({
  translations: {
    // <NavigationMenu />
    // <Modal/>
    i18nModal: {
      // <AccountInfo />
      i18nAccountInfo: {
        // <Header />
        title: 'ACCOUNT INFO',
        placeholder: '帐号',
        getButton: '提取',
        getAccountsTransactionsHistory: '获取账户交易记录',
        historyLink: '历史',
        // <Main />
        balance: '余额',
        tokens: '令牌',
        created: '创建',
        lastCodeUpdate: '最后代码更新',
        activeKey: 'Active Key',
        ownerKey: 'Owner Key',
        ramUsed: '已使用RAM',
        bytes: '字节',
        quota: '总量',
        // 2 Blocks
        netBandwidth: 'NET带宽',
        cpuBandwidth: 'CPU带宽',
        staked: '抵押',
        delegated: '委托',
        current: '当前',
        available: '可用',
        max: '最大值',
        time: '时间',
        // Last block
        voterInfo: '投票信息',
        proxy: '代理',
        producers: '生产者',
        stakedLB: '抵押',
        lastVoteWeight: '最后投票权重',
        proxieVoteWeight: '代理投票权重',
        isProxy: '是否代理',
        deferredTrxId: '延期确认的trx id',
        lastUnstakeTime: '最后取消抵押时间',
        unstaking: '取消抵押',
      },
      // <AccountHistory />
      i18nAccountHistory: {
        // <Header />
        title: '账户历史',
        placeholder: '账户名',
        getButton: '提取',
        GetInformationAboutAccountAndBalance: '获取账户和余额的信息',
        accountInfoLink: '账户信息',
        // <Main />
        // Pagination
        prev: '上一页',
        page: '页数',
        next: '下一个',
        // Data Block
        block: '块',
        txId: 'TXid',
        date: '日期',
        action: '动作',
        from: '从',
        info: '信息',
      },
      i18nAccountTop: {
        title: '富豪榜',
        subTitle: '总资产前100',
        sort: '排名',
        name: '账户名',
        amount: '总资产',
        marketValue: '市值(USD)',
        percentage: '占比',
      },
      // <Transactions />
      i18nTransactions: {
        // <Header />
        title: '交易',
        placeholder: 'TX id',
        getButton: '提取',
        findTransaction: '查询到一个交易',
        // <Main />
        block: '块',
        txId: 'TXid',
        date: '日期',
        action: '动作',
        from: '从',
        info: '信息',
      },
      // <BlockInfo />
      i18nBlockInfo: {
        title: 'BLOCK INFO',
        getButton: '提取',
      },
      i18nTokenList: {
        title: '代币列表',
        subTitle: '当前代币数: ',
        sn: '序号',
        creater: '创建账户',
        tokenName: '代币名称',
        numHolders: '持有人数',
        price: '价格(USD)',
        maxSupply: '最大供应量',
        liquidity: '流通量',
        liquidityValue: '流通市值',
      },
      // <Api />
      i18nApi: {
        title: 'API',
        getButton: '提取',
      },
      // <P2P />
      i18nP2P: {
        title: 'P2P',
      },
      // <Legend />
      i18nLegend: {
        title: '说明',
        // About block
        about: '关于',
        content: [
          '所有信息都来自公共节点，出块节点通常是隐藏的',
          'Potato网络监视器是一个检查Potato公共节点并显示常规信息的工具',
          '显示所有已注册的生产者，从节点的bp.json文件提取信息',
        ],
        tps: ['TPS', '每秒交易量'],
        aps: ['APS', '每秒动作数'],
        // Colors legend block
        colorsLegend: '颜色说明',
        producingRightNow: '正在生产',
        halfOrMore: '半或更多公共端点无响应',
        zeroOfpublic: '0个公共端点正在运行',
        notProducing: '不生产块',
        versionInformation: `版本信息是从公共节点查询获得的。出块节点通常是隐藏的。“不显示版本”的公共节点可能有合理的理由，比如回避已知的漏洞，但这些都很少见。`,
        unsynced: '未同步',
        thisDoesNot: `这并不一定意味着有分叉或者不同。它可能是节点重新同步，很快就会同步完成`,
        bps: `以灰色标记的节点有出错，或丢失bp.json文件。我们会做一个周期检查。但是我们只检查前60名`,
        moreinfo: '更多信息',
        // Ping color explanation block
        pingColorExplanation: 'PING 颜色说明',
        greyName: '灰色 ',
        greyPing: 'Ping灰色: 已获得最新状态',
        blackPing: 'Ping黑色: 重新查询状态',
        // Notes
        note1: '注释 1',
        ManyBp: `许多节点使用负载均衡，因此返回的信息可能不同。`,
        note2: '注释2',
        wePull: '我们每隔几秒就用“clpc system list procedures” 更新出块节点列表。',
      },
      // <Vote />
      i18nVote: {
        title: 'VOTE',
        // Main Text
        byCompletingThisAction: '同意',
        eosConstitution: 'Potato宪法',
        theIntentOf: `“投票出块者”功能是为了对超过30个节点候选人，投出有效的选票。`,
        iAmEitherThe: `我是投票代币的实际拥有人，或者我有证据证明我已被授权代表受益所有人投票。`,
        iStipulateThat: `我承诺，我没有，也不会接受任何有价值的东西来换取这些选票，否则将受到没收代币或其他的惩罚。`,
        iStipulateThatIAmNot: `我承诺，我不会使用任何自动投票、重复投票或刷票的系统。这样做违反了这份合同。.`,
        thisFeatureWas: `这个功能是为了帮助投票而创建的。它创建一个可信的出块节点的clpc命令
        使用`,
        ourclpcWrapper: ' 我们的clpc 接口（只配置端口和地址）， ',
        selectedProducers: '选中的生产商',
        // Input
        placeholder: '你的账户名...',
        // Button
        installScatter: '安装Scatter',
        vote: '投票',
        initScatter: '初始化Scatter',
        // Footer
        voteProducerProds: './clpc.sh system voteproducer prods',
        checkAtLeastOne: '选中至少一个生产商(选择框)',
      },
      // <BpJson />
      i18nBpJson: {
        title: 'bp.json',
      },
      // <ErrorMessage />
      i18nErrorMessage: {
        title: '错误信息',
      },
      // <RamPrice />
      i18nRamPrice: {
        title: 'POC RAM 价格',
      },
      // <LiveTps />
      i18nLiveTps: {
        title: 'TPS实况',
      },
    },
    i18nNavigationMenu: {
      home: '首页',
      block: '区块',
      trans: '交易',
      wallet: '钱包',
      account: '账户',
      token: '代币',
      searchTips: '搜索交易、区块、账户、合约',
    },
    // <Top50Trans />
    i18Top50Section: {
      title: '交易列表',
      transCnt: '交易总笔数',
    },
    // <FirstSection />
    i18nFirstSection: {
      // <CurrentBlockInfo />
      i18nCurrentBlockInfo: {
        currentBlock: '最新区块',
        title: '当前区块信息',
        irreversibleBlock: '已确认区块',
        producedBy: '出块者是',
        next: '下一步',
      },
      // <GeneralInfo />
      i18nGeneralInfo: {
        title: '常规信息',
        stakedTotal: '抵押总数',
        activatedStake: '可使用抵押数',
        tps: '当前/最高TPS',
        aps: '当前/最高APS',
        totalAccounts: '账户数量',
        connectedUsers: '已连接用户数',
        ramUsed: '链中RAM（内存）已占用/未占用',
        totalUnpaidBlocks: '无偿块',
        eosioRamFee: 'POC ram 费用',
        eosioSaving: 'POC saving',
      },
      i18nPocPrice: {
        title: '当前价格',
      },
      // <UnregisteredBps />
      i18nUnregisteredBps: {
        title: 'Unregistered BPs in last 24 hours',
      },
      // <Transactions />
      i18nTransactions: {
        title: '交易列表',
        transCnt: '交易总笔数',
        actionCnt: '操作数',
        id: '交易ID',
        cupUsage: 'CPU用量',
        netUsage: 'NET用量',
        expired: '过期时间',
        total: '全部',
        transactions: '交易',
        blockNumber: 'Synced up to block #',
        transactionsWillAppear: '同步后显示交易信息',
      },
      i18nBlocks: {
        title: '区块列表',
        headBlockNum: '当前已产出区块',
        id: '区块',
        headTitle: '最新区块',
        transNum: '交易数',
        optionNum: '操作数',
        producer: '生产者',
        timeStamp: '生成时间',
      },
      i18nProducers:{
        localNet: '本地网络',
        sn: '序号',
        name: '名称',
        status: '状态',
        location: '位置',
        votesPercent: '得票率',
        chipCount: '在线轮数',
        totaoVotes: '总票数',
        rewardsPreDay: '每日奖励',
        thisChips: '本轮节点',
        allNodes: '全部节点',
      },
    },
    i18nAccount:{
      account: "账户",
      copy: "复制",
      totalBalance:"总资产",
      liquid: "可用余额",
      unstaking: "赎回中",
      cpuStaking: "CPU抵押",
      netStaking: "NET抵押",
      otherStaking: "他人为你抵押",
      producerTitle: "节点信息",
      producerSubTitle: "此账户已注册为区块生产节点",
      producerStat: "状态",
      producerVoteRate: "投票率",
      producerVotes: "总票数",
      producerLocation: "位置",
      producerReward: "每日奖励",
      contractTitle: "智能合约",
      contractSubTitle: "此账户部署了智能合约",
      contractViewHistory: "查看合约调用记录      ",
      contractViewAbi: "查看合约ABI",
      returnAccountInfo: "返回账户信息",
      contractTransInfo: "交易信息",
      contractAbi: "ABI",
      contableId: "交易ID",
      contableBlock:"区块",
      contableTime: "调用时间",
      contableInterface:"调用接口",
      contableDate:"数据",
      contractNoData: "没有此类交易数据",
      hisId: "交易ID",
      hisBlock: "区块",
      hisTime:"时间",
      hisActType: "操作类型",
      hisData: "数据",
      tokenTitle:"持有代币",
      tokenSubTitle: "共 $1 种≈$2 USD"
    },
    i18nBlockSection:{
      blockNum: "区块编号",
      status: "状态",
      blockDate: "区块时间",
      producer: "区块生产节点",
      transCount: "交易数量",
      actionCount: "事件数量",
      blockHash: "区块Hash",
      transInfo: "交易信息",
      noTrans: "该区块没有交易信息",
      btnPrev: "上一个块",
      btnNext: "下一个块",
    },
    i18nTxinfo:{
      txHash:"交易Hash",
      status:"状态",
      blockNum: "区块编号",
      blockDate: "区块时间",
      cpuUsage: "CPU使用量",
      netUsage: "NET使用量",
      txExpird: "交易过期时间",
      actions: "包含操作",
      name: "名称",
      author: "授权",
      data: "数据",
    },
    // <SecondSection />
    i18nTopRich:{
      title: "富豪榜",
      subTitle: "总资产前100",
      ranks: "排名",
      name: "账户名",
      totalValue: "总资产",
      marketValue: "市值",
      percentage:"占比",
    },
    // <Footer />
    footer: {
      links: '常用链接',
      devloper: '开发者',
      browser: '区块浏览器',
      contectUs: '联系我们',
      service: '联系客服service@potatocoin.com',
      business: '商务合作business@potatocoin.com',
      suport: '技术支持support@potatocoin.com',
      group: '官方社群',
      subscribe: '订阅',
      subscribeTips: '邮箱订阅，了解更多动态。',
    },
  },
});
