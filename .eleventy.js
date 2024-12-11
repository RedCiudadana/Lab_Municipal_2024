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
		const parsedData = JSON.parse(cleanedText);
		// Si parsedData no es un array, devolver un array vacío
		return Array.isArray(parsedData) ? parsedData : [];
	} catch (error) {
		console.error("Error al analizar JSON:", error);
		return [];
	}
}

module.exports = function (eleventyConfig) {
	eleventyConfig.setTemplateFormats("njk,html,md");
    
	eleventyConfig.addPassthroughCopy('src');
	eleventyConfig.addPassthroughCopy('admin');
	eleventyConfig.addPassthroughCopy('assets');

	eleventyConfig.addGlobalData("geojson", () => {
		const geojsonPath = path.join(__dirname, 'data_files', 'municipios.geojson');
		const geojsonData = JSON.parse(fs.readFileSync(geojsonPath, 'utf-8'));
		return geojsonData;
	});

	eleventyConfig.addCollection("municipios_completos", async function(collectionApi) {
		const municipios = JSON.parse(fs.readFileSync(path.join(__dirname, 'data_files', 'municipios.json'), 'utf-8'));
		const geojson = JSON.parse(fs.readFileSync(path.join(__dirname, 'data_files', 'municipios.geojson'), 'utf-8'));
		const municipios_resumen = JSON.parse(fs.readFileSync(path.join(__dirname, 'data_files', 'municipios_resumen.json'), 'utf-8'));

		let url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa1_poblacion_total_por_sexo_grupos_quinquenales_de__edad_y_area.json`;
		const poblacion_sexo = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/desempeno_de_escuelas_consolidado_2015_2019.json`;
		const educacion = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/desnutricion.json`;
		const desnutricion = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/ranking_municipal_segeplan.json`;
		const gestion = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/acceso_a_la_informacion_publica.json`;
		let transparencia = await fetchDataset(url);

		transparencia = transparencia.map(trans => ({
			...trans,
			aip2022: typeof trans.aip2022 === 'number' ? trans.aip2022 : 0,
			aip2023: typeof trans.aip2023 === 'number' ? trans.aip2023 : 0,
		}));
		
		transparencia.forEach(trans => {
			if (typeof trans.aip2022 !== 'number' || typeof trans.aip2023 !== 'number') {
				console.error(`Invalid data at ${trans.id_municipal}`, trans);
			}
		});
		
		

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/indice_de_pobreza_multidimensional.json`;
		const pobreza = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa2_poblacion_segun_parentesco_con_el_jefe_del_hogar.json`;
		const poblacion_parentesco = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa3_poblacion_de_10_anos_y_mas_por_estado_conyugal.json`;
		const poblacion_estado_conyugal = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa4_poblacion_total_por_lugar_de_nacimiento_y_lugar_de_residencia_en_abril_del_2013.json`;
		const poblacion_residencia = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa5_poblacion_total_por_pueblos.json`;
		const poblacion_pueblo = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa10_poblacion_de_4_a_29_anos_que_no_asiste_a_un_establecimiento_educativo_por_causa_principal_de_inasistencia.json`;
		const poblacion_no_asiste = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa9_poblacion_4_anos_y_mas_por_nivel_educativo.json`;
		const poblacion_nivel_educativo = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa11_poblacion_de_7_anos_o_mas_por_alfabetismo_asistencia_escolar_y_lugar_de_estudio.json`;
		const poblacion_alfabetismo = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa12_poblacion_de_7_anos_o_mas_por_uso_de_celular_computadora_y_o_internet.json`;
		const poblacion_electronicos = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa13_poblacion_de_15_anos_y_mas_economicamente_activa_e_inactiva_condicion_de_inactividad_y_lugar_de_trabajo.json`;
		const poblacion_activaeconomicamente = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroa14_mujeres_de_15_anos_y_mas_numero_de_hijos_nacidos_vivos_numero_de_hijos_vivos_y_edad_de_la_mujer_al_nacimiento_de_su_primer_hijo.json`;
		const poblacion_salud = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadrob1_hogares_por_tipo_de_tenencia_de_la_vivienda_sexo_del_propietario_de_la_vivienda_y_sexo_de_la_persona_que_toma_las_principales_decisiones_en_el_hogar.json`;
		const hogares = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadrob2_hogares_por_fuente-principal_de_agua_para_consumo.json`;
		const fuenteagua = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroc3_viviendas_particulares_por_material_predominante_en_el_piso.json`;
		const casas_piso = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroc1_tipo_de_vivienda_y_condicion_de_ocupacion.json`;
		const tipo_vivienda = await fetchDataset(url);

		url = `https://data-dataverso.redciudadana.org/assets/conjuntos/cuadroc2_viviendas_particulares_por_material_predominante_en_las_paredes_exteriores_y_en_el_techo.json`;
		const casas_pared_techo = await fetchDataset(url);

		return municipios.map(municipio => {
			const poblacion_sexoData = poblacion_sexo.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const educacionData = educacion.find(edu => (edu.id_municipal === municipio.id_municipal) && (edu.Periodo === 2019)) || {};
			const gestionData = gestion.find(gestion => gestion.id_municipal === municipio.id_municipal) || {};
			const transparenciaData = transparencia.find(trans => trans.id_municipal === municipio.id_municipal) || {};
			const desnutricionData = desnutricion.filter(desnu => desnu.Cod_municipal === municipio.id_municipal) || [];
			const desnutricionCronicaData = desnutricion.find(desnu => desnu.Cod_municipal === municipio.id_municipal && desnu.periodo === 2019 && desnu.Tipo === "Crónica") || {};
			const desnutricionAgudaData = desnutricion.find(desnu => desnu.Cod_municipal === municipio.id_municipal && desnu.periodo === 2019 && desnu.Tipo === "Aguda") || {};
			const pobrezaData = pobreza.find(pobre => pobre.id_municipal === municipio.id_municipal) || {};
			const poblacion_parentezcoData = poblacion_parentesco.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const poblacion_estado_conyugalData = poblacion_estado_conyugal.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const poblacion_residenciaData = poblacion_residencia.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const poblacion_puebloData = poblacion_pueblo.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const poblacion_no_asisteData = poblacion_no_asiste.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const poblacion_nivel_educativoData = poblacion_nivel_educativo.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const poblacion_alfabetismoData = poblacion_alfabetismo.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const poblacion_electronicosData = poblacion_electronicos.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const poblacion_activaeconomicamenteData = poblacion_activaeconomicamente.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const poblacion_saludData = poblacion_salud.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const hogaresData = hogares.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const fuenteaguaData = fuenteagua.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const casas_pisoData = casas_piso.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const tipo_viviendaData = tipo_vivienda.find(pob => pob.id_municipal === municipio.id_municipal) || {};
			const casas_pared_techoData = casas_pared_techo.find(pob => pob.id_municipal === municipio.id_municipal) || {};

			const geojsonData = geojson.features.find(feature => feature.properties.id_municipal === municipio.id_municipal) || {};
      		const geometry = geojsonData.geometry || {};

			const municipios_resumenData = municipios_resumen.find(pob => pob.id_municipal === municipio.id_municipal) || {};

			const filteredMunicipiosResumenData = {
				Resumen: municipios_resumenData["Resumen"],
				Fuente: municipios_resumenData["Fuente\/Referencia"]
			}

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
				Urbana: poblacion_sexoData.Urbana,
				Rural: poblacion_sexoData.Rural,
				pob0a4: poblacion_sexoData["0 - 4"],
				pob5a9: poblacion_sexoData["5 - 9"],
				pob10a14: poblacion_sexoData["10 - 14"],
				pob15a19: poblacion_sexoData["15 - 19"],
				pob20a24: poblacion_sexoData["20 - 24"],
				pob25a29: poblacion_sexoData["25 - 29"],
				pob30a34: poblacion_sexoData["30 - 34"],
				pob35a39: poblacion_sexoData["35 - 39"],
				pob40a44: poblacion_sexoData["40 - 44"],
				pob45a49: poblacion_sexoData["45 - 49"],
				pob50a54: poblacion_sexoData["50 - 54"],
				pob55a59: poblacion_sexoData["55 - 59"],
				pob60a64: poblacion_sexoData["60 - 64"],
				pob65a69: poblacion_sexoData["65 - 69"],
				pob70a74: poblacion_sexoData["70 - 74"],
				pob75a79: poblacion_sexoData["75 - 79"],
				pob80a84: poblacion_sexoData["80 - 84"],
				pob85a89: poblacion_sexoData["85 - 89"],
				pob90a94: poblacion_sexoData["90 - 94"],
				pob95a99: poblacion_sexoData["95 - 99"]
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
				aip2022: transparenciaData.aip2022,
				aip2023: transparenciaData.aip2023,
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

			const filteredPoblacionParentezoData = {
				jefe: poblacion_parentezcoData["Jefe(a) de hogar"],
				esposo: poblacion_parentezcoData["  Esposa(o) o pareja"],
				hijo: poblacion_parentezcoData["Hija(o) hijastra(o)"],
				nuerooyerno: poblacion_parentezcoData["Nuera o yerno"],
				nieto: poblacion_parentezcoData["Nieta o nieto"],
				hermano: poblacion_parentezcoData["Hermana o hermano"],
				padre: poblacion_parentezcoData["Madre o padre"],
				suegro: poblacion_parentezcoData["Suegra o suegro"],
				cunado: poblacion_parentezcoData["Cuñada o cuñado"],
				otro: poblacion_parentezcoData["Otra(o) pariente"]
			};

			const filteredPoblacionEstadoConyugalData = {
				pob10ymas: poblacion_estado_conyugalData["Población de 10 años y más"],
				soltero: poblacion_estado_conyugalData["Soltera(o)"],
				unido: poblacion_estado_conyugalData["Unida(o)"],
				casado: poblacion_estado_conyugalData["Casada(o)"],
				separado: poblacion_estado_conyugalData["Separada(o)"],
				divorciado: poblacion_estado_conyugalData["Divorciada(o)"],
				viudo: poblacion_estado_conyugalData["Viuda(o)"]
			};

			const filteredPoblacionResidenciaData = {
				municipio: poblacion_residenciaData["Lugar nacimiento en el mismo municipio"],
				otromun: poblacion_residenciaData[" Lugar nacimiento  En otro municipio "],
				otropais: poblacion_residenciaData["Lugar nacimiento en otro pais"],
				nodeclarado: poblacion_residenciaData["Lugar nacimiento  no declarado"]
			};

			const filteredPoblacionPuebloData = {
				maya: poblacion_puebloData["Maya"],
				garifuna: poblacion_puebloData["Gaifuna"],
				xinka: poblacion_puebloData["Xinka"],
				afro: poblacion_puebloData["Afrodescendiente \/ Creole \/ Afromestizo"],
				ladino: poblacion_puebloData["Ladina(o)"],
				extranjero: poblacion_puebloData["Extranjera(o)"]
			};

			const filteredPoblacionNoAsisteData = {
				total: poblacion_no_asisteData["Poblacion de 4 a 29 años de edad que no asiste"],
				faltadinero: poblacion_no_asisteData["Falta de dinero"],
				tienetrabajar: poblacion_no_asisteData["Tiene que trabajar"],
				noescuela: poblacion_no_asisteData["No hay escuela, instituto o universidad"],
				padresimpiden: poblacion_no_asisteData["Los padres \/ pareja no quieren"],
				quehaceres: poblacion_no_asisteData["Quehaceres del hogar"],
				nogusta: poblacion_no_asisteData["No le gusta \/ no quiere ir"],
				termino: poblacion_no_asisteData["Ya termino sus estudios"],
				otra: poblacion_no_asisteData["Otra causa"],
				nodeclarada: poblacion_no_asisteData["No declarada"],
			};

			const filteredPoblacionNivelEducativo = {
				preprimaria: poblacion_nivel_educativoData["Preprimaria"],
				primaria1a3: poblacion_nivel_educativoData["Primaria  1 - 3"],
				primaria4a5: poblacion_nivel_educativoData["Primaria 4 - 5"],
				primaria1a6: poblacion_nivel_educativoData["Primaria 6"],
				basico: poblacion_nivel_educativoData["Basico"],
				diversificado: poblacion_nivel_educativoData["Diversificado"],
				licenciatura: poblacion_nivel_educativoData["Licenciatura"],
				maestriaodoctorado: poblacion_nivel_educativoData["Maestria o Doctorado"],
			};

			const filteredPoblacionAlfabetismoData = {
				hombres: poblacion_alfabetismoData["Hombres"],
				mujeres: poblacion_alfabetismoData["Mujeres"],
				asiste: poblacion_alfabetismoData["Asiste"],
				noasiste: poblacion_alfabetismoData["No Asiste"],
				municipio: poblacion_alfabetismoData["En el mismo municipio"],
				otromunicipio: poblacion_alfabetismoData["En otro municipio "],
				otropais: poblacion_alfabetismoData["En otro pais"],
				nodeclarado: poblacion_alfabetismoData["No declarado"],
			};

			const filteredPoblacionElectronicosData = {
				celular: poblacion_electronicosData["Usa celular"],
				nocelular: poblacion_electronicosData["No usa celular"],
				nacelular: poblacion_electronicosData["No declarado uso de celular"],
				computadora: poblacion_electronicosData["Usa computadora "],
				nocomputadora: poblacion_electronicosData["No usa computadora "],
				nacomputadora: poblacion_electronicosData["No declarado el uso de computadora "],
				internet: poblacion_electronicosData["Usa Internet"],
				nointernet: poblacion_electronicosData["No usa Internet"],
				nainternet: poblacion_electronicosData["No declarado el uso de Internet"],
				usatodo: poblacion_electronicosData["Celular, computadora e internet"],
				usaceyco: poblacion_electronicosData["Celular y computadora"],
				usaceei: poblacion_electronicosData["Celular e internet"],
				usacoei: poblacion_electronicosData["Computadora e internet"],	
			};

			const filteredPoblacionActivaEconomicamenteData = {
				totalpea: poblacion_activaeconomicamenteData["Total PEA"],
				totalpei: poblacion_activaeconomicamenteData["Total PEI "],
				peiestudio: poblacion_activaeconomicamenteData["PEI Unicamente estudio"],
				peijub: poblacion_activaeconomicamenteData["PEI  Rentista o jubilado"],
				peihogar: poblacion_activaeconomicamenteData["PEI  Que haceres del hogar"],
				peicuidado: poblacion_activaeconomicamenteData["PEI  Cuidado de personas"],
				peicomunitario: poblacion_activaeconomicamenteData["PEI  Cargo comunitario"],
				peiotra: poblacion_activaeconomicamenteData["PEI  Otra"],
				peina: poblacion_activaeconomicamenteData["PEI  No declarado"],
				peaocupada: poblacion_activaeconomicamenteData["PEA Ocupada"],
				peacesante: poblacion_activaeconomicamenteData["PEA Cesante"],
				peaaspirante: poblacion_activaeconomicamenteData["PEA Aspirante"],
				trabmun: poblacion_activaeconomicamenteData["Lugar de trabajo en el mismo municipio"],
				trabotromun: poblacion_activaeconomicamenteData["Lugar de trabajo en otro municipio "],
				trabotropais: poblacion_activaeconomicamenteData["Lugar de trabajo en otro pais"],
				trabna: poblacion_activaeconomicamenteData["Lugar de trabajo no declarado"],
			};

			const filteredPoblacionSaludData = {
				totalmujeres: poblacion_saludData["Total de mujeres de 15 años y mas"],
				nacidos0: poblacion_saludData["nacidos vivos 0"],
				nacidos1: poblacion_saludData["nacidos vivos 1"],
				nacidos2: poblacion_saludData["nacidos vivos 2"],
				nacidos3: poblacion_saludData["nacidos vivos 3"],
				nacidos4: poblacion_saludData["nacidos vivos 4"],
				nacidos5: poblacion_saludData[" nacidos vivos 5 o mas"],
				nacidosna: poblacion_saludData["nacidos vivos No declarado"],
				partoa15: poblacion_saludData["Edad mujer al momento de parto  antes de 15"],
				partoa17: poblacion_saludData["Edad mujer al momento de parto 15 - 17 años"],
				partoa19: poblacion_saludData["Edad mujer al momento de parto 18 - 19 años"],
				partoa24: poblacion_saludData["Edad mujer al momento de parto 20 - 24 años"],
				partoa29: poblacion_saludData["Edad mujer al momento de parto 25 - 29 años"],
				partoa30: poblacion_saludData["Edad mujer al momento de parto 30 años o mas"],
				partoana: poblacion_saludData["Edad mujer al momento de parto no declarado"],
			};

			const filteredHogaresData = {
				totalhogares: hogaresData["Total de hogares"],
				propia: hogaresData["Propia"],
				alquilada: hogaresData["Alquilada"],
				cedida: hogaresData["Cedida o prestada"],
				comunal: hogaresData["Propiedad comunal"],
				otra: hogaresData["Otra"],
				prohom: hogaresData["Propoetario Hombre"],
				promuj: hogaresData["Propoetario Mujer"],
				proamb: hogaresData["Propoetario Ambos"],
				prona: hogaresData["Propoetario no declarado"],
				deshom: hogaresData["Decisiones hogar Hombre"],
				desmuj: hogaresData["Decisiones hogar Mujer"],
				desamb: hogaresData["Decisiones hogar ambos"],
				desna: hogaresData["Decisiones hogar no declarado"],
			};

			const filteredFuenteAguaData = {
				tubviv :fuenteaguaData["Tuberia en la vivienda"],
				tubvivafu :fuenteaguaData["Tuberia fuera de la vivienda"],
				chorro :fuenteaguaData["Chorro publico"],
				pozo :fuenteaguaData["Pozo perforado"],
				lluvia :fuenteaguaData["Agua de lluvia"],
				rio :fuenteaguaData["Rio o lago"],
				manantial :fuenteaguaData["Manantial o nacimiento"],
				camion :fuenteaguaData["Camion o tonel"],
				otro :fuenteaguaData["Otro"],
			};

			const filteredCasasPisoData = {
				lad_cer: casas_pisoData["Ladrillo ceramico"],
				lad_cem: casas_pisoData["Ladrillo de cemento"],
				lad_bar: casas_pisoData["Ladrillo de barro"],
				cemento: casas_pisoData["Torta de cemento"],
				parque: casas_pisoData["Parque o vinil"],
				madera: casas_pisoData["Madera"],
				tierra: casas_pisoData["Tierra"],
				otro: casas_pisoData["Otro"],
			}

			const filteredTipoViviendaData = {
				total: tipo_viviendaData["Vivienda particular total"],
				casa: tipo_viviendaData["Vivienda particular  Casa formal"],
				apartamento: tipo_viviendaData["Vivienda particular  Apartamento"],
				vecindad: tipo_viviendaData["Vivienda particular Cuarto en casa de vecindad"],
				rancho: tipo_viviendaData["Vivienda particular  Rancho"],
				improvisada: tipo_viviendaData["Vivienda particular  Improvisada"],
				otro: tipo_viviendaData["Vivienda particular  Otro"],
				ignorado: tipo_viviendaData["Vivienda particular  Ignorado"],
				c_cole: tipo_viviendaData["Condicion de ocupacion Viviendas colectivas"],
				c_ocup: tipo_viviendaData["Condicion de ocupacion Ocupada"],
				c_temp: tipo_viviendaData["Condicion de ocupacion De uso temporal"],
				c_deso: tipo_viviendaData["Condicion de ocupacion Desocupada"],
			}

			const filteredCasasParedTechoData = {
				p_ladr: casas_pared_techoData["Pared Ladrillo"],
				p_bloc: casas_pared_techoData["Pared Block"],
				p_conc: casas_pared_techoData["Pared Concreto"],
				p_adob: casas_pared_techoData["Pared Adobe"],
				p_made: casas_pared_techoData["Pared Madera"],
				p_lami: casas_pared_techoData["Pared Lamina metalica"],
				p_baja: casas_pared_techoData["Pared Bajareque"],
				p_lepa: casas_pared_techoData["Pared Lepa, palo o caña"],
				p_dese: casas_pared_techoData["Pared Material de desecho"],
				p_otro: casas_pared_techoData["Pared Otro"],
				p_igno: casas_pared_techoData["Pared Ignorado"],
				t_conc: casas_pared_techoData["Techo Concreto"],
				t_lami: casas_pared_techoData["Techo Lamina metalica"],
				t_asbe: casas_pared_techoData["Techo Asbesto o cemento"],
				t_teja: casas_pared_techoData["Techo Teja"],
				t_paja: casas_pared_techoData["Techo Paja, palma o similar"],
				t_dese: casas_pared_techoData["Techo Material de desecho"],
				t_otro: casas_pared_techoData["Techo Otro"],
				t_igno: casas_pared_techoData["Techo Ignorado"],
			}

			return {
				...municipio,
				geometry,
				resumen: filteredMunicipiosResumenData,
				poblacion_sexo: filteredPoblacionSexoData,
				educacion: filteredEducacionData,
				desnutricion: groupedDesnutricionData,
				desnutricion_cronica: filteredDesnutricionCronicaData,
	            desnutricion_aguda: filteredDesnutricionAgudaData,
				gestion: filteredgestionData,
				transparencia: filteredtransparenciaData,
				pobreza: filteredpobrezaData,
				poblacion_parentesco: filteredPoblacionParentezoData,
				poblacion_estado_conyugal: filteredPoblacionEstadoConyugalData,
				poblacion_residencia: filteredPoblacionResidenciaData,
				poblacion_pueblo: filteredPoblacionPuebloData,
				poblacion_no_asiste: filteredPoblacionNoAsisteData,
				poblacion_nivel_educativo: filteredPoblacionNivelEducativo,
				poblacion_alfabetismo: filteredPoblacionAlfabetismoData,
				poblacion_electronicos: filteredPoblacionElectronicosData,
				poblacion_activaeconomicamente: filteredPoblacionActivaEconomicamenteData,
				poblacion_salud: filteredPoblacionSaludData,
				hogares: filteredHogaresData,
				fuenteagua: filteredFuenteAguaData,
				casas_piso: filteredCasasPisoData,
				tipo_vivienda: filteredTipoViviendaData,
				casas_pared_techo: filteredCasasParedTechoData
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

	eleventyConfig.addNunjucksFilter("formatNumberWithCommas", function(value) {
		if (!isNaN(value)) {
			// Asegurarse de que sea un número o cadena numérica
			return Number(value).toLocaleString('en');
		}
		return value;
	});
	

}
