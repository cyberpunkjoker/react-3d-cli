/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const config: Config = {
  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  testEnvironment: "jest-fixed-jsdom",

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // 确保 ts-jest 使用正确的 tsconfig 配置
    },
  },

  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: "<rootDir>/",
    }),
  },

  setupFilesAfterEnv: ['<rootDir>/src/__test__/jest.setup.ts'],

  transform: {
    // 显式指定 ts-jest 处理 TypeScript
    '^.+\\.(ts|tsx)$': 'ts-jest',
    // 其他文件用 Babel
    '^.+\\.(js|jsx)$': 'babel-jest',
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },

  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};

export default config;
