import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

const XIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
        }
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 flex flex-col items-center justify-center font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://dl.dropboxusercontent.com/scl/fi/1u1imbgl2gzvob3fovgrf/bg.jpg?rlkey=8knpu1e33m2th2n8z4a4kv4kc&st=y1fdt9rt"
          alt="Background"
          className="w-full h-full object-cover opacity-70"
        />
        {/* Subtle gradient overlay to ensure UI elements are always visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      </div>

      {/* Top Middle X Button */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-all duration-300 border border-white/20 hover:scale-105 hover:border-white/40 shadow-lg"
          aria-label="Visit X (formerly Twitter)"
        >
          <XIcon className="w-5 h-5 text-white" />
        </a>
      </div>

      {/* Center Video Container */}
      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 md:px-8">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 aspect-video bg-black/50 backdrop-blur-sm group ring-1 ring-white/5">
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}print.mp4`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={togglePlay}
            controls={true} // Always enable controls but hide them under overlay when paused
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            playsInline
          />

          {/* Custom Play Overlay (visible when paused/stopped) */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-colors duration-300 group-hover:bg-black/20"
              onClick={togglePlay}
            >
              {/* Play Button Bubble */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 w-24 h-24 bg-white/95 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all group-hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
              >
                <Play className="w-10 h-10 text-black translate-x-1" strokeWidth={2.5} fill="currentColor" />
              </motion.div>

              {/* Animated Arrow & Text Pointing at Play Button */}
              <div className="absolute top-1/2 left-1/2 -mt-36 -ml-52 md:-ml-64 pointer-events-none">
                <motion.div
                  animate={{
                    x: [0, 15, 0],
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex flex-col items-center"
                >
                  <span 
                    className="text-2xl md:text-3xl font-bold text-white mb-1 -rotate-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" 
                    style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive" }}
                  >
                    click play
                  </span>
                  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] opacity-90">
                    {/* Curved line */}
                    <path d="M20 10 Q 50 15 80 65" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none" />
                    {/* Arrowhead */}
                    <path d="M55 65 L 83 68 L 73 43" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
