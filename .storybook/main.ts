import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  }
};
export default config;


// // .storybook/main.ts
// import type { StorybookConfig } from '@storybook/react';

// const config: StorybookConfig = {
//   stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
//   addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
//   framework: '@storybook/react',
//   core: {
//     builder: 'webpack5',
//   },
// };

// export default config;