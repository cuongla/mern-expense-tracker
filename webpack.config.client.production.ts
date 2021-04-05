import webpack from 'webpack';
import path from 'path';
const CURRENT_WORKING_DIR: string = process.cwd()

const config: webpack.Configuration = {
    name: 'browser',
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: path.join(CURRENT_WORKING_DIR, 'client/main.tsx'),
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            path: require.resolve('path-browserify')
        },
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
}

module.exports = config;