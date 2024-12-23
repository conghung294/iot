import { useEffect, useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import { RiHome7Line } from 'react-icons/ri';
import mqttClient from './mqttService';
import { Link } from 'react-router-dom';

const LockStatus = () => {
  const [isLocked, setIsLocked] = useState('lock');

  //   const toggleLock = () => {
  //     setIsLocked(!isLocked);
  //   };

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
    mqttClient.on('message', (topic, message) => {
      setIsLocked(data?.status);
      const data = message.toString();
      console.log(`Message received on ${topic} : ${data} `);
    });

    // Hủy đăng ký khi component bị hủy
    return () => {
      mqttClient.unsubscribe(topic, () => {
        console.log(`Unsubscribed from topic: ${topic}`);
      });
    };
  }, []);

  return (
    <div className="phone">
      <div className="h-80">
        {isLocked === 'lock' ? <div className="bg-lock"></div> : <div className="bg-unlock"></div>}
      </div>

      {/* <button onClick={toggleLock} style={{ marginTop: '20px' }}>
        {isLocked ? 'Mở khóa' : 'Khóa'}
      </button> */}

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
export default LockStatus;
