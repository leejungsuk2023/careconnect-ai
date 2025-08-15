import React from 'react';
import Image from 'next/image';
import { cn } from '../utils/cn';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  loading?: 'lazy' | 'eager';
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  loading = 'lazy',
  onError
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);
  const [hasError, setHasError] = React.useState(false);

  // Fallback image generator
  const generateFallbackImage = (text: string, w = 400, h = 300) => {
    const encodedText = encodeURIComponent(text.substring(0, 20));
    return `https://via.placeholder.com/${w}x${h}/16171D/5E6AD2?text=${encodedText}`;
  };

  // Handle image error
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      const fallbackSrc = generateFallbackImage(alt, width, height);
      setImgSrc(fallbackSrc);
      onError?.();
    }
  };

  // Generate blur placeholder
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    
    // Generate a simple base64 placeholder
    const svg = `
      <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#16171D"/>
        <rect width="100%" height="100%" fill="url(#gradient)" opacity="0.1"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#5E6AD2"/>
            <stop offset="100%" style="stop-color:#7B61FF"/>
          </linearGradient>
        </defs>
      </svg>
    `;
    
    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  };

  const imageProps = {
    src: imgSrc,
    alt,
    className: cn(
      'transition-all duration-300',
      hasError && 'opacity-80',
      className
    ),
    quality,
    priority,
    sizes,
    loading,
    onError: handleError,
    ...(placeholder === 'blur' && {
      placeholder: 'blur' as const,
      blurDataURL: getBlurDataURL(),
    }),
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        style={{ objectFit: 'cover' }}
      />
    );
  }

  if (width && height) {
    return (
      <Image
        {...imageProps}
        width={width}
        height={height}
      />
    );
  }

  // Responsive image without fixed dimensions
  return (
    <div className="relative w-full h-full">
      <Image
        {...imageProps}
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

export default OptimizedImage;