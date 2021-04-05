import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from '../template';
import dotenv from 'dotenv';

// load .env
dotenv.config();

// routes
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

// modules for server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server';
import MainRouter from '../client/MainRouter';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import theme from '../client/theme';

import devBundle from './devBundle'
import { Application } from 'express-serve-static-core';

const CURRENT_WORKING_DIR = process.cwd();
const app: Application = express();

// connect with client webpack
devBundle.compile(app)

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// connecting to dist
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// mount routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', authRoutes);


// connect to react 
app.get('*', (req: Request, res: Response) => {
    const sheets = new ServerStyleSheets()
    const context: { url?: string } = {}
    const markup = ReactDOMServer.renderToString(
        sheets.collect(
            <StaticRouter location={req.url} context={context}>
                <ThemeProvider theme={theme}>
                    <MainRouter />
                </ThemeProvider>
            </StaticRouter>
        )
    );
    if (context.url) {
        return res.redirect(303, context.url)
    }
    const css = sheets.toString()
    res.status(200).send(Template({
        markup: markup,
        css: css
    }));
});

// Catch unauthorised errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
    }
});

export default app;