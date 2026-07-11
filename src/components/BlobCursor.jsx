import { useEffect, useState } from 'react';

export default function BlobCursor({ color = '#38bdf8', size = 34, opacity = 0.32 }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const handleMove = (event) => setPosition({ x: event.clientX, y: event.clientY });
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden rounded-full blur-md transition-transform duration-200 ease-out md:block"
      style={{
        width: size,
        height: size,
        opacity,
        background: color,
        transform: `translate3d(${position.x - size / 2}px, ${position.y - size / 2}px, 0) scale(${pressed ? 1.65 : 1})`,
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  );
}
