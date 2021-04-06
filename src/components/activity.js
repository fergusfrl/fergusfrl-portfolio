import React from 'react';
import moment from 'moment-timezone';
import decodePolyline from 'decode-google-map-polyline';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const Stat = ({ label, value }) => (
  <div className="stat">
    <h6>{label}</h6>
    <p className="stat-value">{value}</p>
  </div>
);

const Activity = ({ activity, title, startDate, duration, averageSpeed, distance, elevation, polyline }) => {
  const leafletPolyline = polyline && decodePolyline(polyline).map(coord => [coord.lat, coord.lng]);

  return (
    <div className="activity">
      <div className="stats">
        <h6><strong>{activity}</strong></h6>
        <h6><strong>{moment(startDate).tz('Pacific/Auckland').format('dddd')}</strong></h6>
      </div>
      <h3>{title}</h3>
      <div className="stats">
        <Stat label="Duration" value={`${duration} mins`} />
        <Stat label="Average Speed" value={`${averageSpeed} km/hr`} />
        <Stat label="Distance" value={`${distance} km`} />
        <Stat label="Elevation" value={`${elevation} m`} />
      </div>
      {leafletPolyline && typeof window !== 'undefined' && (
        <MapContainer scrollWheelZoom={false} bounds={leafletPolyline} style={{ maxWidth: 650, height: 300 }}>
          <TileLayer
            url="http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Polyline pathOptions={{ color: '#FCB614' }} positions={leafletPolyline} />
        </MapContainer>
      )}
    </div>
  );
};

export default Activity;
