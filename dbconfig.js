var IP = require('./ipAdress')
const config = {
    user: 'sa',
    password: 'sa',
    server: IP.ipAddress,
    database: 'Student_Management',
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCirtificate: true
    },

    port: 1433
}

module.exports = config; 

