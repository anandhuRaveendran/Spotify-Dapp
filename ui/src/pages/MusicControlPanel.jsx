/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import axios from 'axios';

// Pinata API details
const PINATA_API_KEY = '2b73dc5e03ef70a65229';
const PINATA_API_SECRET = '71f25f12c1f322bf0cb4e9c5a30755048453949e8d5cd84f2e5101c6ad2f9386';
const PINATA_PIN_LIST_URL = `https://api.pinata.cloud/data/pinList`;

const MusicControlPanel = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Fetch songs from Pinata when component loads
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get(PINATA_PIN_LIST_URL, {
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_API_SECRET,
          },
        });

        const audioFiles = res.data.rows.filter((file) =>
          file.metadata.name.endsWith('.mp3') || file.metadata.name.endsWith('.wav')
        );

        const audioData = audioFiles.map((file) => ({
          id: file.id,
          title: file.metadata.name,
          url: `https://gateway.pinata.cloud/ipfs/${file.ipfs_pin_hash}`,
        }));

        setSongs(audioData);
      } catch (error) {
        console.error('Error fetching pinned files from Pinata: ', error);
      }
    };

    fetchSongs();
  }, []);

  // Play or pause the audio when the play/pause button is clicked
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Play the next song in the list
  const playNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(false); // Ensure the new song starts from a paused state
  };

  // Play the previous song in the list
  const playPrevious = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(false); // Ensure the new song starts from a paused state
  };

  // Update audio source when song changes
  useEffect(() => {
    if (songs.length > 0 && audioRef.current) {
      audioRef.current.src = songs[currentSongIndex].url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, songs]);

  return (
    <footer className="w-full bg-gray-800 py-4 fixed bottom-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center">
            <img src="https://via.placeholder.com/50" alt="Current Song" className="mr-4" />
            <div>
              {songs.length > 0 && (
                <>
                  <h3 className="text-lg font-bold">{songs[currentSongIndex].title}</h3>
                  <p className="text-gray-400">Artist Unknown</p>
                </>
              )}
            </div>
          </div>

          {/* Music Controls */}
          <div className="flex items-center space-x-4">
            <button className="hover:text-green-400" onClick={playPrevious} disabled={songs.length === 0}>
              <FaStepBackward size={24} />
            </button>
            <button className="hover:text-green-400" onClick={togglePlayPause} disabled={songs.length === 0}>
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            <button className="hover:text-green-400" onClick={playNext} disabled={songs.length === 0}>
              <FaStepForward size={24} />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center">
            <input
              type="range"
              className="w-24 h-2 bg-gray-700"
              min="0"
              max="1"
              step="0.01"
              onChange={(e) => (audioRef.current.volume = e.target.value)}
            />
          </div>

          {/* Hidden Audio Element */}
          <audio ref={audioRef} />
        </div>
      </div>
    </footer>
  );
};

export default MusicControlPanel;
