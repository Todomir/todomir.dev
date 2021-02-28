const withImages = require('next-images')

module.exports = withImages({
  esModule: true,
  i18n: {
    locales: ['pt-BR', 'en-US'],
    defaultLocale: 'pt-BR'
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
})
