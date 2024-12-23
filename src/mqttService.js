import mqtt from 'mqtt';

const brokerUrl = 'wss://broker.hivemq.com:443/mqtt';
const topic = 'smartlock/door';

// Kết nối tới broker MQTT

// Xử lý khi kết nối thành công
const client = mqtt.connect(brokerUrl, {
  keepalive: 60, // Thời gian gửi ping (giây)
  reconnectPeriod: 1000, // Thời gian thử lại khi mất kết nối (ms)
  clientId: 'mqtt_client_' + Math.random().toString(16).substr(2, 8),
  clean: true,
});

// Lắng nghe và xử lý tin nhắn từ topic
client.on('message', (topic, message) => {
  const data = message.toString();
  console.log(`Nhận dữ liệu từ topic ${topic}: ${data}`);

  // Hiển thị dữ liệu trên giao diện người dùng
  const messageContainer = document.getElementById('messageContainer');
});

client.on('close', () => {
  console.error('Kết nối bị đóng');
});

client.on('end', () => {
  console.log('Kết nối kết thúc');
});

client.on('offline', () => {
  console.warn('Client đang ở trạng thái offline');
});

client.on('error', (err) => {
  console.error('Lỗi xảy ra:', err.message);
});

export default client;
