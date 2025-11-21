import { useState } from 'react';

interface UseGuestbookFormProps {
  onSuccess?: () => void;
}

export const useGuestbookForm = ({ onSuccess }: UseGuestbookFormProps = {}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, extraData?: Record<string, any>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(formData),
      ...extraData,
    };

    await fetch('/api/guestbook', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    setStatus('success');
    onSuccess?.();
  };

  return {
    status,
    message,
    setMessage,
    handleSubmit
  };
};
