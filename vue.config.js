module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/thread-admin/'
    : '/',
  pwa: {
    name: 'Thread Admin',
  }
}
