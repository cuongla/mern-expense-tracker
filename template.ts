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