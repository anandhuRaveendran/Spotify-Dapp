// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SongStorage is ERC721 {
    
    // Struct to store song details
    struct Song {
        string ipfsHash;  // IPFS hash of the song
        string title;     // Title of the song
        address uploader; // Address of the uploader
    }

    // Mapping to store song details by token ID
    mapping(uint256 => Song) public songs;

    // Counter to track song IDs
    uint256 private _tokenIdCounter;

    // Event when a song is uploaded and tokenized
    event SongTokenized(uint256 tokenId, string ipfsHash, string title, address uploader);

    constructor() ERC721("SongToken", "SONG") {}

    // Function to upload a song and mint an ERC721 token
    function uploadAndTokenizeSong(string memory _ipfsHash, string memory _title) external {
        // Increment the token ID counter
        _incrementCounter();
        uint256 newSongId = _tokenIdCounter;

        // Store song details
        songs[newSongId] = Song({
            ipfsHash: _ipfsHash,
            title: _title,
            uploader: msg.sender
        });

        // Mint the ERC721 token
        _mint(msg.sender, newSongId);

        emit SongTokenized(newSongId, _ipfsHash, _title, msg.sender);
    }

    // Function to retrieve a song by its token ID
    function getSong(uint256 _tokenId) external view returns (string memory, string memory, address) {
        require(_existsInStorage(_tokenId), "Song does not exist");
        Song memory song = songs[_tokenId];
        return (song.ipfsHash, song.title, song.uploader);
    }

    // Internal function to increment the counter
    function _incrementCounter() internal {
        _tokenIdCounter += 1;
    }

    // Public view function to get the current counter value
    function currentCounter() public view returns (uint256) {
        return _tokenIdCounter;
    }

    // Custom function to check if a song exists in storage
    function _existsInStorage(uint256 _tokenId) internal view returns (bool) {
        return bytes(songs[_tokenId].ipfsHash).length > 0;
    }
}
