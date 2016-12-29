'use strict'; // eslint-disable-line

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const config = {
  context: path.join(__dirname, 'src'),
  entry: {
    app1: './apps/app1/app1.js',
    app2: './apps/app2/app2.js',
  },
  output: {
    path: path.join(__dirname, 'src'),
    filename: '[name]/[name].min.js'
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
      template: 'index.template.html',
      filename: 'app1/index.html',
      hash: true,
      chunks: ['core', 'app1']
    }),
    new HtmlWebpackPlugin({
      template: 'index.template.html',
      filename: 'app2/index.html',
      hash: true,
      chunks: ['core', 'app2']
    }),
    new ExtractTextPlugin('[name]/[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'core'
    }),
  ]
};

if (process.env.NODE_ENV === 'production') {

  config.module.rules.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      loader: 'css-loader!postcss-loader'
    })
  }, {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      loader: 'css-loader!sass-loader!postcss-loader'
    })
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
    }]
  }, {
    test: /\.scss$/,
    // loader: 'style!css?sourceMap!postcss!sass?sourceMap'
    use: [{
      loader: 'style-loader'
    }, {
      loader: 'css-loader'
    }, {
      loader: 'postcss-loader'
    }, {
      loader: 'sass-loader'
    }]
  });

}

module.exports = config;
