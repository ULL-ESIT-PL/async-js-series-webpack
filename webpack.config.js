const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry:  path.resolve('.', 'src', 'index.js'),
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true // clean the /dist folder before each build
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new CopyPlugin({ patterns: [
      { from: "index.html" },
      { from: 'script-*.js' },
      { from: "favicon.ico" },
      { from: "load-script.html"}
    ]}),
  ],
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
};
