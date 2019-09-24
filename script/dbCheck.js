var con = require('../middleware/dbConnection');


module.exports = {
        up: async(con) => {
            try {
                const create_table = `
            CREATE TABLE tbl_user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                 name VARCHAR(255),
                  email VARCHAR(255),
                  password VARCHAR(255),
                  date date)"
            `;

            } catch (err) {
                console.log(err);
            }
        }
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            con.query("CREATE DATABASE mydb", function(err, result) {
                if (err) throw err;
                console.log("Database created");
            });
        })