const EleventyFetch = require("@11ty/eleventy-fetch");
const rmj = require('render-markdown-js')
const fs = require('fs');
const path = require('path');

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

module.exports = function (eleventyConfig) {

    eleventyConfig.setTemplateFormats("njk,html,md");
    
    eleventyConfig.addPassthroughCopy('src');
    eleventyConfig.addPassthroughCopy('admin');
    eleventyConfig.addPassthroughCopy('assets');

    // municipios enteros
    
    eleventyConfig.addCollection("municipios_completos", async function(collectionApi) {
        const municipios = JSON.parse(fs.readFileSync(path.join(__dirname, 'data_files', 'municipios.json'), 'utf-8'));

        let url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa1_poblacion_total_por_sexo_grupos_quinquenales_de__edad_y_area.json`;
        const poblacion_sexo = await fetchDataset(url);

        url = `https://data-dataverso.redciudadana.org/assets/conjuntos/desempeno_de_escuelas_consolidado_2015_2019.json`;
        const educacion = await fetchDataset(url);

        url = `https://data-dataverso.redciudadana.org/assets/conjuntos/desnutricion.json`;
        const desnutricion = await fetchDataset(url);

        url = `https://data-dataverso.redciudadana.org/assets/conjuntos/ranking_municipal_segeplan.json`;
        const gestion = await fetchDataset(url);

        url = `https://data-dataverso.redciudadana.org/assets/conjuntos/acceso_a_la_informacion_publica.json`;
        const transparencia = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/indice_de_pobreza_multidimensional.json`;
        const pobreza = await fetchDataset(url);

        // const poblacion_sexo = JSON.parse(fs.readFileSync(path.join(__dirname, '_data', 'poblacion_sexo.json'), 'utf-8'));
        // return municipios.slice(0,10).map(municipio => {
        return municipios.map(municipio => {
			const poblacion_sexoData = poblacion_sexo.find(pobsex => pobsex.id_municipal === municipio.id_municipal) || {};
			const educacionData = educacion.find(edu => (edu.id_municipal === municipio.id_municipal) && (edu.Periodo === 2019)) || {};
			const gestionData = gestion.find(gestion => gestion.id_municipal === municipio.id_municipal) || {};
			const transparenciaData = transparencia.find(trans => trans.id_municipal === municipio.id_municipal) || {};
			const desnutricionData = desnutricion.filter(desnu => desnu.Cod_municipal === municipio.id_municipal) || [];
			const desnutricionCronicaData = desnutricion.find(desnu => desnu.Cod_municipal === municipio.id_municipal && desnu.periodo === 2019 && desnu.Tipo === "Crónica") || {};
          	const desnutricionAgudaData = desnutricion.find(desnu => desnu.Cod_municipal === municipio.id_municipal && desnu.periodo === 2019 && desnu.Tipo === "Aguda") || {};
			const pobrezaData = pobreza.find(pobre => pobre.id_municipal === municipio.id_municipal) || {};

			const groupedDesnutricionData = desnutricionData.reduce((acc, desnu) => {
				if (!acc[desnu.periodo]) {
					acc[desnu.periodo] = {};
				}
				if (!acc[desnu.periodo][desnu.Tipo]) {
					acc[desnu.periodo][desnu.Tipo] = [];
				}
				acc[desnu.periodo][desnu.Tipo].push(desnu.Cantidad);
				return acc;
			}, {});

			// Filtrar solo las columnas necesarias
			const filteredPoblacionSexoData = {
				Hombres: poblacion_sexoData.Hombres,
				Mujeres: poblacion_sexoData.Mujeres,
			};

			const filteredEducacionData = {
				MatematicaMunicipal: educacionData.MatematicaMunicipal,
				LecturaMunicipal: educacionData.LecturaMunicipal,
			};
			
			const filteredgestionData = {
				segeplan2013: gestionData.segeplan2013,
				segeplan2016: gestionData.segeplan2016,
				segeplan2018: gestionData.segeplan2018,
				Promediosegeplan: gestionData.Promediosegeplan,
			};

			const filteredtransparenciaData = {
				aip2015: transparenciaData.aip2015,
				aip2017: transparenciaData.aip2017,
				aip2019: transparenciaData.aip2019,
				aipPromedio: transparenciaData.aipPromedio,
			};

			const filteredDesnutricionCronicaData = {
				fem1mes: desnutricionCronicaData["F < 1 mes "],
				masc1mes: desnutricionCronicaData["M < 1 mes"],
				fem1a2mes: desnutricionCronicaData["F 1m a < 2m"],
				masc1a2mes: desnutricionCronicaData["M < 1 mes "],
				fem2a1ano: desnutricionCronicaData["F 2m a < 1 a"],
				masc2a1ano: desnutricionCronicaData["M 2m a < 1 a"],
				fem1a4ano: desnutricionCronicaData["F 1a a 4 a"],
				masc1a4ano: desnutricionCronicaData["M 1a a 4 a"]
			};
			const filteredDesnutricionAgudaData = {
				fem1mes: desnutricionAgudaData["F < 1 mes "],
				masc1mes: desnutricionAgudaData["M < 1 mes"],
				fem1a2mes: desnutricionAgudaData["F 1m a < 2m"],
				masc1a2mes: desnutricionAgudaData["M < 1 mes "],
				fem2a1ano: desnutricionAgudaData["F 2m a < 1 a"],
				masc2a1ano: desnutricionAgudaData["M 2m a < 1 a"],
				fem1a4ano: desnutricionAgudaData["F 1a a 4 a"],
				masc1a4ano: desnutricionAgudaData["M 1a a 4 a"]
			};

			const filteredpobrezaData = {
				ipm2006: pobrezaData.IPM2006,
				ipm2011: pobrezaData.IPM2011,
				ipm2014: pobrezaData.IPM2014
			};

			return {
				...municipio,
				poblacion_sexo: filteredPoblacionSexoData,
				educacion: filteredEducacionData,
				desnutricion: groupedDesnutricionData,
				desnutricion_cronica: filteredDesnutricionCronicaData,
	            desnutricion_aguda: filteredDesnutricionAgudaData,
				gestion: filteredgestionData,
				transparencia: filteredtransparenciaData,
				pobreza: filteredpobrezaData
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

    eleventyConfig.addFilter("limitNumberLength", function(value, maxLength) {
      if (typeof value === 'number' && !isNaN(value)) {
        let stringValue = value.toString();
        if (stringValue.length > maxLength) {
          return parseFloat(stringValue.slice(0, maxLength));
        }
        return value;
      }
      return value;
    });

}
