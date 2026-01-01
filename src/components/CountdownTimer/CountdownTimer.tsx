import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CountdownTimer.css';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    nextYear: new Date().getFullYear() + 1
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const today = new Date();
      const nextYear = today.getFullYear() + 1;
      const countDate = new Date(`Jan 1, ${nextYear} 00:00:00`).getTime();
      const now = new Date().getTime();
      const gap = countDate - now;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const d = Math.floor(gap / day);
      const h = Math.floor((gap % day) / hour);
      const m = Math.floor((gap % hour) / minute);
      const s = Math.floor((gap % minute) / second);

      setTimeLeft({
        days: d,
        hours: h,
        minutes: m,
        seconds: s,
        nextYear
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const numberVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15
      }
    },
    exit: { scale: 0.8, opacity: 0 }
  };

  return (
    <div className="countdown-timer">
      <h2>
        <span>Countdown to New Year</span>
        <motion.span 
          id="year"
          key={timeLeft.nextYear}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {timeLeft.nextYear}
        </motion.span>
      </h2>
      <div className="countdown">
        <div className="countdown-item">
          <AnimatePresence mode="wait">
            <motion.div
              key={timeLeft.days}
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              id="day"
            >
              {timeLeft.days}
            </motion.div>
          </AnimatePresence>
          <div className="label">Days</div>
        </div>
        <div className="countdown-item">
          <AnimatePresence mode="wait">
            <motion.div
              key={timeLeft.hours}
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              id="hour"
            >
              {timeLeft.hours}
            </motion.div>
          </AnimatePresence>
          <div className="label">Hours</div>
        </div>
        <div className="countdown-item">
          <AnimatePresence mode="wait">
            <motion.div
              key={timeLeft.minutes}
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              id="minute"
            >
              {timeLeft.minutes}
            </motion.div>
          </AnimatePresence>
          <div className="label">Minutes</div>
        </div>
        <div className="countdown-item">
          <AnimatePresence mode="wait">
            <motion.div
              key={timeLeft.seconds}
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              id="second"
            >
              {timeLeft.seconds}
            </motion.div>
          </AnimatePresence>
          <div className="label">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

