const rmj = require('render-markdown-js')
const fs = require('fs');
const path = require('path');

module.exports = function (eleventyConfig) {

    eleventyConfig.setTemplateFormats("njk,html,md");
    
    eleventyConfig.addPassthroughCopy('src');
    eleventyConfig.addPassthroughCopy('admin');
    eleventyConfig.addPassthroughCopy('assets');

    // municipios enteros
    
    eleventyConfig.addCollection("municipios_completos", function(collectionApi) {
        const municipios = JSON.parse(fs.readFileSync(path.join(__dirname, '_data', 'municipios.json'), 'utf-8'));
        const poblacion_sexo = JSON.parse(fs.readFileSync(path.join(__dirname, '_data', 'poblacion_sexo.json'), 'utf-8'));
    
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
