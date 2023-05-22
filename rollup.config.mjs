import clear from 'rollup-plugin-clear';
import ts from 'rollup-plugin-ts';


const bundle = (config) => ({
  ...config,
  input: 'src/index.ts',
  external: (id) => !/^[./]/.test(id),
});

export default [
  bundle({
    plugins: [
      clear({
        targets: ['./dist'],
      }),
      ts({
        transpiler: 'swc',
        swcConfig: {
          minify: {
            compress: true,
            mangle: true,
          },
        },
      }),
    ],
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es',
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.js',
        format: 'es',
        sourcemap: true,
      },
    ],
  }),
];
