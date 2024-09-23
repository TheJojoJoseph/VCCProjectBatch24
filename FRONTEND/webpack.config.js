module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules/, // Ignore warnings for source maps in node_modules
      },
    ],
  }