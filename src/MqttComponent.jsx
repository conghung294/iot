import { useEffect, useState } from 'react';
import client from './mqttService';

const MqttComponent = () => {
  const [messages] = useState([]);

  useEffect(() => {
    // Đăng ký một topic
    const topic = 'smartlock/door';
    client.subscribe(topic, (err) => {
      if (err) {
        console.error('Failed to subscribe:', err);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });

    // Lắng nghe tin nhắn từ topic
    client.on('message', (topic, message) => {
      const data = message.toString();
      console.log(`Message received on ${topic} : ${data} `);
    });

    // Hủy đăng ký khi component bị hủy
    return () => {
      client.unsubscribe(topic, () => {
        console.log(`Unsubscribed from topic: ${topic}`);
      });
    };
  }, []);

  return (
    <div>
      <h1>MQTT with React</h1>

      <div>
        <h2>Received Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MqttComponent;
