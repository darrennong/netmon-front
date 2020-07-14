import styled from "styled-components";

export const CopyBtn = styled.button`
  width: 49px;
  height: 27px;
  border: 1px solid rgba(24, 144, 255, 1);
  border-radius: 4px;
  font-size: 12px;
  line-height: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  margin-left: 40px;
  background-color: #ffffff;
  outline: none;
  cursor: pointer;
`;
export const AmountField = styled.span`
  height: 20px;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(24, 144, 255, 1);
  opacity: 0.95;
`;
export const UnitField = styled.span`
  height: 16px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  opacity: 0.65;
  margin-left: 8px;
`;
export const MarkValueField = styled.span`
  height: 12px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  opacity: 0.65;
`;
export const BetweenBox = styled.div`    
    width: 588px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
`;

export const GDataRow = styled.p`
  margin-block-start: 0.2em;
  margin-block-end: 0.5em;
  width: 300px;
  text-align: center;
  height: 12px;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  opacity: 0.45;
`;
export const LineGray = styled.div`
  display: inline-block;
  height: 8px;
  line-height: 2px;
  border: 1px solid #f1f4f7;
  border-radius: 20px;
  background: #f1f4f7;
  width: 50%;
  margin-right: 10px;
`;
interface LineBar {
  per: number;
}
export const LineGreen = styled.div<LineBar>`
    display: inline-block;
    height: 8px;
    line-height: 2px;
    border-radius: 20px;
    width: ${props => `${props.per}%`};
    border: 1px solid #90bf46;
    background: #90bf46;
    border-radius:4px;
`;

export const LineYellow = styled.div<LineBar>`
    display: inline-block;
    height: 8px;
    line-height: 2px;
    border-radius: 20px;
    width: ${props => `${props.per}%`};
    border: 1px solid #FFAE3B;
    background: #FFAE3B;
    padding-left: 0;
    margin-lenf: 0;
    border-radius:4px;
`;

export const LineBlue = styled.div<LineBar>`
    display: inline-block;
    height: 8px;
    line-height: 2px;
    border-radius: 20px;
    width: ${props => `${props.per}%`};
    border: 1px solid #1890ff;
    background: #1890ff;
    padding-left: 0;
    margin-lenf: 0;
    border-radius:4px;
`;

export const BarItem = styled.div`
  width: 100%;
  lineheight: !15px;
`;

export const ContactTabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
`;
export const ContactTabBtn = styled.span`
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  cursor: pointer;
  color: rgba(0,0,0,1);  
  stroke: rgba(0, 0, 0, 1);
  opacity: 0.85;
  &:hover {
    color: rgba(64, 169, 255, 1);
    stroke: rgba(64, 169, 255, 1);
  }
`;
export const Selector = styled.select`
  width: 200px;
  height: 30px;
  margin-bottom: 15px;
  font-size: 14px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 1);
  outline: none;
  border: 1px solid rgba(232, 232, 232, 1);
  border-radius: 4px;
`;
export const JsonBox = styled.div`
  margin: 10px 24px;
  overflow: hidden;
`;


export const RedSpan = styled.span`
  height: 30px;
  border: 1px solid rgba(238, 93, 82, 1);
  border-radius: 4px;
  align-items: center;
  font-size: 14px;
  line-height: 28px;
  padding: 2px 4px;
`;

export const GreenSpan = styled.span`
  height: 30px;
  border: 1px solid rgba(57, 205, 27, 1);
  border-radius: 4px;
  align-items: center;
  font-size: 14px;
  line-height: 28px;
  padding: 2px 4px;
`;

export const GraySpan = styled.span`
  font-size: 14px;
  line-heigth: 14px;
  display: inline;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
interface Expaned {
  expaned: boolean;
}
export const Trangle = styled.svg<Expaned>`
  width: 9px;
  height: 5px;
  path: {
    fill: '#777777';
    strokewidth: '0';
    d: 'm0,5l5,-5l4.5,5l-9,0l0,0l-0.5,0z';
  }
  ${props => props.expaned && { transform: 'rotate(180deg)', }};
`;
export const ExportBtn = styled.span`
  width: 56px;
  margin: auto 0px auto auto;
  text-align: center;
  background: rgba(241, 247, 255, 1);
  border-radius: 12px;
  font-size: 14px;
  padding: 2px 6px;
  align-items: center;
  cursor: pointer;
`;

export const TokenContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 20px;
`;

export const TokenBox = styled.div`
  width: 224px;
  height: 88px;
  border: 1px solid rgba(233, 235, 238, 1);
  border-radius: 6px;
  margin: 8px;
  padding: 14px 24px 14px 24px;
`;
export const Badage = styled.div`
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 1);
  border-radius: 50%;
  white-space: nowrap;
  display: inline-block;
  margin-right: 12px;
`;
export const SymbolSpan = styled.span`
  font-size: 18px;
  font-family: Consolas;
  font-weight: bold;
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
  &:hover {
    color: rgba(64, 169, 255, 1);
  }
`;
export const TokenNameSpan = styled.span`
  font-size: 14px;
  font-family: Consolas;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
`;
export const Line = styled.div`
  flex-direction: column;
  height: 24px;
  margin-bottom: 8px;
`;
export const TokenValSpan = styled.span`
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(27, 31, 51, 1);
`;
export const TokenSymbSpan = styled.span`
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
`;
export const TokenMarkValueSpan = styled.span`
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  opacity: 0.65;
`;
export const StateSpan = styled.span`
  heigth: 20px;
  padding: 2px 10px;
  font-size:12px;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(255,255,255,1);
  background:rgba(24,144,255,1);
  border-radius:10px;
`;
export const DataSpan = styled.span`
  display: flex;
  justify-content: space-between;
`;