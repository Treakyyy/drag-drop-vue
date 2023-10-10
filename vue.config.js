const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
  ? '/drag-drop-vue/' // Замените 'your-repo-name' на имя вашего репозитория
  : '/'

})
