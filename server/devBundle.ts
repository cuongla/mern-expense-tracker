import { Application } from "express";
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const clientConfig = require('../webpack.config.client')

export const compile = (app: Application): any => {
    if (process.env.NODE_ENV == 'development') {
        const compiler = webpack(clientConfig);
        const middleware = webpackMiddleware(compiler, {
            publicPath: clientConfig.output.publicPath
        });
        app.use(middleware);
    };
};

export default {
    compile
}