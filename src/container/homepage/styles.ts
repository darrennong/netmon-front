import styled from 'styled-components';

export const MainContainer = styled.div`
  overflow: hidden;
  overflow-x: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  min-height: 600px;
  height: 100%;
  width: 100%;
  color: #666;
  background-color: #F1F4F7;
  font-size: 16px;
  font-family: "SourceHanSansCN-Normal", Verdana, Arial, Helvetica, sans-serif;
`;

export const ContentArea = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  margin-top: 18px;
  width: 1200px;
`;
