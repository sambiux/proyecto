const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.post('/login', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  db.query('SELECT * FROM admins WHERE email = ? AND password = ?',
    [email, password],
    function(err, result) {
      if (err) throw err;

      if (result.length > 0) {
        res.json({ message: 'Login correcto' });
      } else {
        res.status(401).json({ message: 'Correo o contraseña incorrectos' });
      }
    });
});

module.exports = router;
    