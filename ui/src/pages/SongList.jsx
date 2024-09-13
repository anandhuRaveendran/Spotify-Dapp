/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

// Replace with your Infura project ID and secret
const projectId = '15afd28d8e0e450b800bd4e53b6e982f';
const projectSecret = '0jCO+0mQInfjHRVRpl92SzLcahjT4jEqAFK84Slz0Wew9/w4NpI55Q';

const auth = 'Basic ' + btoa(`${projectId}:${projectSecret}`);

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});

const SongsList = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:24' },
    { id: 2, title: 'Shape of You', artist: 'Ed Sheeran', duration: '4:23' },
    { id: 3, title: 'Levitating', artist: 'Dua Lipa', duration: '3:50' },
    { id: 4, title: 'Save Your Tears', artist: 'The Weeknd', duration: '3:35' },
  ]);

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload to IPFS
  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const added = await ipfs.add(file);
      const songUrl = `https://ipfs.infura.io/ipfs/${added.path}`;

      // Add the new song to the list (for simplicity, we'll assume a song title here)
      setSongs([...songs, {
        id: songs.length + 1,
        title: file.name,  // Using the file name as the title
        artist: 'Unknown Artist',  // You can customize this
        duration: 'Unknown Duration',  // Add proper duration if available
        url: songUrl  // Store the IPFS URL
      }]);

      alert('Song uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file: ', error);
      alert('Failed to upload the song');
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Upload Song to IPFS</h1>

        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
          accept="audio/*" // Only allow audio files
        />
        <button
          onClick={handleUpload}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
          disabled={loading || !file}
        >
          {loading ? 'Uploading...' : 'Upload Song'}
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">Songs</h1>
      <div className="space-y-4">
        {songs.map(song => (
          <div key={song.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600">
            <div>
              <h2 className="text-xl">{song.title}</h2>
              <p className="text-gray-400">{song.artist}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-400 mr-4">{song.duration}</p>
              <a href={song.url} target="_blank" rel="noopener noreferrer">
                <button className="bg-green-500 text-black px-4 py-2 rounded-full hover:bg-green-400">Play</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongsList;
