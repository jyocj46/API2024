const db = require('../config/db.config.js');
const Ingreso = db.Ingreso;

exports.create = (req, res) => {
    let ingreso = {};

    try{
        // Construir objeto Ingreso a partir del body de la solicitud
        ingreso.idcatedratico = req.body.idcatedratico;
        ingreso.fechaingreso = req.body.fechaingreso;
        ingreso.fechasalida = req.body.fechasalida;
        ingreso.estatus = req.body.estatus;

        // Guardar en la base de datos
        Ingreso.create(ingreso).then(result => {    
            // enviar mensaje de éxito
            res.status(200).json({
                message: "Ingreso creado exitosamente con id = " + result.id,
                ingreso: result,
            });
        });
    } catch(error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
}

exports.retrieveAllIngresos = (req, res) => {
    // Buscar toda la información de los ingresos
    Ingreso.findAll()
        .then(ingresosInfos => {
            res.status(200).json({
                message: "¡Ingresos obtenidos exitosamente!",
                ingresos: ingresosInfos
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

exports.getIngresoById = (req, res) => {
    let ingresoId = req.params.id;
    Ingreso.findByPk(ingresoId)
        .then(ingreso => {
            res.status(200).json({
                message: "Ingreso obtenido exitosamente con id = " + ingresoId,
                ingreso: ingreso
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
        let ingresoId = req.params.id;
        let ingreso = await Ingreso.findByPk(ingresoId);
    
        if (!ingreso) {
            res.status(404).json({
                message: "No se encontró el ingreso con id = " + ingresoId,
                ingreso: "",
                error: "404"
            });
        } else {    
            // Actualizar los campos con la información nueva
            let updatedObject = {
                idcatedratico: req.body.idcatedratico,
                fechaingreso: req.body.fechaingreso,
                fechasalida: req.body.fechasalida,
                estatus: req.body.estatus
            };
            let result = await Ingreso.update(updatedObject, { returning: true, where: { idingreso: ingresoId } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el ingreso con id = " + ingresoId,
                    error: "No actualizado",
                });
            }

            res.status(200).json({
                message: "Ingreso actualizado exitosamente con id = " + ingresoId,
                ingreso: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el ingreso con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let ingresoId = req.params.id;
        let ingreso = await Ingreso.findByPk(ingresoId);

        if (!ingreso) {
            res.status(404).json({
                message: "No existe el ingreso con id = " + ingresoId,
                error: "404",
            });
        } else {
            await ingreso.destroy();
            res.status(200).json({
                message: "Ingreso eliminado exitosamente con id = " + ingresoId,
                ingreso: ingreso,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el ingreso con id = " + req.params.id,
            error: error.message,
        });
    }
}
