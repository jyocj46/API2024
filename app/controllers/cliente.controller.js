const db = require('../config/db.config.js');
const Cliente = db.Cliente;

exports.create = (req, res) => {
    let cliente = {};

    try{
        // Building Employee object from upoading request's body
        cliente.firstname = req.body.firstname;
        cliente.lastname = req.body.lastname;
        cliente.address = req.body.address;
        cliente.age = req.body.age;
    
        // Save to MySQL database
        Cliente.create(cliente).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Employee with id = " + result.id,
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

exports.retrieveAllCliente = (req, res) => {
    // find all cliente information from 
    Cliente.findAll()
        .then(clienteInfos => {
            res.status(200).json({
                message: "Get all cliente' Infos Successfully!",
                cliente: clienteInfos
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

exports.getClienteById = (req, res) => {
  let clienteId = req.params.id;
  Cliente.findByPk(clienteId)
      .then(cliente => {
          res.status(200).json({
              message: " Successfully Get a Employee with id = " + clienteId,
              cliente: cliente
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


exports.filteringByAge = (req, res) => {
  let age = req.query.age;

    Cliente.findAll({
                      attributes: ['id', 'firstname', 'lastname', 'age', 'address', 'copyrightby'],
                      where: {age: age}
                    })
          .then(results => {
            res.status(200).json({
                message: "Get all cliente with age = " + age,
                cliente: results,
            });
          })
          . catch(error => {
              console.log(error);
              res.status(500).json({
                message: "Error!",
                error: error
              });
            });
}
 
exports.pagination = (req, res) => {
  try{
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
  
    const offset = page ? page * limit : 0;
  
    Cliente.findAndCountAll({ limit: limit, offset:offset })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
          data: {
              "copyrightby": "UMG ANTIGUA",
              "totalItems": data.count,
              "totalPages": totalPages,
              "limit": limit,
              "currentPageNumber": page + 1,
              "currentPageSize": data.rows.length,
              "employees": data.rows
          }
        };
        res.send(response);
      });  
  }catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }    
}

exports.pagingfilteringsorting = (req, res) => {
  try{
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let age = parseInt(req.query.age);
  
    const offset = page ? page * limit : 0;

    console.log("offset = " + offset);
  
    Cliente.findAndCountAll({
                                attributes: ['id', 'firstname', 'lastname', 'age', 'address'],
                                where: {age: age}, 
                                order: [
                                  ['firstname', 'ASC'],
                                  ['lastname', 'DESC']
                                ],
                                limit: limit, 
                                offset:offset 
                              })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", age = " + age,
          data: {
              "copyrightby": "UmgAntigua",
              "totalItems": data.count,
              "totalPages": totalPages,
              "limit": limit,
              "age-filtering": age,
              "currentPageNumber": page + 1,
              "currentPageSize": data.rows.length,
              "employees": data.rows
          }
        };
        res.send(response);
      });  
  }catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }      
}

exports.updateById = async (req, res) => {
    try{
        let employeeId = req.params.id;
        let employee = await Employee.findByPk(employeeId);
    
        if(!employee){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a employee with id = " + employeeId,
                employee: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                age: req.body.age
            }
            let result = await Employee.update(updatedObject, {returning: true, where: {id: employeeId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a employee with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Employee with id = " + employeeId,
                employee: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a employee with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let employeeId = req.params.id;
        let employee = await Employee.findByPk(employeeId);

        if(!employee){
            res.status(404).json({
                message: "Does Not exist a Employee with id = " + employeeId,
                error: "404",
            });
        } else {
            await employee.destroy();
            res.status(200).json({
                message: "Delete Successfully a Employee with id = " + employeeId,
                employee: employee,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a employee with id = " + req.params.id,
            error: error.message,
        });
    }
}