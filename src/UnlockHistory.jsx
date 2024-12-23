import { useEffect, useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import { RiHome7Line } from 'react-icons/ri';
import mqttClient from './mqttService';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UnlockHistory = () => {
  const [history, setHistory] = useState([]); // Lưu trữ lịch sử mở khóa

  const fetchHistory = async () => {
    try {
      // const response = await axios.get('');
      // setHistory(response.data);
      // const fakeData = [
      //   {
      //     message: '{"status":"Lock","message":"The door is locked"}',
      //     createdAt: '2023-01-15T00:00:00Z',
      //   },
      //   {
      //     message: '{"status":"Unlock","message":"The door is unlocked"}',
      //     createdAt: '2023-01-15T00:00:00Z',
      //   },
      //   {
      //     message: '{"status":"Lock","message":"The door is locked"}',
      //     createdAt: '2023-01-15T00:00:00Z',
      //   },
      //   {
      //     message: '{"status":"Lock","message":"The door is locked"}',
      //     createdAt: '2023-01-15T00:00:00Z',
      //   },
      //   {
      //     message: '{"status":"Lock","message":"The door is locked"}',
      //     createdAt: '2023-01-15T00:00:00Z',
      //   },
      // ];
      // setHistory(fakeData);
    } catch (error) {
      console.error('Failed to fetch unlock history:', error);
    }
  };

  // Gọi API để lấy dữ liệu lịch sử
  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    // Đăng ký một topic
    const topic = 'smartlock/door';

    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error('Failed to subscribe:', err);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });

    // Lắng nghe tin nhắn từ topic
    mqttClient.on('message', async () => {
      await fetchHistory();
    });

    // Hủy đăng ký khi component bị hủy
    return () => {
      mqttClient.unsubscribe(topic, () => {
        console.log(`Unsubscribed from topic: ${topic}`);
      });
    };
  }, []);

  const addHoursToTime = (timeString, hours) => {
    const date = new Date(timeString);
    date.setHours(date.getHours() + hours); // Add 7 hours to the time
    return date.toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'
  };

  return (
    <div className="phone">
      <div className="history">
        <h2 className="history-title">Unlock History</h2>
        <div className="history-list">
          {history.map((item, index) => (
            <div className="history-item" key={index}>
              <p>
                <strong>Status:</strong> {JSON.parse(item.message).status}
              </p>
              <p>
                <strong>Message:</strong> {JSON.parse(item.message).message}
              </p>
              <p>
                <strong>Time:</strong> {addHoursToTime(item.createdAt, 7)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="icon">
        <Link to={'/'}>
          <RiHome7Line size={40} color="white" />
        </Link>
        <Link to={'/history'}>
          <FaHistory size={40} color="white" />
        </Link>
      </div>
    </div>
  );
};
export default UnlockHistory;
