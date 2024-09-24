module.exports = (sequelize, Sequelize) => {
	const Cancion = sequelize.define('cancion', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  namesong: {
			type: Sequelize.STRING
	  },
	  description: {
			type: Sequelize.STRING
  	},
	  artist: {
			type: Sequelize.STRING
	  },
	  duration: {
			type: Sequelize.INTEGER
    },
    extension: {
        type: Sequelize.STRING
    },
    album: {
        type: Sequelize.INTEGER
    },
    year: {
        type: Sequelize.INTEGER
    },

    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Cancion;
} 