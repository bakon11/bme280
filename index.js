const bme280 = require('bme280sensor');

const CtoF = (c) =>{
  const F = (c * (9/5) + 32);
  return F;
};


bme280.open({i2cAddress: 0x76}).then(async sensor => {
  const sensor1 = await sensor.read();
  console.log(
    "####Sensor 1#### \n" + 
    "Temp: " + sensor1.temperature.toFixed(2) +"C\n" +
    "Temp: " + CtoF(sensor1.temperature.toFixed(2)) + "F\n" +
    "Humid: " + sensor1.humidity.toFixed(2) +"%\n" +
    "Pressure: " + sensor1.pressure.toFixed(2) +"hPa\n"
  );
  await sensor.close();
}).catch(console.log);

bme280.open({i2cAddress: 0x77}).then(async sensor => {
  const sensor1 = await sensor.read();
  console.log(
    "####Sensor 2#### \n" + 
    "Temp: " + sensor1.temperature.toFixed(2) +"C\n" +
    "Temp: " + CtoF(sensor1.temperature.toFixed(2)) + "F\n" +
    "Humid: " + sensor1.humidity.toFixed(2) +"%\n" +
    "Pressure: " + sensor1.pressure.toFixed(2) +"hPa\n"
  );
  await sensor.close();
}).catch(console.log);
