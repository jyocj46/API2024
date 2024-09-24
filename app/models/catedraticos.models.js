module.exports = (sequelize, Sequelize) => {
	const Catedraticos = sequelize.define('catedraticos', {	
	  idcatedratico: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  name: {
			type: Sequelize.STRING
	  },
	  fechacontratacion: {
			type: Sequelize.DATE,
			allowNull: false
  	},
	  fechanac: {
			type: Sequelize.DATE,
			allowNull: false
	  },
	  genero: {
			type: Sequelize.STRING
    },
    titulo: {
        type: Sequelize.STRING
    },
    salario: {
        type: Sequelize.FLOAT
    },
    
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Catedraticos;
} 