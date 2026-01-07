import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../common/animations/FadeIn';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setMessage(data.message || "You're on the list!");
      setEmail('');
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-muted/30 border-y border-border/50">
      <div className="container relative mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground mb-6">
                Stay ahead of the curve
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Join our exclusive newsletter to receive insights, agency offers, and the latest updates directly to your inbox. No spam, just value.
                </p>
            </FadeIn>

            <FadeIn delay={0.2}>
                <div className="max-w-md mx-auto relative">
                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-green-600 dark:text-green-400"
                    >
                        <div className="flex items-center justify-center gap-3 mb-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-lg">Subscribed!</span>
                        </div>
                        <p>{message}</p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="mt-4 text-sm font-medium hover:underline transition-colors"
                        >
                            Subscribe another email
                        </button>
                    </motion.div>
                    ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleSubmit}
                        className="relative group"
                    >
                        <div className="relative flex items-center">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                            disabled={status === 'loading'}
                            className="w-full h-14 pl-6 pr-36 bg-background border border-input rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                        >
                            {status === 'loading' ? (
                                <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Joining...</span>
                                </span>
                            ) : (
                                'Subscribe'
                            )}
                        </button>
                        </div>
                        {status === 'error' && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute left-6 -bottom-8 text-sm text-red-500"
                        >
                            {message}
                        </motion.p>
                        )}
                    </motion.form>
                    )}
                </AnimatePresence>
                </div>
            </FadeIn>
        </div>
      </div>
    </section>
  );
};
