const bme280 = require('bme280sensor');
var asciichart = require ('asciichart');
var temp = [];
var humi = [];
var units = "imperial";
var t;
const CtoF = (c) =>{
  const F = (c * (9/5) + 32);
  return F.toFixed(2);
};

const getSensorData = (sensor) => {	
  setInterval(()=>{	  
   var sensors = 0;  
   while(sensor.length > sensors){	 
    const sensorID = sensor[sensors].i2cAddress.toString(16);	
    bme280.open(sensor[sensors]).then(async (sensor) => {
      const sensorData = await sensor.read(); 
      await sensor.close();
      displayData(sensorID, sensorData);

    }).catch(console.log);
    sensors++
    sensors == sensor.length && console.clear();
   }; 
  }, 2000);
};

const displayData = (sensorID, sensorData) => {
 units == "metric" ? temp.push(sensorData.temperature) : temp.push(CtoF(sensorData.temperature));
 humi.push(sensorData.humidity);
 temp.length == 30 && temp.shift();
 humi.length == 30 && humi.shift();
 units == "metric" ? t = sensorData.temperature.toFixed(2) + "C\n" : t = CtoF(sensorData.temperature) + "F\n"
 console.log(
         "####Sensor "+ sensorID +"####" +
	 "\n*************************************\n" +
	 "Temp: " + t + calcAvg(temp, units == "metric" ? "C" : "F") +
	 "\n*************************************\n"+
         "Humid: " + sensorData.humidity.toFixed(2) +"%\n" + calcAvg(humi, "%") +
	 "\n*************************************\n"+
         "Pressure: " + sensorData.pressure.toFixed(2) +"hPa" +
	 "\n*************************************\n"
 );
 
  
 // calcAvg(temp, units == "metric" ? "C" : "F");
 // calcAvg(humi, "%");
 
 makeGraph(sensorID, [temp, humi]);

};

const calcAvg = (sensorInfo, measurement) => {
  let max = Math.max(...sensorInfo).toFixed(2);
  let min = Math.min(...sensorInfo).toFixed(2);
  let avg = (eval(sensorInfo.join('+'))/sensorInfo.length).toFixed(2);
  return(
    "Max:"+ max + measurement +  
    " | Min:"+ min + measurement +
    " | Avg:"+ avg + measurement
  );
};

const makeGraph = (sensorName, sensorInfo) => {
  var config = {
	  colors: [ asciichart.red, asciichart.blue ],
	  height: 10,
  }
  console.log("Live Graph\n");
  console.log("############################################\n");	
  console.log(asciichart.plot(sensorInfo, config) + "\n" );
  console.log("############################################\n");	

};

getSensorData([{i2cAddress: 0x76},{i2cAddress: 0x77}]);

