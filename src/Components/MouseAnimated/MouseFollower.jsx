// MouseFollower.js
import { useState } from 'react';
import { useTrail, animated } from 'react-spring';

const MouseFollower = () => {
  const [mouseTrail, setMouseTrail] = useState([]);

  const onMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMouseTrail((prevTrail) => [...prevTrail, { x: clientX, y: clientY }]);
  };

  const trail = useTrail(mouseTrail.length, {
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 300, friction: 20 },
  });

  return (
    <div
      style={{ position: 'absolute', width: '100%', height: '100%' }}
      onMouseMove={onMouseMove}
    >
      {trail.map((style, index) => (
        <animated.div
          key={index}
          style={{
            position: 'absolute',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
            boxShadow: '0 0 10px rgba(255,255,255,0.8)',
            pointerEvents: 'none',
            transform: `translate(${mouseTrail[index].x - 25}px, ${
              mouseTrail[index].y - 25
            }px) scale(${style.scale})`,
            opacity: style.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default MouseFollower;
