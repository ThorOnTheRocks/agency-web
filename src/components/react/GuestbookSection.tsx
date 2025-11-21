import { useState } from 'react';
import GuestbookForm from './GuestbookForm/GuestbookForm';
import { GuestbookGlobe } from './GuestbookGlobe';

interface GuestbookEntry {
  id: number;
  name: string;
  message: string | null;
  doodle: string | null;
  location: string | null;
  createdAt: Date | null;
}

interface GuestbookSectionProps {
  initialEntries: GuestbookEntry[];
}

export const GuestbookSection = ({ initialEntries }: GuestbookSectionProps) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);

  const refreshGuestbook = async () => {
    try {
      const response = await fetch('/api/guestbook');
      if (response.ok) {
        const newEntries = await response.json();
        setEntries(newEntries);
      }
    } catch (error) {
      console.error('Failed to refresh guestbook:', error);
    }
  };

  return (
    <>
      <div className="mb-12">
        <GuestbookGlobe entries={entries} />
      </div>

      <div className="mb-12">
        <GuestbookForm onSuccess={refreshGuestbook} />
      </div>

      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.id} className="glass-panel p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{entry.name}</span>
              <span className="text-xs text-muted-foreground">
                {entry.createdAt && new Date(entry.createdAt).toLocaleDateString()}
              </span>
            </div>
            {entry.doodle ? (
              <div className="mt-2">
                <img src={entry.doodle} alt={`Doodle by ${entry.name}`} className="max-w-[200px] border rounded bg-white" />
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">{entry.message}</p>
            )}
            {entry.location && (() => {
              try {
                const loc = JSON.parse(entry.location);
                return (
                  <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                    <span>📍</span>
                    <span>{loc.city}, {loc.country}</span>
                  </div>
                );
              } catch (e) {
                return null;
              }
            })()}
          </div>
        ))}
      </div>
    </>
  );
};
