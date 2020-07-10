import styled from 'styled-components';

interface Widen {
  w: number;
}

export const Wrapper = styled.div<Widen>`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
  margin-left: auto;
  margin-right: 0px;
  font-size: 14px;
  width: ${props => `${props.w || 640}px`};
`;

export const PageButton = styled.button`
  outline: none;
  margin-right: 0px;
  padding: 0px 14px;
  border: none;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #fff;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  &:hover {
    border-width: 1px;
    color: #0056b3;
    background-color: #e9ecef;
    border-radius: 6px;
    border-color: #2979ff;
  }
`;

export const CurrentPageBtn = styled.button`
outline: none;
margin-right: 0px;
padding: 0px 14px;
font-weight: 400;
text-align: center;
white-space: nowrap;
vertical-align: middle;
background-color: #fff;
transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
  box-shadow 0.15s ease-in-out;
&:hover {
  border-width: 1px;
  color: #0056b3;
  background-color: #e9ecef;
  border-radius: 6px;
  border-color: #2979ff;
}
  border-width: 1px;
  border-style: solid;
  border-radius: 6px;
  border-color: #2979ff;
  clear: both;
`;

export const Text = styled.span`
  line-height: 14px;
`;

export const Input = styled.input<Widen>`
  width: ${ props => `${props.w * 14}px`};
  min-width: 24px;
  height: 16px;
  text-align: center;
`;
