import { PureComponent, Fragment } from "react";
import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { Warpper, SectionBox, KeyLable, ValueField, MainValueField, HalfBox, SectionRow, Link, TitleLable, HeaderBox, FieldSpan, TableBox, RowBox, TableLink } from "../styles";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectBlockInfo } from "../../bus/modal/selectors";
import { selectLastBlockStats } from "../../bus/generalStats/selectors";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { modalActions } from "../../bus/modal/actions";
import { uiActions } from "../../bus/ui/actions";
import { SlideBtn } from "./styles";
import { Arrow } from "../../components/svg/arrow";
import { convertUtcToLocal } from "../../utils/dateUtils";
interface Transaction {
  txid: string;
  description: string;
  actionCnt: number;
  cpuUsage: number;
  netUsage: number;
  expired: Date;
}
interface Block {
  blockActionCount: number;
  blockNum: number;
  blockStatus: number;
  blockTransCount: number;
  createdAt: Date;
  hash: string;
  producer: string;
  transactions?: Array<Transaction>;
}
interface Props extends WithTranslation {
  blockData: Block;
  lastStats: { head_block_num: number; };
  match: any;
  actions: {
    fetchBlockInfo: Function;
    toggleModal: Function;
  },
}
const mapStateToProps = createStructuredSelector({
  blockData: selectBlockInfo(),
  lastStats: selectLastBlockStats(),
});

const mapDispatchToProps = (dispach: Dispatch<AnyAction>) => ({
  actions: bindActionCreators(
    {
      fetchBlockInfo: modalActions.fetchBlockInfo,
      fetchTransInfo: modalActions.fetchTxInfo,
      fetchAccountInfo: modalActions.fetchAccountInfo,
      toggleModal: uiActions.toggleModal,
    },
    dispach
  ),
});
class BlockSection extends PureComponent<Props>{
  constructor(props: Readonly<Props>) {
    super(props);
    const blockId = parseInt(props.match.params.id);
    props.actions.fetchBlockInfo(blockId);
    this.state = { blockId } as any;
  }
  componentDidUpdate() {
    const { match, actions: { fetchBlockInfo } } = this.props;
    const blockId = match.params.id;
    if ((this.state as any).blockId !== blockId) {
      fetchBlockInfo(blockId);
      this.setState({ blockId } as any);
    }
  }
  stepTo(step: number) {
    const { blockId }: any = this.state;
    const { lastStats, actions: { toggleModal } } = this.props;
    let id = parseInt(blockId) + step;
    if (id < 1) { id = 1 } else if (id > lastStats.head_block_num) { id = lastStats.head_block_num };
    toggleModal('block', id);
  }
  render() {
    const { t, blockData, actions: { toggleModal } } = this.props;
    const { blockId }: any = this.state;
    console.log(blockData);
    return (
      <Fragment>
        <Warpper>
          <SectionBox ul={true} margin="10px 24px 0 24px">
            <KeyLable>{t('i18nBlockSection.blockNum')}</KeyLable>
            <MainValueField>{blockId}</MainValueField>
            <SlideBtn onClick={() => this.stepTo(-1)}><Arrow><path d="M0,5l13,0M6,0l-6,5M0,5l6,5"></path></Arrow>上一个块</SlideBtn>
            <SlideBtn onClick={() => this.stepTo(1)}>下一个块<Arrow><path d="M0,5l13,0M7,0l6,5M13,5l-6,5"></path></Arrow></SlideBtn>
          </SectionBox>
          <SectionBox ul={true} rows={3} margin="0 24px">
            <HalfBox>
              <SectionRow>
                <KeyLable>{t('i18nBlockSection.status')}</KeyLable>
                <ValueField>{blockId}</ValueField>
              </SectionRow>
              <SectionRow>
                <KeyLable>{t('i18nBlockSection.blockDate')}</KeyLable>
                <ValueField>{convertUtcToLocal(blockData.createdAt)}</ValueField>
              </SectionRow>
              <SectionRow>
                <KeyLable>{t('i18nBlockSection.producer')}</KeyLable>
                <Link onClick={() => toggleModal('account', blockData.producer)}>{blockData.producer}</Link>
              </SectionRow>
            </HalfBox>
            <HalfBox>
              <SectionRow />
              <SectionRow>
                <KeyLable>{t('i18nBlockSection.transCount')}</KeyLable>
                <ValueField>{blockData.blockTransCount}</ValueField>
              </SectionRow>
              <SectionRow>
                <KeyLable>{t('i18nBlockSection.actionCount')}</KeyLable>
                <ValueField>{blockData.blockActionCount}</ValueField>
              </SectionRow>
            </HalfBox>
          </SectionBox>
          <SectionBox margin="0 24px 10px 24px">
            <KeyLable>{t('i18nBlockSection.blockHash')}</KeyLable>
            <ValueField>{blockData.hash}</ValueField>
          </SectionBox>
        </Warpper>
        <Warpper>
          <SectionBox margin="10px 24px 0 24px">
            <TitleLable>{t('i18nBlockSection.transInfo')}</TitleLable>
          </SectionBox>
          <HeaderBox>
            <FieldSpan w={150} align="left">{t('i18nFirstSection.i18nTransactions.id')}</FieldSpan>
            <FieldSpan w={100} align="left">{t('i18nFirstSection.i18nTransactions.actionCnt')}</FieldSpan>
            <FieldSpan w={100} align="left">{t('i18nFirstSection.i18nTransactions.cupUsage')}</FieldSpan>
            <FieldSpan w={150} align="left">{t('i18nFirstSection.i18nTransactions.netUsage')}</FieldSpan>
            <FieldSpan w={150} align="left">{t('i18nFirstSection.i18nTransactions.expired')}</FieldSpan>
          </HeaderBox>
          {blockData.blockTransCount === 0 && <SectionBox ul={true} margin="0 24px">{t('i18nBlockSection.noTrans')}</SectionBox>}
          <TableBox>
            {blockData.transactions && blockData.transactions.map((trans: Transaction, i: number) => {
              return (<RowBox key={i}>
                <TableLink w={150} align="left"
                  onClick={() => toggleModal('trans', trans.txid)}>{trans.txid}</TableLink>
                <FieldSpan w={100} align="left">{trans.actionCnt}</FieldSpan>
                <FieldSpan w={100} align="left">{trans.cpuUsage}</FieldSpan>
                <FieldSpan w={150} align="left">{trans.netUsage}</FieldSpan>
                <FieldSpan w={150} align="left">{convertUtcToLocal(trans.expired)}</FieldSpan>
              </RowBox>)
            })
            }
          </TableBox>
        </Warpper>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(BlockSection));