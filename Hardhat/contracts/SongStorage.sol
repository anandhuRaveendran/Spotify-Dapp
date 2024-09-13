// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SongStorage {
    // Struct to store song details
    struct Song {
        string ipfsHash;  // IPFS hash of the song
        string title;     // Title of the song
        address uploader; // Address of the uploader
    }

    // Mapping to store song details by song ID
    mapping(uint256 => Song) public songs;
    
    // Counter to track song IDs
    uint256 public songCounter;

    // Event when a song is uploaded
    event SongUploaded(uint256 songId, string ipfsHash, string title, address uploader);

    // Function to store a song with its IPFS hash
    function uploadSong(string memory _ipfsHash, string memory _title) external {
        songCounter++;
        songs[songCounter] = Song({
            ipfsHash: _ipfsHash,
            title: _title,
            uploader: msg.sender
        });

        emit SongUploaded(songCounter, _ipfsHash, _title, msg.sender);
    }

    // Function to retrieve a song by its ID
    function getSong(uint256 _songId) external view returns (string memory, string memory, address) {
        require(_songId > 0 && _songId <= songCounter, "Invalid song ID");
        Song memory song = songs[_songId];
        return (song.ipfsHash, song.title, song.uploader);
    }
}
