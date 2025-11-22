import React from 'react';
import type { GuestbookEntry } from '../../../types/models/guestbook';

interface GuestbookListProps {
  entries: GuestbookEntry[];
}

export const GuestbookList: React.FC<GuestbookListProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No entries yet. Be the first to sign!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <div key={entry.id} className="p-6 bg-white/5 rounded-lg border border-white/10">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">{entry.name}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(entry.createdAt!).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <p className="text-gray-300 whitespace-pre-wrap">{entry.message}</p>
        </div>
      ))}
    </div>
  );
};
