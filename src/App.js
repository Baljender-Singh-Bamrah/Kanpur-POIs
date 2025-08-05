import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useState } from 'react';
import './App.css';

// Sample POIs
const POIS = [
  { id: 1, name: 'Nana Rao Park', type: 'Park', position: [26.471499, 80.361144], description: 'A historic public park in Kanpur.' },
  { id: 2, name: 'JK Temple', type: 'Temple', position: [26.473640, 80.305279], description: 'A famous Hindu temple known for its unique architecture.' },
  { id: 3, name: 'Z Square Mall', type: 'Mall', position: [26.473239, 80.352802], description: 'A popular shopping and entertainment destination.' },
  { id: 4, name: 'Kanpur Zoological Park', type: 'Zoo', position: [26.502844, 80.303080], description: 'A large zoo with a variety of animals and birds.' },
  { id: 5, name: 'Moti Jheel', type: 'Lake', position: [26.476440, 80.316569], description: 'A popular lake and recreation area in Kanpur.' },
  { id: 6, name: 'ISKCON Temple', type: 'Temple', position: [26.527053,80.277116], description: 'A beautiful temple dedicated to Lord Krishna.' },
  { id: 7, name: 'Rave 3 Mall', type: 'Mall', position: [26.4652, 80.3498], description: 'A shopping mall with cinema and food court.' },
  { id: 8, name: 'Blue World Theme Park', type: 'Theme Park', position: [26.570978, 80.238549], description: 'A large amusement and water park in Kanpur.' },
  { id: 9, name: 'Kanpur Memorial Church', type: 'Church', position: [26.450501, 80.369091], description: 'A historic church built in 1875.' },
  { id: 10, name: 'Phool Bagh', type: 'Park', position: [26.466818, 80.361889], description: 'A well-known park and public garden in Kanpur.' },
  { id: 11, name: 'Haveli Restaurant', type: 'Restaurant', position: [26.466526, 80.305497], description: 'A popular restaurant serving North Indian cuisine.' },
  { id: 12, name: 'Status Club', type: 'Club', position: [26.463494, 80.371441], description: 'A social club with various facilities.' },
  { id: 13, name: 'Green Park Stadium', type: 'Stadium', position: [26.482520, 80.346944], description: 'A famous cricket stadium in Kanpur.' },
];

const categories = ['All', ...Array.from(new Set(POIS.map(p => p.type)))];

function App() {
  const [filter, setFilter] = useState('All');
  const filteredPOIs = filter === 'All' ? POIS : POIS.filter(p => p.type === filter);

  return (
    <div className="App">
      <h1>Kanpur Points of Interest</h1>
      <div style={{ marginBottom: 10 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ marginRight: 5, fontWeight: filter === cat ? 'bold' : 'normal' }}>{cat}</button>
        ))}
      </div>
      <div className="map-container">
        <MapContainer center={[26.4499, 80.3319]} zoom={13} style={{ height: '80vh', width: '90vw', margin: 'auto' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredPOIs.map(poi => (
            <Marker key={poi.id} position={poi.position} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })}>
              <Popup>
                <b>{poi.name}</b><br />
                {poi.type}<br />
                {poi.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
