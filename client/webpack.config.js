const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates our html file
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Jate",
      }),

      // inject our service worker file
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js"
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Jate",
        description: "Create notes online or offline",
        backgroundColor: "red",
        themeColor: "blue",
        startUrl: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          }
        ]
      })
      
    ],

    module: {
      rules: [
        // Add css to webpack
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        
        
      ],
    },
  };
};
