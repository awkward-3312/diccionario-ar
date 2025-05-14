const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_PATH = path.join(__dirname, 'glosario.json');

app.use(cors());
app.use(express.json());

// Ruta para obtener todos los términos
app.get('/terminos', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  res.json(data);
});

// Ruta para guardar un nuevo término correctamente
app.post('/api/guardar', (req, res) => {
  console.log("📥 Datos recibidos del formulario:", req.body); // 👈 Agregado
  const nuevo = req.body;
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  let clave = nuevo.nombre?.toUpperCase() || "SIN_NOMBRE";

  if (nuevo.tipo === "abreviatura") {
    data[clave] = {
      categoria: "abreviatura",
      definicion: nuevo.definicion || "-"
    };
  } else if (nuevo.tipo === "forma") {
    data[clave] = {
      categoria: "forma farmacéutica",
      definicion: nuevo.definicion || "-",
      forma: nuevo.forma || "-"
    };
  } else {
    data[clave] = {
      definicion: nuevo.definicion || "-",
      traduccion: nuevo.ingles || "-",
      pronunciacion: nuevo.pronunciacion || "-",
      categoria: nuevo.categoria || "-",
      sinonimos: (nuevo.sinonimos || "").split(",").map(s => s.trim())
    };
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  res.json({ mensaje: 'Término guardado correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
