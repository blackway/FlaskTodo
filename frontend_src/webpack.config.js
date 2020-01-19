const path = require('path'),
    miniCss = require('mini-css-extract-plugin'),
    SRC_PATH = path.resolve(__dirname, './svelte/main.js'),
    DEST_PATH = path.resolve(__dirname, '../static/js'),
    MODULES_PATH = path.resolve(__dirname, './node_modules');

module.exports = {
    mode: 'development',
    watch: true,
    devtool: 'source-map',
    entry: {
        app: SRC_PATH
    },
    output: {
        filename: 'app.min.js',
        chunkFilename: 'app.min.js',
        path: DEST_PATH
    },
    resolve: {
        alias: {
            'svelte': path.resolve(MODULES_PATH, 'svelte'),
            'sanitizeCss': path.resolve(MODULES_PATH, 'sanitize.css')
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    module: {
        rules: [
            {
                test: /\.(html|svelte)$/,
                exclude: /node_modules/,
                use: [{ loader: 'svelte-loader', options: { emitCss: true }}]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    miniCss.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [new miniCss({
        filename: '../css/[name].css'
    })]
};