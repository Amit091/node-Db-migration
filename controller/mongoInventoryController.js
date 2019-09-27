const product = require('./../model/product');
const dbConnection = require('./dbConnection');

const chalk = require('chalk');
const errormsg = chalk.bold.red;
const warningmsg = chalk.keyword('orange');
const datamsg = chalk.keyword('teal');
exports.getIndex = async(req, res, next) => {
    try {
        const products = await getProduct();
        //await console.log(datamsg(products));
        await res.render('inventory/index', { products });
    } catch (e) {
        console.log(warningmsg(`Closed Due to Error`) + e);
        next(e);
    }
};

exports.getNewitemPage = async(req, res, next) => {
    try {
        await res.render('inventory/newitem');
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
    try {
        const productName = await req.body.productName;
        const productPrice = await req.body.productPrice;
        newProduct = await new product({
            name: productName,
            price: parseInt(productPrice)
        });
        const data = await newProduct.save();
        const products = await getProduct();
        console.log('Data Saved' + datamsg(data));
        res.redirect('/inventory');
        // return data;
    } catch (e) {
        console.log(warningmsg(`Closed Due to Error`) + e);
        next(e);
    }
};

exports.getDeleteData = async(req, res, next) => {
    console.log('it was called');

    try {
        const val = await product.deleteOne({ _id: req.params.id });
        console.log(val);

        if (val.deletedCount == 1) {
            await res.status(200).json({ message: "Post Deletion Successful !" });
            //reslove('deleted');
        } else {
            await res.status(401).json({ message: "Not authorized!" });
            //reject(err);
        }
    } catch (e) {
        await res.status(500).json({
            message: 'Error while deleting the post'
        });
        console.log(warningmsg(`Closed Due to Error`) + e);
        next(e);
    }
};



function getProduct() {
    return new Promise((reslove, reject) => {
        product.find({}) //for mongoDb
            // connection.promise().query("SELECT * FROM products") //for Mysql 
            .then((res) => {
                reslove(res);
            }).catch((e) => {
                reject(e);
            });
    });
}