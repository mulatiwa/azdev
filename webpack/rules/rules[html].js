export default  {// HTML
  test: /\.html$/,
  use:
  [ // apply multiple loaders and options
    {
      loader: "html-loader",
    }
  ]
}