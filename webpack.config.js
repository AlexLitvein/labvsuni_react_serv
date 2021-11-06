const path = require('path');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

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

module.exports = {
  mode: 'development',
  entry: {
    main: ['./client/app.jsx'],
  },  
  output: {
    path: path.resolve(__dirname, '/public/js/'),
    filename: 'bundle.js',
  },
  devtool: isDev ? 'source-map' : '',
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
      }
    ]   
  }
}
