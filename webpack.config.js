const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/router/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new VueLoaderPlugin(), // VueLoaderPlugin を追加
    new JavaScriptObfuscator({
      rotateStringArray: true,
    }, ['excluded_bundle_name.js'])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.vue$/, // .vue ファイルを処理するためのルールを追加
        loader: 'vue-loader',
      },
      {
        test: /\.css$/, // CSS ファイルを処理するルールを追加（必要な場合）
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.vue', '.json'], // 拡張子の解決を追加
  },
};