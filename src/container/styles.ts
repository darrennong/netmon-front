import styled from 'styled-components';

export const PERCENT = { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true };
export const VALUE_STYLE = { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true };
export const POC_STYLE = { minimumFractionDigits: 4, maximumFractionDigits: 4, useGrouping: true };
export const INT_STYLE = {maximumFractionDigits: 0, useGrouping: true};
    // box-sizing: border-box;
export const Warpper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 0px 18px 0px;
    width: 100%;
    background-color: #fff;
    border-radius:4px;
    font-family:Source Han Sans CN;
`;

export const Title = styled.span`
    margin: 24px 24px 8px 24px;
    font-size:16px;
    font-weight:500;
    color:rgba(0,0,0,1);
    opacity:0.95;
`;

export const SubTitle = styled.span`
    margin: 8px 24px 8px 24px;
    font-size:14px;
    font-weight:400;
    color:rgba(0,0,0,1);
    opacity:0.8;
`;

export const HeaderBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 24px 0px 24px;
    height: 53px;
    background: rgba(250,250,250,1);
    box-shadow: 0px 1px 0px 0px rgba(232,232,232,1);
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:rgba(0,0,0,1);
    opacity:0.85;
`;

export const TableBox = styled.div`
    display: flex;
    min-height: 175px;
    flex-direction: column;
    margin: 0px 24px 24px;
`;

export const RowBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    height: 40px;
    box-shadow: 0px 1px 0px 0px rgba(232,232,232,1);
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    opacity:0.75;
`;

interface TableField{
    w: Number;
    align: string;
}
export const FieldSpan = styled.span<TableField>`
    width: ${props=>props.w + 'px'};
    text-align: ${props=>props.align};
    padding: 0 18px;
`;

export const TableLink = styled.a<TableField>`
  width: ${props=>props.w + 'px'};
  text-align: ${props=>props.align};
  padding: 0 18px;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
  &:hover {
    color: rgba(64, 169, 255, 1);
  }
`;
export const Link = styled.a`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    color: rgba(24, 144, 255, 1);
    &:hover {
    color: rgba(64, 169, 255, 1);
    }
`;
interface MultiRow{
    rows?: number;
    // 'center|space-between';
    margin: string;
    ul?: boolean;
}
export const SectionBox = styled.div<MultiRow>`
    display: flex;
    justify-content: ${props=>props.rows?'space-between':'start'};
    align-items: center;
    margin: ${props=>props.margin};
    height: ${props=>props.rows?props.rows*40:40}px;
    ${props=>props.ul&&`box-shadow: 0px 1px 0px 0px rgba(232,232,232,1);`}
`;
export const HalfBox = styled.div`
  width: 588px;
  height: 100%;
`;
export const SectionRow = styled.div`
    display: flex;
    align-items: center;
    margin: 0;
    height: 40px;
`;
export const KeyLable = styled.span`
    width: 120px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(0,0,0,1);
    opacity:0.85;
`;
export const TitleLable = styled.span`
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:rgba(0,0,0,1);
    opacity:0.95;
`;

export const ValueField = styled.span`
    padding-right: 24px;
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(27,31,51,1);
    opacity:0.95;
`;
export const MainValueField = styled.span`
  margin: auto 40px auto 0px;
  font-size:18px;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(27,31,51,1);
  opacity:0.95;
`;
interface TabProps{
    selected?: Boolean;
    w?: number;
  }
export const TabSpan = styled.div<TabProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => props.w||80}px;
    height: 100%;
    cursor: pointer;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    opacity:0.65;
    border-bottom: 1px solid ${props => props.selected?`rgba(64, 169, 255, 1)`:`rgba(64, 169, 255, 0)`};
    &:hover {
        color: rgba(64, 169, 255, 1);
        border-bottom: 1px solid rgba(64, 169, 255, 1);
    }
`;