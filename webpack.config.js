const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin") 
const Dotenv = require("dotenv-webpack");


module.exports = {
    // devServer
    mode:'development',
    // devtool: 'eval-cheap-source-map', 
    devServer: {
        // contentBase:'./dist', // 서버 시작 시 static 파일 경로 지정
        port:8891,
        hot:true
    },

    // webpack config
    entry:{
        raven: './src/index.js',
        app: ['./src/test/app.js', './src/test/bpp.js']
    },
    output:{
        filename:'[name].bundle.js', // '[name].[chunkhash].bundle.js'
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins:[
        new Dotenv(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename:'[name].css'}),
        new HtmlWebpackPlugin({template:'./src/index.html'})
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader:'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env', {
                                targets: {
                                    node:'current', // 노드일 경우만
                                    //browsers: ["last 3 versions", "ie >= 11"] // 각 브라우저로도 가능
                                }, 
                                modules: false, //<== 이거 에러나는데 왜 아는거지?? 
                                // useBuiltIns: 'usage' <== 이거 경고 나옴...
                            }
                        ],
                        // '@babel/preset-react', // 리액트를 사용한다면
                        // '@babel/preset-typescript' // 타입스크립트를 사용한다면
                    ],
                    plugins: ['@babel/plugin-syntax-dynamic-import',"@babel/plugin-transform-runtime"]
                },
                include: [path.resolve(__dirname, './src')],
                exclude: ['/node_modules'],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                {
                    loader:'css-loader',
                    options: {
                        sourceMap: true,
                    }
                },
                {
                    loader:'sass-loader',
                    options: {
                        sourceMap: true,
                    }
                }],
                exclude: ['/node_modules'],
            }
        ]
    },
}