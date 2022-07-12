export default{//Data[JSON]
  test: /\.json$/i, 
  type: 'asset/inline',
  generator:
  {
    filename: 'assets/data/json/[name][hash][ext][query]',
  },
}