import webpack from "webpack";
import path from 'path';
import nodeExtenrals from 'webpack-node-externals';
// directory
const CURRENT_WORKING_DIR: string = process.cwd();

const config: webpack.Configuration = {
    name: "server",
    entry: path.join(CURRENT_WORKING_DIR, 'server/server.ts'),
    output: {
        path: path.join(CURRENT_WORKING_DIR, 'dist'),
        filename: 'server.generated.js',
        publicPath: '/dist/',
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx'],
    },
    target: "node",
    externals: [nodeExtenrals()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },
}


module.exports = config;
