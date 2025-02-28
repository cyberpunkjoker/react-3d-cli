/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  // 解决 Webpack 别名问题
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 对应 webpack 的 resolve.alias 配置
    '\\.(css|less|scss)$': 'identity-obj-proxy', // 处理样式文件
  },

  transform: {
    // 显式指定 ts-jest 处理 TypeScript
    '^.+\\.(ts|tsx)$': 'ts-jest',
    // 其他文件用 Babel
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
};

export default config;
