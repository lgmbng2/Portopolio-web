export default function SideRays({
  speed = 2.5,
  rayColor1 = '#EAB308',
  rayColor2 = '#96c8ff',
  intensity = 2,
  spread = 2,
  origin = 'top-right',
  tilt = 0,
  saturation = 1.5,
  blend = 0.75,
  falloff = 1.6,
  opacity = 1,
}) {
  const originMap = {
    'top-left': '0% 0%',
    'top-right': '100% 0%',
    'bottom-left': '0% 100%',
    'bottom-right': '100% 100%',
    center: '50% 50%',
  };

  const positionMap = {
    'top-left': 'left-[-20%] top-[-28%]',
    'top-right': 'right-[-20%] top-[-28%]',
    'bottom-left': 'bottom-[-28%] left-[-20%]',
    'bottom-right': 'bottom-[-28%] right-[-20%]',
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const rayOrigin = originMap[origin] ?? originMap['top-right'];
  const rayPosition = positionMap[origin] ?? positionMap['top-right'];

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        opacity,
        mixBlendMode: blend >= 0.7 ? 'screen' : 'normal',
        filter: `saturate(${saturation})`,
      }}
      aria-hidden="true"
    >
      <div
        className={`absolute h-[150%] w-[150%] ${rayPosition} animate-side-rays`}
        style={{
          '--side-rays-speed': `${Math.max(0.1, speed)}s`,
          '--side-rays-tilt': `${tilt}deg`,
          '--side-rays-scale': spread,
          '--side-rays-blur': `${Math.max(12, 22 / Math.max(0.5, intensity))}px`,
          background: `
            radial-gradient(circle at ${rayOrigin},
              ${rayColor2} 0%,
              rgba(150, 200, 255, 0.34) ${14 * falloff}%,
              transparent ${42 * falloff}%),
            repeating-conic-gradient(from ${tilt}deg at ${rayOrigin},
              ${rayColor1} 0deg,
              rgba(234, 179, 8, 0.18) ${5 * spread}deg,
              transparent ${12 * spread}deg,
              transparent ${24 * spread}deg,
              ${rayColor2} ${30 * spread}deg,
              rgba(150, 200, 255, 0.14) ${35 * spread}deg,
              transparent ${48 * spread}deg)
          `,
        }}
      />
    </div>
  );
}
