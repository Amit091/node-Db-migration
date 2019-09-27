const mysql = require('promise-mysql');

const dbConfig = {
    user: "root",
    password: "",
    database: "projectx_db",
    host: "localhost",
    connectionLimit: 100
};
module.exports = async() => {
    try {
        let con = await mysql.createConnection(dbConfig);
        if (con) console.log('Mysql Database Connection Established');
        return con;
    } catch (ex) {
        throw ex;
    }
};