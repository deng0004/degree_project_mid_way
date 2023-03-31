// Complete project details: https://randomnerdtutorials.com/esp32-plot-readings-charts-multiple/

// Get current sensor readings when the page loads
window.addEventListener('load', getReadings_MQ2_1);

// Create Concentration Chart
var chart_MQ2_1 = new Highcharts.Chart({
  chart:{
    renderTo:'1. MQ2 chart-concentration'
  },
  series: [
    {
      name: 'H2 gas',
      type: 'line',
      color: '#101D42',
      marker: {
        symbol: 'circle',
        radius: 3,
        fillColor: '#101D42',
      }
    },
    {
      name: 'LPG gas',
      type: 'line',
      color: '#00A6A6',
      marker: {
        symbol: 'square',
        radius: 3,
        fillColor: '#00A6A6',
      }
    },
    {
      name: 'CO gas',
      type: 'line',
      color: '#8B2635',
      marker: {
        symbol: 'triangle',
        radius: 3,
        fillColor: '#8B2635',
      }
    },
    {
      name: 'Alcohol gas',
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



//Plot concentration in the concentration chart
function plotConcentration_MQ2_1(jsonValue) {

  var keys = Object.keys(jsonValue);
  console.log(keys);
  console.log(keys.length);

  for (var i = 0; i < keys.length; i++){
    var x = (new Date()).getTime();
    console.log(x);
    const key = keys[i];
    var y = Number(jsonValue[key]);
    console.log(y);

    if(chart_MQ2_1.series[i].data.length > 40) {
      chart_MQ2_1.series[i].addPoint([x, y], true, true, true);
    } else {
      chart_MQ2_1.series[i].addPoint([x, y], true, false, true);
    }

  }
}

// Function to get current readings on the webpage when it loads for the first time
function getReadings_MQ2_1(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      console.log(myObj);
      plotConcentration_MQ2_1(myObj);
    }
  };
  xhr.open("GET", "/readings_MQ2_1", true);
  xhr.send();
}

if (!!window.EventSource) {
  var source = new EventSource('/events');

  source.addEventListener('open', function(e) {
    console.log("Events Connected");
  }, false);

  source.addEventListener('error', function(e) {
    if (e.target.readyState != EventSource.OPEN) {
      console.log("Events Disconnected");
    }
  }, false);

  source.addEventListener('message', function(e) {
    console.log("message", e.data);
  }, false);

  source.addEventListener('new_readings_MQ2_1', function(e) {
    console.log("new_readings_MQ2_1", e.data);
    var myObj = JSON.parse(e.data);
    console.log(myObj);
    plotConcentration_MQ2_1(myObj);
  }, false);
}

window.addEventListener('load', getReadings_MQ2_2);

var chart_MQ2_2 = new Highcharts.Chart({
  chart:{
    renderTo:'2. MQ2 chart-concentration'
  },
  series: [
    {
      name: 'H2 gas',
      type: 'line',
      color: '#101D42',
      marker: {
        symbol: 'circle',
        radius: 3,
        fillColor: '#101D42',
      }
    },
    {
      name: 'LPG gas',
      type: 'line',
      color: '#00A6A6',
      marker: {
        symbol: 'square',
        radius: 3,
        fillColor: '#00A6A6',
      }
    },
    {
      name: 'CO gas',
      type: 'line',
      color: '#8B2635',
      marker: {
        symbol: 'triangle',
        radius: 3,
        fillColor: '#8B2635',
      }
    },
    {
      name: 'Alcohol gas',
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


//Plot concentration in the concentration chart
function plotConcentration_MQ2_2(jsonValue) {

  var keys = Object.keys(jsonValue);
  console.log(keys);
  console.log(keys.length);

  for (var i = 0; i < keys.length; i++){
    var x = (new Date()).getTime();
    console.log(x);
    const key = keys[i];
    var y = Number(jsonValue[key]);
    console.log(y);

    if(chart_MQ2_2.series[i].data.length > 40) {
      chart_MQ2_2.series[i].addPoint([x, y], true, true, true);
    } else {
      chart_MQ2_2.series[i].addPoint([x, y], true, false, true);
    }

  }
}

// Function to get current readings on the webpage when it loads for the first time
function getReadings_MQ2_2(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      console.log(myObj);
      plotConcentration_MQ2_2(myObj);
    }
  };
  xhr.open("GET", "/readings_MQ2_2", true);
  xhr.send();
}

if (!!window.EventSource) {
  var source = new EventSource('/events');

  source.addEventListener('open', function(e) {
    console.log("Events Connected");
  }, false);

  source.addEventListener('error', function(e) {
    if (e.target.readyState != EventSource.OPEN) {
      console.log("Events Disconnected");
    }
  }, false);

  source.addEventListener('message', function(e) {
    console.log("message", e.data);
  }, false);

  source.addEventListener('new_readings_MQ2_2', function(e) {
    console.log("new_readings_MQ2_2", e.data);
    var myObj = JSON.parse(e.data);
    console.log(myObj);
    plotConcentration_MQ2_2(myObj);
  }, false);
}

window.addEventListener('load', getReadings_MQ2_3);

var chart_MQ2_3 = new Highcharts.Chart({
  chart:{
    renderTo:'3. MQ2 chart-concentration'
  },
  series: [
    {
      name: 'H2 gas',
      type: 'line',
      color: '#101D42',
      marker: {
        symbol: 'circle',
        radius: 3,
        fillColor: '#101D42',
      }
    },
    {
      name: 'LPG gas',
      type: 'line',
      color: '#00A6A6',
      marker: {
        symbol: 'square',
        radius: 3,
        fillColor: '#00A6A6',
      }
    },
    {
      name: 'CO gas',
      type: 'line',
      color: '#8B2635',
      marker: {
        symbol: 'triangle',
        radius: 3,
        fillColor: '#8B2635',
      }
    },
    {
      name: 'Alcohol gas',
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


//Plot concentration in the concentration chart
function plotConcentration_MQ2_3(jsonValue) {

  var keys = Object.keys(jsonValue);
  console.log(keys);
  console.log(keys.length);

  for (var i = 0; i < keys.length; i++){
    var x = (new Date()).getTime();
    console.log(x);
    const key = keys[i];
    var y = Number(jsonValue[key]);
    console.log(y);

    if(chart_MQ2_3.series[i].data.length > 40) {
      chart_MQ2_3.series[i].addPoint([x, y], true, true, true);
    } else {
      chart_MQ2_3.series[i].addPoint([x, y], true, false, true);
    }

  }
}

// Function to get current readings on the webpage when it loads for the first time
function getReadings_MQ2_3(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      console.log(myObj);
      plotConcentration_MQ2_3(myObj);
    }
  };
  xhr.open("GET", "/readings_MQ2_3", true);
  xhr.send();
}

if (!!window.EventSource) {
  var source = new EventSource('/events');

  source.addEventListener('open', function(e) {
    console.log("Events Connected");
  }, false);

  source.addEventListener('error', function(e) {
    if (e.target.readyState != EventSource.OPEN) {
      console.log("Events Disconnected");
    }
  }, false);

  source.addEventListener('message', function(e) {
    console.log("message", e.data);
  }, false);

  source.addEventListener('new_readings_MQ2_3', function(e) {
    console.log("new_readings_MQ2_3", e.data);
    var myObj = JSON.parse(e.data);
    console.log(myObj);
    plotConcentration_MQ2_3(myObj);
  }, false);
}