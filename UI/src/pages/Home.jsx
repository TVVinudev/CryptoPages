import React, { useEffect, useState } from 'react'
import MainBanner from '../components/MainBanner'
import Grid from '../components/Grid'
import SectionBanner from '../components/SectionBanner'
import { ethers } from 'ethers';
import ABI from '../assets/CryptoPages.json';
import address from '../assets/deployed_addresses.json';


const Home = () => {
    const [details, setDetails] = useState([]);
    const viewMyBooks = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const abi = ABI.abi;
            const cAddress = address["CryptoModule#CryptoPages"];
            const cryptoPagesInstance = new ethers.Contract(cAddress, abi, signer);

            const data = await cryptoPagesInstance.viewBooks();
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

    return (
        <>
            <MainBanner />
            <SectionBanner />
            <h2 className='font-delius font-semibold ml-24 my-10 text-2xl underline'>Books For You</h2>

            {details.length > 0 ? (
                <Grid home={true} data={details} />
            ) : (
                <p className="text-center mt-10">No books found.</p>
            )}

        </>

    )
}

export default Home