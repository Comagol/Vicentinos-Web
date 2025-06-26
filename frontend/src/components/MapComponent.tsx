import React from 'react';
import { Box } from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para los iconos de Leaflet en React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  latitude: number;
  longitude: number;
  title: string;
  description?: string;
  height?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  title,
  description = "Ubicación del Club",
  height = "400px"
}) => {
  return (
    <Box
      w="full"
      h={height}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.200"
    >
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>{title}</h3>
              <p>{description}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default MapComponent; 