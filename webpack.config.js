const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackNodeExternals = require('webpack-node-externals');

const cwd = process.cwd();

module.exports = {
  target: 'node',
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  entry: ['@babel/polyfill', './src/server.ts'],
  output: {
    path: path.resolve('build'),
    filename: 'index.js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js", ".mjs", ".json"],
    plugins:[new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  },
  externals: [
    WebpackNodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
    WebpackNodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
      whitelist: [/@provi/]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [/node_modules/],
        include: [path.join(cwd, 'src'), path.join(cwd, '../')],
      },
    ],
  },
};
