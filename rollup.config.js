import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import postcss from 'rollup-plugin-postcss';
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpila com considerável suporte a navegadores
export default {
  input: 'src/wrapper.js', // Caminho relativo ao package.json
  external: [
    '@clappr/player',
    'clappr-queue-plugin',
    '@guzzj/clappr-youtube-playback',
    '@guzzj/level-selector'
  ],
  output: {
    name: 'VClapprPlayer',
    exports: 'named',
    globals: {
      '@clappr/player': 'Clappr',
      'clappr-queue-plugin': 'QueuePlugin',
      '@guzzj/clappr-youtube-playback': 'YoutubePlayback',
      '@guzzj/level-selector': 'LevelSelector'
    }
  },
  plugins: [
    commonjs(),
    postcss(),
    vue({
      css: true, // Dinamicamente injeta CSS como uma tag <style>
      compileTemplate: true, // Explicitamente converte template para função render
    }),
    buble({ transforms: { asyncAwait: false } }), // Transpila para ES5
  ],
};