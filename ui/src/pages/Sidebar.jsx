/* eslint-disable no-unused-vars */
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 h-screen flex-shrink-0 p-4">
      <h2 className="text-2xl font-bold mb-8">Your Library</h2>
      <nav className="space-y-4">
        <a href="#home" className="block hover:text-green-400">Home</a>
        <a href="#search" className="block hover:text-green-400">Search</a>
        <a href="#library" className="block hover:text-green-400">Your Library</a>
        <a href="#playlists" className="block hover:text-green-400">Playlists</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
