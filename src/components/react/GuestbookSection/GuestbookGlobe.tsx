import React, { useEffect, useRef, useState } from 'react';
import Globe, { type GlobeMethods } from 'react-globe.gl';
import type { GuestbookEntry } from '../../../types/models/guestbook';

interface GuestbookGlobeProps {
  entries: GuestbookEntry[];
}

export const GuestbookGlobe: React.FC<GuestbookGlobeProps> = ({ entries }) => {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    // Filter entries with valid location data
    const validPoints = entries
      .filter((entry) => entry.location)
      .map((entry) => {
        try {
          const loc = JSON.parse(entry.location as string);
          if (loc.lat && loc.lng) {
            return {
              lat: loc.lat,
              lng: loc.lng,
              size: 0.5,
              color: '#007bff', // Blue color for markers
              name: entry.name,
              message: entry.message,
            };
          }
        } catch (e) {
          console.error('Error parsing location for entry:', entry.id, e);
        }
        return null;
      })
      .filter((point) => point !== null);

    setPoints(validPoints);
  }, [entries]);

  useEffect(() => {
    // Auto-rotate
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[400px] md:h-[600px] bg-black/20 rounded-xl overflow-hidden border border-white/10 relative flex items-center justify-center">
       <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={points}
        pointAltitude={0.1}
        pointColor="color"
        pointRadius="size"
        pointsMerge={true}
        animateIn={true}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
      />
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground pointer-events-none">
        Interactive Globe
      </div>
    </div>
  );
};
