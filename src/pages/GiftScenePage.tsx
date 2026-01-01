import { useState } from 'react';
import GiftBox from '../components/GiftBox/GiftBox';
import WinterScene from '../components/WinterScene/WinterScene';
import './GiftScenePage.css';

const GiftScenePage = () => {
  const [giftOpened, setGiftOpened] = useState(false);

  const handleGiftOpen = () => {
    setGiftOpened(true);
  };

  return (
    <div className="gift-scene-page">
      {!giftOpened && <GiftBox onOpen={handleGiftOpen} />}
      {giftOpened && <WinterScene />}
    </div>
  );
};

export default GiftScenePage;

