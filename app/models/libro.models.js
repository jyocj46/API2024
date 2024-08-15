module.exports = (sequelize, Sequelize) => {
	const Libro = sequelize.define('libro', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  nombre: {
			type: Sequelize.STRING
	  },
	  editorial: {
			type: Sequelize.STRING
  	},
	  autor: {
			type: Sequelize.STRING
	  },
	  genero: {
			type: Sequelize.STRING
    },
    pais: {
        type: Sequelize.STRING
    },
    paginas: {
        type: Sequelize.INTEGER
    },
    anio: {
        type: Sequelize.DATE
    },
    precio: {
        type: Sequelize.FLOAT
    },

    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Libro;
} 