const config = {
    user: 'sa',
    password: 'sa',
    server: '192.168.2.61',
    database: 'forAPITesting',
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCirtificate: true
    },

    port: 1433
}

module.exports = config; 

