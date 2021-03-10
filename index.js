const bme280 = require('bme280sensor');
var asciichart = require ('asciichart')

const CtoF = (c) =>{
  const F = (c * (9/5) + 32);
  return F.toFixed(2);
};

const getSensorData = (sensor) => {
  const sensorID = sensor.i2cAddress.toString(16);
  bme280.open(sensor).then(async sensor => {
    const sensor1 = await sensor.read();
    console.log(
      "####Sensor "+ sensorID +"#### \n" + 
      "Temp: " + sensor1.temperature.toFixed(2) +"C\n" +
      "Temp: " + CtoF(sensor1.temperature.toFixed(2)) + "F\n" +
      "Humid: " + sensor1.humidity.toFixed(2) +"%\n" +
      "Pressure: " + sensor1.pressure.toFixed(2) +"hPa\n"
    );
    await sensor.close();
  }).catch(console.log);
};

getSensorData({i2cAddress: 0x76});
getSensorData({i2cAddress: 0x77});
