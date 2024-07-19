const webpack = require('webpack');

module.exports = {
  // ... other config options
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify")
    }
  },
  plugins: [
    // ... other plugins
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]
};