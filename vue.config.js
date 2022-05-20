module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://openapi.youdao.com',
          ws: true,
          changeOrigin: true,
          pathRewrite: { 
            '^/api': ''
          }
  
        },

        
      }
    }
  }