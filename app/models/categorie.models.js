module.exports = (sequelize, Sequelize) => {
    const Categorie = sequelize.define('categorie', {
        id_categorie: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
    return Categorie;
}