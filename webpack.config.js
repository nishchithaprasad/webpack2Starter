const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var path = require("path");
var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader','css-loader','sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: ['css-loader','sass-loader'],
    publicPath: '/dist'
});
var cssConfig = isProd ? cssProd : cssDev;
console.log(cssConfig);

module.exports = {
    entry: {
        app: './src/app.js',
        contact: './src/contact.js'
    },
    output: {
         path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js'
    },
    devServer: {
       contentBase: path.join(__dirname,"dist"),
       compress: true,
       hot: true,
       port: 9000,
       stats: "errors-only",
       open: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/, 
                use: cssConfig
            },
            // {
            //     test: /\.scss$/, 
            //     use: ['style-loader','css-loader','sass-loader']
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=[name].[ext]&outputPath=images/&publicPath=./',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            excludeChunks: ['contact'],
            template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new HtmlWebpackPlugin({
            title: 'Contact Page Demo',
            hash: true,
            chunks: ['contact'],
            filename: 'contact.html',
            template: './src/contact.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disabled: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}