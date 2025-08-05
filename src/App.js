import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import './App.css';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Component to handle map focus
function MapFocus({ filteredPOIs, filter }) {
  const map = useMap();
  
  useEffect(() => {
    if (filter !== 'All' && filteredPOIs.length > 0) {
      // Focus on the first marker of the filtered category
      const firstPOI = filteredPOIs[0];
      map.setView(firstPOI.position, 15);
    } else if (filter === 'All') {
      // Reset to default view for all POIs
      map.setView([26.4850, 80.3319], 13);
    }
  }, [filter, filteredPOIs, map]);

  return null;
}

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
      <div className="app-header">
        <h1 className="app-title">Kanpur Points of Interest</h1>
        <p className="app-subtitle">Discover the vibrant landmarks and attractions of Kanpur</p>
      </div>
      
      <div className="filter-buttons">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)} 
            className={`filter-button ${filter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="map-container">
        <MapContainer 
          center={[26.4850, 80.3319]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapFocus filteredPOIs={filteredPOIs} filter={filter} />
          {filteredPOIs.map(poi => (
            <Marker 
              key={poi.id} 
              position={poi.position}
            >
              <Popup>
                <div>
                  <b>{poi.name}</b>
                  <div className="poi-type">{poi.type}</div>
                  <div className="poi-description">{poi.description}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
