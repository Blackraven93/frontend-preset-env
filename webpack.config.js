// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

// module.exports = {
//     mode: 'development',
//     entry: './src/index.js',
//     output: {
//         filename: 'bundle.js',
//         // 보통 첫 인자를 root경로로 하는데 
//         // 루트 경로가 아닐 시 루트 경로를 앞에 붙임
//         path: path.resolve(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {   // css파일을 use의 규칙으로 사용하겠다.
//                 // 오른쪽 부터 왼쪽 순으로 왜?
//                 // sass -> css로 변환, 일괄 css loader 적용
//                 // 만약 inline style을 원한다면 'style-loader' 설정
//                 test: /\.css$/i,
//                 use: [{loader: MiniCssExtractPlugin.loader}, 'css-loader']
//             }
//         ]
//     },
//     // s빼먹지마 ㅠㅠ
//     plugins: [
//         new MiniCssExtractPlugin(),
//         new HtmlWebpackPlugin({
//             template:'./src/index.html'
//         })
//     ],
//     devServer: {
//         port:9000,
//         hot: true,
//         proxy: {
//             '/api' : 'domain.com',
//             changeOrigin: true
//         }
//     }
// };

module.exports = {
    mode:'development',
    entry: {
        raven: './src/index.js',
        app: ['./src/test/app.js', './src/test/bpp.js']
    },
    output: {
        filename:'[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env', {
                                targets: {
                                    node:'current', // 노드일 경우만
                                    //browsers: ["last 3 versions", "ie >= 11"] // 각 브라우저로도 가능
                                }, 
                                modules: false, //<== 이거 에러나는데 왜 아는거지??
                                useBuiltIns: 'usage'
                            }
                        ],
                        // '@babel/preset-react', // 리액트를 사용한다면
                        // '@babel/preset-typescript' // 타입스크립트를 사용한다면
                    ]
                },
                exclude: ['/node_modules'],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, {
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
    plugins:[
        new MiniCssExtractPlugin({filename:'[name].css'})
    ],
    optimization: {},
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
    
};

