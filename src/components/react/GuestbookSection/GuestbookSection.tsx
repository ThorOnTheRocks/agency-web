import React, { useState } from 'react';
import { GuestbookForm } from './GuestbookForm';
import { GuestbookList } from './GuestbookList';
import { GuestbookGlobe } from './GuestbookGlobe';
import type { GuestbookEntry } from '../../../types/models/guestbook';

interface GuestbookSectionProps {
  initialEntries: GuestbookEntry[];
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({ initialEntries }) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);

  const handleEntryCreated = (newEntry: GuestbookEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <div className="w-full flex flex-col gap-12">
      <div className="w-full">
        <GuestbookGlobe entries={entries} />
      </div>
      <div className="max-w-2xl mx-auto w-full">
        <GuestbookForm onEntryCreated={handleEntryCreated} />
        <GuestbookList entries={entries} />
      </div>
    </div>
  );
};
