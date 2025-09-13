const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './index.js', // Входной файл, где пишем свой код
    output: {
        filename: 'main.js', // Выходной файл, который подключаем к HTML
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/social-network/', // Сохранится он по пути "./dist/main.js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,

                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new CopyPlugin({
            patterns: [{ from: 'assets/images', to: 'assets/images' }],
        }),
    ],
    mode: 'production',
}
