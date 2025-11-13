import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

export default function MapComponent() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    async function initMap() {
      // Cargar Leaflet dinámicamente
      const L = await import('leaflet');

      // Fix para los iconos en producción
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

       const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Inicializar el mapa
      const map = L.map(mapRef.current).setView([40.1900, -3.6800], 13);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // Marcadores
      const points = [
        { 
          name: "Clínica Rehabilicenter Valdemoro", 
          coords: [40.1927, -3.6782],
          address: "C/ Eloy Gonzalo, 10, 28342 Valdemoro, Madrid"
        },
        { 
          name: "Centro de Salud El Restón", 
          coords: [40.1904, -3.6771],
          address: "Av. del Mediterráneo, 1, 28342 Valdemoro, Madrid"
        },
        { 
          name: "Policlínica Valdemoro Plaza ", 
          coords: [40.1910, -3.6789],
          address: "Plaza de la Constitución, 2-3, 28341 Valdemoro, Madrid"
        },
        { 
          name: "Biosense Terapia. Hipnosis Clínica", 
          coords: [40.4065, -3.6760],
          address: "C/ del Alcalde Sainz de Baranda, 43, Bajo 5, Retiro, 28009 Madrid"
        },
        { 
          name: "CAID - Centro de Atención Integral a las Drogodependencias Valdemoro", 
          coords: [40.1127, -3.7000],
          address: "C/ Dr. Barraquer, s/n, 2°, Madrid"
        },
        { 
          name: "Centro de Salud Valdemoro", 
          coords: [40.1890, -3.6810],
          address: "C/ Parla, 16, Valdemoro, Madrid",
          icon: redIcon 
        }
      ];

      points.forEach(p => {
        const marker = L.marker(p.coords, { icon: p.icon || L.Icon.Default.prototype });
        marker.addTo(map).bindPopup(`
          <b>${p.name}</b><br>
          <p>${p.address}</p>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address)}" target="_blank">Abrir en Google Maps</a>
        `);
      });
    }

    initMap();

    // Cleanup: eliminar el mapa cuando el componente se desmonte
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="min-h-[500px] w-full rounded-lg overflow-hidden"
    />
  );
}