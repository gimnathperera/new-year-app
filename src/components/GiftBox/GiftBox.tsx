import { useState } from 'react';
import { motion } from 'framer-motion';
import './GiftBox.css';

interface GiftBoxProps {
  onOpen: () => void;
}

const GiftBox = ({ onOpen }: GiftBoxProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Trigger callback after animation completes
    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  const hatVariants = {
    initial: { rotate: 0, x: 0, opacity: 1 },
    animate: {
      rotate: -80,
      x: -500,
      opacity: 0,
      transition: {
        duration: 1,
        ease: [0.42, 0, 0.58, 1] // Power2.easeIn equivalent
      }
    }
  };

  const boxVariants = {
    initial: { y: 0 },
    animate: {
      y: 800,
      transition: {
        duration: 1,
        ease: [0.42, 0, 0.58, 1] // Power2.easeIn equivalent
      }
    }
  };

  const giftVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: 0,
      transition: {
        duration: 1,
        delay: 1,
        onComplete: () => {
          // Animation complete
        }
      }
    }
  };

  return (
    <motion.div
      className={`gift ${isOpening ? 'opening' : ''}`}
      onClick={handleClick}
      variants={giftVariants}
      initial="initial"
      animate={isOpening ? 'animate' : 'initial'}
    >
      <motion.svg viewBox="-20 -50 490 557" className="gift-svg">
        <motion.g
          className="box"
          variants={boxVariants}
          initial="initial"
          animate={isOpening ? 'animate' : 'initial'}
        >
          <polygon style={{ fill: '#B8CDB7' }} points="19.3,219.9 49.7,457.3 394.8,457.3 436.2,192.3" />
          <g fill="#FAEECD">
            {/* Simplified box decoration paths - keeping key visual elements */}
            <path d="M62.8,311.7c-0.7-0.6-1.1-0.7-2.1-0.8c-1.9-0.1-1.9,3,0,2.9c1,0,1.4-0.2,2.1-0.8C63.2,312.7,63.2,312,62.8,311.7z" />
            <path d="M106.1,304.9c0.1,0.2,0.1,0.4,0.2,0.6c0.9,2.6,4.4,2.6,5.4,0c0.1-0.2,0.1-0.4,0.2-0.6C113.7,300.1,104.4,300.1,106.1,304.9z" />
            <path d="M182,303c-0.6-0.5-1.1-0.8-1.9-1.1c-3.7-1.3-3.7,5.7,0,4.4c0.8-0.3,1.3-0.6,1.9-1.1C182.6,304.7,182.6,303.5,182,303z" />
            <path d="M226.4,305.1c-4,0-4,6.2,0,6.2C230.4,311.3,230.4,305.1,226.4,305.1z" />
            <path d="M369.9,297.4c-3.3,0-3.3,5.1,0,5.1S373.3,297.4,369.9,297.4z" />
            <polygon className="shadow" fill="#A4BBA7" points="424.5,267.4 421.9,283.6 30.1,304.4 28.7,293.5 " />
          </g>
        </motion.g>
        <motion.g
          className="hat"
          variants={hatVariants}
          initial="initial"
          animate={isOpening ? 'animate' : 'initial'}
          style={{ transformOrigin: 'left bottom' }}
        >
          <path
            style={{ fill: '#C3373E' }}
            d="M390.9,148.4l-16.6-0.5l9.5-27.7c-36.8,33.7-81.3,42.3-111,43.8c25-7.9,47.5-26.2,64.7-44.7c12.3-13.3,18.3-30.1,19.9-48.1c2.2-25-1.3-36.1-15.3-55.7C325.4-7.7,296-3.6,280.8,19.2c-10.8,16.3-12,42.7-14.2,61.4c-3.2,27.4-18.4,49.9-34.6,71.5c-6.9,2.8-12.1,3.3-20.7-3.4c-10.9-8.4-14.7-19.7-18.8-32.3c-6.1-19-13-34.3-28.4-47.5c-22.6-19.3-64.6-25.3-81.4,4.8c-7.3,13.1-2,33.8,2.7,46.8c5.5,15.3,20.1,24.4,34.1,30.8c20.7,9.6,43.8,17.3,67.1,20c-25.3,3.7-64.4,2.3-111-23.3l0.6,19.7l-37.5,9.7c0,0,62.9,17.9,122.2,12.5c0,0,0,0,0,0c10.5,1.3,141.9-8.7,141.9-8.7l-0.2,0c0.7,0,1.5-0.1,2.2-0.1C355.9,177,390.9,148.4,390.9,148.4z M276,103.8c9.6-29.4-4-81.5,31.7-95.5c30.3-11.8,35.3,30.6,35.3,49c0.1,19.6-6.3,34.8-18.7,49.5c-19.6,23.2-43.1,35.4-70.5,42.1C263.5,135.1,271,119.2,276,103.8z M136.1,141.7c-19.3-7.1-34.1-16.1-39.4-37.2c-9-35.7,29.2-44.8,53.8-28.7c19.2,12.6,25.7,29.6,33.7,50c3.7,9.6,9.4,24.3,17.2,31.5C179.4,156.5,157.5,149.6,136.1,141.7z"
          />
          <polygon style={{ fill: '#E9454F' }} points="0,200.6 13.8,294.4 433.4,266.8 450,153.6" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
};

export default GiftBox;

