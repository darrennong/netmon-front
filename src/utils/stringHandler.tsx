/* eslint-disable default-case */
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { formatBytes } from './fromatNumber';

// Styles
const ProducerNameLink = styled.a`
  display: inline;
  padding-right: 5px;
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
  &:hover {
    color: rgba(64, 169, 255, 1);
  }
`;

const Arrow = styled.span`
  padding-right: 5px;
  &:after {
    content: '>';
  }
`;
const Txt = styled.span`
  padding-right: 5px;
`;

export const stripHtml = (html:any) => {
  if (!html) {
    return html;
  }
  const htmlElement = document.createRange().createContextualFragment(html);
  return htmlElement.textContent;
};

export const stringHandler = (str = '', callback:Function) => {
  if (!str || !str.match) {
    return str;
  }
  if (str.match(/,|>/)) {
    const isStringHasComas = str.match(/(, )/);
    const strArr = str.split(isStringHasComas ? ', ' : '>');

    return strArr.map((name, index) => (
      <Fragment key={`PName-${index}`}>
        <ProducerNameLink onClick={() => callback('account', name)}>{name}</ProducerNameLink>
        {!isStringHasComas && index !== strArr.length - 1 && <Arrow />}
      </Fragment>
    ));
  }
  if (str.length === 12 && !str.match(/EOS|bytes|IQ/))
    return <ProducerNameLink onClick={() => callback('account', str)}>{str}</ProducerNameLink>;

  return str;
};

export const nameHandler = (str = '', callback:Function) => {
  if (!str || !str.match) {
    return str;
  }
  if (str.match(/,|>/)) {
    const isStringHasComas = str.match(/(, )/);
    const strArr = str.split(isStringHasComas ? ', ' : '>');

    return strArr.map((name, index) => (
      <Fragment key={`PName-${index}`}>
        <ProducerNameLink onClick={() => callback('account', name)}>{name}</ProducerNameLink>
        {!isStringHasComas && index !== strArr.length - 1 && <Arrow />}
      </Fragment>
    ));
  }
  if (str.length === 12 && !str.match(/EOS|bytes|IQ/))
    return <ProducerNameLink onClick={() => callback('account', str)}>{str}</ProducerNameLink>;

  return str;
};

export const ParseAction = (action:any, callback:Function) => {
  switch (action.name) {
    case 'transfer':
      return (
        <Fragment>
          <ProducerNameLink onClick={() => callback('account', action.data.from)}>{action.data.from}</ProducerNameLink>
          <Arrow />
          <ProducerNameLink onClick={() => callback('account', action.data.to)}>{action.data.to}</ProducerNameLink>
          <Txt>{action.data.quantity}</Txt>
          <Txt>{action.data.memo}</Txt>
        </Fragment>
      );
    case 'buyram':
      return (
        <Fragment>
          <ProducerNameLink onClick={() => callback('account', action.data.payer)}>
            {action.data.payer}
          </ProducerNameLink>
          <Arrow />
          <ProducerNameLink onClick={() => callback('account', action.data.receiver)}>
            {action.data.receiver}
          </ProducerNameLink>
          <Txt>{action.data.quant}</Txt>
        </Fragment>
      );
    case 'sellram':
      return (
        <Fragment>
          <ProducerNameLink onClick={() => callback('account', action.data.account)}>
            {action.data.account}
          </ProducerNameLink>
          <Txt>
            {action.data.bytes}
            bytes
          </Txt>
        </Fragment>
      );
    case 'voteproducer':
      return (
        <Fragment>
          <ProducerNameLink onClick={() => callback('account', action.data.voter)}>
            {action.data.voter}
          </ProducerNameLink>
          <Arrow />
          <Txt>[</Txt>
          {action.data.producers.map((name:string) => (
            <ProducerNameLink onClick={() => callback('account', name)}>{name}</ProducerNameLink>
          ))}
          <Txt>]</Txt>
          <Txt>{action.data.memo}</Txt>
        </Fragment>
      );
    case `newaccount`:
      return (
        <Fragment>
          <ProducerNameLink onClick={() => callback('account', action.data.creator)}>
            {action.data.creator}
          </ProducerNameLink>
          <Arrow />
          <ProducerNameLink onClick={() => callback('account', action.data.name)}>{action.data.name}</ProducerNameLink>
        </Fragment>
      );
    case `buyrambytes`:
      return (
        <Fragment>
          <ProducerNameLink onClick={() => callback('account', action.data.payer)}>
            {action.data.payer}
          </ProducerNameLink>
          <Arrow />
          <ProducerNameLink onClick={() => callback('account', action.data.receiver)}>
            {action.data.receiver}
          </ProducerNameLink>
          <Txt>
            bytes:
            {formatBytes(action.data.bytes)}
          </Txt>
        </Fragment>
      );
    case 'delegatebw':
      return (
        <Fragment>
          <ProducerNameLink onClick={() => callback('account', action.data.from)}>{action.data.from}</ProducerNameLink>
          <Arrow />
          <ProducerNameLink onClick={() => callback('account', action.data.receiver)}>
            {action.data.receiver}
          </ProducerNameLink>
          <Txt>{` CPU: ${action.data.stake_cpu_quantity} NET: ${action.data.stake_net_quantity}`}</Txt>
        </Fragment>
      );
  }
  return null;
};
