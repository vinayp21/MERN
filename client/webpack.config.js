const path = require('path');
var webpack = require('webpack');

var config = {
   entry: './index.js',

   output: {
      path:path.resolve(__dirname, 'dist'),
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      historyApiFallback: true,
      port: 8080
   },

   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ["es2015", "react", "stage-0"]
            }
         },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader!autoprefixer-loader',
         },
         {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader',
         },
         { test: /jquery[\\\/]src[\\\/]selector\.js$/, loader: 'amd-define-factory-patcher-loader' },
         { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery' },

         { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
         { test: /\.(ttf|eot)$/, loader: 'file-loader' }

      ]
   },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']

      })

  ]
}

module.exports = config;
