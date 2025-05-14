const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const glosarioPath = path.join(__dirname, 'glosario.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Leer el glosario
app.get('/api/glosario', (req, res) => {
  fs.readFile(glosarioPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer glosario:', err);
      return res.status(500).json({ error: 'No se pudo leer el glosario' });
    }
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (e) {
      res.status(500).json({ error: 'JSON inválido' });
    }
  });
});

// Guardar un nuevo término
app.post('/api/guardar', (req, res) => {
  const nuevo = req.body;

  fs.readFile(glosarioPath, 'utf8', (err, data) => {
    let glosario = {};
    if (!err && data) {
      try {
        glosario = JSON.parse(data);
      } catch (e) {
        console.error('JSON corrupto, iniciando nuevo archivo.');
      }
    }

    glosario[nuevo.nombre || nuevo.forma || 'SIN_NOMBRE'] = nuevo;

    fs.writeFile(glosarioPath, JSON.stringify(glosario, null, 2), err => {
      if (err) {
        console.error('Error al guardar término:', err);
        return res.status(500).json({ error: 'No se pudo guardar el término' });
      }
      res.json({ mensaje: 'Término guardado exitosamente' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
