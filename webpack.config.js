const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var path = require('path');
var webpack = require('webpack');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

let config = {
    entry:{
        'index': [ './src/index.tsx' ],
    },
    output: {
        path: path.resolve(__dirname,'dist/build'),
        publicPath: 'build',
        filename: '[name].js',
        chunkFilename: '[name].js',
        sourceMapFilename: `../sourceMaps/[name].map`
    },
    resolve: {
        extensions: ['*', '.js', '.jsx','.ts','.tsx'],
        alias: {

        }
    },
    externals: {

    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.(ts|tsx)?$/,
                use: "ts-loader",
            },
            {
                test: /\.(jsx|js)?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    }
                },
                exclude:/node_modules/
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname,'src'),
                ],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?cacheDirectory=true',
                    'sass-loader?cacheDirectory=true'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?cacheDirectory=true',
                ]
            }]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    safe: true
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: "vendor",
                    priority: 10,
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[name].vendor.css'  // use contenthash *
        }),
        // 	mode=="development"&& new ForkTsCheckerWebpackPlugin({
        // 	//	typescript: resolve.sync('typescript',
        // 		//	{ basedir: paths.appNodeModules }
        // 	//		),
        // 	//	async: isEnvDevelopment,
        // 		async: true,
        // 	//	useTypescriptIncrementalApi: true,
        // 	//	eslint:false,
        // 	//	checkSyntacticErrors: true,
        // 		// resolveModuleNameModule: process.versions.pnp
        // 		// 	? `${__dirname}/pnpTs.js`
        // 		// 	: undefined,
        // 		// resolveTypeReferenceDirectiveModule: process.versions.pnp
        // 		// 	? `${__dirname}/pnpTs.js`
        // 		// 	: undefined,
        // 	//	tsconfig: paths.appTsConfig,
        // 	// 	reportFiles: [
        // 	// 		'**',
        // 	// 		'!**/__tests__/**',
        // 	// 		'!**/?(*.)(spec|test).*',
        // 	// 		'!**/src/setupProxy.*',
        // 	// 		'!**/src/setupTests.*',
        // 	// 	],
        // //		silent: false,
        // 		// The formatter is invoked directly in WebpackDevServerUtils during development
        // 		//formatter: isEnvProduction ? typescriptFormatter : undefined,
        // 	//	workers:1,
        // 				memoryLimit:8192,
        // 	}),

        // 允许错误不打断程序
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin(),

    ].filter(Boolean),
    devServer:{
        contentBase:'.',
        host:'0.0.0.0',
        compress:true,
        open:true,
        port:9000,
        disableHostCheck: true,
        public:'localhost:9000/web',
        progress:true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },

    },
    stats: { children: false },
}


module.exports = config;
