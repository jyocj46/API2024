module.exports = (sequelize, Sequelize) => {
	const Horarios = sequelize.define('horario', {	
	  idhorario: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
        idcatedratico: {
			type: Sequelize.INTEGER
	  },
	  curso: {
			type: Sequelize.STRING
  	},
	  horainicio: {
			type: Sequelize.TIME
	  },
	  horafin: {
			type: Sequelize.TIME
    },
    
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Horarios;
} 