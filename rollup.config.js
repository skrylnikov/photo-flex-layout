import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import clear from 'rollup-plugin-clear';
import { terser } from 'rollup-plugin-terser';

const name = require('./package.json').main.replace(/\.js$/, '');

const bundle = config => ({
  ...config,
  input: 'src/index.ts',
  external: id => !/^[./]/.test(id),
});

export default [
  bundle({
    plugins: [
      esbuild(),
      clear({
        targets: ['./dist'],
      }),
      terser({ ecma: '2020' }),
    ],
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `${name}.mjs`,
        format: 'es',
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: 'es',
    },
  }),
];
