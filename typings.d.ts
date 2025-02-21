declare module '*.css';
declare module '*.wav';

declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.glsl" {
  const value: string;
  export default value;
}

declare module '*.png';

declare type Dict = {
  [key: string]: U;
}

declare type DictLimit<T> = Dict & T;