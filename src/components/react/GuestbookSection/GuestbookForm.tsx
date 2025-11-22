import React, { useState } from 'react';
import type { GuestbookEntry } from '../../../types/models/guestbook';

interface GuestbookFormProps {
  onEntryCreated: (entry: GuestbookEntry) => void;
}

export const GuestbookForm: React.FC<GuestbookFormProps> = ({ onEntryCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [shareLocation, setShareLocation] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShareLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setShareLocation(checked);
    if (checked) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (err) => {
            console.error('Error getting location:', err);
            setShareLocation(false);
            // Optionally show an error to the user
          }
        );
      } else {
        console.error('Geolocation is not supported');
        setShareLocation(false);
      }
    } else {
      setLocation(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          location: location ? { lat: location.lat, lng: location.lng } : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit entry');
      }

      const newEntry = await response.json();
      onEntryCreated(newEntry);
      setName('');
      setEmail('');
      setMessage('');
      setShareLocation(false);
      setLocation(null);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8 p-6 bg-white/5 rounded-lg border border-white/10">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="shareLocation"
          checked={shareLocation}
          onChange={handleShareLocationChange}
          className="rounded border-white/10 bg-black/20 text-primary focus:ring-primary"
        />
        <label htmlFor="shareLocation" className="text-sm text-muted-foreground">
          Pin my location on the globe
        </label>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
      >
        {isSubmitting ? 'Signing...' : 'Sign Guestbook'}
      </button>
    </form>
  );
};
