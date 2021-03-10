const bme280 = require('bme280sensor');

bme280.open(0x77).then(async sensor => {
  console.log(await sensor.read());
  await sensor.close();
}).catch(console.log);

