import { useState, useEffect } from 'react';
import './App.css';
import Messages from './components/Messages';
import Input from './components/Input';
import Header from './components/Header';
import Footer from './components/Footer';

const randomName = () => {
  const cars = [
  "Abarth", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti",
  "Cadillac", "Chevrolet", "Chrysler", "Citroën", "Dacia", "Daewoo", "Daihatsu",
  "Dodge", "Donkervoort", "DS", "Ferrari", "Fiat", "Fisker", "Ford", "Honda",
  "Hummer", "Hyundai", "Infiniti", "Iveco", "Jaguar", "Jeep", "Kia", "KTM",
  "Lada", "Lamborghini", "Lancia", "Land Rover", "Landwind", "Lexus", "Lotus",
  "Maserati", "Maybach", "Mazda", "McLaren", "Mercedes-Benz", "MG", "Mini",
  "Mitsubishi", "Morgan", "Nissan", "Opel", "Peugeot", "Porsche",  "Renault",
  "Rolls-Royce", "Rover", "Saab", "Seat", "Skoda", "Smart", "SsangYong", "Subaru",
  "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"
  ];
  const items = [
    "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
    "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
    "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
    "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
    "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
    "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
    "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
    "smoke", "star"
  ];
  const car = cars[Math.floor(Math.random() * cars.length)];
  const item = items[Math.floor(Math.random() * items.length)];
  return car + " " + item;
}

const randomColor = () => {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

const App = () => {

  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    const drone = new window.Scaledrone("AIMIw99BF7blqjDR", {
      data: member,
    });

    setDrone(drone);
  }, []);

  useEffect(() => {
    if (drone) {
      const room = drone.subscribe("observable-room");

      drone.on("open", (error) => {
        if (error) {
          console.error(error);
        } else {
          setMember(prevMember => ({
            ...prevMember,
            id: drone.clientId
          }));
        }
      });

      room.on("data", (message, member) => {
        setMessages(prevMessages => [...prevMessages, { text: message, member: member }]);
      });
    }
  }, [drone]);

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message
    });
  }

  return (
    <div className="App">
      <Header />
      <div className='Messages-wrapper'>
        <Messages messages={messages} currentMember={member} />
      </div>
      <Input onSendMessage={onSendMessage} />
      <Footer />
    </div>

  );
};

export default App;
