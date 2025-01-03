const { ethers } = require('ethers');

const Signer = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed. Please install it to use this feature.");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return signer;
  } catch (error) {
    console.error("Error connecting to MetaMask:", error.message);
    return null; 
  }
};

export default Signer;
