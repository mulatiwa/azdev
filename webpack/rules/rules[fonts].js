export default  {//Fonts
  test: /\.(woff|woff2|eot|ttf|otf|)$/i,
  type: 'asset/resource',
  generator:
  {
    filename: 'assets/fonts/[name][hash][ext][query]'
  },
}