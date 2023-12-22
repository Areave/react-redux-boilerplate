const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

const miniCss = new MiniCss({
    filename: 'mainPage.css'
});

const terserPlugin = new TerserPlugin({
    extractComments: false
});

const copyPlugin = new CopyPlugin({
    patterns: [
        {
            from: 'stub',
            to: 'assets/stub',
            context: 'src/assets',
            noErrorOnMissing: true
        }
    ]
});

module.exports = function (_, webpackEnv) {

    const isDevelopment = webpackEnv.mode === 'development';
    const isProduction = webpackEnv.mode === 'production';
    const getStyleLoaders = () => {
        return [
            isDevelopment && 'style-Loader',
            isProduction && MiniCss.loader,
            {
                loader: 'css-Loader',
                options: {
                    esModule: true,
                    // modules: {
                    //     localIdentName: isDevelopment
                    //         ? '[folder]_[local]_[hash:base64:4]'
                    //         : '[hash:base64:5]',
                    // },
                    sourceMap: isDevelopment,
                }
            },
            {
                loader: 'postcss-Loader',
                options: {
                    postcssOptions: {
                        plugins: ['autoprefixer']
                    }
                }
            },
            {
                loader: 'sass-Loader',
                options: {
                    implementation: require('sass'),
                    sourceMap: isDevelopment
                }
            }
        ].filter(Boolean);

    };

    const tsRule = {
        test: /\.(ts|tsx)$/, exclude: /node_modules/, loader: 'ts-loader'};

    const cssRule = {
        test: /\.s?css$/, use: [
            MiniCss.loader,
            {
                loader: 'css-Loader',
                options: {
                    esModule: true,
                    // modules: {
                    //     localIdentName: isDevelopment
                    //         ? '[folder]_[local]_[hash:base64:4]'
                    //         : '[hash:base64:5]',
                    // },
                    sourceMap: isDevelopment,
                }
            },
            {
                loader: 'postcss-Loader',
                options: {
                    postcssOptions: {
                        plugins: ['autoprefixer']
                    }
                }
            },
            {
                loader: 'sass-Loader',
                options: {
                    implementation: require('sass'),
                    sourceMap: isDevelopment
                }
            }
        ]
    };

    const fontsRule = {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        exclude: [/node_modules/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        type: "asset/resource",
        generator: {
            filename: 'assets/fonts/[name]_[contenthash:8].[ext]'
        }
    };

    const imgRule = {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        // type: 'asset/resource',
        exclude: [/node_modules/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        use: [{
            loader: 'file-Loader',
            options: {
                outputPath: 'assets/images/',
                name: '[name]_[contenthash:8].[ext]'
            }
        }]
    };

    return {
        devtool: isDevelopment ? 'cheap-module-source-map' : false,
        target: ['web', 'es5'],
        entry: './src/index.tsx',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },

        output: {
            path: path.resolve(__dirname, 'public'),
            filename: isDevelopment ? "./js/[name].js" : "./js/[name]_[contenthash:8].js",
            chunkFilename: isDevelopment ? "./js/[name].js" : "./js/[name]_[contenthash:8].js",
            assetModuleFilename: 'assets/[hash][ext]',
            clean: true
        },

        module: {
            rules: [tsRule, cssRule, fontsRule, imgRule]
        },
        optimization: {
            minimize: isProduction,
            minimizer: [terserPlugin],
        },
        plugins: [htmlWebpackPlugin, miniCss, copyPlugin, new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(webpackEnv.mode),
            },
            // ...
        })],
        devServer: {
            historyApiFallback: true,
            port: 3000
        },

        // watch: true
    }
};

