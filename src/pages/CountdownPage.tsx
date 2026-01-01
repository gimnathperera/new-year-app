import { useEffect, useRef } from 'react';
import CountdownTimer from '../components/CountdownTimer/CountdownTimer';
import fireworksVideo from '../assets/video/fireworks.mp4';
import fireworksAudio from '../assets/audio/Tieng-phao-hoa-no-tren-bau-troi-www_tiengdong_com.mp3';
import './CountdownPage.css';

const CountdownPage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Try to play audio on mount (may require user interaction)
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          // Autoplay was prevented, user will need to interact
          console.log('Audio autoplay prevented');
        }
      }
    };
    playAudio();
  }, []);

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
        autoPlay 
        loop
      />
      <div className="countdown-container">
        <CountdownTimer />
      </div>
    </div>
  );
};

export default CountdownPage;

