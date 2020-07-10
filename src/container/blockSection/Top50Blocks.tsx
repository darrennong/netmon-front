import { PureComponent } from "react"
import { Warpper, Title, SubTitle, HeaderBox, TableBox, RowBox, FieldSpan, TableLink } from "../styles";
import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from 'redux';
import { modalActions } from "../../bus/modal/actions";
import { uiActions } from "../../bus/ui/actions";
import { selectBlockChart, selectLastBlockStats } from "../../bus/generalStats/selectors";
import { connect } from "react-redux";
import { convertUtcToLocal } from "../../utils/dateUtils";

interface Block {
    blockNumber: number;
    blockTransCount: number;
    blockActionCount: number;
    producer: string;
    createAt: Date;
}
interface Props {
    blocksList: Array<Block>;
    lastBlockInfo: any;
    actions: {
        fetchBlockInfo: Function;
        toggleModal: Function;
        fetchAccountInfo: Function;
    },
}
const mapStateToProps = createStructuredSelector({
    blocksList: selectBlockChart(),
    lastBlockInfo: selectLastBlockStats(),
});

const mapDispatchToProps = (dispach: any) => ({
    actions: bindActionCreators(
        {
            fetchBlockInfo: modalActions.fetchBlockInfo,
            toggleModal: uiActions.toggleModal,
            fetchAccountInfo: modalActions.fetchAccountInfo,
        },
        dispach
    ),
});

class Top50Blocks extends PureComponent<WithTranslation, Props>{
    render() {
        const {t, blocksList, lastBlockInfo, actions:{toggleModal} }: any = this.props;
        return (
            <Warpper>
                <Title>{t('i18nFirstSection.i18nBlocks.title')}</Title>
                <SubTitle>{`${t('i18nFirstSection.i18nBlocks.headBlockNum')}    ${lastBlockInfo.head_block_num}`}</SubTitle>
                <HeaderBox>
                    <FieldSpan w={150} align="left">{t('i18nFirstSection.i18nBlocks.id')}</FieldSpan>
                    <FieldSpan w={100} align="left">{t('i18nFirstSection.i18nBlocks.transNum')}</FieldSpan>
                    <FieldSpan w={100} align="left">{t('i18nFirstSection.i18nBlocks.optionNum')}</FieldSpan>
                    <FieldSpan w={150} align="left">{t('i18nFirstSection.i18nBlocks.producer')}</FieldSpan>
                    <FieldSpan w={150} align="left">{t('i18nFirstSection.i18nBlocks.timeStamp')}</FieldSpan>
                </HeaderBox>
                <TableBox>
                    {
                        blocksList.map((block: Block, i: number) => {
                            return (<RowBox key={i}>
                                <TableLink w={150} align="left" onClick={()=>toggleModal('block',block.blockNumber)}>{block.blockNumber}</TableLink>
                                <FieldSpan w={100} align="left">{block.blockTransCount}</FieldSpan>
                                <FieldSpan w={100} align="left">{block.blockActionCount}</FieldSpan>
                                <TableLink w={150} align="left">{block.producer}</TableLink>
                                <FieldSpan w={150} align="left">{convertUtcToLocal(block.createAt)}</FieldSpan>
                            </RowBox>)
                        })
                    }
                </TableBox>
            </Warpper>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Top50Blocks));