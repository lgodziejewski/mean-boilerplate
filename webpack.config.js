module.exports = {
    entry: './frontend/main',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [{
            test: /\.ts/, loaders: ['ts-loader'], exclude: /node_modules/
        }]
    },
    devtool: 'cheap-module-eval-source-map'
};
