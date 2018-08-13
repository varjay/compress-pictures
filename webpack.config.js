const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const PKG = require('./package.json')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'none',
  devtool: 'source-map',
  entry: {
    [PKG.shortname]: './demo/entry.js',
    // [PKG.shortname+'.min']: './demo/entry.js',
  },
  output: {
    filename: '[name].js',
    libraryExport: 'default',
    library: PKG.shortname,
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      { 
        test: /\.(png|jpg|gif)$/, 
        use: [{ loader: 'url-loader',options: { limit: 8192 } }] 
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
  devServer: {
    contentBase: path.join(__dirname, "demo/public"),
    compress: true,
    hot: true,
    https: false,
    clientLogLevel: 'error'
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
    ),
    new HtmlWebpackPlugin({ template: './demo/index.html' }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }
};