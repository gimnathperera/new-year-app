import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './WinterScene.css';
import './WinterSceneAnimations.css';

// ViewBox coordinates for zoom functionality
const viewBoxes = {
  overHouses: { x: 43, y: 290, width: 130, height: 67 },
  overSnowmen: { x: 250, y: 325, width: 225, height: 115 },
  overPenguins: { x: 634, y: 310, width: 95, height: 140 },
  overHanging: { x: 774, y: 416, width: 49, height: 38 },
  overSkilift: { x: 897, y: 284, width: 217, height: 130 },
};

const WinterScene = () => {
  const [viewBox, setViewBox] = useState('0 0 1600 900');
  const [isZoomed, setIsZoomed] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [svgContent, setSvgContent] = useState<string>('');
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Load SVG content from public folder
    fetch('/winter-scene.svg')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch SVG: ${res.status}`);
        }
        return res.text();
      })
      .then(text => {
        // Extract inner content (remove <svg> tags)
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'image/svg+xml');
        const svgElement = doc.querySelector('svg');
        if (svgElement) {
          setSvgContent(svgElement.innerHTML);
          // Start animations after a brief delay to ensure DOM is ready
          setTimeout(() => {
            setAnimationStarted(true);
            initializeAnimations();
          }, 200);
        } else {
          console.error('SVG element not found in parsed document');
        }
      })
      .catch(err => {
        console.error('Failed to load SVG:', err);
        // Fallback: try to load from assets
        fetch('/src/assets/winter-scene.svg')
          .then(res => res.text())
          .then(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'image/svg+xml');
            const svgElement = doc.querySelector('svg');
            if (svgElement) {
              setSvgContent(svgElement.innerHTML);
              setTimeout(() => {
                setAnimationStarted(true);
                initializeAnimations();
              }, 200);
            }
          })
          .catch(err2 => console.error('Failed to load SVG from assets:', err2));
      });
  }, []);

  const initializeAnimations = () => {
    if (!svgRef.current) {
      // Retry after a short delay if ref isn't ready
      setTimeout(() => initializeAnimations(), 100);
      return;
    }
    // Initialize animations
    startSceneAppearance();
  };

  const startSceneAppearance = () => {
    // Scene appearance sequence - matches original copyAnim()
    // Set initial states and start animations
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // Wait a bit for the DOM to be fully ready
    setTimeout(() => {
    
    // Initialize snow animation with random delays and durations
    const snowElements = svg.querySelectorAll('#snow ellipse, #snow path');
    snowElements.forEach((el) => {
      const randomDelay = Math.random() * 100;
      const randomDuration = Math.random() * 50 + 50;
      (el as HTMLElement).style.setProperty('--snow-delay', randomDelay.toString());
      (el as HTMLElement).style.setProperty('--snow-duration', randomDuration.toString());
    });

    // Initialize letters with random rotations
    const letters = svg.querySelectorAll('#letters path');
    letters.forEach((el, i) => {
      const randomRotation = Math.random() * 180;
      (el as HTMLElement).style.setProperty('--letter-rotation', randomRotation.toString());
      (el as HTMLElement).style.setProperty('--letter-index', i.toString());
    });

    // Initialize penguin delays
    const penguins = svg.querySelectorAll('#penguins > g');
    penguins.forEach((el, i) => {
      if (i >= 2) {
        (el as HTMLElement).style.setProperty('--penguin-delay', (i * 1.1).toString());
      }
    });

    // Initialize overlay event listeners after a brief delay to ensure SVG is rendered
    setTimeout(() => {
      const overlays = svg.querySelectorAll('#overlays > g');
      overlays.forEach((overlay) => {
        overlay.addEventListener('mouseenter', () => {
          if (!isZoomed && animationStarted) {
            (overlay as SVGElement).style.opacity = '1';
          }
        });
        overlay.addEventListener('mouseleave', () => {
          if (!isZoomed) {
            (overlay as SVGElement).style.opacity = '0';
          }
        });
        overlay.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = overlay.getAttribute('id');
          if (id && id in viewBoxes) {
            handleOverlayClick(e as any, id);
          }
        });
      }, 200);
    }, 100);
    });
  };

  const handleOverlayClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (isZoomed || !animationStarted) return;
    
    const viewBoxData = viewBoxes[id as keyof typeof viewBoxes];
    if (viewBoxData) {
      setViewBox(`${viewBoxData.x} ${viewBoxData.y} ${viewBoxData.width} ${viewBoxData.height}`);
      setIsZoomed(true);
    }
  };

  const handleUnzoom = () => {
    if (!isZoomed) return;
    setViewBox('0 0 1600 900');
    setIsZoomed(false);
  };

  // Update viewBox when it changes with smooth transition
  useEffect(() => {
    if (svgRef.current) {
      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => {
        if (svgRef.current) {
          svgRef.current.setAttribute('viewBox', viewBox);
        }
      });
    }
  }, [viewBox]);

  return (
    <div className="winter-scene-container">
      {svgContent ? (
        <motion.svg
          ref={svgRef}
          className={animationStarted ? 'scene animation-started' : 'scene'}
          viewBox={viewBox}
          onClick={handleUnzoom}
          style={{ 
            cursor: isZoomed 
              ? 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/cross.png) 20 20, auto' 
              : 'auto',
            opacity: svgContent ? 1 : 0
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: svgContent ? 1 : 0
          }}
          transition={{ 
            opacity: { duration: 0.5 }
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          color: '#1d1f3f',
          fontSize: '18px'
        }}>
          Loading scene...
        </div>
      )}
    </div>
  );
};

export default WinterScene;
