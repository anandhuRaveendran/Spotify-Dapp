/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

// Initialize IPFS client
const client = create('https://ipfs.infura.io:5001/api/v0/'); // You can use other gateways like Pinata, Fleek, etc.

const UploadSong = () => {
  const [file, setFile] = useState(null); // File state to store the song
  const [songUrl, setSongUrl] = useState(""); // URL of the uploaded song
  const [loading, setLoading] = useState(false); // Loading state for upload process

  // Function to handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to handle file upload to IPFS
  const handleUpload = async () => {
    if (!file) return;
    
    try {
      setLoading(true); // Start loading state
      const added = await client.add(file); // Upload file to IPFS
      const url = `https://ipfs.infura.io/ipfs/${added.path}`; // Construct IPFS URL
      setSongUrl(url); // Set song URL to state
      setLoading(false); // End loading state
    } catch (error) {
      console.error("Error uploading file: ", error);
      setLoading(false);
    }
  };

  return (
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
  );
};

export default UploadSong;
