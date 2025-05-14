document.addEventListener("DOMContentLoaded", function () {
  const tipoSelect = document.getElementById("tipo");
  const camposTermino = document.getElementById("campos-termino");
  const camposAbreviatura = document.getElementById("campos-abreviatura");
  const camposForma = document.getElementById("campos-forma");
  const formulario = document.getElementById("formulario");

  // Mostrar u ocultar campos según el tipo seleccionado
  tipoSelect.addEventListener("change", function () {
    actualizarCampos();
  });

  function actualizarCampos() {
    const tipo = tipoSelect.value;
    camposTermino.style.display = tipo === "termino" ? "block" : "none";
    camposAbreviatura.style.display = tipo === "abreviatura" ? "block" : "none";
    camposForma.style.display = tipo === "forma" ? "block" : "none";
  }

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const tipo = tipoSelect.value;
    let datos = { tipo: tipo };

    if (tipo === "termino") {
      datos.espanol = document.getElementById("espanol").value;
      datos.ingles = document.getElementById("ingles").value;
      datos.pronunciacion = document.getElementById("pronunciacion").value;
      datos.categoria = document.getElementById("categoria").value;
      datos.definicion = document.getElementById("definicion").value;
      datos.sinonimos = document.getElementById("sinonimos").value;

    } else if (tipo === "abreviatura") {
      datos.abreviatura = document.getElementById("abreviatura").value;
      datos.definicion = document.getElementById("definicion_abreviatura").value;

    } else if (tipo === "forma") {
      datos.forma = document.getElementById("forma").value;
      datos.definicion = document.getElementById("definicion_forma").value;
    }

    // Enviar los datos a Google Sheets vía Apps Script
    fetch("https://script.google.com/macros/s/AKfycbwNPTrbqcHMNzGPwzVOD9merKgwCbz_XCyePmED8aLn-LIxtEkAIDG5IAViJyTttD7Q0w/exec", {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.text())
      .then(result => {
        alert("Término agregado correctamente.");
        formulario.reset();
        actualizarCampos();
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Error al enviar el término.");
      });
  });

  // Inicializar los campos al cargar
  actualizarCampos();
});
