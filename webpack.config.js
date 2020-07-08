const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const ROOT = path.resolve(__dirname, ".");
const SOURCE = path.join(ROOT, "src");
const DEST = path.join(ROOT, "dist");

const PATHS = {
  appPackageJson: path.join(SOURCE, "package.json"),
  appSrc: SOURCE,
  appBuild: DEST,
  appHtml: path.join(SOURCE, "index.html"),
  appIndex: path.join(SOURCE, "index.tsx"),
  appPath: ROOT,
  appNodeModules: path.join(ROOT, "node_modules"),
  appPolyfillJs: path.join(SOURCE, "polyfills"),
};

const IS_PROD = process.env.NODE_ENV === 'production';

const devPlugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: PATHS.appHtml }),
];
const prodPlugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name][contenthash:8].css',
        chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({ template: PATHS.appHtml }),
    new BundleAnalyzerPlugin(),
];
const devServer = {
    publicPath: "/",
    contentBase: PATHS.appBuild,
    port: 8000,
    hot: true,
    historyApiFallback: true,
};
const optimization = {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            terserOptions: {
                parser: { ecma: 8 },
                compress: {
                    ecma: 5,
                    warnings: false,
                    comparisons: false,
                    inline: 2,
                },
                mangle: { safari10: true,},
                output: {
                    ecma: 5,
                    comments: false,
                    ascii_only: true,
                },
            },
            sourceMap: true //TODO: FROM env
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
              parser: safePostCssParser,
              map: false,
            },
            cssProcessorPluginOptions: {
              preset: ['default', { minifyFontValues: { removeQuotes: false } }],
            },
        }),
    ],
    splitChunks: {
        chunks: 'all',
        name: false,
    },
    runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
    },
};
const typescriptLoader = {
    test: /\.(ts|tsx)$/,
    use: [ 'babel-loader' ],
    exclude: /node_modules/
};
const cssLoader = {
    test: /\.scss$/,
    use: [
        IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
        {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
        },
        {
            loader: 'sass-loader',
            options: {
                implementation: require('sass'),
                sassOptions: {
                    fiber: require('fibers'),
                    sourceMap: true,
                    includePaths: ['node_modules'],
                },
                webpackImporter: false,
            }
        }
    ]
};
const urlLoader = {
    test: /\.(png|jpg|gif)$/i,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 8192,
            },
        },
    ],
};
const fileLoader = {
    test : /\.(png|jpe?g|gif)$/i,
    loader: 'file-loader',
    options: {
        name: '[name].[contenthash:8].[ext]',
        outputPath: 'assets/images/',
        publicPath: 'assets/images/',
    }
}
const loaders = {
    rules: [
        typescriptLoader,
        cssLoader,
        urlLoader,
        fileLoader,

    ]
}
const WEBPACK_CONFIG = {
    entry: {
        main: PATHS.appIndex,
    },
    output: {
        filename: IS_PROD ? '[name].[contenthash:8].js' : '[name].js',
        chunkFilename: IS_PROD ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js',
        path: PATHS.appBuild,
        publicPath: "/"
    },
    module: loaders,
    plugins: IS_PROD ? prodPlugins : devPlugins,
    optimization: IS_PROD ? optimization : undefined,
    mode: IS_PROD ? 'production' : 'development',
    devtool: IS_PROD ? undefined : 'inline-source-map',
    resolve: { extensions: ['.js','.ts', '.jsx', '.tsx'] },
    target: 'web',
    devServer: IS_PROD ? undefined : devServer,
};
module.exports = WEBPACK_CONFIG;