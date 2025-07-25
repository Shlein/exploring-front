declare module '*.module.css';
declare module '*.module.scss';

declare module '*.svg' {
  import React from 'react';
  const SVG: React.VFC<React.SVGProps<SVGGElement>>;
  export default SVG;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'frontend' | 'jest';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
