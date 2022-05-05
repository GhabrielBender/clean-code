const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/public/js',
    path: path.join(__dirname, 'src'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{ test: /\.tsx$/, use: 'babel-loader' }],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      path: path.join(__dirname, 'src'),
    },
  },
  devServer: {
    static: './public',
    // writeToDisk: true,
    historyApiFallback: true,
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [new CleanWebpackPlugin()],
}
