const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PKG = require('./package.json')

module.exports = {
  mode: 'none',
  entry: {
    [PKG.shortname]: './src/index.js',
    [PKG.shortname+'.min']: './src/index.js',
  },
  output: {
    filename: '[name].js',
    libraryExport: 'default',
    library: PKG.shortname,
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-import'),
                require('autoprefixer'),
              ],
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        include: /\.min\.js$/,
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            warnings: false,
            comparisons: false,
            drop_console: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.min\.css$/,
    }),
    new webpack.BannerPlugin(
      PKG.name + '\n@version '+ PKG.version +'\n@see https://github.com/'+ PKG.githubAccount +'/'
    )
  ],
};