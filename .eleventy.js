const EleventyFetch = require("@11ty/eleventy-fetch");
const rmj = require('render-markdown-js')
const fs = require('fs');
const path = require('path');

module.exports = function (eleventyConfig) {

    eleventyConfig.setTemplateFormats("njk,html,md");
    
    eleventyConfig.addPassthroughCopy('src');
    eleventyConfig.addPassthroughCopy('admin');
    eleventyConfig.addPassthroughCopy('assets');

    // Función para obtener y limpiar datos de población por sexo
    async function fetchDataset(url) {
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
      try {
          return JSON.parse(cleanedText);
      } catch (error) {
          console.error("Error al analizar JSON:", error);
          return null;
      }
    }

    // municipios enteros
    
    eleventyConfig.addCollection("municipios_completos", async function(collectionApi) {
        const municipios = JSON.parse(fs.readFileSync(path.join(__dirname, 'data_files', 'municipios.json'), 'utf-8'));

        const url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa1_poblacion_total_por_sexo_grupos_quinquenales_de__edad_y_area.json`;
        const poblacion_sexo = await fetchDataset(url);

        // const poblacion_sexo = JSON.parse(fs.readFileSync(path.join(__dirname, '_data', 'poblacion_sexo.json'), 'utf-8'));
        // return municipios.slice(0,10).map(municipio => {
        return municipios.map(municipio => {
          const poblacion_sexoData = poblacion_sexo.find(pobsex => pobsex.id_municipal === municipio.id_municipal) || {};
    
          // Filtrar solo las columnas necesarias
          const filteredPoblacionSexoData = {
            Hombres: poblacion_sexoData.Hombres,
            Mujeres: poblacion_sexoData.Mujeres,
          };
    
          return {
            ...municipio,
            poblacion_sexo: filteredPoblacionSexoData
          };
        });
    });

    // filtros de forma

    eleventyConfig.addNunjucksFilter("rmj", function(content) {
        return rmj(content);
    });

    eleventyConfig.addNunjucksFilter("limit", function (array, limit) {
        return array.slice(0, limit);
    });
}
