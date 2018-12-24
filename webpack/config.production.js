const merge = require('webpack-merge');
const basic = require('./config.js');

const production = {
    mode: 'production',
    devtool: 'source-map', // generate source-map. in production use 'source-map' or 'hidden-source-map'
};

module.exports = merge(basic, production);
