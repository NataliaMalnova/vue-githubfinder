// vue.config.js
module.exports = {
  // options...
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-finder/'
    : '/',
  assetsDir: '',
  filenameHashing: true,
  productionSourceMap: false
}
  