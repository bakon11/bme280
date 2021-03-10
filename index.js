const bme280 = require('bme280sensor');

bme280.open(0x76).then(async sensor => {
  const sensor1 = await sensor.read();
  console.log(
    "Sensor 1 Temp: " + sensor1.temperature.toFixed(2) +"C/n" +
    "Sensor 1 Humid: " + sensor1.humidity.toFixed(2) +"%/n" +
    "Sensor 1 pressure: " + sensor1.pressure.toFixed(2) +"%/n"
  );
  await sensor.close();
}).catch(console.log);

bme280.open(0x77).then(async sensor => {
  const sensor1 = await sensor.read();
  console.log(
    "Sensor 2 Temp: " + sensor1.temperature.toFixed(2) +"C/n" +
    "Sensor 2 Humid: " + sensor1.humidity.toFixed(2) +"%/n" +
    "Sensor 2 pressure: " + sensor1.pressure.toFixed(2) +"%/n"
  );
  await sensor.close();
}).catch(console.log);