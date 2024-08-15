const db = require('../config/db.config')
const Product = db.Product

// '/api/products/create'
exports.create = (req, res) => {
    let product = {};

    try {
        product.product_name = req.body.product_name;
        product.price = req.body.price;
        product.description = req.body.description;

        Product.create(product).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Order with id = " + result.id,
                product: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: 'Fail',
            error: error.message
        });
    };
};

// '/api/products/all'
exports.retrieveAllProducts = (req, res) => {

    Product.findAll()
    .then(productsInfo => {
        res.status(200).json({
            message: "Get all products. Infos Succesfully!",
            product: productsInfo
        });
    })
    . catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'Error!',
            error: error
        });
    });
};

//router.get('/api/products/onebyid/:id', products.getProductById);
exports.getProductById = (req, res) => {
    let idProduct = req.params.id;

    Product.findByPk(idProduct)
        .then(product => {
            res.status(200).json({
                message: "Succesfully Get a Product with id = " + idProduct,
                products: product
            });
        })
        .catch(error => {
            console.log(error);
            
            res.stats(500).json({
                message: "Error!",
                error : error
            });
        });
};

//router.put('/api/products/update/:id',products.updateProductById);
exports.updateProductById = async (req, res) => {
    try {
        let idProduct = req.params.id;
        let product = await Product.findByPk(idProduct);

        if(!product){
            res.status(404).json({
                message: "Not found for updating a Product with id = " + idProduct,
                product: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                product_name: req.body.product_name,
                price: req.body.price,
                description: req.body.description
            }
            let result = await Product.update(updatedObject, {returning: true, where: {id_product: idProduct}});

            if(!result){
                res.status(500).json({
                    message: "Error -> Can not update a Product with id = " + req.params.id,
                })
            }
            res.status(200).json({
                message: "Update successfully a Product with id = " + idProduct,
                product: updatedObject
            })
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

//router.delete('/api/products/delete/:id', products.deleteProductById);
exports.deleteProductById = async (req, res) => {
    try {
        let idProduct = req.params.id;
        let product = await Product.findByPk(idProduct);

        if(!product){
            res.status(404).json({
                message: "Does Not Exist a Product with id = " + idProduct,
                error: "404"
            });
        } else {
            await product.destroy();
            res.status(200).json({
                message: "Delete Successfully a Product with id = " + idProduct,
                product: product
            });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}