/* eslint-disable no-unused-vars */
import React from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

const MusicControlPanel = () => {
  return (
    <footer className="w-full bg-gray-800 py-4 fixed bottom-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center">
            <img src="https://via.placeholder.com/50" alt="Current Song" className="mr-4" />
            <div>
              <h3 className="text-lg font-bold">Blinding Lights</h3>
              <p className="text-gray-400">The Weeknd</p>
            </div>
          </div>

          {/* Music Controls */}
          <div className="flex items-center space-x-4">
            <button className="hover:text-green-400">
              <FaStepBackward size={24} />
            </button>
            <button className="hover:text-green-400">
              <FaPlay size={24} />
            </button>
            <button className="hover:text-green-400">
              <FaPause size={24} />
            </button>
            <button className="hover:text-green-400">
              <FaStepForward size={24} />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center">
            <input type="range" className="w-24 h-2 bg-gray-700" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MusicControlPanel;
