const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './example/index.js',
  output: {
    filename: 'demo.js',
    path: path.resolve(__dirname, 'example')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'example/template.html'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}
