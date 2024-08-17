module.exports = {
    // 他の設定はそのまま
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
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,  // フォントファイル用のローダー
          use: ['file-loader'],
        },
        {
          test: /\.(png|jpg|gif)$/,  // 画像ファイル用のローダー
          use: ['file-loader'],
        },
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.vue', '.json'],
    },
  };