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
          backgroundColor: ['#36a2eb', '#ff6384'],
          hoverBackgroundColor: ['#36a2eb', '#ff6384']
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

  // Gráfica de gestión municipal
  const gestionDataElement = document.getElementById('gestion-data');
  
  if (gestionDataElement) {
    const gestionData = JSON.parse(gestionDataElement.textContent);

    const ctx2 = document.getElementById('gestionMunicipalChart').getContext('2d');

    const gestionMunicipalChart = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['2013', '2016', '2018'],
        datasets: [{
          label: 'Datos del Municipio',
          data: [gestionData.segeplan2013, gestionData.segeplan2016, gestionData.segeplan2018],
          fill: true,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.1
        },
        {
          label: 'Promedio de todos los municipios',
          data: [0.32, 0.29, 0.37], // Aquí coloca tus datos de promedio de todos los municipios
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
        labels: ['2015', '2017', '2019'],
        datasets: [{
          label: 'Datos del Municipio',
          data: [transparenciaData.aip2015, transparenciaData.aip2017, transparenciaData.aip2019],
          fill: true,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.1
        },
        {
          label: 'Promedio de todos los municipios',
          data: [6.92, 18.17, 40.48], // Aquí coloca tus datos de promedio de todos los municipios
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
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
            borderColor: 'rgba(54, 162, 235, 1)',
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
          backgroundColor: ['#ff6384', '#36a2eb'],
          hoverBackgroundColor: ['#ff6384', '#36a2eb']
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
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.1
        },
        {
          label: 'Promedio de todos los municipios',
          data: [0.335, 0.364, 0.368], // Aquí coloca tus datos de promedio de todos los municipios
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
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


});
