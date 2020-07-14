import { PureComponent } from "react"
import { WithTranslation, withTranslation } from "react-i18next";
import React from "react";
import { Warpper, SectionBox, KeyLable, Link } from "../styles";
import { history } from "../../init/middleware";

class NotFound extends PureComponent<WithTranslation>{
    render() {
        const { t } = this.props;
        return <Warpper>
            <SectionBox ul={false} rows={8} margin="24px">
                <KeyLable>{t('i18nNotFound.account')}</KeyLable>
                <Link onClick={()=>{history.goBack()}}>返回上一页</Link>
            </SectionBox>
        </Warpper>
    }
}
export default withTranslation()(NotFound);