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
          data: [0.3248664670658683, 0.29074999999999995, 0.3785176470588236], // Aquí coloca tus datos de promedio de todos los municipios
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

    console.log(transparenciaData)

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
          data: [6.923457446808511, 18.17705882352941, 40.48629411764706], // Aquí coloca tus datos de promedio de todos los municipios
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
});
