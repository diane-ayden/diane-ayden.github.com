const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const entry = {
    'vendors': ['@babel/polyfill', 'react', 'react-dom', 'react-router-dom', 'prop-types', 'reactstrap'],
    'app': path.join(process.cwd(), 'src/index'),
};

const output = {
    path: path.join(process.cwd(), 'dist'),
    filename: "[name]-[hash:8].js",
    chunkFilename: '[name]-[chunkhash:8].js',
    publicPath: '/'
};

const modules = {
    rules: [
        {
            test: /\.(jsx|js)$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: /node_modules/
        },
        {
            test: /\.(s)?css$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('autoprefixer')({
                                'browsers': ['> 1%', 'last 2 versions']
                            })
                        ]
                    }
                },
                'sass-loader'
            ], // place style-loader then css-loader
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: 'assets/images',
                    name: '[name]_[hash].[ext]'


                }
            },
            exclude: /node_modules/
        },
        {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader',
        }
    ],
}


const plugins = [
    new CleanWebpackPlugin(['dist'],{
        root: process.cwd()
      }),
    new HtmlWebpackPlugin({
        inject: true,
        template: path.join(process.cwd(), 'src/index.html')
    }),
    new webpack.NoEmitOnErrorsPlugin()
];

const optimization = {
    splitChunks: {
        name: 'vendors',
        chunks: "all"
    }
};

const resolve = { extensions: ['.js', '.jsx'] };

const config = {
    entry,
    output,
    module: modules,
    plugins,
    optimization,
    resolve,
    target: 'web'
};

module.exports = config;
