import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  width: 100%;
  background: #232a3f;
  height: 290px;
  color: #ffffff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;

export const FooterTop = styled.div`
  box-sizing: border-box;
  padding-right: 150px;
  width: 100%;
  max-width: 1200px;
  height: 230px;
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
  font-size: 14px;
`;

export const FooterLog = styled.div`
  width: 200px;
`;

export const FooterLogimg = styled.img`
  width: 100%;
  border: none;
`;

export const LinksBox = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: block;
  list-style-type: decimal;
  margin-block-start: 1em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
`;

export const LinksTitle = styled.div`
  margin-bottom: 20px;
  padding: 0;
  display: block;
`;

export const LinkItem = styled.li`
  color: #8e98b3;
  line-height: 30px;
  font-size: 14px;
  list-style: none;
`;

export const LinkA = styled.a`
  color: #8e98b3;
  text-decoration: none;
`;

export const Icon = styled.img`
  width: 18px;
  height: 18px;
  padding: 12px;
  margin-left: -12px;
  border: none;
`;

export const FooterInput = styled.input`
  text-indent: 0px;
  display: inline-block;
  text-align: start;
  width: 75%;
  outline: none;
  background: #232a3f;
  color: #ffffff;
  border: 1px #888888 solid;
  padding-left: 10px;
  border-height: 26px;
  font: 14px Verdana, Helvetica, Arial, sans-serif;
  border-radius: 0.3rem 0rem 0rem 0.3rem;
`;

export const FotterButton = styled.button`
  background: #232a3f;
  color: #ffffff;
  outline: none;
  border: 1px #888888 solid;
  display: inline-block;
  text-align: center;
  font-size: 14px;
  line-height: normal;
  margin-left: -1px;  
  border-height: 23px;
  font-family: Verdana, Helvetica, Arial, sans-serif;
  border-radius: 0rem 0.3rem 0.3rem 0rem;
`;
export const FooterTip = styled.p`
  line-height: 14px;
  margin-block-start: 0.5em;
`;

export const FooterBottom = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-top: 20px;
  height: 62px;
  background: rgba(27, 31, 51, 1);
  border-radius: 3px;
  text-align: center;
  align-items: center;
`;
