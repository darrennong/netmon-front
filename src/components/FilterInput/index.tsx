// Core
import React, { PureComponent } from 'react';
// Svg
import { IconSvg } from './svg';
// Styles
import { FilterContainer, Input } from './styles';

interface Props{
  t: Function;
  filterInputValue: string;
  setFilterInputValue: Function;
  onSearch: Function;
};

export default class FilterInput extends PureComponent<Props> {
  
  state = { isOnFocus: false };

  onChange(e: { target: { value: any; }; }){this.props.setFilterInputValue(e.target.value);}
  onKeyUp(e:any){
    if (e.which === 13) {
      this.props.onSearch(e.target.value);
    }
  };

  clearFilterInput = () => this.props.setFilterInputValue('');

  isInputOnFocusToggle(){
    const { isOnFocus } = this.state;
    this.setState({ isOnFocus: !isOnFocus });
  }

  render() {
    const { isOnFocus } = this.state;
    const { t, filterInputValue } = this.props;

    return (
      <FilterContainer>
        <Input
          placeholder={t('i18nNavigationMenu.searchTips')}
          value={filterInputValue}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          onBlur={this.isInputOnFocusToggle}
          onFocus={this.isInputOnFocusToggle}
        />
        <IconSvg
          isOnFocus={isOnFocus}
          filterIsEmpty={!filterInputValue.length}
          clearFilterInput={this.clearFilterInput}
        />
      </FilterContainer>
    );
  }
}
