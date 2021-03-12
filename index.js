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
  var temp = [];
  var humid = [];
  setInterval(()=>{
    bme280.open(sensor).then(async (sensor) => {
      const sensorData = await sensor.read(); 
      await sensor.close();
      displayData(sensorID, sensorData);

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
 
 makeGraph(sensorID, temp);
 makeGraph(sensorID, humid);

};

const calcAvg = (sensorInfo, measurement) => {
  let max = Math.max(...sensorInfo).toFixed(2);
  let min = Math.min(...sensorInfo).toFixed(2);
  let avg = (eval(sensorInfo.join('+'))/sensorInfo.length).toFixed(2);
  console.log(
    "Max:"+ max + measurement +  
    " | Min:"+ min + measurement +
    " | Avg:"+ avg + measurement + "\n"
  );
};

const makeGraph = (sensorName, sensorInfo) => {
  let data = [...sensorInfo];
  console.log(data);
  console.log("########"+sensorName+"########\n");	
  console.log(asciichart.plot (sensorInfo));
};

getSensorData({i2cAddress: 0x76});
// getSensorData({i2cAddress: 0x77});
