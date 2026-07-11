export default function Ferrofluid({
  color = '#38bdf8',
  secondaryColor = '#EAB308',
  intensity = 1,
  speed = 7,
  opacity = 0.6,
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        opacity,
        filter: `contrast(${1.1 + intensity * 0.12}) saturate(${1.05 + intensity * 0.18})`,
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    >
      <div
        className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 animate-ferrofluid"
        style={{
          '--ferro-speed': `${speed}s`,
          '--ferro-scale': `${0.96 + intensity * 0.04}`,
          background: `
            radial-gradient(circle at 32% 26%, ${color}70 0 6%, transparent 13%),
            radial-gradient(circle at 62% 24%, ${secondaryColor}5a 0 5%, transparent 12%),
            radial-gradient(circle at 42% 54%, ${color}52 0 8%, transparent 17%),
            radial-gradient(circle at 74% 62%, ${secondaryColor}3f 0 6%, transparent 15%),
            radial-gradient(circle at 22% 76%, ${color}38 0 7%, transparent 16%)
          `,
        }}
      />
    </div>
  );
}
