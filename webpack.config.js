var webpack           = require('webpack')
var path              = require('path')
var assign            = require('object-assign')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var isProd = process.env.NODE_ENV === 'production'
var isDev  = process.env.NODE_ENV === 'development'
var isIE   = process.env.NODE_ENV === 'ie'

var common = {
  entries : {
    app: './src/index.js'
  },
  plugins : [
    new HtmlWebpackPlugin({
      title    : 'TD Frontend Template',
      filename : 'index.html',
      template : `src/index.template.html`,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
}

var dev = {
  devtool: 'eval',

  entry: {
    app: (isIE ? [] : ['webpack-hot-middleware/client']).concat(common.entries.app)
  },

  plugins: (isIE ? [] : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]).concat(common.plugins)
}

var prod = {
  entry   : common.entries,
  plugins : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
  ].concat(common.plugins)
}

module.exports = assign({}, isProd ? prod : dev, {
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build', 'resources', 'static')
  },

  babel : {
    stage    : 0,
    plugins  : [],
    env: {
      development: isIE ? {} : {
        plugins: ["react-transform"],
        extra: {
          "react-transform": {
            transforms: [
              {
                transform: "react-transform-hmr",
                imports: ["react"],
                locals: ["module"]
              },
              {
                transform: "react-transform-catch-errors",
                imports: ["react", "redbox-react"]
              }
            ]
          }
        }
      }
    }
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.(png|gif|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
    ]
  },

  resolve: {
    alias : {}
  },
})
