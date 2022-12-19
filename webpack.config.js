const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },

  plugins: [new MiniCssExtractPlugin()],
};
