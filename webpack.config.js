// @ts-check

const webpack = require("webpack");

// Pass in the build configuration as environment variables
const CONFIG = process.env.BUILD_CONFIG

// Modify the webpack settings based on the configuration
const plugins = [];
let bundleSuffix = '';
let devtool;

if (CONFIG === 'debug') {
  devtool = "source-map";
} else {
  bundleSuffix = ".min";
}

//
// Webpack configuration
//

/** @type {import('webpack').Configuration} */
module.exports = {
  // entry: './src/index.ts',
  entry: './chronos.js',
  target: 'web',
  devtool,
  mode: CONFIG === 'debug' ? 'development' : 'production',
  output: {
    path: __dirname + '/dist/',
    filename: bundleSuffix + '.js',
  },
  optimization: {
    minimize: CONFIG !== 'debug',
  },
  plugins: [
    new webpack.IgnorePlugin(/^pg-native$/),
    new webpack.IgnorePlugin(/^osx-temperature=sensor$/),
    new webpack.IgnorePlugin(/^systeminformation$/),
  ],
  node: {
    child_process: 'empty',
    'osx-temperature=sensor': 'empty',
    fs: 'empty',
    crypto: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    pg: 'empty',
    smc: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            declaration: false,
            declarationMap: false,
          }
        }
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
