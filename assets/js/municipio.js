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
});