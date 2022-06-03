const path = require('path');

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry : './src/index.ts', // File đầu vào
    module : {
        rules : [
            {
                test: /\.ts$/,
                use : 'ts-loader',
                include : [path.resolve(__dirname, 'src')]
            }
        ]
    },
    resolve:{
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output : { // File đầu ra
        publicPath : 'public',
        filename : 'bundle.js', // Tên file đầu ra
        path : path.resolve(__dirname, 'public') // Nơi chưa file đầu ra
    }
}

module.exports = config;