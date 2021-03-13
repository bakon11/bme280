const bme280 = require('bme280sensor');
var asciichart = require ('asciichart');
var temp = [];
var humi = [];

const CtoF = (c) =>{
  const F = (c * (9/5) + 32);
  return F.toFixed(2);
};

const getSensorData = (sensor) => {
  const sensorID = sensor[0].i2cAddress.toString(16); 
  
  setInterval(()=>{
    bme280.open(sensor[0]).then(async (sensor) => {
      const sensorData = await sensor.read(); 
      await sensor.close();
      displayData(sensorID, sensorData);

    }).catch(console.log);
  }, 2000);
};

const displayData = (sensorID, sensorData) => { 
 console.clear();
 temp.push(sensorData.temperature);
 humi.push(sensorData.humidity);
 temp.length == 50 && temp.shift();
 humi.length == 50 && humi.shift();

 console.log(
         "####Sensor "+ sensorID +"#### \n" + 
         "Temp: " + sensorData.temperature.toFixed(2) + "C | " + CtoF(sensorData.temperature) +"F\n" +
         "Humid: " + sensorData.humidity.toFixed(2) +"%\n" +
         "Pressure: " + sensorData.pressure.toFixed(2) +"hPa"
 );
 
  
 calcAvg(temp, "C");
 calcAvg(humi, "%");
 
 makeGraph(sensorID, [temp, humi]);

};

const calcAvg = (sensorInfo, measurement) => {
  let max = Math.max(...sensorInfo).toFixed(2);
  let min = Math.min(...sensorInfo).toFixed(2);
  let avg = (eval(sensorInfo.join('+'))/sensorInfo.length).toFixed(2);
  console.log(
    "Max:"+ max + measurement +  
    " | Min:"+ min + measurement +
    " | Avg:"+ avg + measurement
  );
};

const makeGraph = (sensorName, sensorInfo) => {
  var config = {
	  colors: [ asciichart.blue, asciichart.green ],
	  height: 10,
  }
  console.log("################\n");	
  console.log(asciichart.plot(sensorInfo, config) + "\n" );
  console.log("################\n");	

};

getSensorData([{i2cAddress: 0x76},{i2cAddress: 0x77}]);

