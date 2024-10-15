const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: './src/index.js', // Entry point of your app
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
          },
        port: 3001, // Port for your remote app
    },
    output: {
        publicPath: 'http://localhost:3001/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    overrides: [
                      {
                        test: /\.js$/i,
                        compact: false,
                      },
                    ]
                  }
                },
              },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'carrental',
            filename: 'remoteEntry.js',
            exposes: {
                './Carrental': './src/components/Carrental', // Path to your Carrental component
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: '^18.3.1', // Adjust based on your React version
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '^18.3.1',
                },
            },
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
