// src/components/atoms/Avatar/Avatar.tsx
import React, { useState } from 'react';
import { AvatarProps, AvatarSize, AvatarStatus } from './types';

const Avatar = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  status,
  shape = 'circle',
  bordered = false,
  className = '',
  ref,
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);

  // Size mappings for Tailwind classes
  const sizeClasses: Record<AvatarSize, string> = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  // Status indicator colors
  const statusClasses: Record<AvatarStatus, string> = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate background color based on name (for fallback avatars)
  const getBackgroundColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
      'bg-pink-500',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const baseClasses = [
    'inline-flex items-center justify-center relative',
    shape === 'circle' ? 'rounded-full' : 'rounded-lg',
    bordered ? 'ring-2 ring-white' : '',
    sizeClasses[size],
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={baseClasses}
      role="img"
      aria-label={alt || name || 'avatar'}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || name || ''}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover ${shape === 'circle' ? 'rounded-full' : 'rounded-lg'}`}
        />
      ) : name ? (
        <div
          className={[
            getBackgroundColor(name),
            'w-full h-full flex items-center justify-center text-white'
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {getInitials(name)}
        </div>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">?</span>
        </div>
      )}

      {status && (
        <span
          className={[
            'absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full ring-2 ring-white',
            statusClasses[status]
          ]
            .filter(Boolean)
            .join(' ')}
          role="status"
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

export default Avatar;
