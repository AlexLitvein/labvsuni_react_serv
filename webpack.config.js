const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const cssLoaders = extra => {
  // const loaders = [
  //   {
  //     loader: MiniCssExtractPlugin.loader,
  //     // options: {
  //     //   reloadAll: true
  //     // },
  //   },
  //   'css-loader'
  // ]

  const loaders = [
    MiniCssExtractPlugin.loader,
    "css-loader"
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]

  // if (isDev) {
  //   loaders.push('eslint-loader')
  // }

  return loaders
}

const plugins = () => {
  const base = [
    // new MiniCssExtractPlugin({
    //   filename: "app.css",
    // }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ]

  if (isProd) {
    base.push(new BundleAnalyzerPlugin())
  }

  return base
}

module.exports = {
  mode: 'development',
  entry: {
    // main: ['./client/app.jsx'],
    main: './client/app.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'public/js/'),
    // publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: plugins(),
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react')
        }
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
    ]
  }
}
