const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './index.js', // Входной файл, где пишем свой код
    output: {
        filename: 'main.js', // Выходной файл, который подключаем к HTML
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/social-network/', // Сохранится он по пути "./dist/main.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
}
