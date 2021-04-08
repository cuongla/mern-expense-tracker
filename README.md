# Expense-Tracker

An full-stack mern expense tracker with data visulization to help users tracking their expenses every day, month, and year.

Link: https://mern-expense-tracking-app.herokuapp.com/

## Installation

`$ git clone https://github.com/tinla94/mern-expense-tracker` or click `Clone or download`.

### Code Folder

1. Install node packages: `npm install`
2. Start up browser to see UI: `npm run dev`

## Technology Use

### Front-End

1. `React` - an open-source JavaScript library which is used for building user interfaces specifically for single page applications.

2. `React Hooks` - functions that let us hook into the React state and lifecycle features from function components.

3. `Material-UI` - a component library for React teeming with powerful components that you should be using in your projects.

### Back-End

1. `Nodejs` - a free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser.

2. `Expressjs` - a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

3. `MongoDb` - a document database, which means it stores data in JSON-like documents

### Other Tools

1. `Typescript` - an open-source language which builds on JavaScript, one of the world's most used tools, by adding static type definitions.

2. `webpack` - a static module bundler for JavaScript applications

3. `Victory` - a React.js components for modular charting and data visualization.

## Setup for build

1. Setup webpack

### Client

```{
    name: 'browser',
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: path.join(CURRENT_WORKING_DIR, 'client/main.tsx'),
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
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
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png|jpeg)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
}
```

### Server

```
{
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
```

2. Connect client and server

```
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
```

3. Create a template for client

```
export default ({ markup, css }: { markup: any, css: any }) => {
  return `<!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            >
            <title>Social Media App</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Parisienne&family=Sacramento&display=swap" rel="stylesheet">
            <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            <style>
                a{
                  text-decoration: none;
                  color: #061d95
                }
            </style>
          </head>
          <body style="margin:0">
            <div id="root">${markup}</div>
            <style id="jss-server-side">${css}</style>
            <script type="text/javascript" src="/dist/bundle.js"></script>
          </body>
        </html>`
};
```

## Deployment

**npm run build**

```
    "build": "webpack --config webpack.config.client.production.ts && webpack --mode=production --config webpack.config.server.ts"
```

I have used Heroku as my deployment tool. You can check the link here for more information: 
https://devcenter.heroku.com/articles/git

## Authors
- **Cuong La**
