const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: path.join(__dirname, 'app', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'public': path.resolve(__dirname, './public')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          },
          include: [
            path.resolve(__dirname, './app'),
            path.resolve(__dirname, './node_modules/vuetify')
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: [ 'transform-object-rest-spread' ]
        },
        include: [
          path.resolve(__dirname, './app'),
          path.resolve(__dirname, './node_modules/vuetify')
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          objectAssign: 'Object.assign'
        }
      },
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 8080
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}