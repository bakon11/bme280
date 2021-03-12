const bme280 = require('bme280sensor');
var asciichart = require ('asciichart');
var temp = [];
var humid = [];
const CtoF = (c) =>{
  const F = (c * (9/5) + 32);
  return F.toFixed(2);
};

const getSensorData = (sensor) => {
  const sensorID = sensor.i2cAddress.toString(16); 
  setInterval(()=>{
    bme280.open(sensor).then(async (sensor) => {
      const sensorData = await sensor.read(); 
      displayData(sensorID, sensorData);     
      await sensor.close();
    }).catch(console.log);
  }, 2000);
};

const displayData = (sensorID, sensorData) => {
  temp.push(sensorData.temperature.toFixed(2));
  humid.push(sensorData.humidity.toFixed(2));

  console.log(
          "####Sensor "+ sensorID +"#### \n" + 
          "Temp: " + sensorData.temperature.toFixed(2) + "C | " + CtoF(sensorData.temperature.toFixed(2)) +"F\n" +
          "Humid: " + sensorData.humidity.toFixed(2) +"%\n" +
          "Pressure: " + sensorData.pressure.toFixed(2) +"hPa\n"
  );

  calcAvg(temp, "C");
  calcAvg(humid, "%");

};

const calcAvg = (sensorInfo, measurement) => {
  console.log(sensorInfo.length);
  let max = Math.max(...sensorInfo).toFixed(2);
  let min = Math.min(...sensorInfo).toFixed(2);
  let avg = sensorInfo.reduce((a, b) => a + b) / sensorInfo.length;  
  console.log(
    "Max:"+ max + measurement +  
    " | Min:"+ min + measurement +
    " | Avg:"+ avg + measurement
  );
}

const makeGraph = (sensorName, measurement, sensorInfo) => {
  console.log("########"+sensorName+"########\n");	
  // console.log(asciichart.plot (sensorInfo)) // this rescales the graph to ±3 lines 
};

getSensorData({i2cAddress: 0x76});
// getSensorData({i2cAddress: 0x77});
