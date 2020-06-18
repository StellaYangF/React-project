const path = require('path');
const resolve = filename => path.resolve(__dirname, filename);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPlugin = require('ts-import-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => {
    const isDev = process.env.NODE_ENV === 'development';

    return {
        mode: !isDev ? 'production' : 'development',
        entry: resolve('src/index.tsx'),
        output: {
            filename: 'bundle.js',
            path: resolve('dist'),
        },
        devtool: 'source-map',
        devServer: {
            hot: true,
            contentBase: resolve('dist'),
            historyApiFallback: { // notFound direct to index.html
                index: './index.html',
            },
            host: '0.0.0.0',
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserWebpackPlugin({
                    parallel: true,
                    cache: true,
                    sourceMap: true,
                }),
                // new MiniCssExtractPlugin({}),
                new OptimizeCssAssetsPlugin({}),
            ],
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
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
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: isDev,
                                // hmr 失效后，强制方法
                                reloadAll: true,
                            }
                        }, 'css-loader', {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [ require('autoprefixer') ]
                            }
                        }, {
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
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
                ignoreOrder: false,
                moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`
            }),
            new HtmlWebpackPlugin({
                template: resolve('src/index.html'),
                path: resolve('dist'),
            })
        ]
    };
}