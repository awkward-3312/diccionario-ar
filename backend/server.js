const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_PATH = path.join(__dirname, 'glosario.json');

app.use(cors());
app.use(express.json());

// Ver todos los términos
app.get('/terminos', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  res.json(data);
});

// Agregar un nuevo término
app.post('/agregar', (req, res) => {
  const nuevo = req.body;
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  data.push(nuevo);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');

  res.json({ mensaje: 'Término guardado correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
