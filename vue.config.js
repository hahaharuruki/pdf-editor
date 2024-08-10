const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        'pdfjs-dist/build/pdf.worker.entry': path.join(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.mjs'),
        vue$: 'vue/dist/vue.esm-bundler.js'
      },
    },
  },
});