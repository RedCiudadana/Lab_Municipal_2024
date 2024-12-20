document.addEventListener("DOMContentLoaded", function() {
  const municipioDataElement = document.getElementById('municipio-data');
  
  if (municipioDataElement) {
    const municipioData = JSON.parse(municipioDataElement.textContent);

    const ctx = document.getElementById('poblacionSexoChart').getContext('2d');
    const total = municipioData.hombres + municipioData.mujeres;

    const poblacionSexoChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Hombres', 'Mujeres'],
        datasets: [{
          data: [municipioData.hombres, municipioData.mujeres],
          backgroundColor: ['#7eb5ea', '#1ec78b'],
          hoverBackgroundColor: ['#7eb5ea', '#1ec78b']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: '#fff',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                return `${currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    const ctx2 = document.getElementById('poblacionSexoChart2').getContext('2d');

    const poblacionSexoChart2 = new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: ['Hombres', 'Mujeres'],
        datasets: [{
          data: [municipioData.hombres, municipioData.mujeres],
          backgroundColor: ['#7eb5ea', '#1ec78b'],
          hoverBackgroundColor: ['#7eb5ea', '#1ec78b']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: '#fff',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                return `${currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    const ctx3 = document.getElementById('poblacionAreaChart').getContext('2d');

    const poblacionAreaChart = new Chart(ctx3, {
      type: 'pie',
      data: {
        labels: ['Urbana', 'Rural'],
        datasets: [{
          data: [municipioData.urbana, municipioData.rural],
          backgroundColor: ['#7eb5ea', '#1ec78b'],
          hoverBackgroundColor: ['#7eb5ea', '#1ec78b']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: '#fff',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                return `${currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    const ctx4 = document.getElementById('poblacionAreaChart2').getContext('2d');

    const poblacionAreaChart2 = new Chart(ctx4, {
      type: 'pie',
      data: {
        labels: ['Urbana', 'Rural'],
        datasets: [{
          data: [municipioData.urbana, municipioData.rural],
          backgroundColor: ['#7eb5ea', '#1ec78b'],
          hoverBackgroundColor: ['#7eb5ea', '#1ec78b']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: '#fff',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                return `${currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    const ctx5 = document.getElementById('poblacionEdadChart').getContext('2d');

    const poblacionEdadChart = new Chart(ctx5, {
      type: 'bar',
      data: {
        labels: [
          '0-4 años', '5-9 años', '10-14 años', '15-19 años', '20-24 años',
          '25-29 años', '30-34 años', '35-39 años', '40-44 años', '45-49 años',
          '50-54 años', '55-59 años', '60-64 años', '65-69 años', '70-74 años',
          '75-79 años', '80-84 años', '85-89 años', '90-94 años', '95-99 años'
        ],
        datasets: [{
          label: 'Población por edad',
          data: [
            municipioData.pob0a4, municipioData.pob5a9, municipioData.pob10a14, municipioData.pob15a19,
            municipioData.pob20a24, municipioData.pob25a29, municipioData.pob30a34, municipioData.pob35a39,
            municipioData.pob40a44, municipioData.pob45a49, municipioData.pob50a54, municipioData.pob55a59,
            municipioData.pob60a64, municipioData.pob65a69, municipioData.pob70a74, municipioData.pob75a79,
            municipioData.pob80a84, municipioData.pob85a89, municipioData.pob90a94, municipioData.pob95a99
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });
  }

  // Gráfica de gestión municipal
  const gestionDataElement = document.getElementById('gestion-data');
  
  if (gestionDataElement) {
    const gestionData = JSON.parse(gestionDataElement.textContent);

    const ctx = document.getElementById('gestionMunicipalChart2021').getContext('2d');

    const gestionMunicipalChart2021 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Índice de Participación Ciudadana', 'Índice de Información a la Ciudadanía', 'Índice de Servicios Públicos', 
          'Índice de Gestión Administrativa', 'Índice de Gestión Financiera', 'Indice de Gestión Estratégica'
        ],
        datasets: [{
          label: 'Índices de Gestiones Municipales (2020-2021)',
          data: [
            gestionData.indice_participacion_ciudadana, gestionData.indice_informacion_a_ciudadania, gestionData.indice_servicios_publicos,
            gestionData.indice_gestion_administrativa, gestionData.indice_gestion_financiera, gestionData.indice_gestion_estrategica 
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });

    const ctx2 = document.getElementById('gestionMunicipalChart').getContext('2d');

    const gestionMunicipalChart = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['2013', '2016', '2018'],
        datasets: [{
          label: 'Datos del Municipio',
          data: [gestionData.segeplan2013, gestionData.segeplan2016, gestionData.segeplan2018],
          fill: true,
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          tension: 0.1
        },
        {
          label: 'Promedio de todos los municipios',
          data: [0.32, 0.29, 0.37], // Aquí coloca tus datos de promedio de todos los municipios
          fill: false,
          borderColor: 'rgb(30, 199, 139, 1)',
          backgroundColor: 'rgb(30, 199, 139, 0.2)',
          tension: 0.1,
          borderDash: [5, 5]  // Añadir la línea punteada
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 1
          }
        }
      }
    });

  }

  // Gráfica de transparencia municipal
  const transparenciaDataElement = document.getElementById('transparencia-data');
  
  if (transparenciaDataElement) {
    const transparenciaData = JSON.parse(transparenciaDataElement.textContent);

    const ctx3 = document.getElementById('transparenciaChart').getContext('2d');

    const transparenciaChart = new Chart(ctx3, {
      type: 'line',
      data: {
        labels: ['2015', '2017', '2019', '2022', '2023'],
        datasets: [{
          label: 'Datos del Municipio',
          data: [transparenciaData.aip2015, transparenciaData.aip2017, transparenciaData.aip2019, transparenciaData.aip2022, transparenciaData.aip2023],
          fill: true,
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          tension: 0.1
        },
        {
          label: 'Promedio de todos los municipios',
          data: [6.92, 18.17, 40.48, 56.43, 54.70], // Aquí coloca tus datos de promedio de todos los municipios
          fill: false,
          borderColor: 'rgb(30, 199, 139, 1)',
          backgroundColor: 'rgb(30, 199, 139, 0.2)',
          tension: 0.1,
          borderDash: [5, 5]  // Añadir la línea punteada
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });

  }

  const desnutricionDataElement = document.getElementById('desnutricion-data');
  
  if (desnutricionDataElement) {
    const desnutricionData = JSON.parse(desnutricionDataElement.textContent);

    const ctx = document.getElementById('desnutricionChart').getContext('2d');

    const desnutricionChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
        datasets: [
          {
            label: 'Crónica',
            data: [
              desnutricionData.cronica2012,
              desnutricionData.cronica2013,
              desnutricionData.cronica2014,
              desnutricionData.cronica2015,
              desnutricionData.cronica2016,
              desnutricionData.cronica2017,
              desnutricionData.cronica2018,
              desnutricionData.cronica2019
            ],
            fill: true,
            borderColor: 'rgb(126, 181, 234, 1)',
            backgroundColor: 'rgb(126, 181, 234, 0.2)',
            tension: 0.1
          },
          {
            label: 'Aguda',
            data: [
              desnutricionData.aguda2012,
              desnutricionData.aguda2013,
              desnutricionData.aguda2014,
              desnutricionData.aguda2015,
              desnutricionData.aguda2016,
              desnutricionData.aguda2017,
              desnutricionData.aguda2018,
              desnutricionData.aguda2019
            ],
            fill: true,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });
  }

  const desnutricionDataEdadSexoElement = document.getElementById('desnutricion-data-edad-sexo');
  
  if (desnutricionDataEdadSexoElement) {
    const desnutricionDataEdadSexo = JSON.parse(desnutricionDataEdadSexoElement.textContent);

    const ctx = document.getElementById('desnutricionChartEdadSexo').getContext('2d');

    const desnutricionChartEdadSexo = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['[M] < 1 mes', '[M] 1m a < 2m', '[M] 2m a < 1 a', '[M] 1 a 4 a', '[F] < 1 mes', '[F] 1m a < 2m', '[F] 2m a < 1 a', '[F] 1 a 4 a'],
        datasets: [
          {
            label: 'Aguda',
            data: [
              desnutricionDataEdadSexo.agudamasc1mes,
              desnutricionDataEdadSexo.agudamasc1a2mes,
              desnutricionDataEdadSexo.agudamasc2a1ano,
              desnutricionDataEdadSexo.agudamasc1a4ano,
              desnutricionDataEdadSexo.agudafem1mes,
              desnutricionDataEdadSexo.agudafem1a2mes,
              desnutricionDataEdadSexo.agudafem2a1ano,
              desnutricionDataEdadSexo.agudafem1a4ano
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Crónica',
            data: [
              desnutricionDataEdadSexo.cronicamasc1mes,
              desnutricionDataEdadSexo.cronicamasc1a2mes,
              desnutricionDataEdadSexo.cronicamasc2a1ano,
              desnutricionDataEdadSexo.cronicamasc1a4ano,
              desnutricionDataEdadSexo.cronicafem1mes,
              desnutricionDataEdadSexo.cronicafem1a2mes,
              desnutricionDataEdadSexo.cronicafem2a1ano,
              desnutricionDataEdadSexo.cronicafem1a4ano
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgb(126, 181, 234, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            beginAtZero: true,
            stacked: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });
  }

  if (desnutricionDataEdadSexoElement) {
    const desnutricionDataEdadSexo = JSON.parse(desnutricionDataEdadSexoElement.textContent);

    const cronicafem = desnutricionDataEdadSexo.cronicafem1mes +
                       desnutricionDataEdadSexo.cronicafem1a2mes +
                       desnutricionDataEdadSexo.cronicafem2a1ano +
                       desnutricionDataEdadSexo.cronicafem1a4ano;

    const cronicamasc = desnutricionDataEdadSexo.cronicamasc1mes +
                        desnutricionDataEdadSexo.cronicamasc1a2mes +
                        desnutricionDataEdadSexo.cronicamasc2a1ano +
                        desnutricionDataEdadSexo.cronicamasc1a4ano;

    const ctx = document.getElementById('desnutricionPieChartSexo').getContext('2d');

    const desnutricionPieChartSexo = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Femenino', 'Masculino'],
        datasets: [{
          data: [cronicafem, cronicamasc],
          backgroundColor: ['#1ec78b', '#7eb5ea'],
          hoverBackgroundColor: ['#1ec78b', '#7eb5ea']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: '#fff',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                return `${currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }

  // Gráfica de indice de pobreza municipal
  const pobrezaDataElement = document.getElementById('pobreza-data');
  
  if (pobrezaDataElement) {
    const pobrezaData = JSON.parse(pobrezaDataElement.textContent);

    const ctx3 = document.getElementById('pobrezaChart').getContext('2d');

    const pobrezaChart = new Chart(ctx3, {
      type: 'line',
      data: {
        labels: ['2006', '2011', '2014'],
        datasets: [{
          label: 'Datos del Municipio',
          data: [pobrezaData.ipm2006, pobrezaData.ipm2011, pobrezaData.ipm2014],
          fill: true,
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          tension: 0.1
        },
        {
          label: 'Promedio de todos los municipios',
          data: [0.335, 0.364, 0.368], // Aquí coloca tus datos de promedio de todos los municipios
          fill: false,
          borderColor: 'rgb(30, 199, 139, 1)',
          backgroundColor: 'rgb(30, 199, 139, 0.2)',
          tension: 0.1,
          borderDash: [5, 5]  // Añadir la línea punteada
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 1
          }
        }
      }
    });

  }

  // Gráfica de poblacion por parentezco
  const poblacion_parentezoDataElement = document.getElementById('poblacion-parentezco-data');
  
  if (poblacion_parentezoDataElement) {
    const poblacion_parentezoData = JSON.parse(poblacion_parentezoDataElement.textContent);

    const ctx = document.getElementById('poblacionParentezcoChart').getContext('2d');

    const poblacionParentezcoChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Jefe(a) de hogar', 'Esposa(o) o pareja', 'Hija(o) hijastra(o)', 'Nuera o yerno', 'Nieta o nieto', 
          'Hermana o hermano', 'Madre o padre', 'Suegra o suegro', 'Cuñada o cuñado', 'Otra(o) pariente'
        ],
        datasets: [{
          label: 'Población por Parentezo',
          data: [
            poblacion_parentezoData.jefe, poblacion_parentezoData.esposo, poblacion_parentezoData.hijo, poblacion_parentezoData.nuerooyerno, 
            poblacion_parentezoData.nieto, poblacion_parentezoData.hermano, poblacion_parentezoData.padre, poblacion_parentezoData.suegro, 
            poblacion_parentezoData.cunado, poblacion_parentezoData.otro 
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });

  }

  // Gráfica de poblacion por parentezco
  const poblacion_estado_conyugalDataElement = document.getElementById('poblacion-estado-conyugal-data');
  
  if (poblacion_estado_conyugalDataElement) {
    const poblacion_estado_conyugalData = JSON.parse(poblacion_estado_conyugalDataElement.textContent);

    const ctx = document.getElementById('poblacionEstadoConyugalChart').getContext('2d');

    const poblacionEstadoConyugalChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Soltera(o)', 'Unida(o)', 'Casada(o)', 'Separada(o)', 'Divorciada(o)', 'Viuda(o)'
        ],
        datasets: [{
          label: 'Población por Estado Conyugal',
          data: [
            poblacion_estado_conyugalData.soltero, poblacion_estado_conyugalData.unido, poblacion_estado_conyugalData.casado,
            poblacion_estado_conyugalData.separado, poblacion_estado_conyugalData.diverciado, poblacion_estado_conyugalData.viudo,
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });

  }

  // Gráfica de poblacion por residencia
  const poblacion_residenciaDataElement = document.getElementById('poblacion-residencia-data');
  
  if (poblacion_residenciaDataElement) {
    const poblacion_residenciaData = JSON.parse(poblacion_residenciaDataElement.textContent);

    const ctx = document.getElementById('poblacionResidenciaChart').getContext('2d');

    const poblacionResidenciaChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Lugar nacimiento en el mismo municipio', 'Lugar nacimiento  En otro municipio', 'Lugar nacimiento en otro pais', 'Lugar nacimiento  no declarado'
        ],
        datasets: [{
          label: 'Población por llugar de nacimiento',
          data: [
            poblacion_residenciaData.mun, poblacion_residenciaData.otromun, poblacion_residenciaData.otropais, poblacion_residenciaData.nd 
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });

  }

  // Gráfica de poblacion por pueblo
  const poblacion_puebloDataElement = document.getElementById('poblacion-pueblo-data');
  
  if (poblacion_puebloDataElement) {
    const poblacion_puebloData = JSON.parse(poblacion_puebloDataElement.textContent);

    const ctx = document.getElementById('poblacionPuebloChart').getContext('2d');

    const poblacionPuebloChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Maya', 'Gaifuna', 'Xinca', 'Afrodescendiente \/ Creole \/ Afromestizo', 'Ladina(o)', 'Extranjera(o)'
        ],
        datasets: [{
          label: 'Población por Pueblo',
          data: [
            poblacion_puebloData.maya, poblacion_puebloData.xinca, poblacion_puebloData.garifuna,
            poblacion_puebloData.afro, poblacion_puebloData.ladino, poblacion_puebloData.extranjero 
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });

  }

  // Gráfica de poblacion por nivel educativo
  const poblacion_nivel_educativoDataElement = document.getElementById('poblacion-nivel-educativo');
  
  if (poblacion_nivel_educativoDataElement) {
    const poblacion_nivel_educativoData = JSON.parse(poblacion_nivel_educativoDataElement.textContent);

    const ctx = document.getElementById('poblacionNivelEducativoChart').getContext('2d');

    const poblacionNivelEducativoChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Preprimaria', 'Primaria  1 - 3', 'Primaria 4 - 5', 'Primaria 6', 'Basico', 'Diversificado', 'Licenciatura', 'Maestria o Doctorado'
        ],
        datasets: [{
          label: 'Población por Nivel Educativo',
          data: [
            poblacion_nivel_educativoData.preprimaria, poblacion_nivel_educativoData.primaria1a3, poblacion_nivel_educativoData.primaria4a5,
            poblacion_nivel_educativoData.primaria1a6, poblacion_nivel_educativoData.basico, poblacion_nivel_educativoData.diversificado,
            poblacion_nivel_educativoData.licenciatura, poblacion_nivel_educativoData.maestriaodoctorado 
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });

  }

  // Gráfica de poblacion por alfabetismo
  const poblacionAlfabetismoDataElement = document.getElementById('poblacion-alfabetismo');
  
  if (poblacionAlfabetismoDataElement) {
    const poblacionAlfabetismoData = JSON.parse(poblacionAlfabetismoDataElement.textContent);

    const ctx = document.getElementById('poblacionAlfabetismoChart').getContext('2d');
    const total = poblacionAlfabetismoData.hombres + poblacionAlfabetismoData.mujeres;

    const poblacionAlfabetismoChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Hombres', 'Mujeres'],
        datasets: [{
          data: [poblacionAlfabetismoData.hombres, poblacionAlfabetismoData.mujeres],
          backgroundColor: ['#7eb5ea', '#1ec78b'],
          hoverBackgroundColor: ['#7eb5ea', '#1ec78b']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: '#fff',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                return `${currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    const ctx2 = document.getElementById('poblacionAsistenciaEscolarChart').getContext('2d');
    const total2 = poblacionAlfabetismoData.asiste + poblacionAlfabetismoData.noasiste;

    const poblacionAsistenciaEscolarChart = new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: ['Asiste', 'No Asiste'],
        datasets: [{
          data: [poblacionAlfabetismoData.asiste, poblacionAlfabetismoData.noasiste],
          backgroundColor: ['#7eb5ea', '#1ec78b'],
          hoverBackgroundColor: ['#7eb5ea', '#1ec78b']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: '#fff',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                return `${currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    const ctx3 = document.getElementById('poblacionLugarEstudioChart').getContext('2d');

    const poblacionLugarEstudioChart = new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: [
          'En el mismo municipio', 'En otro municipio', 'En otro pais', 
          'No declarado'
        ],
        datasets: [{
          label: 'Población por Lugar de Estudio',
          data: [
            poblacionAlfabetismoData.municipio, poblacionAlfabetismoData.otromunicipio, poblacionAlfabetismoData.otropais,
            poblacionAlfabetismoData.nodeclarado
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });
  }

  // Gráfica de poblacion por nivel educativo
  const poblacion_asistenciaDataElement = document.getElementById('poblacion-asistencia');
  
  if (poblacion_asistenciaDataElement) {
    const poblacion_asistenciaData = JSON.parse(poblacion_asistenciaDataElement.textContent);

    const ctx = document.getElementById('poblacionAsistenciaChart').getContext('2d');

    const poblacionAsistenciaChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Falta de Dinero', 'Tiene que trabajar', 'No hay escuela, instituto o universidad', 
          'Los padres \/ pareja no quieren', 'Quehaceres del hogar', 'No le gusta \/ no quiere ir', 
          'Ya termino sus estudios', 'Otra causa', 'No declarada'
        ],
        datasets: [{
          label: 'Población por Falta de Asistencia',
          data: [
            poblacion_asistenciaData.faltadinero, poblacion_asistenciaData.tienetrabajar, poblacion_asistenciaData.noescuela,
            poblacion_asistenciaData.padresimpiden, poblacion_asistenciaData.quehaceres, poblacion_asistenciaData.nogusta,
            poblacion_asistenciaData.termino, poblacion_asistenciaData.otra, poblacion_asistenciaData.nodeclarada 
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });

  }


  // Gráfica de poblacion por electronicos
  const poblacionElectronicosDataElement = document.getElementById('poblacion-electronicos');
  
  if (poblacionElectronicosDataElement) {
    const poblacionElectronicosData = JSON.parse(poblacionElectronicosDataElement.textContent);

    const ctx = document.getElementById('poblacionUsoCelularChart').getContext('2d');

    const poblacionUsoCelularChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Usa Celular', 'No Usa Celular', 'No Declarado'],
        datasets: [{
          data: [poblacionElectronicosData.celular, poblacionElectronicosData.nocelular, poblacionElectronicosData.nacelular],
          backgroundColor: ['#7eb5ea', '#1ec78b', '#ff6f61'],
          hoverBackgroundColor: ['#7eb5ea', '#1ec78b', '#ff6f61']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: '#fff',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                return `${currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    const ctx2 = document.getElementById('poblacionUsoComputadoraChart').getContext('2d');

    const poblacionUsoComputadoraChart = new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: ['Usa Computadora', 'No Usa Computadora', 'No Declarado'],
        datasets: [{
          data: [poblacionElectronicosData.computadora, poblacionElectronicosData.nocomputadora, poblacionElectronicosData.nacomputadora],
          backgroundColor: ['#7eb5ea', '#1ec78b', '#ff6f61'],
          hoverBackgroundColor: ['#7eb5ea', '#1ec78b', '#ff6f61']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx2) => {
              let sum = ctx2.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: '#fff',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                return `${currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    const ctx3 = document.getElementById('poblacionUsoInternetChart').getContext('2d');

    const poblacionUsoInternetChart = new Chart(ctx3, {
      type: 'pie',
      data: {
        labels: ['Usa Internet', 'No Usa Internet', 'No Declarado'],
        datasets: [{
          data: [poblacionElectronicosData.internet, poblacionElectronicosData.nointernet, poblacionElectronicosData.nainternet],
          backgroundColor: ['#7eb5ea', '#1ec78b', '#ff6f61'],
          hoverBackgroundColor: ['#7eb5ea', '#1ec78b', '#ff6f61']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx3) => {
              let sum = ctx3.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: '#fff',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                return `${currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    const ctx4 = document.getElementById('poblacionUsoTodoChart').getContext('2d');

    const poblacionUsoTodoChart = new Chart(ctx4, {
      type: 'bar',
      data: {
        labels: [
          'Celular, computadora e internet', 'Celular y computadora', 'Celular e internet', 
          'Computadora e internet'
        ],
        datasets: [{
          label: 'Población por uso de electrónicos',
          data: [
            poblacionElectronicosData.usatodo, poblacionElectronicosData.usaceyco, poblacionElectronicosData.usaceei,
            poblacionElectronicosData.usacoei
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });
  }

  // Gráfica de poblacion por electronicos
  const poblacionEconomicamenteDataElement = document.getElementById('poblacion-economicamente');
  
  if (poblacionEconomicamenteDataElement) {
    const poblacionEconomicamenteData = JSON.parse(poblacionEconomicamenteDataElement.textContent);

    const ctx = document.getElementById('poblacionEconomicamenteChart').getContext('2d');

    const poblacionEconomicamenteChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Total PEA', 'Total PEI'],
        datasets: [{
          data: [poblacionEconomicamenteData.totalpea, poblacionEconomicamenteData.totalpei],
          backgroundColor: ['#7eb5ea', '#1ec78b', '#ff6f61'],
          hoverBackgroundColor: ['#7eb5ea', '#1ec78b', '#ff6f61']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: '#fff',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                return `${currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    const ctx2 = document.getElementById('poblacionEconomicamenteInactivaChart').getContext('2d');

    const poblacionEconomicamenteInactivaChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: [
          'PEI Unicamente estudio', 'PEI  Rentista o jubilado', 'PEI  Que haceres del hogar', 
          'PEI  Cuidado de personas', 'PEI  Cargo comunitario', 'PEI  Otra', 'PEI  No declarado'
        ],
        datasets: [{
          label: 'Población por inactividad económica',
          data: [
            poblacionEconomicamenteData.peiestudio, poblacionEconomicamenteData.peijub, poblacionEconomicamenteData.peihogar,
            poblacionEconomicamenteData.peicuidado, poblacionEconomicamenteData.peicomunitario, poblacionEconomicamenteData.peiotra,
            poblacionEconomicamenteData.peina
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });

    const ctx3 = document.getElementById('poblacionEconomicamenteActivaChart').getContext('2d');

    const poblacionEconomicamenteActivaChart = new Chart(ctx3, {
      type: 'pie',
      data: {
        labels: ['PEA Ocupada', 'PEA Cesante', 'PEA Aspirante'],
        datasets: [{
          data: [poblacionEconomicamenteData.peaocupada, poblacionEconomicamenteData.peacesante, poblacionEconomicamenteData.peaaspirante],
          backgroundColor: ['#7eb5ea', '#1ec78b', '#ff6f61'],
          hoverBackgroundColor: ['#7eb5ea', '#1ec78b', '#ff6f61']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: '#fff',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                return `${currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    const ctx4 = document.getElementById('poblacionEconomicamenteActivaLugarChart').getContext('2d');

    const poblacionEconomicamenteActivaLugarChart = new Chart(ctx4, {
      type: 'bar',
      data: {
        labels: [
          'Lugar de trabajo en el mismo municipio', 'Lugar de trabajo en otro municipio', 'Lugar de trabajo en otro pais', 
          'Lugar de trabajo no declarado'
        ],
        datasets: [{
          label: 'Población por lugar de trabajo',
          data: [
            poblacionEconomicamenteData.trabmun, poblacionEconomicamenteData.trabotromun, poblacionEconomicamenteData.trabotropais,
            poblacionEconomicamenteData.trabna
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });
  }

  // Gráfica de poblacion por salud
  const poblacionSaludDataElement = document.getElementById('poblacion-salud');
  
  if (poblacionSaludDataElement) {
    const poblacionSaludData = JSON.parse(poblacionSaludDataElement.textContent);
    
    const ctx = document.getElementById('numerohijosChart').getContext('2d');

    const numerohijosChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'nacidos vivos 0', 'nacidos vivos 1', 'nacidos vivos 2', 
          'nacidos vivos 3', 'nacidos vivos 4', 'nacidos vivos 5 o más',
          'nacidos vivos no declarado'
        ],
        datasets: [{
          label: 'Población por número de hijos nacidos',
          data: [
            poblacionSaludData.nacidos0, poblacionSaludData.nacidos1, poblacionSaludData.nacidos2,
            poblacionSaludData.nacidos3, poblacionSaludData.nacidos4, poblacionSaludData.nacidos5,
            poblacionSaludData.nacidosna
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });

    const ctx2 = document.getElementById('edadmujerChart').getContext('2d');

    const edadmujerChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: [
          'Edad mujer al momento de parto  antes de 15', 'Edad mujer al momento de parto 15 - 17 años', 'Edad mujer al momento de parto 18 - 19 años', 
          'Edad mujer al momento de parto 20 - 24 años', 'nacidos vivos Edad mujer al momento de parto 25 - 29 años', 'Edad mujer al momento de parto 30 o más años',
          'Edad mujer al momento no delcarada'
        ],
        datasets: [{
          label: 'Población por edad de la mujer al parto',
          data: [
            poblacionSaludData.partoa15, poblacionSaludData.partoa17, poblacionSaludData.partoa19,
            poblacionSaludData.partoa24, poblacionSaludData.partoa29, poblacionSaludData.partoa30,
            poblacionSaludData.partoana
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });
  }

  // Gráfica de poblacion por hogares
  const hogaresDataElement = document.getElementById('hogares');
  
  if (hogaresDataElement) {
    const hogaresData = JSON.parse(hogaresDataElement.textContent);
    
    const ctx = document.getElementById('hogarestipoChart').getContext('2d');

    const hogarestipoChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Propia', 'Alquilada', 'Cedida o Prestada',
          'Propiedad Comunal', 'Otra'
        ],
        datasets: [{
          label: 'Hogares por tipo de tenencia',
          data: [
            hogaresData.propia, hogaresData.alquilada, hogaresData.cedida,
            hogaresData.comunal, hogaresData.otra 
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });

    const ctx2 = document.getElementById('hogarespropetarioChart').getContext('2d');

    const hogarespropetarioChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: [
          'Propoetario Hombre', 'Propoetario Mujer', 'Propoetario Ambos',
          'Propoetario no declarado'
        ],
        datasets: [{
          label: 'Hogares por sexo del propetario',
          data: [
            hogaresData.prohom, hogaresData.promuj, hogaresData.proamb,
            hogaresData.prona
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });

    const ctx3 = document.getElementById('hogaressexoChart').getContext('2d');

    const hogaressexoChart = new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: [
          'Decisiones hogar Hombre', 'Decisiones hogar Mujer', 'Decisiones hogar Ambos',
          'Decisiones hogar no declarado'
        ],
        datasets: [{
          label: 'Sexo que toma desiciones del hogar',
          data: [
            hogaresData.deshom, hogaresData.desmuj, hogaresData.desamb,
            hogaresData.desna
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });
  }

  const fuenteaguaDataElement = document.getElementById('fuente-agua');
  
  function colorFromIndex(index, totalItems) {
    // Colores proporcionados en formato RGB
    const colors = [
        'rgb(127, 180, 234)',  // #7fb4ea
        'rgb(53, 113, 158)',   // #35719e
        'rgb(146, 206, 255)',  // #92ceff
        'rgb(103, 188, 169)',  // #67bca9
        'rgb(214, 228, 237)',  // #d6e4ed
        'rgb(221, 221, 221)'   // #dddddd
    ];

    // Si el índice es menor que la cantidad de colores, se usa el color del array
    if (index < colors.length) {
        return colors[index];
    }

    // Si hay más elementos que colores, se generan colores más claros interpolando hacia blanco
    var colorBase = { r: 127, g: 180, b: 234 };  // Último color en la lista en RGB
    var white = { r: 255, g: 255, b: 255 };      // Color blanco
    
    // Calcular la proporción del índice respecto al total de elementos que exceden los colores definidos
    var percentage = (index - colors.length) / (totalItems - colors.length);

    // Interpolación lineal hacia el blanco
    var r = Math.round(colorBase.r + percentage * (white.r - colorBase.r));
    var g = Math.round(colorBase.g + percentage * (white.g - colorBase.g));
    var b = Math.round(colorBase.b + percentage * (white.b - colorBase.b));

    // Devolver el color en formato RGB
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  if (fuenteaguaDataElement) {
    const fuenteaguaData = JSON.parse(fuenteaguaDataElement.textContent);
  
    var treeData = [
      {value: fuenteaguaData.tubviv, title: 'Tuberia en la vivienda'},
      {value: fuenteaguaData.tubvivafu, title: 'Tuberia fuera de la vivienda'},
      {value: fuenteaguaData.chorro, title: 'Chorro publico'},
      {value: fuenteaguaData.pozo, title: 'Pozo perforado'},
      {value: fuenteaguaData.lluvia, title: 'Agua de lluvia'},
      {value: fuenteaguaData.rio, title: 'Rio o lago'},
      {value: fuenteaguaData.manantial, title: 'Manantial o nacimiento'},
      {value: fuenteaguaData.camion, title: 'Camion o tonel'},
      {value: fuenteaguaData.otro, title: 'Otro'}
    ];
  
    var ctx = document.getElementById("hogaresfuenteaguaChart").getContext("2d");
    window.chart1b = new Chart(ctx, {
      type: "treemap",
      data: {
        datasets: [
          { 
            label: "Hogares por fuente principal de agua para consumo",
            tree: treeData,
            key: 'value',
            groups: ['title'],
            fontColor: 'black',
            fontFamily: 'Optima',
            fontSize: 50,
            // Color de fondo basado en el índice
            backgroundColor: function(ctx) {
              var index = ctx.dataIndex; // Obtener el índice del elemento
              return colorFromIndex(index, treeData.length); // Pasar el índice y el total de elementos
            },
            // Color de borde basado en el índice
            borderColor: function(ctx) {
              var index = ctx.dataIndex; // Obtener el índice del elemento
              return colorFromIndex(index, treeData.length); // Pasar el índice y el total de elementos
            },
            spacing: 0.1,
            borderWidth: 2,
          }
        ]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              title: function() {
                // No mostrar título en el tooltip
                return '';
              },
              label: function(context) {
                // Obtener el elemento correcto en el dataset
                var dataItem = context.dataset.tree[context.dataIndex]; 
                return dataItem.title + ': ' + dataItem.value; // Mostrar solo el título y el valor
              }
            }
          }
        }
      }
    });
  }

  // Gráfica de viviendas por piso
  const viviendaspisoDataElement = document.getElementById('viviendas-piso');
  
  if (viviendaspisoDataElement) {
    const viviendaspisoData = JSON.parse(viviendaspisoDataElement.textContent);
    
    const ctx = document.getElementById('viviendaspisosChart').getContext('2d');

    const viviendaspisosChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Ladrillo ceramico', 'Ladrillo de cemento', 'Ladrillo de barro',
          'Torta de cemento', 'Parque o vinil', 'Madera', 'Tierra', 'Otra'
        ],
        datasets: [{
          label: 'Distribución de viviendas por tipos de pisos',
          data: [
            viviendaspisoData.lad_cer, viviendaspisoData.lad_cem, viviendaspisoData.lad_bar,
            viviendaspisoData.cemento, viviendaspisoData.parque, viviendaspisoData.madera,
            viviendaspisoData.tierra, viviendaspisoData.otra 
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });
  }

  // Gráfica de viviendas por piso
  const tipoviviendaDataElement = document.getElementById('tipo-vivienda');
  
  if (tipoviviendaDataElement) {
    const tipoviviendaData = JSON.parse(tipoviviendaDataElement.textContent);
    
    const ctx = document.getElementById('viviendasocupacionChart').getContext('2d');

    const viviendasocupacionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Condicion de ocupacion Viviendas colectivas', 'Condicion de ocupacion Ocupada',
          'Condicion de ocupacion De uso temporal', 'Condicion de ocupacion Desocupada'
        ],
        datasets: [{
          label: 'Distribución de ocupación de viviendas',
          data: [
            tipoviviendaData.c_cole, tipoviviendaData.c_ocup, tipoviviendaData.c_temp,
            tipoviviendaData.c_deso
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });

    const ctx2 = document.getElementById('tipoviviendaChart').getContext('2d');

    const tipoviviendaChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: [
          'Vivienda particular total', 'Vivienda particular Casa forma',
          'Vivienda particular Apartamento', 'Vivienda particular Cuarto en casa de vecindad',
          'Vivienda particular Rancho', 'Vivienda particular Improvisada', 'Vivienda particular Otro',
          'Vivienda particular Ignorado'
        ],
        datasets: [{
          label: 'Tipo de vivienda particular',
          data: [
            tipoviviendaData.c_cole, tipoviviendaData.c_ocup, tipoviviendaData.c_temp,
            tipoviviendaData.c_deso
          ],
          borderColor: 'rgb(126, 181, 234, 1)',
          backgroundColor: 'rgb(126, 181, 234, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString(); // Añadir comas como separadores de miles
              }
            }
          }
        }
      }
    });
  }

  const viviendasparedtechoDataElement = document.getElementById('viviendas-pared_techo');
  
  if (viviendasparedtechoDataElement) {
    const viviendasparedtechoData = JSON.parse(viviendasparedtechoDataElement.textContent);
  
    var treeData1 = [
      {value: viviendasparedtechoData.p_ladr, title: 'Pared Ladrillo'},
      {value: viviendasparedtechoData.p_bloc, title: 'Pared Block'},
      {value: viviendasparedtechoData.p_conc, title: 'Pared Concreto'},
      {value: viviendasparedtechoData.p_adob, title: 'Pared Adobe'},
      {value: viviendasparedtechoData.p_made, title: 'Pared Madera'},
      {value: viviendasparedtechoData.p_lami, title: 'Pared Lamina metalica'},
      {value: viviendasparedtechoData.p_baja, title: 'Pared Bajareque'},
      {value: viviendasparedtechoData.p_lepa, title: 'Pared Lepa, palo o caña'},
      {value: viviendasparedtechoData.p_dese, title: 'Pared Material de desecho'},
      {value: viviendasparedtechoData.p_otro, title: 'Pared Otro'},
      {value: viviendasparedtechoData.p_igno, title: 'Pared Ignorado'}
    ];

    var treeData2 = [
      {value: viviendasparedtechoData.t_conc, title: 'Techo Concreto'},
      {value: viviendasparedtechoData.t_lami, title: 'Techo Lamina metalica'},
      {value: viviendasparedtechoData.t_asbe, title: 'Techo Asbesto o cemento'},
      {value: viviendasparedtechoData.t_teja, title: 'Techo Paja, palma o similar'},
      {value: viviendasparedtechoData.t_paja, title: 'Techo Material de desecho'},
      {value: viviendasparedtechoData.t_otro, title: 'Techo Otro'},
      {value: viviendasparedtechoData.t_igno, title: 'Techo Ignorado'}
    ];
  
    var ctx1 = document.getElementById("viviendaparedChart").getContext("2d");
    window.chart1b = new Chart(ctx1, {
      type: "treemap",
      data: {
        datasets: [
          { 
            label: "Distribución de viviendas por tipo de pared",
            tree: treeData1,
            key: 'value',
            groups: ['title'],
            fontColor: 'black',
            fontFamily: 'Optima',
            fontSize: 20,
            // Color de fondo basado en el índice
            backgroundColor: function(ctx1) {
              var index = ctx1.dataIndex; // Obtener el índice del elemento
              return colorFromIndex(index, treeData.length); // Pasar el índice y el total de elementos
            },
            // Color de borde basado en el índice
            borderColor: function(ctx1) {
              var index = ctx1.dataIndex; // Obtener el índice del elemento
              return colorFromIndex(index, treeData.length); // Pasar el índice y el total de elementos
            },
            spacing: 0.1,
            borderWidth: 2,
          }
        ]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              title: function() {
                // No mostrar título en el tooltip
                return '';
              },
              label: function(context) {
                // Obtener el elemento correcto en el dataset
                var dataItem = context.dataset.tree[context.dataIndex]; 
                return dataItem.title + ': ' + dataItem.value; // Mostrar solo el título y el valor
              }
            }
          }
        }
      }
    });

    var ctx2 = document.getElementById("viviendastechoChart").getContext("2d");
    window.chart1b = new Chart(ctx2, {
      type: "treemap",
      data: {
        datasets: [
          { 
            label: "Distribución de viviendas por tipo de techo",
            tree: treeData2,
            key: 'value',
            groups: ['title'],
            fontColor: 'black',
            fontFamily: 'Optima',
            fontSize: 20,
            // Color de fondo basado en el índice
            backgroundColor: function(ctx2) {
              var index = ctx2.dataIndex; // Obtener el índice del elemento
              return colorFromIndex(index, treeData.length); // Pasar el índice y el total de elementos
            },
            // Color de borde basado en el índice
            borderColor: function(ctx2) {
              var index = ctx2.dataIndex; // Obtener el índice del elemento
              return colorFromIndex(index, treeData.length); // Pasar el índice y el total de elementos
            },
            spacing: 0.1,
            borderWidth: 2,
          }
        ]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              title: function() {
                // No mostrar título en el tooltip
                return '';
              },
              label: function(context) {
                // Obtener el elemento correcto en el dataset
                var dataItem = context.dataset.tree[context.dataIndex]; 
                return dataItem.title + ': ' + dataItem.value; // Mostrar solo el título y el valor
              }
            }
          }
        }
      }
    });
  }
  
});
