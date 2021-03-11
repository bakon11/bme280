const bme280 = require('bme280sensor');
var asciichart = require ('asciichart')

const CtoF = (c) =>{
  const F = (c * (9/5) + 32);
  return F.toFixed(2);
};

const getSensorData = (sensor) => {
  const sensorID = sensor.i2cAddress.toString(16);
  let temp = [];
  let humid = [];	 
  setInterval(()=>{
    bme280.open(sensor).then(async sensor => {
      const sensorData = await sensor.read();
      temp.push(sensorData.temperature.toFixed(2));
      console.log(temp.length);
      humid.push(sensorData.humidity.toFixed(2));
      console.log(humid.length);
      console.log("######################################################################################");	    
      await displayData(sensorID, sensorData);     
      await makeGraph("Temperature", "F*", temp);
      await makeGraph("Humidity", "%", humid);
      console.log("######################################################################################");   
      await sensor.close();
    }).catch(console.log);
  }, 2000);
};

const displayData = (sensorID, sensorData) => {
 console.log(
        "####Sensor "+ sensorID +"#### \n" + 
        "Temp: " + sensorData.temperature.toFixed(2) + "C | " + CtoF(sensorData.temperature.toFixed(2)) +"F\n" +
        "Humid: " + sensorData.humidity.toFixed(2) +"%\n" +
        "Pressure: " + sensorData.pressure.toFixed(2) +"hPa\n"
      );
};

const makeGraph = (sensorName, measurement, sensorInfo) => {
 console.log("########"+sensorName+"########\n");
 console.log("Max:"+Math.max(...sensorInfo).toFixed(2)+ measurement +  
	     " | Min:"+Math.min(...sensorInfo).toFixed(2) + measurement + "\n"); 
	     // " | Avg:"+(sensorInfo.reduce((a,b) => a + b, 0) / sensorInfo.length).toFixed(2) + measurement + "\n");	
 console.log(asciichart.plot (sensorInfo, { height: 6 }) + "\n") // this rescales the graph to ±3 lines 
};

getSensorData({i2cAddress: 0x76});
getSensorData({i2cAddress: 0x77});
