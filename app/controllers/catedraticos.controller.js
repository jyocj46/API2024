const db = require('../config/db.config.js');
const Catedraticos = db.Catedraticos;

exports.create = (req, res) => {
    let catedraticos = {};

    try{
        catedraticos.name = req.body.name;
        catedraticos.fechacontratacion = req.body.fechacontratacion;
        catedraticos.fechanac = req.body.fechanac;
        catedraticos.genero = req.body.genero;
        catedraticos.titulo = req.body.titulo;
        catedraticos.salario = req.body.salario;
        // Save to MySQL database
        Catedraticos.create(catedraticos).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a catedraticos with id = " + result.id,
                catedraticos: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllCatedraticos = (req, res) => {
    // find all Employee information from 
    Catedraticos.findAll()
        .then(catedraticosInfos => {
            res.status(200).json({
                message: "Get all catedraticos' Infos Successfully!",
                catedraticos: catedraticosInfos
            });
        })
        . catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

exports.getCatedraticosById = (req, res) => {
  // find all Employee information from 
  let catedraticosId = req.params.id;
  Catedraticos.findByPk(catedraticosId)
      .then(catedraticos => {
          res.status(200).json({
              message: " Successfully Get a catedraticos with id = " + catedraticosId,
              catedraticos: catedraticos
          });
      })
      . catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}


exports.updateById = async (req, res) => {
    try{
        let catedraticosId = req.params.id;
        let catedraticos = await Catedraticos.findByPk(catedraticosId);
    
        if(!catedraticos){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a catedraticos with id = " + catedraticosId,
                catedraticos: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                name: req.body.name,
                fechacontratacion: req.body.fechacontratacion,
                fechanac: req.body.fechanac,
                genero: req.body.genero,
                titulo: req.body.titulo,
                salario: req.body.salario

            }
            let result = await Catedraticos.update(updatedObject, {returning: true, where: {id: catedraticosId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a catedraticosId with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a catedraticosId with id = " + catedraticosId,
                catedraticos: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a catedraticosId with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let catedraticosId = req.params.id;
        let catedraticos = await Catedraticos.findByPk(catedraticosId);

        if(!catedraticos){
            res.status(404).json({
                message: "Does Not exist a catedraticosId with id = " + catedraticosId,
                error: "404",
            });
        } else {
            await catedraticos.destroy();
            res.status(200).json({
                message: "Delete Successfully a catedraticosId with id = " + catedraticosId,
                catedraticos: catedraticos,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a catedraticosId with id = " + req.params.id,
            error: error.message,
        });
    }
}