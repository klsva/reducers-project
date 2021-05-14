//const { Module } = require('webpack');
const webpack = require('webpack')

const path = require('path') 
const HTMLWebpackPlugin = require('html-webpack-plugin') 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin') 
const MiniCssExtractPlugin = require('mini-css-extract-plugin') 
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const isDev = process.env.NODE_ENV==='development' 
const isProd = !isDev
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
    return config
}

module.exports = {
    context: path.resolve(__dirname, 'src'), 
    mode: 'development', 
    target: 'web',
    entry: { 
        main: ['@babel/polyfill', './main.js', './styles/main.scss'],
        site:['./styles/styles.scss'], 
        //catalog:['../src/catalog.js', './styles/styles.scss'],
    }, 

    plugins: [
        new HTMLWebpackPlugin({            
            template: './index.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['main']
        }),    
        new HTMLWebpackPlugin({    
            filename: 'about.html',        
            template: 'assets/about.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }),   
        new HTMLWebpackPlugin({    
            filename: 'contacts.html',        
            template: 'assets/contacts.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }),  
        new HTMLWebpackPlugin({    
            filename: 'cataloge.html',        
            template: 'assets/cataloge.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }),  
        new HTMLWebpackPlugin({    
            filename: 'reduktori-chervachnie-globoidnie.html',        
            template: 'assets/reduktori-chervachnie-globoidnie.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }),  
        new HTMLWebpackPlugin({    
            filename: 'reduktory-cilindricheskie.html',        
            template: 'assets/reduktory-cilindricheskie.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }),  
        new HTMLWebpackPlugin({    
            filename: 'reduktory-konichesko-cilindricheskie.html',        
            template: 'assets/reduktory-konichesko-cilindricheskie.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }), 
        new HTMLWebpackPlugin({    
            filename: 'reduktory-vertikalnye-kranovye.html',        
            template: 'assets/reduktory-vertikalnye-kranovye.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }), 
        new HTMLWebpackPlugin({    
            filename: 'reduktory-specialnye.html',        
            template: 'assets/reduktory-specialnye.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }), 
        new HTMLWebpackPlugin({    
            filename: 'motor-reduktory.html',        
            template: 'assets/motor-reduktory.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }), 
        new HTMLWebpackPlugin({    
            filename: 'remont.html',        
            template: 'assets/remont.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }),
        new HTMLWebpackPlugin({    
            filename: 'tormoza-kolodochnye.html',        
            template: 'assets/tormoza-kolodochnye.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }),
        new HTMLWebpackPlugin({    
            filename: 'lebyodki-elektricheskie.html',        
            template: 'assets/lebyodki-elektricheskie.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }),
        new HTMLWebpackPlugin({    
            filename: 'gruzopodyomnye-mexanizmy.html',        
            template: 'assets/gruzopodyomnye-mexanizmy.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }),
        new HTMLWebpackPlugin({    
            filename: 'mufty-muvp-i-mz.html',        
            template: 'assets/mufty-muvp-i-mz.html', 
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['site']
        }),

        new CleanWebpackPlugin(), 
        /*new CopyWebpackPlugin({
            /*patterns:[
                { 
                    from: path.resolve(__dirname, 'src/img/favicon.ico'), 
                    to: path.resolve(__dirname, 'dist'),
                }, 
            ]
        }),*/
        new MiniCssExtractPlugin({
            //filename: filename('css')
            filename: '[name].css',
        }),

        new ESLintPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    devServer: { 
        contentBase: './dist',
        //hot: isDev,        
        //inline: true
        //liveReload: true,
        
    },
    output: { 
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        
    },
    resolve: {
        extensions: ['.js', '.png', '.json', '.gif'],
        alias: {
            '@' : path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),    
    module: {
        rules: [
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/templates'),
                use: [
                    {
                        loader: 'html-loader', 
                        options: { esModule: false } 
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: 
                            {
                                publicPath: '', //без этого ругается)))                                
                            }, 
                    }, "style-loader", 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                    loader: MiniCssExtractPlugin.loader,
                    options: 
                        {
                            publicPath: '',                             
                        }, 
                    },
                    {
                    loader: 'css-loader',
                    },
                    {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        'postcssOptions': {
                            'config': path.resolve(__dirname, 'postcss.config.js'),
                        },
                    }
                    },
                    {
                    loader: 'sass-loader', options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,             
                loader: 'file-loader',
                options: {
                    esModule: false,
                    name: '[path][name].[ext]',
                    publicPath: './'
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',                            
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties"
                        ]                     
                    }                    
                }
            }
        ]
    }
}