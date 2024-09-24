const db = require('../config/db.config.js');
const Cancion = db.Cancion;

exports.create = (req, res) => {
    let cancion = {};

    try{
        // Building cancion object from upoading request's body
        cancion.namesong = req.body.namesong;
        cancion.description = req.body.description;
        cancion.artist = req.body.artist;
        cancion.duration = req.body.duration;
        cancion.extension = req.body.extension;
        cancion.album = req.body.album;
        cancion.year = req.body.year;

        // Save to MySQL database
        Cancion.create(cancion).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Cancion with id = " + result.id,
                cliente: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllCancion = (req, res) => {
    // find all cliente information from 
    Cancion.findAll()
        .then(cancionInfos => {
            res.status(200).json({
                message: "Get all cancion' Infos Successfully!",
                cliente: cancionInfos
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

exports.getCancionById = (req, res) => {
  let cancionId = req.params.id;
  Cancion.findByPk(cancionId)
      .then(cancion => {
          res.status(200).json({
              message: " Successfully Get a Cancion with id = " + cancionId,
              cancion: cancion
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
        let cancionId = req.params.id;
        let cancion = await Cancion.findByPk(cancionId);
    
        if(!cancion){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a cancion with id = " + cancionId,
                cancion: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                namesong: req.body.namesong,
                description: req.body.description,
                artist: req.body.artist,
                duration : req.body.duration,
                extension : req.body.extension,
                album : req.body.album,
                year : req.body.year
            }
            let result = await Cancion.update(updatedObject, {returning: true, where: {id: cancionId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a cancion with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a cancion with id = " + cancionId,
                cancion: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a cancion with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let cancionId = req.params.id;
        let cancion = await Cancion.findByPk(cancionId);

        if(!cancion){
            res.status(404).json({
                message: "Does Not exist a cancion with id = " + cancionId,
                error: "404",
            });
        } else {
            await cancion.destroy();
            res.status(200).json({
                message: "Delete Successfully a cancion with id = " + cancionId,
                cancion: cancion,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a cancion with id = " + req.params.id,
            error: error.message,
        });
    }
}