const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

client.subscribe('/disconnect', function (err) {
  client.on('message', (topic, message) => {
    const json = JSON.parse(message.toString());
    client.publish(
      `channel/leave`,
      JSON.stringify({ name: json.name, login: json.user })
    );
  });
});
