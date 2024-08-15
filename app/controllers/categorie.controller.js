const { where } = require('sequelize');
const db = require('../config/db.config');
const Categorie = db.Categorie

// router.post('/api/categorie/create', categories.create);
exports.create = (req, res) => {
    let categorie = {};

    try {
        categorie.name = req.body.name;

        Categorie.create(categorie).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Order with id = " + result.id,
                categorie: result,
            })
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Fail",
            error: error.message
        });
    };
};

// router.get('/api/categorie/all', categories.retrieveAllProducts);
exports.retrieveAllProducts = (req, res) => {

    Categorie.findAll()
    .then(categoriesInfo => {
        res.status(200).json({
            message: "Get all Categories. Info Succesfully",
            categorie: categoriesInfo
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};

// router.get('api/categorie/onebyid/:id', categories.getCategorieById);
exports.getCategorieById = (req, res) => {
    let idCategorie = req.params.id;

    Categorie.findByPk(idCategorie)
        .then(categorie => {
            res.status(200).json({
                message: "Succesfully get a Categorie with id = " + idCategorie,
                categories: categorie
            });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// router.get('/api/categorie/update/:id', categories.updateProductById);
exports.updateProductById = async (req, res) => {
    try {
        let idCategorie = req.params.id;
        let categorie = await Categorie.findByPk(idCategorie);

        if(!categorie){
            res.status(404).json({
                message: "Not found for updating a Product with id = " + idCategorie,
                categorie: "",
                error: "404"
            });
        } else {
            let updateObject = {
                name: req.body.name
            }
            let result = await Categorie.update(updateObject, {returning: true, where: {id_categorie: idCategorie}});

            if(!result){
                res.status(500).json({
                    message: "Error -> Can not update a product with id = " + req.params.id,
                })
            }
            res.status(200).json({
                message: "Update succesfully a Categorie with id = " + idCategorie,
                categorie: updateObject
            });
        };
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: "Error!",
            error: error
        });
    };
};

// router.delete('/api/categorie/detele/:id', categories.deleteProductById);
exports.deleteProductById = async (req, res) => {
    try {
        let idCategorie = req.params.id;
        let categorie = await Categorie.findByPk(idCategorie);

        if(!categorie){
            res.status(404).json({
                message: "Does not exist a product with id = " + idCategorie,
                error: "404"
            });
        } else {
            await categorie.destroy();
            res.status(200).json({
                message: "Delete succesfully a product with id = " + idCategorie,
                categorie: categorie
            });
        };
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    };
};