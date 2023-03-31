// Create the charts when the web page loads
window.addEventListener('load', onload);

function onload(event){
  chartT = createTemperatureChart();
  // chartH = createHumidityChart();
  // chartP = createPressureChart();
}

// Create Temperature Chart
function createTemperatureChart() {
var chart = new Highcharts.Chart({
  chart:{
    renderTo:'chart-temperature'
  },
  series: [
    {
      name: 'Alcohol gas',
      type: 'line',
      color: '#101D42',
      marker: {
        symbol: 'circle',
        radius: 3,
        fillColor: '#101D42',
      }
    },
    {
      name: 'CO gas',
      type: 'line',
      color: '#00A6A6',
      marker: {
        symbol: 'square',
        radius: 3,
        fillColor: '#00A6A6',
      }
    },
    {
      name: 'H2 gas',
      type: 'line',
      color: '#8B2635',
      marker: {
        symbol: 'triangle',
        radius: 3,
        fillColor: '#8B2635',
      }
    },
    {
      name: 'LPG gas',
      type: 'line',
      color: '#71B48D',
      marker: {
        symbol: 'triangle-down',
        radius: 3,
        fillColor: '#71B48D',
      }
    },
    {
      name: 'Propane gas',
      type: 'line',
      color: '#2f7ed8',
      marker: {
        symbol: 'cross',
        radius: 3,
        fillColor: '#2f7ed8',
      }
    }],
  title: {
    text: undefined
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { second: '%H:%M:%S' }
  },
  yAxis: {
    title: {
      text: 'Concentration, Parts Per Million (PPM)'
    }
  },
  credits: {
    enabled: false
  }
});
  return chart;
}

// // Create Humidity Chart
// function createHumidityChart(){
//   var chart = new Highcharts.Chart({
//     chart:{
//       renderTo:'chart-temperature',
//       type: 'spline'
//     },
//     series: [{
//       name: 'BME280'
//     }],
//     title: {
//       text: undefined
//     },
//     plotOptions: {
//       line: {
//         animation: false,
//         dataLabels: {
//           enabled: true
//         }
//       },
//       series: {
//         color: '#50b8b4'
//       }
//     },
//     xAxis: {
//       type: 'datetime',
//       dateTimeLabelFormats: { second: '%H:%M:%S' }
//     },
//     yAxis: {
//       title: {
//         text: 'Humidity (%)'
//       }
//     },
//     credits: {
//       enabled: false
//     }
//   });
//   return chart;
// }

// // Create Pressure Chart
// function createPressureChart() {
//   var chart = new Highcharts.Chart({
//     chart:{
//       renderTo:'chart-pressure',
//       type: 'spline'
//     },
//     series: [{
//       name: 'BME280'
//     }],
//     title: {
//       text: undefined
//     },
//     plotOptions: {
//       line: {
//         animation: false,
//         dataLabels: {
//           enabled: true
//         }
//       },
//       series: {
//         color: '#A62639'
//       }
//     },
//     xAxis: {
//       type: 'datetime',
//       dateTimeLabelFormats: { second: '%H:%M:%S' }
//     },
//     yAxis: {
//       title: {
//         text: 'Pressure (hPa)'
//       }
//     },
//     credits: {
//       enabled: false
//     }
//   });
//   return chart;
// }