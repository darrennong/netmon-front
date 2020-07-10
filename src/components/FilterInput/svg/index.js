// Core
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { SvgIcon, SvgCrossIcon } from '../styles';

export const IconSvg = ({ isOnFocus, filterIsEmpty, clearFilterInput }) =>
  filterIsEmpty ? (
    <SvgIcon viewBox="0 0 15 15">
      <ellipse
        ry="6"
        rx="6"
        id="svg_1"
        cy="7"
        cx="7"
        strokeWidth="1.5"
        stroke={isOnFocus ? '#548afd' : '#aaaaaa'}
        fill="#fff"
      />
      <line y2="15" x2="15" y1="11" x1="11" strokeWidth="1.5" stroke={isOnFocus ? '#548afd' : '#aaaaaa'} fill="none" />
    </SvgIcon>
  ) : (
    <SvgCrossIcon viewBox="0 0 357 357" onClick={clearFilterInput}>
      <polygon
        points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3
			214.2,178.5"
      />
    </SvgCrossIcon>
  );

IconSvg.propTypes = {
  isOnFocus: PropTypes.bool,
  filterIsEmpty: PropTypes.bool,
  clearFilterInput: PropTypes.func,
};
