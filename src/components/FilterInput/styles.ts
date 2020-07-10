import styled from 'styled-components';

export const FilterContainer = styled.div`
  width: 250px;
  height: 30px;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 12px;
`;

export const Input = styled.input`
  width: 250px;
  height: 32px;
  line-height: 14px;
  font-size: 14px;
  padding-left: 15px;
  padding-right: 25px;
  border-radius: 42px;
  border: none;
  background: #ffffff;
  outline: none;
`;

export const SvgIcon = styled.svg`
  position: absolute;
  top: 7px;
  right: 7px;
  width: 14px;
  height: 14px;
  cursor: text;
  pointer-events: none;
`;

export const SvgCrossIcon = styled.svg`
  position: absolute;
  top: 8px;
  right: 7px;
  width: 12px;
  height: 12px;
  cursor: pointer;
  pointer-events: all;
  & polygon {
    fill: #747474;
  }
  &:hover polygon {
    fill: red;
  }
`;
