export default
{// Images
  test: /\.(png|jpe?g|gif)$/i, 
  type: 'asset/resource',
  generator:
  {
    filename: 'assets/imgs/[name][hash][ext][query]'
  },
}