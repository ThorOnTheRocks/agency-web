import { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';

interface GuestbookEntry {
  location?: string | null;
}

interface GuestbookGlobeProps {
  entries: GuestbookEntry[];
}

export const GuestbookGlobe = ({ entries }: GuestbookGlobeProps) => {
  const globeEl = useRef<any>(null);
  const [width, setWidth] = useState(0);
  const [markers, setMarkers] = useState<any[]>([]);
  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    // Fetch country data for polygon rendering
    fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
      });
  }, []);

  useEffect(() => {
    // Filter entries with valid location data
    let validMarkers = entries
      .map(entry => {
        try {
          if (!entry.location) return null;
          const loc = JSON.parse(entry.location);
          if (!loc.lat || !loc.lng) return null;
          return { 
            lat: loc.lat, 
            lng: loc.lng, 
            size: 0.4,
            color: 'rgba(255, 255, 255, 0.9)'
          };
        } catch (e) {
          return null;
        }
      })
      .filter((m): m is { lat: number; lng: number; size: number; color: string } => m !== null);

    // Add a dummy marker in dev mode if no markers exist
    if (validMarkers.length === 0 && import.meta.env.DEV) {
      validMarkers = [{ lat: 41.9028, lng: 12.4964, size: 0.4, color: 'rgba(255, 255, 255, 0.9)' }];
    }
    
    setMarkers(validMarkers);

    const handleResize = () => {
      setWidth(window.innerWidth > 600 ? 600 : window.innerWidth - 32);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [entries]);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;
      globeEl.current.controls().enableZoom = false;
    }
  }, []);

  return (
    <div className="flex justify-center">
      <Globe
        ref={globeEl}
        width={width}
        height={width}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="rgba(255,255,255,0.15)"
        atmosphereAltitude={0.15}
        globeMaterial={undefined as any}
        polygonsData={countries.features}
        polygonCapColor={() => 'rgba(255, 255, 255, 0.15)'}
        polygonSideColor={() => 'rgba(255, 255, 255, 0.08)'}
        polygonStrokeColor={() => 'rgba(255, 255, 255, 0.4)'}
        polygonLabel={() => ''}
        pointsData={markers}
        pointAltitude={0.01}
        pointColor="color"
        pointRadius="size"
        pointsMerge={true}
      />
    </div>
  );
};
