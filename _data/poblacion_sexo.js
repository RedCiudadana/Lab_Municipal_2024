const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  const url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa1_poblacion_total_por_sexo_grupos_quinquenales_de__edad_y_area.json`;

  // Obtener los datos como texto
  let responseText = await EleventyFetch(url, {
    duration: "1h", // Guardar por 1 hora
    type: "text"    // Obtener el texto sin analizar
  });

  // Dividir el texto en líneas
  let lines = responseText.split('\n');

  // Si hay líneas, conservar solo el primer carácter de la última línea
  if (lines.length > 0) {
    let lastLine = lines[lines.length - 1];
    lines[lines.length - 1] = lastLine.charAt(0);
  }

  // Unir de nuevo las líneas en un solo texto
  let cleanedText = lines.join('\n');

  // Intentar analizar el texto como JSON
  let data;
  try {
    data = JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error al analizar JSON:", error);
    return {};
  }

  return data;
};
