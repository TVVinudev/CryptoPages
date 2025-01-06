import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ABI from '../assets/CryptoPages.json';
import address from '../assets/deployed_addresses.json';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const SellingForm = () => {
  const navigate = useNavigate()
  const [fileHash, setFileHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    image: null,
    price: '',
    copies: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error('Please upload an image.');
      return;
    }

    try {
      console.log("before ipfs", formData);
      
      const ipfsHash = await uploadToIPFS(formData.image);
      formData.image = ipfsHash;

      console.log("after ipfs",formData);
      
      await uploadToBlockchain();
      
    } catch (error) {
      toast.error('Submission failed. Please try again.');
    }
  };

  const uploadToIPFS = async (file) => {
    try {
      setIsLoading(true);
      const fileData = new FormData();
      fileData.append('file', file);

      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', fileData, {
        headers: {
          pinata_api_key: 'e51b442ab588ab8a58e9',
          pinata_secret_api_key: '9a802774ecbaa67a331c7d96774063329073fddce6e0fc03f1d7376dcb47dee8',
          'Content-Type': 'multipart/form-data',
        },
      });

      const hash = response.data.IpfsHash;
      setFileHash(hash);
      toast(`File uploaded successfully! IPFS Hash: ${hash}`);
      return hash;
    } catch (error) {
      toast.error(`Upload failed: ${error.response?.data?.message || error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadToBlockchain = async () => {
    if (!window.ethereum) {
      toast.error('Metamask is not available. Please install it to proceed.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const abi = ABI.abi;
      const cAddress = address["CryptoModule#CryptoPages"];
      const cryptoPagesInstance = new ethers.Contract(cAddress, abi, signer);

      const transaction = await cryptoPagesInstance.addBook(
        formData.title,
        formData.author,
        formData.description,
        formData.image,
        parseInt(formData.price),
        parseInt(formData.copies)
      );

      toast.success(`Transaction submitted! Hash: ${transaction.hash}`);

      formData.title = ''
      formData.author = ''
      formData.description = ''
      formData.image = ''
      formData.price = ''
      formData.copies = ''

      navigate('/mybooks')

    } catch (error) {
      toast.error(`Blockchain transaction failed: ${error.message}`);
      throw error;
    }
  };

  return (
    <div className="p-10 shadow-2xl w-[50vh] h-auto text-[#604CC3] bg-white">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <h1 className="text-center text-2xl font-bold font-delius my-2 underline">Sell your Books</h1>
        <div className="mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">Book Title</label>
          <input
            type="text"
            name="title"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">Author Name</label>
          <input
            type="text"
            name="author"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">Book Description</label>
          <textarea
            name="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">Image</label>
          <input
            type="file"
            name="image"
            className="block w-full p-2 text-gray-900 border-gray-300 rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">Price (Wei)</label>
          <input
            type="text"
            name="price"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">Number of Copies</label>
          <select
            name="copies"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            value={formData.copies}
            onChange={handleChange}
          >
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="my-3">
          <button
            type="submit"
            className="text-white bg-[#604CC3] hover:bg-blue-800 w-full p-2 border-gray-300 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default SellingForm;
