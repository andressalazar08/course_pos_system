const express = require('express');
// const { body } = require('express-validator');
const { createUser } = require('../controllers/userController');

const router = express.Router();

// Definir la regla de validación para la creación de un usuario
//CREAR LA CARPETA middlewares y dejar esta función ahí
// const userValidationRules = [
//   body('username').trim().not().isEmpty().withMessage('El nombre de usuario es obligatorio.'),
//   body('email').trim().isEmail().withMessage('Introduce una dirección de correo electrónico válida.'),
//   body('password').trim().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
// ];

// Ruta para crear un nuevo usuario
// router.post('/create', userValidationRules, createUser);
router.post('/create', createUser);

module.exports = router;