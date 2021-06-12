const chalk = require('chalk');
const warningmsg = chalk.keyword('orange');
const dbConnection = require("./dbConnection");

exports.getIndex = async(req, res, next) => {
    try {
        const products = await getProduct();
        //await console.log(products);
        res.render('inventory/index', { products });
    } catch (e) {
        console.log(warningmsg(`Closed Due to Error`) + e);
        next(e);
    }
};

exports.getNewitemPage = async(req, res, next) => {
    try {
        const products = await getProduct();
        await res.render('inventory/newitem', { products });
    } catch (e) {
        console.log(warningmsg(`Closed Due to Error`) + e);
        next(e);
    }
};
exports.getAllData = async(req, res, next) => {
    try {
        const products = await getProduct();
        await res.render('inventory/list', { products });
    } catch (e) {
        console.log(warningmsg(`Closed Due to Error`) + e);
        next(e);
    }
};

exports.postNewItem = async(req, res, next) => {

    const productName = await req.body.productName;
    const productPrice = await req.body.productPrice;
    let con = await dbConnection();

    try {
        let savedTodo = await con.query(
            `INSERT INTO products (name, price) VALUE('${productName}',${productPrice})`);
        await con.query("COMMIT");
        console.log(savedTodo);
        const products = await getProduct();
        console.log(products);
        res.render('inventory/index', { products });
    } catch (ex) {
        console.log(ex);
        throw ex;
    } finally {
        con.destroy();
    }

};

exports.getDeleteData = async(req, res, next) => {
    console.log('it was called');
    let con = await dbConnection();
    try {
        const id = await parseInt(req.params.id);
        console.log(id);
        const val = await con.query(`DELETE FROM products WHERE id ='${id}'`);
        console.log(val);
        if (val.affectedRows == 1) {
            await res.status(200).json({ message: "Post Deletion Successful !" });
            //reslove('deleted');
        } else if (val.deletedCount == 1) {
            await res.status(200).json({ message: "Post Deletion Successful !" });
            //reslove('deleted');
        } else {
            await res.status(401).json({ message: "Not authorized!" });
            //reject(err);
        }
    } catch (e) {
        await res.status(500).json({
            message: 'Error while deleting the post' + e
        });
        console.log(e);
    } finally {
        con.destroy();
    }
};


async function getProduct() {
    let con = await dbConnection();
    try {
        var res = await con.query("SELECT * FROM products"); //for Mysql 
        res = JSON.parse(JSON.stringify(res));
        return res;
    } catch (error) {
        return error;
    } finally {
        // await con.release();
        await con.destroy();
        // con.end();
    }
}