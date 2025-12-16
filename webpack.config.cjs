const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|tsx)$/,
                exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg|ttf)$/,
                use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8000
                            }
                        }
                    ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    mode: 'development',
};