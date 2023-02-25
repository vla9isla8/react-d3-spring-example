import {resolve} from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

import {Configuration as WebpackConfiguration} from "webpack";
import {Configuration as WebpackDevServerConfiguration} from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    entry: resolve(__dirname, './src/index'),
    resolve: {
        extensions: [".js", ".tsx", ".ts", ".mjs"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    output: {
        clean: true,
        filename: "index.js",
        path: resolve(__dirname, 'build'),
    },
    devServer: {
        static: resolve(__dirname, 'build'),
        historyApiFallback: true,
        port: 4000,
        open: true
    },
}

export default config;
