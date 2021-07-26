import path from 'path';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-typescript2';

const pkgName = process.env.TARGET; // 包名


const pkgDir = path.resolve(`packages/${pkgName}`);

const resolve = (name) => path.resolve(pkgDir, name);

const buildOptions = require(resolve('package.json')).buildOptions;
const buildFormats = buildOptions.formats;

const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${pkgName}.esm-bundler.js`),
    format: 'es'
  },
  'cjs': {
    file: resolve(`dist/${pkgName}.cjs.js`),
    format: 'cjs'
  },
  'global': {
    file: resolve(`dist/${pkgName}.global.js`),
    format: 'iife'
  }
};

function createConfig(format, output) {
  output.name = buildOptions.name; 
  output.sourcemap = true;

  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [
      json(),
      ts({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      }),
      nodeResolve(),
    ]
  }
}

export default buildFormats.map(format => createConfig(format, outputConfigs[format]));