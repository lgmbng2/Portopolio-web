import { forwardRef } from 'react';

const SpotlightCard = forwardRef(function SpotlightCard(
  {
    as: Component = 'div',
    children,
    className = '',
    spotlightColor = 'rgba(56, 189, 248, 0.18)',
    onPointerMove,
    onPointerLeave,
    style,
    ...props
  },
  ref,
) {
  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event) => {
    event.currentTarget.style.setProperty('--spotlight-x', '50%');
    event.currentTarget.style.setProperty('--spotlight-y', '0%');
    onPointerLeave?.(event);
  };

  return (
    <Component
      ref={ref}
      className={`spotlight-card ${className}`}
      style={{ '--spotlight-color': spotlightColor, ...style }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {children}
    </Component>
  );
});

export default SpotlightCard;
