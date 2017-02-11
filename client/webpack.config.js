module.exports = {
    devtool: 'cheap-module-source-map',
    entry: './src/main.js',
    output: {
        path: './dist',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015'],
                plugins: ['transform-object-rest-spread']
            }
        }]
    }
}