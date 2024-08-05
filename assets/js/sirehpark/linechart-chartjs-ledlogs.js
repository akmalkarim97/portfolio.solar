$(window).on('load', function () {
    'use strict';
  
    var chartWrapper = $('.chartjs'),
      flatPicker = $('.flat-picker'),
      lineChartEx = $('.line-chart-led-ex')

  
    // Color Variables
    var primaryColorShade = '#836AF9',
      yellowColor = '#ffe800',
      successColorShade = '#28dac6',
      warningColorShade = '#ffe802',
      warningLightColor = '#FDAC34',
      infoColorShade = '#299AFF',
      greyColor = '#4F5D70',
      blueColor = '#2c9aff',
      blueLightColor = '#84D0FF',
      greyLightColor = '#EDF1F4',
      tooltipShadow = 'rgba(0, 0, 0, 0.25)',
      lineChartPrimary = '#666ee8',
      lineChartDanger = '#ff4961',
      labelColor = '#6e6b7b',
      grid_line_color = 'rgba(200, 200, 200, 0.2)'; // RGBA color helps in dark layout
  
    // Detect Dark Layout
    if ($('body').hasClass('dark-layout')) {
      labelColor = '#b4b7bd';
    }
      // Wrap charts with div of height according to their data-height
    if (chartWrapper.length) {
    chartWrapper.each(function () {
      $(this).wrap($('<div style="height:' + this.getAttribute('data-height') + 'px"></div>'));
    });
  }

    // Init flatpicker
    if (flatPicker.length) {
    var date = new Date();
    flatPicker.each(function () {
      $(this).flatpickr({
        mode: 'range',
        defaultDate: ['2019-05-01', '2019-05-10']
      });
    });
  }
  
  if (lineChartEx.length) {
    var lineExample = new Chart(lineChartEx, {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor: false,
        hover: {
          mode: 'label'
        },
        tooltips: {
          // Updated default tooltip UI
          shadowOffsetX: 1,
          shadowOffsetY: 1,
          shadowBlur: 8,
          shadowColor: tooltipShadow,
          backgroundColor: window.colors.solid.white,
          titleFontColor: window.colors.solid.black,
          bodyFontColor: window.colors.solid.black
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true
              },
              gridLines: {
                display: true,
                color: grid_line_color,
                zeroLineColor: grid_line_color
              },
              ticks: {
                fontColor: labelColor
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true
              },
              ticks: {
                stepSize: 50,
                //min: 0,
                //max: 20,
                fontColor: labelColor
              },
              gridLines: {
                display: true,
                color: grid_line_color,
                zeroLineColor: grid_line_color
              }
            }
          ]
        },
        legend: {
          display: true
        }
      },
      data: {
        labels: ["00:00", "00:30", "01:00", "01:30", "02:00",
        "02:30", "03:00", "03:30", "04:00", "04:30",
        "05:00", "05:30", "06:00", "06:30", "07:00",
        "07:30", "08:00", "08:30", "09:00", "09:30",
        "10:00", "10:30", "11:00", "11:30", "12:00",
        "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30", "17:00",
        "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00",
        "22:30", "23:00"],
        datasets: [
          {data: [41.6,41.7,41.7,41.3,41.3,41.3,41.3,41.3,41.3,41.3,41.3,
                  41.3,41.3,41.3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,42.1,42,42.1,42.1,42.1,42.1,42.1,42.1,41.7
                 ],
            label: 'LED Voltage(V)',
            borderColor: lineChartPrimary,
            lineTension: 0.5,
            pointStyle: 'circle',
            backgroundColor: lineChartPrimary,
            fill: false,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 2,
            pointBorderColor: 'transparent',
            pointHoverBorderColor: window.colors.solid.white,
            pointHoverBackgroundColor: lineChartPrimary,
            pointShadowOffsetX: 1,
            pointShadowOffsetY: 1,
            pointShadowBlur: 5,
            pointShadowColor: tooltipShadow
          },
          {
            data: [0.72,0.72,0.72,0.44,0.44,0.44,0.44,0.44,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1.14,1.14,1.14,
                   1.14,1.14,1.14,1.14,1.14,1.14,1.14,1.14,1.13,1.12,1.13
                  ],
            label: 'LED Current(A)',
            borderColor: blueLightColor,
            lineTension: 0.5,
            pointStyle: 'circle',
            backgroundColor: blueLightColor,
            fill: false,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 2,
            pointBorderColor: 'transparent',
            pointHoverBorderColor: window.colors.solid.white,
            pointHoverBackgroundColor: blueLightColor,
            pointShadowOffsetX: 1,
            pointShadowOffsetY: 1,
            pointShadowBlur: 5,
            pointShadowColor: tooltipShadow
          },
          {
            data: [30,30,30,30,18,18,18,18,18,18,18,18,18,18,18,
                   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                   0,0,48,48,48,48,48,48,48,48
                  ],
            label: 'LED Power(W)',
            borderColor: lineChartDanger,
            lineTension: 0.5,
            pointStyle: 'circle',
            backgroundColor: lineChartDanger,
            fill: false,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 2,
            pointBorderColor: 'transparent',
            pointHoverBorderColor: window.colors.solid.white,
            pointHoverBackgroundColor: lineChartDanger,
            pointShadowOffsetX: 1,
            pointShadowOffsetY: 1,
            pointShadowBlur: 5,
            pointShadowColor: tooltipShadow
          },
          {
            data: [50,50,50,50,30,30,30,30,30,30,30,30,30,30,
                   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                   0,0,0,80,80,80,80,80,80,80
                  ],
            label: 'Brightness(%)',
            borderColor: warningLightColor,
            lineTension: 0.5,
            pointStyle: 'circle',
            backgroundColor: warningLightColor,
            fill: false,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 2,
            pointBorderColor: 'transparent',
            pointHoverBorderColor: window.colors.solid.white,
            pointHoverBackgroundColor: warningLightColor,
            pointShadowOffsetX: 1,
            pointShadowOffsetY: 1,
            pointShadowBlur: 5,
            pointShadowColor: tooltipShadow
          }
        ]
      }
    });
  }
});