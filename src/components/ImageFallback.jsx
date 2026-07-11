import { useState } from 'react';
import { FiImage } from 'react-icons/fi';

export default function ImageFallback({ src, alt, className = '', children, style }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-slate-900/80 ${className}`} style={style}>
        {children ?? (
          <div className="grid place-items-center gap-3 text-center text-slate-500">
            <FiImage className="mx-auto text-3xl" />
            <span className="text-xs">Tambahkan gambar</span>
          </div>
        )}
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} style={style} onError={() => setFailed(true)} />;
}
