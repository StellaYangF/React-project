const webpackConfig = require('./webpack.base');
const {smart} = require('webpack-merge');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
// const glob = require('glob');
// const path = require('path');

module.exports = smart(webpackConfig, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                parallel: true,
                cache: true,
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
            }),
            // 必须和 mini-css-extract-plugin 配合是哦也难怪
            // new PurgecssWebpackPlugin({
            //     paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`)
            // })
        ],
    },
});