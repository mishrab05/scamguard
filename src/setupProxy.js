const proxy = require('http-proxy-middleware');

module.exports = (app) => {
    app.use('/api', proxy.createProxyMiddleware({
        target: 'http://172.214.52.33',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    }))
}