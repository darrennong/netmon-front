import { PureComponent, Fragment } from "react";
import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectLastBlockStats } from "../../bus/generalStats/selectors";
import styled from "styled-components";

const StatSubmit = styled.span`
    padding: 2px 10px;
    margin-right:16px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    height:20px;
    border-radius:10px;
    background:rgba(71,201,45,1);
`;

const StatWating = styled.span`
    padding: 2px 10px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    height:20px;
    border-radius:10px;
    background:rgba(250,143,96,1);
`;

const StatIrreversible = styled.span`
    padding: 2px 10px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    height:20px;
    border-radius:10px;
    background:rgba(24,144,255,1);
`;

interface Props extends WithTranslation {
    blockNum: number;
    lastBlockState: {
        head_block_num: number;
        last_irreversible_block_num: number
    };
}
const mapStateToProps = createStructuredSelector({
    lastBlockState: selectLastBlockStats(),
});

class BlockState extends PureComponent<Props>{
    constructor(props: Readonly<Props>) {
        super(props);
        const sec = 0;
        const blockNum = props.blockNum;
        this.state = { sec, blockNum };
    }
    onTimer = () => {
        const { sec, timer }: any = this.state;
        if (sec > 0) {
            this.setState({ sec: sec - 1, timer });
        } else {
            const { blockNum, lastBlockState: { head_block_num, last_irreversible_block_num } } = this.props;
            const dn = ((head_block_num - last_irreversible_block_num) % 12);
            const second = Math.ceil((blockNum + 12 - last_irreversible_block_num - dn) / 2);
            if (second < 0) clearInterval(timer);
            this.setState({ sec: second, timer: undefined });
        }
    }
    componentDidUpdate() {
        const {sec,blockNum}:any = this.state;
        const block = this.props.blockNum;
        if (sec === 0||blockNum!==block) {
            const { blockNum, lastBlockState: { head_block_num, last_irreversible_block_num } } = this.props;
            const dn = ((head_block_num - last_irreversible_block_num) % 12);
            const second = Math.ceil((blockNum + 12 - last_irreversible_block_num - dn) / 2);
            const timer = (this.state as any).timer || setInterval(this.onTimer, 1000);
            this.setState({ sec: second, timer, blockNum:block });
        }
    }
    componentWillUnmount() {
        const timer = (this.state as any).timer;
        if (timer) {
            clearInterval(timer);
        }
    }
    render() {
        const t = this.props.t;
        const { sec }: any = this.state;
        return <Fragment>
            <StatSubmit key={1}>{t(`i18nBlockSection.stateSubmited`)}</StatSubmit>
            {sec > 0 &&
                <StatWating key={2}>{t(`i18nBlockSection.stateWating`)} {sec} S</StatWating>
            }
            {sec < 0 &&
                <StatIrreversible key={3}>{t(`i18nBlockSection.stateIrrever`)}</StatIrreversible>
            }
        </Fragment>
    }
}
export default connect(mapStateToProps)(withTranslation()(BlockState))