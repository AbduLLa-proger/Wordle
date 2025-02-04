import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  entry: path.resolve(__dirname, './src/typescript.ts'),
  output: {
    filename: 'javascript/[name].js', // Output file
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.js$/i, // For JavaScript
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
    ],
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js', '.css'], 
    alias: {
      '@styles': path.resolve(__dirname, './src/styles/'),
      '@assets/images': path.resolve(__dirname, './src/assets/images/')
    },
    plugins: [new TsconfigPathsPlugin()]
  },
  devServer: {
    static: './dist', // Serve files from the 'dist' directory
    open: 'chrome'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
  ],
  
  mode: 'development', // 'production' for optimized builds
};

