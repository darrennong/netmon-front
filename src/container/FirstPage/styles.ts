import styled from "styled-components";

export const InfoBox = styled.div`
  width: 100%;
  height: 106px;
  margin: 0px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
`;
export const InfoList = styled.ol`
  display: flex;
  justify-content: space-around;
  align-items: top;
  height: 80px;
  list-style: none;
  padding: 10px;
`;

export const DataItem = styled.li`
  text-align: center;
`;
export const PTitle = styled.p`
  font-size: 14px;
  line-height: 14px;
  margin: 0;
`;
export const PData = styled.p`
  color: #0a3e6d;
  font-size: 24px;
  line-height: 24px;
  margin-top: 5px;
  margin-bottom: 2px;
`;
export const PData2 = styled.p`
  font-size: 12px;
  line-height: 12px;
  margin: 0;
`;

export const TopBox = styled.div`
  width: 100%;
  height: 652px;
  flex-direction: row;
  margin-top: 18px;
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
`;

export const HistoryBox = styled.div`
  width: 588px;
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
`;

export const TableTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  border-bottom: 1px solid #e2e3ed;
  margin-left: 24px;
  margin-right: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(128, 128, 128, 1);
`;

export const HeaderSpan1 = styled.span`
  width: 200px;
  height: 16px;
  font-size: 16px;
  text-align: left;
  font-family: SimSun;
  font-weight: 400;
`;

export const THIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
  border: none;
`;

export const PMore = styled.p`
  display: inline-block;
  width: 100%;
  height: 30px;
  font-size: 14px;
  text-align: center;
`;

export const AMore = styled.a`
  font-family: Source Han Sans CN;
  font-weight: 400;
  cursor: pointer;
  color: rgba(128, 128, 128, 1);
  &:hover {
    color: rgba(24, 144, 255, 1);
  }
`;
export const RowData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #808080;
  font-size: 14px;
  height: 54px;
  border-bottom: 1px solid #e2e3ed;
  margin-left: 24px;
  margin-right: 24px;
  &:hover {
    background: rgba(230, 247, 255, 1);
  }
`;


export const ProduceTitle = styled.div`
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  font-family: SimSun;
  font-weight: 400;
  margin: 20px 20px 10px 20px;
`;

export const TableContent = styled.div`
  width: 100%;
  height: 540px;
`;

export const GreenSpan = styled.span`
  width: 41px;
  height: 13px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(71, 201, 45, 1);
`;

export const GraySpan = styled.span`
  width: 41px;
  height: 13px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(77, 77, 77, 0.62);
`;

export const YellowSpan = styled.span`
  width: 41px;
  height: 13px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 174, 59, 1);
`;

export const TabRow = styled.div`
  display: flex;
  align-items: bottom;
  height: 24px;
  margin: 0px 20px 14px 20px;
  border-bottom: 1px solid #e2e3ed;
`;

export const SeriTxt = styled.span`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 2px;
  height: 20px;
  max-width: 70px;
  margin: 14px;
  background: rgba(247, 247, 247, 1);
  border-radius: 10px;
`;
