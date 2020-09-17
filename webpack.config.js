module.exports = {
  rules: [
    {
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          // Requires sass-loader@^7.0.0
          options: {
            implementation: require('sass'),
            fiber: require('fibers'),
            indentedSyntax: true // optional
          },
          // Requires sass-loader@^8.0.0
          options: {
            implementation: require('sass'),
            sassOptions: {
              fiber: require('fibers'),
              indentedSyntax: true // optional
            },
          },
        },
      ],
    },
    {
      test: /\.css$/,
      loaders: ["style-loader","css-loader"]
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loader:"file-loader",
      options:{
        name:'[name].[ext]',
        outputPath:'assets/images/'
        //the images will be emited to dist/assets/images/ folder
      }
    }
  ],
  resolve: {
    alias: {
      // Force all modules to use the same jquery version.
      'jquery': path.join(__dirname, 'node_modules/jquery/src/jquery'),
      "jquery-ui": "jquery-ui/build/release.js",
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        "window.jQuery": "jquery",
        "window.$": "jquery"
    }),
    new webpack.SourceMapDevToolPlugin({
      exclude: ['popper.js']
    })
  ]
}
