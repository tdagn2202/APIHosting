const config = {
    user: 'sa',
    password: 'sa',
    server: 'localhost',
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

