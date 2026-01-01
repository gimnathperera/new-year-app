import { useEffect, useRef, useState } from 'react';
import CountdownTimer from '../components/CountdownTimer/CountdownTimer';
import fireworksVideo from '../assets/video/fireworks.mp4';
import fireworksAudio from '../assets/audio/Tieng-phao-hoa-no-tren-bau-troi-www_tiengdong_com.mp3';
import './CountdownPage.css';

const CountdownPage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Enable audio on any user interaction
    const enableAudio = async () => {
      if (audioRef.current && !audioEnabled) {
        try {
          audioRef.current.volume = 0.7; // Set volume to 70%
          await audioRef.current.play();
          setAudioEnabled(true);
        } catch (error) {
          // Autoplay was prevented
          console.log('Audio autoplay prevented, waiting for user interaction');
        }
      }
    };

    // Try to play audio on mount
    enableAudio();

    // Add event listeners for user interaction
    const handleUserInteraction = async () => {
      if (!userInteracted) {
        setUserInteracted(true);
        await enableAudio();
      }
    };

    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });
    window.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [audioEnabled, userInteracted]);

  const handleEnableAudio = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.volume = 0.7;
        await audioRef.current.play();
        setAudioEnabled(true);
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    }
  };

  return (
    <div className="countdown-page">
      <video 
        className="countdown-video" 
        src={fireworksVideo} 
        autoPlay 
        loop 
        muted
      />
      <audio 
        ref={audioRef}
        src={fireworksAudio} 
        loop
      />
      {!audioEnabled && (
        <button 
          className="audio-enable-btn" 
          onClick={handleEnableAudio}
          style={{
            position: 'fixed',
            bottom: '15px',
            right: '15px',
            padding: '12px 18px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '2px solid #fff',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            minHeight: '44px',
            touchAction: 'manipulation',
          }}
        >
          🔊 Enable Sound
        </button>
      )}
      <div className="countdown-container">
        <CountdownTimer />
      </div>
    </div>
  );
};

export default CountdownPage;

