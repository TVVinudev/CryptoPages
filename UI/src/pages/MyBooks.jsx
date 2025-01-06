import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import { ethers } from 'ethers';
import ABI from '../assets/CryptoPages.json';
import address from '../assets/deployed_addresses.json';

const MyBooks = () => {
  const [details, setDetails] = useState([]);
  const [error, setError] = useState('');

  const viewMyBooks = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signerAddress = signer.address

      const abi = ABI.abi;
      const cAddress = address["CryptoModule#CryptoPages"];
      const cryptoPagesInstance = new ethers.Contract(cAddress, abi, signer);

      const data = await cryptoPagesInstance.searchBooksByOwner(signerAddress);
      console.log("Data:", data);

      // Convert Proxy or BigInt values if necessary
      const formattedDetails = data.map((book) => Array.from(book));
      setDetails(formattedDetails);
    } catch (error) {
      console.error("Error fetching books:", error.message);
      setError("Failed to load books. Please try again later.");
    }
  };

  useEffect(() => {
    viewMyBooks();
  }, []);

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <>
      <section className='h-[83vh]' >
        <h2 className="font-delius font-semibold ml-24 my-10 text-2xl underline">My Books</h2>
        {details.length > 0 ? (
          <Grid data={details} />
        ) : (
          <p className="text-center mt-10">No books found.</p>
        )}
      </section>
    </>
  );
};

export default MyBooks;
