// src/components/AvatarExample.tsx
import React from 'react';
import Avatar from './atoms/Avatar/Avatar';

export function AvatarComponentExamples() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Avatar Examples</h1>

      {/* Basic usage */}
      <Avatar
        src="https://example.com/avatar.jpg"
        alt="User avatar"
        size="md"
      />

      {/* With fallback initials */}
      <Avatar
        name="John Doe"
        size="lg"
      />

      {/* With status indicator */}
      <Avatar
        src="https://example.com/avatar.jpg"
        status="online"
        size="md"
      />

      {/* Square shape */}
      <Avatar
        name="Jane Smith"
        shape="square"
        size="xl"
      />

      {/* All sizes */}
      <div className="flex space-x-2 items-end">
        <Avatar size="xs" name="XS" />
        <Avatar size="sm" name="SM" />
        <Avatar size="md" name="MD" />
        <Avatar size="lg" name="LG" />
        <Avatar size="xl" name="XL" />
      </div>

      {/* Group of avatars */}
      <div className="flex -space-x-2">
        <Avatar name="User 1" bordered />
        <Avatar name="User 2" bordered />
        <Avatar name="User 3" bordered />
      </div>
    </div>
  );
}

export default AvatarComponentExamples;
