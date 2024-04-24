module.exports = {
  mode: 'development',
  devtool: "source-map",
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    }
  },
  devServer: {
    open: true,
    port: 3020,
    historyApiFallback: true,
  },
};