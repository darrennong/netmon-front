/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import './title_foot.css';
import logourl from '../images/logo.png';
import iconQQ from './icons/qq.png';
import iconPT from './icons/pt.png';
import iconWechat from './icons/wechat.png';
import iconTelegram from './icons/telegram.png';
import iconTwitle from './icons/twitle.png';
import iconWeibo from './icons/weibo.png';

import {
  FooterWrapper,
  FooterTop,
  FooterLog,
  FooterLogimg,
  LinksBox,
  LinksTitle,
  LinkItem,
  LinkA,
  Icon,
  FooterInput,
  FotterButton,
  FooterTip,
  FooterBottom,
} from './styles';

// Image
// import lion from '../../assets/images/lion.png';
class Footer extends Component<WithTranslation> {
  render() {
    const { t } = this.props;
    return (
      <FooterWrapper>
        <FooterTop>
          <FooterLog>
            <FooterLogimg src={logourl} />
          </FooterLog>
          <LinksBox>
            <LinksTitle>{t('footer.links')}</LinksTitle>
            <LinkItem>
              <LinkA>{t('footer.devloper')}</LinkA>
            </LinkItem>
            <LinkItem>
              <LinkA>{t('footer.browser')}</LinkA>
            </LinkItem>
            <LinkItem>
              <LinkA>{t('footer.contectUs')}</LinkA>
            </LinkItem>
          </LinksBox>
          <LinksBox>
            <LinksTitle>{t('footer.contectUs')}</LinksTitle>
            <LinkItem>
              <LinkA href="mailto://service@potatocoin.com">{t('footer.service')}</LinkA>
            </LinkItem>
            <LinkItem>
              <LinkA href="mailto://business@potatocoin.com">{t('footer.business')}</LinkA>
            </LinkItem>
            <LinkItem>
              <LinkA href="mailto://support@potatocoin.com">{t('footer.suport')}</LinkA>
            </LinkItem>
          </LinksBox>
          <LinksBox>
            <LinksTitle>{t('footer.group')}</LinksTitle>
            <LinkItem>
              <LinkA href="tencent://message/?uin=4197411&Site=&Menu=yes">
                <Icon src={iconQQ} />
              </LinkA>
              <LinkA href="potatoChat://message/?uin=4197411&Site=&Menu=yes">
                <Icon src={iconPT} />
              </LinkA>
              <LinkA href="https://weibo.com/poc">
                <Icon src={iconWeibo} />
              </LinkA>
              <LinkA href="weixin://profile/darrennong">
                <Icon src={iconWechat} />
              </LinkA>
              <LinkA href="tencent://message/?uin=4197411&Site=&Menu=yes">
                <Icon src={iconTelegram} />
              </LinkA>
              <LinkA href="tencent://message/?uin=4197411&Site=&Menu=yes">
                <Icon src={iconTwitle} />
              </LinkA>
            </LinkItem>
            <LinkItem>
              <FooterInput />
              <FotterButton>{t('footer.subscribe')}</FotterButton>
            </LinkItem>
            <FooterTip>{t('footer.subscribeTips')}</FooterTip>
          </LinksBox>
        </FooterTop>
        <FooterBottom>Copyright <span role="img" aria-label="CopyRight" >©️</span>2019 Potato.com All rights reserved</FooterBottom>
      </FooterWrapper>
    );
  }
}

export default withTranslation()(Footer)
