var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    target:'web',

  mode: "development",
  entry: './src/index.js',
  resolve: {
    extensions: [".js"]
  },
  node: {fs: "empty"},
  module: {
    rules: [
       {
          test: /\.js$/,
          use: 'babel-loader',
       },
       {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
       },
       {
        test: /\.scss$/,
        use: ['css-loader' , 'sass-loader'],
        },
       {
          test: /\.(png|j?g|svg|gif)?$/,
          use: 'file-loader'
       }
    ]
    },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  devServer: {
    historyApiFallback: true,
  },
};
