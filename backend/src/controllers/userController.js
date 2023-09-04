// const { validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

// const SECRET_KEY = process.env.SECRET_KEY;;//TODO:

// Crea un nuevo usuario
const createUser = async (req, res) => {
  
  // Valida los datos de la solicitud utilizando express-validator
  // const errors = validationResult(req);

  // // Si hay errores de validación, responde con un mensaje de error
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  // Si no hay errores de validación, continúa con la lógica para crear un usuario

  console.log("El tipo de dato es: "+typeof(req.body.parametro))
  //const { username, email, password } = req.body;

  // try {
  //   // Verifica si el usuario ya existe
  //   const existingUser = await User.findOne({ where: { email } });

  //   if (existingUser) {
  //     return res.status(400).json({ message: 'El usuario ya existe.' });
  //   }

  //   // Hashea la contraseña antes de almacenarla en la base de datos
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   // Crea el nuevo usuario
  //   const newUser = await User.create({
  //     username,
  //     email,
  //     password: hashedPassword,
  //   });

  //   // Genera un token de autenticación
  //   const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: '1h' });

  //   res.status(201).json({ user: newUser, token });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Error al crear el usuario.' });
  // }
};

// Iniciar sesión de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica si el usuario existe
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Compara la contraseña ingresada con la almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Genera un token de autenticación
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
};

module.exports = {
  createUser,
  loginUser,
};