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

declare module "*.py" {
  const content: string;
  export default content;
}

declare module '*.png';

declare module "*.json" {
  const value: any;
  export default value;
}

declare namespace globalThis {
  var jsdom: any;
  var loadPyodide: any;
}

declare type Dict = {
  [key: string]: U;
}

declare type DictLimit<T> = Dict & T;