// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Contract } from 'ethers';
import { AccessControlModuleAccessControl } from '../scdata/deployed_addresses.json'; // Import your deployed contract address
import SongStorageABI from '../scdata/SongStorage.json'; // Import your contract ABI
import { useLocation } from 'react-router-dom';

const PINATA_API_KEY = '2b73dc5e03ef70a65229';
const PINATA_API_SECRET = '71f25f12c1f322bf0cb4e9c5a30755048453949e8d5cd84f2e5101c6ad2f9386';
const PINATA_UPLOAD_URL = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const PINATA_PIN_LIST_URL = `https://api.pinata.cloud/data/pinList`;

const SongsList = () => {
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const location = useLocation();
  const { signerdata } = location.state || {};

  useEffect(() => {
    const fetchPinnedFiles = async () => {
      setLoading(true);
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pinned files from Pinata: ', error);
        setLoading(false);
      }
    };

    fetchPinnedFiles();
  }, []);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setLoading(true);
      const res = await axios.post(PINATA_UPLOAD_URL, formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_API_SECRET,
        },
      });

      const fileHash = res.data.IpfsHash;
      const songUrl = `https://gateway.pinata.cloud/ipfs/${fileHash}`;
      alert('Successfully uploaded');

      const newSong = {
        id: songs.length + 1,
        title: selectedFile.name.split('.')[0],
        artist: 'Unknown Artist',
        duration: 'Unknown',
        url: songUrl,
      };

      setSongs([...songs, newSong]);

      // Call the smart contract to upload and mint a token
      await uploadSongToContract(fileHash, selectedFile.name.split('.')[0]);

      setLoading(false);
    } catch (error) {
      console.error('Error uploading file to Pinata: ', error);
      setLoading(false);
    }
  };

  const uploadSongToContract = async (ipfsHash, title) => {
    if (!signerdata) {
      console.error("Signer not set. Please connect your wallet.");
      return;
    }

    try {
      const songStorageContract = new Contract(AccessControlModuleAccessControl, SongStorageABI.abi, signerdata);
      const tx = await songStorageContract.uploadAndTokenizeSong(ipfsHash, title);
      await tx.wait(); // Wait for the transaction to be mined
      alert('Song uploaded and tokenized successfully!');
    } catch (error) {
      console.error('Error uploading song to contract: ', error);
    }
  };



  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Upload Song to IPFS and Mint Token</h1>

        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
          accept="audio/*"
        />

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
          onClick={handleFileChange}
        >
          {loading ? 'Uploading...' : 'Upload and Mint Token'}
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
              <a href={song.url} className="text-blue-400 hover:underline">Listen</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongsList;
