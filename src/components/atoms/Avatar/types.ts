// src/components/atoms/Avatar/types.ts
import React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Name to display as fallback (initials) */
  name?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Status indicator */
  status?: AvatarStatus;
  /** Shape of the avatar (circle or square) */
  shape?: 'circle' | 'square';
  /** Whether to add a border around the avatar */
  bordered?: boolean;
  /** Additional custom classes */
  className?: string;
  /** Ref for the avatar container */
  ref?: React.Ref<HTMLDivElement>;
}
