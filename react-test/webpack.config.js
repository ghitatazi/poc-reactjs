const webpack = require('webpack');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

// holds the directory path of the bundle file output
const BUILD_DIR = path.resolve(__dirname, './src/client/public');
// holds the directory path of the React application's codebase
const APP_DIR = path.resolve(__dirname, './src/client/prototype-test-Redux');

const config = {
  // MIN WEBPACK CONFIG:
  // entry file using which the bundling process starts
  // => index.jsx is the starting point of the application
  entry: [
    // 'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    APP_DIR + '/index.jsx',
  ],
  // Add resolve.extensions.
  // '' is needed to allow imports without an extension.
  // Note the .'s before extensions as it will fail to match without!!!
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  // MIN WEBPACK CONFIG:
  // instructs Webpack what to do after the bundling process has been completed
  // Here we say: use the src/client/public directory to output the bundled file
  // with the name bundle.js
  output: {
    path: BUILD_DIR,
    publicPath: '/public/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      // ceci va permettre également d'importer grace à require() des pages css
      // dans un module type jsx par exemple
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: APP_DIR,
      },
      // Set up jsx. This accepts js too thanks to RegExp
      {
        test: /\.jsx?$/,
        loaders: ['babel'], // 'react-hot',
        // Parse only app files! Without this it will go through entire project.
        // In addition to being slow, that will most likely result in an error.
        include: APP_DIR,
        exclude: /node_modules/, // exclude the static repo eventually
      },
      {
        // Some legacy modules rely on this being the window object
        // commonJS context: this equals module.exports
        test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
        loader: 'imports?this=>window',
      },
      {
        test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
        loader: 'imports?define=>false',
      },
    ],
  },
  plugins: [
    // actualisation des composants React sans passer par F5
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(), // don't reload if there is an error
    // tells webpack where to store data about your bundles
    new BundleTracker({ filename: './webpack-stats.json' }),
    // makes jQuery available in every module:
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    //enable React production mode => to change React from development mode to production
    // new webpack.DefinePlugin({
    //     "process.env": {
    //         NODE_ENV: JSON.stringify("production")
    //     }
    // })
  ],
};

module.exports = config;
