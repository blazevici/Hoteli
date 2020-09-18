const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      loaders: [MiniCssExtractPlugin.loader,"css-loader"]
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
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new UglifyJsPlugin()],
  },
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
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/i,
      algorithm: 'gzip',
    }),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin(),
  ],
}
