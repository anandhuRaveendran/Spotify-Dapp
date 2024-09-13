/* eslint-disable no-unused-vars */
import React, { useState }  from 'react'
import { ethers } from 'ethers';

import { BrowserProvider, Contract } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { AccessControlModuleAccessControl } from '../scdata/deployed_addresses.json';
import {abi} from '../scdata/AccessControl.json'
const Login = () => {
    const [address, setAddress] = useState('');
    const [hasPaid, setHasPaid] = useState(null); // State to track payment status

    const provider = new BrowserProvider(window.ethereum);
    const navigate = useNavigate();

    async function connectMeta() {
      const signer = await provider.getSigner();
        console.log('address', signer.address)
        setAddress(signer.address)
    //   if (signer.address) {
    //     navigate('/home')
    //   }
    }
    const payFee = async (e) => {
        e.preventDefault();
    
        try {
            // Connect to the Ethereum provider
            const signer = await provider.getSigner();
    
            // Create a contract instance
            const instance = new ethers.Contract(AccessControlModuleAccessControl, abi, signer);
    
            // Send the transaction with the required Ether value
            const result = await instance.payForAccess({
                value: ("10000000000000000") // 0.01 ETH in wei as a BigNumber
            });
    
            console.log("Transaction result:", result.hash);
            setAddress(signer.address)
        } catch (error) {
            console.error("Error during transaction:", error);
        }
    };
 
    
    const verifyPayment = async () => {
        try {
            const signer = provider.getSigner(); // Get the signer, not the provider
            // const address = await signer.address; // Get the connected user's address

            // Create contract instance
            const instance = new ethers.Contract(AccessControlModuleAccessControl, abi, provider);
            console.log(address)
            // Call the contract's checkAccess function
            const result = await instance.checkAccess(address);
    console.log(result)
            // Set the result based on the returned value
            setHasPaid(result);
            if (result==true) {
                navigate('/home')
            }
        } catch (error) {
            console.error("Error verifying access:", error);
        }
    };
    
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        {/* Header */}
        <header className="p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Spotify</div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#premium" className="hover:underline">Premium</a></li>
              <li><a href="#support" className="hover:underline">Support</a></li>
              <li><a href="#download" className="hover:underline">Download</a></li>
              <li><a href="#signup" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200">Sign Up</a></li>
              <li><a href="#login" className="hover:underline">Log In</a></li>
            </ul>
          </nav>
        </header>
  
        {/* Hero Section */}
        <section className="bg-cover bg-center h-screen flex flex-col justify-center items-center" style={{ backgroundImage: 'url(https://www.scdn.co/i/home/hero.png)' }}>
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6">Listening is everything</h1>
            <p className="text-2xl mb-8">Millions of songs and podcasts. No credit card needed.</p>
            <button onClick={connectMeta} className="bg-green-500 text-black px-6 py-3 rounded-full hover:bg-green-400 text-xl">
              Connect Metamask
            </button>
            <button onClick={payFee} className="bg-green-500 text-black px-6 py-3 ml-2 rounded-full hover:bg-green-400 text-xl">
              Pay 0.01 Sep
                    </button>
                    <button onClick={verifyPayment} className="bg-green-500 text-black px-6 py-3 ml-2 rounded-full hover:bg-green-400 text-xl">
              Verify
            </button>
          </div>
        </section>
  
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Why Spotify?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-4">
                <img src="https://www.scdn.co/i/home/why-spotify/icon1.svg" alt="Feature 1" className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Playlists made for you</h3>
                <p className="text-gray-400">Get personalized playlists and recommendations.</p>
              </div>
              <div className="p-4">
                <img src="https://www.scdn.co/i/home/why-spotify/icon2.svg" alt="Feature 2" className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Discover new music</h3>
                <p className="text-gray-400">Find new favorites with curated playlists.</p>
              </div>
              <div className="p-4">
                <img src="https://www.scdn.co/i/home/why-spotify/icon3.svg" alt="Feature 3" className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Listen offline</h3>
                <p className="text-gray-400">Download your music and listen without data.</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-black py-8">
          <div className="container mx-auto text-center">
            <p className="text-gray-500">&copy; 2024 Spotify Clone. All rights reserved.</p>
          </div>
        </footer>
      </div>
  )
}

export default Login