var dbconfig = {
    development: {
        host     : 'localhost',
        port     : '3306',
        user     : 'root',
        database : 'term_user',
        password : ''
    },
    production: {
        host     : 'localhost',
        port     : '3306',
        user     : 'dbuser',
        password : 'P@ssw0rd@2023',
        database : 'term_user'
    }
    };
module.exports = dbconfig;