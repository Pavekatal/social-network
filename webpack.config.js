const path = require('path')

module.exports = {
    entry: './index.js', // Входной файл, где пишем свой код
    output: {
        filename: 'main.js', // Выходной файл, который подключаем к HTML
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/social-network/', // Сохранится он по пути "./dist/main.js",
    },
}
