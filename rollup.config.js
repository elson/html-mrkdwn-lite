import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
      },
    ],
    external: ['dom-parser'],
    plugins: [typescript(), del({ targets: ['dist'] })],
  },
  {
    input: 'dist/build/index.d.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts(), del({ targets: ['dist/build'], hook: 'buildEnd' })],
  },
];
