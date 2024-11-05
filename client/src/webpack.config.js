const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Ponto de entrada do seu aplicativo
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map', // Para facilitar o debug
  mode: 'development', // Mude para 'production' para builds de produção
};
