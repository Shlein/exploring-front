import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src')
  };

  // Инициализация config.resolve, если его нет
  if (!config.resolve) {
    config.resolve = {};
  }

  // Инициализация config.resolve.modules, если его нет
  if (!config.resolve.modules) {
    config.resolve.modules = [];
  }
  config.resolve.modules.push(paths.src);

  // Инициализация config.resolve.extensions, если его нет
  if (!config.resolve.extensions) {
    config.resolve.extensions = [];
  }
  config.resolve.extensions.push('.ts', '.tsx');

  // Инициализация config.module, если его нет
  if (!config.module) {
    config.module = { rules: [] };
  }

  // Инициализация config.module.rules, если его нет
  if (!config.module.rules) {
    config.module.rules = [];
  }

  config.module.rules = config.module.rules.map(rule => {
    // Игнорируем falsy-значения (кроме объектов и строки '...')
    if (
      !rule ||
      typeof rule === 'boolean' ||
      typeof rule === 'number' ||
      rule === ''
    ) {
      return rule;
    }

    // Обрабатываем строку '...' (специальное значение Webpack)
    if (rule === '...') {
      return rule;
    }

    // Обрабатываем RuleSetRule
    if (
      rule.test &&
      typeof rule.test === 'string' &&
      /svg/.test(rule.test)
    ) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });

  // Обработка правил для SVG
  config.module.rules = (
    config.module.rules as Array<RuleSetRule | '...'>
  ).map(rule => {
    if (rule === '...') return rule;
    if (rule.test && /svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }
    return rule;
  });

  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack']
  });

  config.module.rules.push(buildCssLoader(true));

  // Инициализация config.plugins, если его нет
  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(
    new DefinePlugin({
      __IS_DEV__: true,
      __API__: 
    })
  );

  return config;
};
