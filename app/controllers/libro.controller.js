const db = require('../config/db.config.js');
const Libro = db.Libro;

exports.create = (req, res) => {
    let libro = {};

    try{
        // Building cancion object from upoading request's body
        libro.nombre = req.body.nombre;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.pais = req.body.pais;
        libro.paginas = req.body.paginas;
        libro.year = req.body.year;
        libro.precio = req.body.precio;

        // Save to MySQL database
        Libro.create(libro).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Libro with id = " + result.id,
                libro: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllLibro = (req, res) => {
    // find all cliente information from 
    Libro.findAll()
        .then(libroInfos => {
            res.status(200).json({
                message: "Get all libro' Infos Successfully!",
                libro: libroInfos
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

exports.getLibroById = (req, res) => {
  let libroId = req.params.id;
  Libro.findByPk(libroId)
      .then(libro => {
          res.status(200).json({
              message: " Successfully Get a libro with id = " + libroId,
              libro: libro
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
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);
    
        if(!libro){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a libro with id = " + libroId,
                cancion: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                nombre : req.body.nombre,
                editorial : req.body.editorial,
                autor : req.body.autor,
                genero : req.body.genero,
                pais : req.body.pais,
                paginas : req.body.paginas,
                year : req.body.year,
                precio : req.body.precio
            }
            let result = await Libro.update(updatedObject, {returning: true, where: {id: libroId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a libro with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a libro with id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a libro with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if(!libro){
            res.status(404).json({
                message: "Does Not exist a libro with id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Delete Successfully a libro with id = " + libroId,
                libro: libro,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a libro with id = " + req.params.id,
            error: error.message,
        });
    }
}