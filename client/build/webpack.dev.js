const webpackConfig = require('./webpack.base');
const {smart} = require('webpack-merge');
const path = require('path');
const resolve = filename => path.resolve(__dirname, '../', filename);

module.exports = smart(webpackConfig, {
    mode: 'development',
     devtool: 'source-map',
        devServer: {
            hot: true,
            open: true,
            contentBase: resolve('dist'),
            riteToDisk: true,
            historyApiFallback: { // notFound direct to index.html
                index: './index.html',
            },
            host: '0.0.0.0',
        },
});