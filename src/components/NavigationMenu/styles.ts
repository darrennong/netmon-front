import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: linear-gradient(90deg, rgba(43, 108, 205, 1) 0%, rgba(49, 44, 147, 1) 100%);
`;

export const TitleBox = styled.div`
  width: 1200px;
  height: 60px;
  line-height: 60px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  media (max-width: 1920px) {
    max-width: 1024px;
  }
`;

export const LogoBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerBox = styled.div`
  -max-width: 1920;
`;

export const TabList = styled.ol`
  display: flex;
  width: 100%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  list-style: none;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
`;

export const Nav = styled.nav`
  display: inline-flex;
  width: 720px;
`;

interface SelectAble{
  isSelected: Boolean;
}

export const NavTab = styled.li<SelectAble>`
  margin-right: 20px;
  border-bottom: 5px solid ${props => props.isSelected ? `#ffffff` : `#00000000`};
  &:hover {
    border-bottom: 5px solid #ffffff;
  }
`;

export const ALabel = styled.a`
  display: block;
  font-size: 14px;
  color: #ffffff;
  text-decoration: none;
  padding: 0 15px;
`;

export const LogoImage = styled.img`
  height: 60px;
`;
export const LangContainer = styled.div`
  pointer-events: none;
  margin-left: -16px;
  margin-top: -24px;
  width: 10px;
  height: 35px;
`;
export const LangSelector = styled.select`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 100px;
  height: 35px;
  color: #ffffff;
  font-size: 14px;
  border-radius: 18px;
  background: rgba(49, 44, 147, 1);
  outline: none;
  border: none;
  margin-left: 10px;
  line-height: 36px;
  &:hover {
    outline: 1px;
    background: rgba(40, 43, 131, 1);
  }
`;
export const Trangle = styled.svg`
  width: 9px;
  height: 5px;
`;
