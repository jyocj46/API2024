const db = require('../config/db.config.js');
const PrestamoLibro = db.PrestamoLibro;

exports.create = (req, res) => {
    let prestamoLibro = {};

    try{
        // Building cancion object from upoading request's body
        prestamoLibro.id_libro = req.body.id_libro;
        prestamoLibro.id_usuario = req.body.id_usuario;
        prestamoLibro.fecha_salida = req.body.fecha_salida;
        prestamoLibro.fecha_max = req.body.fecha_max;
        prestamoLibro.fecha_devolucion = req.body.fecha_devolucion;
        // Save to MySQL database
        PrestamoLibro.create(prestamoLibro).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a prestamos with id = " + result.id,
                prestamoLibro: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllPrestamoLibro = (req, res) => {
    // find all cliente information from 
    PrestamoLibro.findAll()
        .then(prestamoLibroInfos => {
            res.status(200).json({
                message: "Get all prestamo' Infos Successfully!",
                prestamoLibro: prestamoLibroInfos
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

exports.getPrestamoLibroById = (req, res) => {
  let prestamoLibroId = req.params.id;
  PrestamoLibro.findByPk(prestamoLibroId)
      .then(prestamoLibro => {
          res.status(200).json({
              message: " Successfully Get a prestamo with id = " + prestamoLibroId,
              prestamoLibro: prestamoLibro
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
        let prestamoLibroId = req.params.id;
        let prestamoLibro = await Libro.findByPk(prestamoLibroId);
    
        if(!prestamoLibro){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a prestamo with id = " + prestamoLibroId,
                pretamo: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                id_libro : req.body.id_libro,
                id_usuario : req.body.id_usuario,
                fecha_salida : req.body.fecha_salida,
                fecha_max : req.body.fecha_max,
                fecha_devolucion : req.body.fecha_devolucion
            }
            let result = await prestamoLibro.update(updatedObject, {returning: true, where: {id: prestamoLibroId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a prestamo with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a prestamo with id = " + prestamoLibroId,
                prestamoLibro: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a prestamo with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let prestamoLibroId = req.params.id;
        let prestamoLibro = await prestamoLibro.findByPk(prestamoLibroId);

        if(!prestamoLibro){
            res.status(404).json({
                message: "Does Not exist a prestamo with id = " + prestamoLibroId,
                error: "404",
            });
        } else {
            await prestamoLibro.destroy();
            res.status(200).json({
                message: "Delete Successfully a prestamo with id = " + prestamoLibroId,
                prestamoLibro: prestamoLibro,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a prestamo with id = " + req.params.id,
            error: error.message,
        });
    }
}