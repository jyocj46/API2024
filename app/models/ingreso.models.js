module.exports = (sequelize, Sequelize) => {
	const Ingreso = sequelize.define('ingreso', {	
	  idingreso: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
        idcatedratico: {
			type: Sequelize.INTEGER
	  },
	  fechaingreso: {
			type: Sequelize.DATE
  	},
	  fechasalida: {
			type: Sequelize.DATE
	  },
	  estatus: {
			type: Sequelize.BOOLEAN
    },
    
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Ingreso;
} 