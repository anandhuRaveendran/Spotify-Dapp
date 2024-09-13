/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Buffer } from 'buffer'; // Import Buffer polyfill
import axios from 'axios';

// Replace with your Infura project ID and secret
const PINATA_API_KEY = '2b73dc5e03ef70a65229';
const PINATA_API_SECRET = '71f25f12c1f322bf0cb4e9c5a30755048453949e8d5cd84f2e5101c6ad2f9386';
const PINATA_UPLOAD_URL = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

// const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// Create an IPFS client with authentication
// const client = ipfsHttpClient({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   headers: {
//     authorization: auth,
//   },
// });
// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

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
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);

      // Make POST request to Pinata to upload the file
      const res = await axios.post(PINATA_UPLOAD_URL, formData, {
        maxBodyLength: 'Infinity', // Pinata's file size limit handling
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_API_SECRET,
        },
      });

      const fileHash = res.data.IpfsHash;
      const url = `https://gateway.pinata.cloud/ipfs/${fileHash}`;
      alert.apply('successfully uploaded')
      setFile(url);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading file to Pinata: ', error);
      setLoading(false);
    }
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
          onClick={handleFileChange}
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
