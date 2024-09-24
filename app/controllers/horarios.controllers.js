const db = require('../config/db.config.js');
const Horarios = db.Horarios;

exports.create = (req, res) => {
    let horarios = {};

    try{
        // Construir objeto Horarios a partir del body de la solicitud
        horarios.idcatedratico = req.body.idcatedratico;
        horarios.curso = req.body.curso;
        horarios.horainicio = req.body.horainicio;
        horarios.horafin = req.body.horafin;

        // Guardar en la base de datos
        Horarios.create(horarios).then(result => {    
            // enviar mensaje de éxito
            res.status(200).json({
                message: "Horario subido exitosamente con id = " + result.id,
                horarios: result,
            });
        });
    } catch(error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
}

exports.retrieveAllHorarios = (req, res) => {
    // Buscar toda la información de los horarios
    Horarios.findAll()
        .then(horariosInfos => {
            res.status(200).json({
                message: "¡Horarios obtenidos exitosamente!",
                horarios: horariosInfos
            });
        })
        .catch(error => {
          console.log(error);

          res.status(500).json({
              message: "¡Error!",
              error: error
          });
        });
}

exports.getHorariosById = (req, res) => {
    let horarioId = req.params.id;
    Horarios.findByPk(horarioId)
        .then(horarios => {
            res.status(200).json({
                message: "¡Horario obtenido exitosamente con id = " + horarioId,
                horario: horarios
            });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "¡Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let horarioId = req.params.id;
        let horario = await Horarios.findByPk(horarioId);
    
        if (!horario) {
            res.status(404).json({
                message: "No se encontró el horario con id = " + horarioId,
                horario: "",
                error: "404"
            });
        } else {    
            // Actualizar los campos con la información nueva
            let updatedObject = {
                idcatedratico: req.body.idcatedratico,
                curso: req.body.curso,
                horainicio: req.body.horainicio,
                horafin: req.body.horafin
            };
            let result = await Horarios.update(updatedObject, { returning: true, where: { idhorario: horarioId } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el horario con id = " + horarioId,
                    error: "No actualizado",
                });
            }

            res.status(200).json({
                message: "Horario actualizado exitosamente con id = " + horarioId,
                horario: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el horario con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let horarioId = req.params.id;
        let horario = await Horarios.findByPk(horarioId);

        if (!horario) {
            res.status(404).json({
                message: "No existe el horario con id = " + horarioId,
                error: "404",
            });
        } else {
            await horario.destroy();
            res.status(200).json({
                message: "Horario eliminado exitosamente con id = " + horarioId,
                horario: horario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el horario con id = " + req.params.id,
            error: error.message,
        });
    }
}
