const axios = require("axios");

const TOKEN = "TOKEN";

let machines = [];
const positions = {};

const loadMachines = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5011/api/machines",
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );

    machines = res.data;

    machines.forEach((m) => {
      if (!positions[m.machineId]) {
        positions[m.machineId] = {
          lat: 11.0168 + Math.random() * 0.01,
          lng: 76.9558 + Math.random() * 0.01,
        };
      }
    });

    console.log("✅ Machines Reloaded:", machines.length);
  } catch (err) {
    console.log("❌ Machine reload failed");
  }
};

/* ✅ Reload every 5 sec */
setInterval(loadMachines, 5000);

/* ✅ Send GPS */
setInterval(async () => {
  for (const machine of machines) {
    const pos = positions[machine.machineId];

    pos.lat += (Math.random() - 0.5) * 0.001;
    pos.lng += (Math.random() - 0.5) * 0.001;

    try {
      await axios.post(
        "http://localhost:5011/api/gps",
        {
          machineId: machine.machineId,
          latitude: pos.lat,
          longitude: pos.lng,
          engineStatus: Math.random() > 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      console.log(`✅ ${machine.machineId} updated`);
    } catch (error) {
      console.log(`❌ ${machine.machineId} failed`);
    }
  }
}, 3000);
