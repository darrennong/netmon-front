import { POC_STYLE } from './../container/styles';
export const castToInt = (x: number) => (x ? x / 1 : 0);

export const formatNumber = (x: any) => {
  if (!x) {
    return 0;
  }
  const parts = parseFloat(castToInt(x).toFixed(2))
    .toString()
    .split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
};

export const formatDuring = (x1: string|number) => {
  let x = typeof x1 ==='string' ? parseInt(x1) : x1;
  if (x < 1000) {
    return `${x} μs`;
  }
  x /= 1000;
  if (x < 1000) {
    return `${x.toFixed(1)} ms`;
  }
  x /= 1000;
  if (x < 60) {
    return `${x.toFixed(1)} s`;
  }
  const m = x / 60;
  return `${m.toFixed(0)}min${(x % 60).toFixed(2)}s`;
};

export const formatBytes = (b: number) => {
  if (b < 1024) {
    return `${b} B`;
  }
  b /= 1024;
  if (b < 1024) {
    return `${b.toFixed(1)}KB`;
  }
  b /= 1024;
  if (b < 60) {
    return `${b.toFixed(1)} MB`;
  }
  b /= 1024;
  return `${b.toFixed(1)} GB`;
};

export const formatPOC = (poc?:string|number)=>{
  if(!poc) poc = 0;
  if( typeof poc === 'number')
    return poc.toLocaleString('zh',POC_STYLE)+` POC`;
  const [v,u] = poc.split(' ');
  return u?parseFloat(v).toLocaleString('zh',POC_STYLE)+' '+u:parseFloat(v).toLocaleString('zh',POC_STYLE);
}