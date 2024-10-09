const config = {
    user: 'sa',
    password: 'sa',
    server: '10.13.128.28',
    database: 'accounts',
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCirtificate: true
    },

    port: 1433
}

module.exports = config; 

