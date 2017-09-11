var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var path = require("path");
module.exports = {
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "./js/[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader",
                    publicPath: "../"
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        noInfo: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "React tutorial",
            chunks: ["app"],
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: "./src/index.html"
        }),
        new ExtractTextPlugin({
            allChunks: true,
            disable: false,
            filename: "./css/[name].css"
        })
    ]
}