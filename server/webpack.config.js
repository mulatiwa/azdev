import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  target: 'node',
  entry:
  {
    api: ['./src/server.js'],
  },/*
  (1) string | object | array
  (2) defaults to ./src
  (3) Here the application starts executing
  (4) and webpack starts bundling*/
  module: 
  {
    rules: 
    [
      {//JSX & JS
        test: /\.jsx?$/,
        use:
        {
          loader: 'babel-loader',
        },   
        include:[path.resolve(__dirname, 'src')],
        exclude:
        [
          path.resolve(__dirname, './node_modules/')
        ]/*
        (1) these are matching conditions, each accepting a regular expression or string
        (2) test and include have the same behavior, both must be matched
        (3) exclude must not be matched (takes preference over test and include)
        (4) Best practices:
          - Use RegExp only in test and for filename matching
          - Use arrays of absolute paths in include and exclude
          - Try to avoid exclude and prefer include*/
      },
      { //Graphql
        test: /\.graphql|\.gql$/, 
        loader: 'webpack-graphql-loader' 
      }
    ]
  },

};