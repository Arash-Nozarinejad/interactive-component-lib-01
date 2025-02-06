// src/components/molecules/MenuComponentExamples.tsx
import React from 'react';
import {
  Menu,
  MenuItem,
  MenuSeparator,
  MenuGroup,
  SubMenu
} from './atoms/Menu/Menu';

export function MenuComponentExamples() {
  return (
    <div className="p-8 space-y-4">
      {/* Basic menu */}
      <Menu
        trigger={
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Open Menu
          </button>
        }
      >
        <MenuItem onClick={() => console.log('New')}>New</MenuItem>
        <MenuItem onClick={() => console.log('Edit')}>Edit</MenuItem>
        <MenuItem onClick={() => console.log('Delete')}>Delete</MenuItem>
      </Menu>

      {/* Menu with icons and shortcuts */}
      <Menu
        trigger={
          <button className="px-4 py-2 bg-green-500 text-white rounded-md">
            Actions
          </button>
        }
      >
        <MenuItem
          icon={<span>📄</span>}
          shortcut="⌘N"
          onClick={() => console.log('New Document')}
        >
          New Document
        </MenuItem>
        <MenuItem
          icon={<span>📁</span>}
          shortcut="⌘O"
          onClick={() => console.log('Open')}
        >
          Open...
        </MenuItem>
        <MenuSeparator />
        <MenuItem
          icon={<span>💾</span>}
          shortcut="⌘S"
          onClick={() => console.log('Save')}
        >
          Save
        </MenuItem>
      </Menu>

      {/* Menu with groups */}
      <Menu
        trigger={
          <button className="px-4 py-2 bg-purple-500 text-white rounded-md">
            Options
          </button>
        }
      >
        <MenuGroup label="File">
          <MenuItem onClick={() => console.log('New')}>New</MenuItem>
          <MenuItem onClick={() => console.log('Open')}>Open</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup label="Edit">
          <MenuItem onClick={() => console.log('Cut')}>Cut</MenuItem>
          <MenuItem onClick={() => console.log('Copy')}>Copy</MenuItem>
          <MenuItem onClick={() => console.log('Paste')}>Paste</MenuItem>
        </MenuGroup>
      </Menu>

      {/* Menu with submenu */}
      <Menu
        trigger={
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">
            More
          </button>
        }
      >
        <MenuItem onClick={() => console.log('Profile')}>Profile</MenuItem>
        <SubMenu trigger="Share">
          <MenuItem onClick={() => console.log('Email')}>Email</MenuItem>
          <MenuItem onClick={() => console.log('Message')}>Message</MenuItem>
        </SubMenu>
        <MenuItem onClick={() => console.log('Settings')}>Settings</MenuItem>
      </Menu>
    </div>
  );
}

export default MenuComponentExamples;
