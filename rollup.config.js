import dts from 'rollup-plugin-dts'; 
import terser from '@rollup/plugin-terser';

const watchFiles = ['lib/**'];

export default [
  {
    input: 'lib/index.js',
    output: {
      file: 'dist/index.js',
      sourcemap: true,
      format: 'es',
      name: 'chroma-harmony.js',
    },
    watch: {
      include: watchFiles,
    },
    plugins: [terser()],
  },
  {
    input: './lib/index.d.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
      name: 'chroma-harmony.js',
    },
    plugins: [dts()],
  },
];
