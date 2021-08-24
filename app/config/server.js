module.exports = () => ({
    host: '127.0.0.1',
    port: process.env.PORT || 8000,
    protocol: 'http',
    timeout: 30000
});