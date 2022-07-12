export default  
{// Vectors
  test: /\.(svg)$/i, 
  type: 'asset/resource',
  generator:
  {
    filename: 'assets/vectors/[name][hash][ext][query]'
  },
}