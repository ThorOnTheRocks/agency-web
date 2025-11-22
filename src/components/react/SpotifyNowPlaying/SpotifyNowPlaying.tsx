import { motion } from 'framer-motion';
import { useSpotifyNowPlaying } from '../../../hooks/useSpotifyNowPlaying';

export const SpotifyNowPlaying = () => {
  const { loading, result } = useSpotifyNowPlaying();

  if (loading) {
    return (
      <div 
        className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm w-fit animate-pulse"
        suppressHydrationWarning
      >
        <div className="w-12 h-12 bg-muted rounded-md" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-20 bg-muted rounded-full" />
          <div className="h-4 w-32 bg-muted rounded-full" />
        </div>
      </div>
    );
  }

  if (!result?.isPlaying) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm w-fit"
    >
      <div className="relative w-12 h-12 flex-shrink-0">
        <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-pulse"></div>
        <img 
          src={result.albumImageUrl} 
          alt={result.album} 
          className="w-full h-full object-cover rounded-md relative z-10"
        />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1DB954] rounded-full border-2 border-background flex items-center justify-center z-20">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-black">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-xs font-bold text-green-500 uppercase tracking-wider mb-0.5">Now Playing</span>
        <a 
          href={result.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium hover:underline truncate max-w-[200px] text-foreground"
        >
          {result.title} - {result.artist}
        </a>
      </div>

      <div className="flex gap-1 items-end h-4 ml-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1 bg-green-500/50 rounded-full"
            animate={{
              height: [4, 16, 4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
