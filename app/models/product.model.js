module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        id_product: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DOUBLE
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Product;
};