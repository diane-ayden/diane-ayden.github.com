const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const basic = require('./config.js');

const development = {
    mode: 'development',
    devtool: 'eval-source-map', // generate source-map. in production use 'source-map' or 'hidden-source-map'
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 3000,
        hot: true,
        inline: true,
        historyApiFallback: true,
    }
};

module.exports = merge(basic, development);
