let express = require('express');
let router = express.Router();
 
const customers = require('../controllers/controller.js');
const employee = require('../controllers/employee.controller.js');
const products = require('../controllers/product.controller.js')
const categories = require('../controllers/categorie.controller.js')
const cliente = require('../controllers/cliente.controller.js')
const cancion = require('../controllers/cancion.controller.js')
const libro = require('../controllers/libro.controller.js')
const prestamoLibro = require('../controllers/prestamos.controller.js')

router.post('/api/customers/create', customers.create);
router.get('/api/customers/all', customers.retrieveAllCustomers);
router.get('/api/customers/onebyid/:id', customers.getCustomerById);
router.get('/api/customers/filteringbyage', customers.filteringByAge);
router.get('/api/customers/pagination', customers.pagination);
router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);

// CRUD Categories
router.post('/api/categorie/create', categories.create);
router.get('/api/categorie/all', categories.retrieveAllProducts);
router.get('/api/categorie/onebyid/:id', categories.getCategorieById);
router.put('/api/categorie/update/:id', categories.updateProductById);
router.delete('/api/categorie/delete/:id', categories.deleteProductById);

// CRUD Products
router.post('/api/products/create', products.create);
router.get('/api/products/all', products.retrieveAllProducts);
router.get('/api/products/onebyid/:id', products.getProductById);
router.put('/api/products/update/:id',products.updateProductById);
router.delete('/api/products/delete/:id', products.deleteProductById);

// CRUD employees
router.post('/api/employees/create', employee.create);
router.get('/api/employee/all', employee.retrieveAllEmployees);
router.get('/api/employee/onebyid/:id', employee.getEmployeeById);
router.get('/api/employee/filteringbyage', employee.filteringByAge);
router.get('/api/employee/pagination', employee.pagination);
router.get('/api/employee/pagefiltersort', employee.pagingfilteringsorting);
router.put('/api/employee/update/:id', employee.updateById);
router.delete('/api/employee/delete/:id', employee.deleteById);

// CRUD cliente
router.post('/api/cliente/create', cliente.create);
router.get('/api/cliente/all', cliente.retrieveAllCliente);
router.get('/api/cliente/onebyid/:id', cliente.getClienteById);
router.get('/api/cliente/filteringbyage', cliente.filteringByAge);
router.get('/api/cliente/pagination', cliente.pagination);
router.get('/api/cliente/pagefiltersort', cliente.pagingfilteringsorting);
router.put('/api/cliente/update/:id', cliente.updateById);
router.delete('/api/cliente/delete/:id', cliente.deleteById);

// CRUD cancion
router.post('/api/cancion/create', cancion.create);
router.get('/api/cancion/all', cancion.retrieveAllCancion);
router.get('/api/cancion/onebyid/:id', cancion.getCancionById);
router.put('/api/cancion/update/:id', cancion.updateById);
router.delete('/api/cancion/delete/:id', cancion.deleteById);

//CRUD LIBRO
router.post('/api/libro/create', libro.create);
router.get('/api/libro/all', libro.retrieveAllLibro);
router.get('/api/libro/onebyid/:id', libro.getLibroById);
router.put('/api/libro/update/:id', libro.updateById);
router.delete('/api/libro/delete/:id', libro.deleteById);

//CRUD LIBRO
router.post('/api/prestamoLibro/create', prestamoLibro.create);
router.get('/api/prestamoLibro/all', prestamoLibro.retrieveAllPrestamoLibro);
router.get('/api/prestamoLibro/onebyid/:id', prestamoLibro.getPrestamoLibroById);
router.put('/api/prestamoLibro/update/:id', prestamoLibro.updateById);
router.delete('/api/prestamoLibro/delete/:id', prestamoLibro.deleteById);

module.exports = router;