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
interface LineBar{
    per:number;
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
