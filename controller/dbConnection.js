const mysql = require('promise-mysql');

const dbConfig = {
    user: "root",
    password: "",
    database: "projectx_db",
    host: "localhost",
    connectionLimit: 10
};

// module.exports = async() => {
//     try {
//         let pool;
//         let con;
//         if (pool) con = pool.getConnection();
//         else {
//             pool = await mysql.createPool(dbConfig);
//             con = pool.getConnection();
//         }
//         return con;
//     } catch (ex) {
//         throw ex;
//     }
// }


module.exports = async() => {
    try {
        let con = await mysql.createConnection(dbConfig);
        if (con) console.log('Mysql Connect');

        return con;
    } catch (ex) {
        throw ex;
    }
};