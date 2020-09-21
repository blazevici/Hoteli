const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  rules: [
    {
      test: /\.s(c|a)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
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
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin()
    ],
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
