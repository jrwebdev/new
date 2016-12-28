'use strict'; // eslint-disable-line

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const config = {
  context: path.join(__dirname, 'src'),
  entry: [
    'react-hot-loader/patch',
    './app.js'
  ],
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'app-bundle.js'
  },
  devtool: 'cheap-eval-module-source-map',
  resolve: {
    alias: {
      react$: path.resolve('./node_modules/react')
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }]
    }, {
      test: /\.json$/,
      use: [{
        loader: 'json-loader'
      }]
    }]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    // progress: true,
    port: 8080,
    stats: {
      hash: false,
      version: false,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'next',
      template: 'index.template.html',
      hash: true
    }),
    new ExtractTextPlugin('styles.css')
  ]
};

if (process.env.NODE_ENV === 'production') {

  config.module.rules.push({
    test: /\.css$/,
    use: [{
      loader: ExtractTextPlugin.extract('css')
    }]
  }, {
    test: /\.scss$/,
    use: [{
      loader: ExtractTextPlugin.extract('css!sass')
    }]
  });

  config.output.path = path.join(__dirname, 'dist');
  config.devtool = false;
  delete config.devServer;
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {NODE_ENV: JSON.stringify('production')}
  }));

} else {

  config.module.rules.push({
    test: /\.css$/,
    // loader: 'style!css?sourceMap!postcss'
    use: [{
      loader: 'style-loader'
    }, {
      loader: 'css-loader'
    }, {
      loader: 'postcss-loader',
      options: {
        plugins() {
          return [autoprefixer];
        }
      }
    }]
  }, {
    test: /\.scss$/,
    // loader: 'style!css?sourceMap!postcss!sass?sourceMap'
    use: [{
      loader: 'style-loader'
    }, {
      loader: 'css-loader'
    }, {
      loader: 'postcss-loader',
      options: {
        plugins() {
          return [autoprefixer];
        }
      }
    }, {
      loader: 'sass-loader'
    }]
  });

}

module.exports = config;
