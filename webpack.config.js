const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const projectRoot = path.resolve(__dirname);
const appPath = path.resolve(projectRoot, 'app');
const publicPath = path.resolve(projectRoot, 'public');

const pathsToClean = [
  'public/*.html',
  'public/*.js',
  'public/*.gz',
  'public/*.css',
  'public/*.map',
  'public/views/*.pug',
];

const cleanOptions = {
  root: projectRoot,
  exclude: [],
  verbose: true,
  dry: false,
};

module.exports = {
  entry: {
    app: path.join(appPath, 'index.js'),
    vendor: ['vue', 'vuex', 'vue-router', 'vuetify', 'url', 'lodash'],
  },
  output: {
    filename: '[name].bundle.js',
    path: publicPath,
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      public: publicPath,
    },
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        include: appPath,
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
          include: [
            appPath,
            path.resolve(__dirname, './node_modules/vuetify'),
          ],
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        include: appPath,
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: ['transform-object-rest-spread'],
        },
        include: [
          appPath,
          path.resolve(__dirname, './node_modules/vuetify'),
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          objectAssign: 'Object.assign',
        },
      },
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      filename: 'views/index.pug',
      template: path.join(appPath, 'views/index.pug'),
    }),
    new HtmlWebpackPugPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
} else {
  module.exports.entry = {
    app: [path.join(appPath, 'index.js')],
    vendor: [
      'vue', 'vuex', 'vue-router', 'vuetify',
      'url', 'lodash', 'webpack-hot-middleware/client',
    ],
  };
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true,
    }),
  ]);
}
