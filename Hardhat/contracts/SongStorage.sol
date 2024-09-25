// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SongStorage {
    // Struct to store song details
    struct Song {
        string ipfsHash;  // IPFS hash of the song
        string title;     // Title of the song
        address uploader; // Address of the uploader
        uint256 playCount; // Track the number of plays
    }

    // Mapping to store song details by song ID
    mapping(uint256 => Song) public songs;

    // Mapping to store song play counts
    mapping(uint256 => uint256) public songPlays;

    // Counter to track song IDs
    uint256 public songCounter;

    // Reward per play (set a value in wei)
    uint256 public constant REWARD_PER_PLAY = 0.001 ether;

    // Event when a song is uploaded
    event SongUploaded(uint256 songId, string ipfsHash, string title, address uploader);
    // Event when a song is played
    event SongPlayed(uint256 songId, address user);

    // Function to store a song with its IPFS hash
    function uploadSong(string memory _ipfsHash, string memory _title) external {
        songCounter++;
        songs[songCounter] = Song({
            ipfsHash: _ipfsHash,
            title: _title,
            uploader: msg.sender,
            playCount: 0
        });

        emit SongUploaded(songCounter, _ipfsHash, _title, msg.sender);
    }

    // Function to retrieve a song by its ID
    function getSong(uint256 _songId) external view returns (string memory, string memory, address, uint256) {
        require(_songId > 0 && _songId <= songCounter, "Invalid song ID");
        Song memory song = songs[_songId];
        return (song.ipfsHash, song.title, song.uploader, song.playCount);
    }

    // Function to record a song play
    function playSong(uint256 _songId) external payable {
        require(_songId > 0 && _songId <= songCounter, "Invalid song ID");

        // Increment play count for the song
        songs[_songId].playCount++;
        
        // Emit song played event
        emit SongPlayed(_songId, msg.sender);

        // Reward the uploader (artist) for the play
        address artist = songs[_songId].uploader;
        payable(artist).transfer(REWARD_PER_PLAY);
    }

    // Function for the owner to fund the contract with ETH for rewards
    function fundContract() external payable {}

    // Fallback function to receive Ether
    receive() external payable {}
}
