import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGuestbookForm } from './useGuestbookForm';
import { DoodleCanvas } from './DoodleCanvas';

interface GuestbookFormProps {
  onSuccess?: () => void;
}

export default function GuestbookForm({ onSuccess }: GuestbookFormProps) {
  const { status, message, setMessage, handleSubmit } = useGuestbookForm({ onSuccess });
  const [mode, setMode] = useState<'message' | 'doodle'>('message');
  const [doodle, setDoodle] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, { doodle: mode === 'doodle' ? doodle : undefined });
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 border border-green-500/20 bg-green-500/10 text-green-600 rounded-md"
      >
        Thanks for signing the guestbook!
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-md">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-muted-foreground mb-1"
        >
          Name
        </label>
        <input
          name="name"
          required
          className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <div className="flex gap-4 border-b mb-4">
        <button
          type="button"
          onClick={() => setMode('message')}
          className={`pb-2 text-sm font-medium transition-colors ${
            mode === 'message'
              ? 'border-b-2 border-foreground text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Write a Message
        </button>
        <button
          type="button"
          onClick={() => setMode('doodle')}
          className={`pb-2 text-sm font-medium transition-colors ${
            mode === 'doodle'
              ? 'border-b-2 border-foreground text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Draw a Doodle
        </button>
      </div>

      {mode === 'message' ? (
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-muted-foreground mb-1"
          >
            Message
          </label>
          <textarea
            name="message"
            required={mode === 'message'}
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <div className="flex gap-2 mt-2">
            {['🔥', '🚀', '💻', '❤️', '👀'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setMessage(prev => prev + ' ' + emoji)}
                className="p-2 hover:bg-muted rounded-md transition-colors text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Doodle
          </label>
          <DoodleCanvas onDoodleChange={setDoodle} />
          <input type="hidden" name="doodle" value={doodle || ''} />
        </div>
      )}

      <button
        disabled={status === 'loading' || (mode === 'doodle' && !doodle)}
        type="submit"
        className="px-4 py-2 bg-foreground text-background rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === 'loading' ? 'Signing...' : 'Sign Guestbook'}
      </button>
    </form>
  );
}
