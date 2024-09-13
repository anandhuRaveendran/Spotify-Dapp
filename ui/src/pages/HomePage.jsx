/* eslint-disable no-unused-vars */
import React from 'react'
import Sidebar from './Sidebar';
import SongsList from './SongList';
import MusicControlPanel from './MusicControlPanel';

const HomePage = () => {
    return (
   <div>
          <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Songs List */}
        <main className="flex-1 p-6 overflow-y-auto">
          <SongsList />
        </main>
      </div>

      {/* Music Control Footer */}
      <MusicControlPanel />
    </div>
    </div>
      );
}

export default HomePage