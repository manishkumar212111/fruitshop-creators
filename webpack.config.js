var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    target:'node',

  mode: "development",
  entry: './src/index.js',
  resolve: {
    extensions: [".js"]
  },
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
    headers: {
      'Cache-Control': 'no-store',
      get etag() { return Math.random() + ''; },
    },
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "/api"
    })
  }
};
