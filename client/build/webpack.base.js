const path = require('path');
const resolve = filename => path.resolve(__dirname, '../', filename);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPlugin = require('ts-import-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
    entry: resolve('src/index.tsx'),
    output: {
        filename: '[name].[contentHash].js',
        path: resolve('dist'),
    },
    resolve: {
        alias: {
            '@': resolve('src'),
            '~': resolve('node_modules'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
                    loader: 'px2rem-loader',
                    options: {
                        remUnit: 75,
                        remPrecesion: 8
                    }
                }, 'less-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: 'url-loader',
            },
            {
                test: /\.(j|t)sx?/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [tsImportPlugin({
                            'libraryName': 'antd',
                            'libraryDirectory': 'es',
                            'style': 'css'
                        })]
                    }),
                    compilerOptions: {
                        module: 'es2015',
                    }
                }
            },
            {
                test: /\.(jpg|svg|gif|jpeg|ico)$/,
                use: [
                    'file-loader',
                    { 
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75,
                            }
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contentHash].css',
            chunkFilename: 'css/[id].[contentHash].css',
        }),
        new HtmlWebpackPlugin({
            template: resolve('src/index.html'),
            hash: true,
            path: resolve('dist'),
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!**/dll', '!**/dll/**/*'],
        }),
        new DllReferencePlugin({
            manifest: require('../dist/dll/react.manifest.json'),
        }),
    ]
}