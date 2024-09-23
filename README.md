# Spotify-Clone Web App

This project is a decentralized, blockchain-based music streaming platform inspired by Spotify. It leverages **Pinata** for storing song files, **Solidity** smart contracts deployed with **Hardhat**, and a **React** front-end for a smooth user experience.

## Features

- **Blockchain-Powered**: The app uses Solidity smart contracts to manage song ownership and streaming on the blockchain.
- **Decentralized Storage**: Songs are stored securely using IPFS via Pinata.
- **User-Friendly Interface**: A React front-end makes it easy to upload and stream songs in a decentralized way.
- **Secure & Transparent**: Powered by the Ethereum blockchain for immutability and transparency.

## Technologies Used

- **Pinata**: For decentralized song file storage on IPFS.
- **Hardhat**: For developing, testing, and deploying Solidity smart contracts.
- **Solidity**: For the blockchain logic and managing song ownership.
- **React**: For the front-end user interface.

## Installation

Follow these steps to run the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/anandhuRaveendran/Spotify-Dapp.git
    cd Spotify-Dapp
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

Once the application is running, users can:

- Upload songs to the decentralized network.
- Stream songs directly from IPFS via Pinata.
- Explore various songs stored on the blockchain.
  
You can customize the app by editing the smart contracts in the `contracts` directory or modifying the React components in the `src` folder.

## Smart Contracts

The Solidity contracts are located in the `contracts/` directory. You can deploy them to your preferred Ethereum network using Hardhat.

To deploy the contracts:

1. Ensure your Hardhat environment is set up.
2. Use the following command to compile and deploy the contracts:
    ```bash
    npx hardhat compile
    npx hardhat run scripts/deploy.js --network yourNetwork
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

