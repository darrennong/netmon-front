/* eslint-disable react/no-did-update-set-state */
import React, { PureComponent, Fragment } from 'react';
import { Wrapper, PageButton, CurrentPageBtn, Text, Input } from './styles';

interface Props{
  totalPages: number;
  page: number;
  pageTo: Function;
}
export default class PageNav extends PureComponent<Props>{
  constructor(props: Readonly<Props>){
    super(props);
    const npg = props.totalPages.toString().length;
    this.state = { width: 600,npg, };
  }
  updateWidth(){
    const wrpb = document.getElementById('wrapper');
    const wrpe = document.getElementById('wrappend');
    const newWidth = wrpe && wrpb ? wrpe.offsetLeft - wrpb.offsetLeft + 14 : 600;
    const { width }: any = this.state;
    if (!this.state || Math.abs(newWidth - width) > 8) this.setState({ width:newWidth });
  }

  componentDidMount() {
    this.updateWidth();
  }

  componentDidUpdate() {
    this.updateWidth();
    const npg = this.props.totalPages.toString().length
    if(npg!==(this.state as any).npg){
      this.setState({npg});
    }
  }

  pageTo(n: any){
    const { pageTo }:any = this.props;
    pageTo(n);
  };

  pageBtn(n:number){
    return (n > 0 ? <PageButton onClick={() => this.pageTo(n)}> {n} </PageButton> : null);
  }

  getFirst(){
    const { page }:any = this.props;
    return <Fragment>{page > 1 ? this.pageBtn(1) : null}</Fragment>;
  };

  getLast(){
    const { page, totalPages }:any = this.props;
    return <Fragment>{page < totalPages ? this.pageBtn(totalPages) : null}</Fragment>;
  };

  getPreSection(){
    const { page }:any = this.props;
    if (page > 6) {
      const p = Math.floor((page - 1) / 2);
      return <PageButton onClick={() => this.pageTo(p)}>...</PageButton>;
    }
    if (page === 6) {
      return (
        <Fragment>
          {this.pageBtn(2)}
          {this.pageBtn(3)}
        </Fragment>
      );
    }
    if (page === 5) {
      return this.pageBtn(2);
    }
    return null;
  };

  getCurrentSection(){
    const { page, totalPages }:any = this.props;
    return (
      <Fragment>
        {page > 3 ? this.pageBtn(page - 2) : null}
        {page > 2 ? this.pageBtn(page - 1) : null}
        {<CurrentPageBtn>{page}</CurrentPageBtn>}
        {page < totalPages - 1 ? this.pageBtn(page + 1) : null}
        {page < totalPages - 2 ? this.pageBtn(page + 2) : null}
      </Fragment>
    );
  };

  getNextSection = () => {
    const { totalPages, page }:any = this.props;
    if (page < totalPages - 5) {
      const n = Math.floor((page + 2 + totalPages) / 2);
      return <PageButton onClick={() => this.pageTo(n)}>...</PageButton>;
    }
    if (page < totalPages - 4) {
      return (
        <Fragment>
          {this.pageBtn(totalPages - 2)}
          {this.pageBtn(totalPages - 1)}
        </Fragment>
      );
    }
    if (page < totalPages - 3) {
      return this.pageBtn(totalPages - 1);
    }
  };

  getPrev(){
    const { page }: any = this.props;
    if (page > 1) {
      return <PageButton onClick={() => this.pageTo(page - 1)}>{'<'}</PageButton>;
    }
    return <PageButton>{'<'}</PageButton>;
  };

  getNext(){
    const { totalPages, page }:any = this.props;
    if (page < totalPages) {
      return <PageButton onClick={() => this.pageTo(page + 1)}>{'>'}</PageButton>;
    }
    return <PageButton>{'>'}</PageButton>;
  };

  onPageInputChange(evt: { currentTarget: any; }){
    const { totalPages, page }:any = this.props;
    const ipt = evt.currentTarget;
    if (ipt.value === '') return;
    let p = parseInt(ipt.value, 10);
    if (isNaN(p)) {
      p = page;
    } else if (p < 1) {
      p = 1;
    } else if (p > totalPages) {
      p = totalPages;
    }
    ipt.value = p;
  };

  onKeyUp(evt: { keyCode: number; currentTarget: any; }){
    if (evt.keyCode === 13) {
      const ipt = evt.currentTarget;
      const p = parseInt(ipt.value, 10)||1;
      this.pageTo(p);
    }
  };

  render() {
    const {width,npg}:any = this.state;
    return (
      <Wrapper id="wrapper" w={width}>
        {this.getPrev()}
        {this.getFirst()}
        {this.getPreSection()}
        {this.getCurrentSection()}
        {this.getNextSection()}
        {this.getLast()}
        {this.getNext()}
        <Text>跳至</Text>
        <Input w={npg} onChange={(event)=>this.onPageInputChange(event)} onKeyUp={(event)=>this.onKeyUp(event)}/>
        <Text id="wrappend">页</Text>
      </Wrapper>
    );
  }
}
