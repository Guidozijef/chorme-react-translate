var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/content',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  mode: 'production',
  //babel重要的loader在这里
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './public'), // 不打包直接输出的文件
          to: './', // 打包后静态文件放置位置
          // ignore: ['.*'] // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
        }
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/public/popup.html')
    }),
  ]
}