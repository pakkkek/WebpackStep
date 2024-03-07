const {join, resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
if(process.env.NODE_ENV === 'production'){
    mode = 'production';
}

module.exports = {
    mode,
    entry: './src/index.js', 
    module:{
        rules:[
            {test: /\.svg$/, use: 'svg-inline-loader'},
            // {test: /\.svg$/, use: ['style-loader', 'css-loader']},
            {test: /\.(js|jsx)$/, use: 'babel-loader'},
            {test: /\.html$/, use: 'html-loader'},
            //scss,css,sass
            {test: /\.(s[ac]|c)ss$/, use: [(mode === 'production') ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader']},
            {test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource',},
            {test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource',},
        ]
    },
    output:{
        path: resolve(__dirname, 'build'),
        filename: '[name]-[fullhash].js',
        clean: true
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            template: './src/product_details.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[fullhash].css'
        })
    ],
    devServer: {
        port: 3001,
        static: {
            directory: join(__dirname, 'src'),
        },
    }
}