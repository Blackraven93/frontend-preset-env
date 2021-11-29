const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        // 보통 첫 인자를 root경로로 하는데 
        // 루트 경로가 아닐 시 루트 경로를 앞에 붙임
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {   // css파일을 use의 규칙으로 사용하겠다.
                // 오른쪽 부터 왼쪽 순으로 왜?
                // sass -> css로 변환, 일괄 css loader 적용
                // 만약 inline style을 원한다면 'style-loader' 설정
                test: /\.css$/i,
                use: [{loader: MiniCssExtractPlugin.loader}, 'css-loader']
            }
        ]
    },
    // s빼먹지마 ㅠㅠ
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    devServer: {
        port:9000
    }
};