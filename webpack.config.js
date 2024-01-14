const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          port: 5005,
          static: {
            directory: path.join(__dirname, 'public'),
          },
        },
      };

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  entry: {
    main: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module: {
    rules: [
      { test: /\.[tj]s$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: { extensions: ['.ts', '.js'] },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: './public' }],
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  ...devServer(development),
});
