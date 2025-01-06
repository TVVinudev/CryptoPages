import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const ViewCard = () => {
    const [signerAddress, setSigner] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { bookData } = location.state || {};

    // Handle missing book data
    if (!bookData) {
        return <div>Book data not found. Please go back and try again.</div>;
    }

    const findSigner = async () => {
        if (!window.ethereum) {
            console.error("MetaMask is not installed.");
            return;
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setSigner(await signer.getAddress());
    };

    useEffect(() => {
        findSigner();
    }, []);

    const fileUrl = bookData[4]
        ? "https://gateway.pinata.cloud/ipfs/" + bookData[4]
        : 'https://via.placeholder.com/150';

    const handleSubmit = () => {
        navigate('/orderBooksForm', { state: { bookData } });
    };

    return (
        <section className="h-auto md:h-[83vh] w-auto">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
                <img
                    className="w-full h-64 object-cover"
                    src={fileUrl}
                    alt="Book Image"
                />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800">{bookData[1]}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Author: <span className="font-medium text-gray-700">{bookData[2]}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Owner: <span className="font-medium text-gray-700">{bookData[7]}</span>
                    </p>
                    <p className="text-lg text-green-600 font-semibold mt-3">
                        Price: {bookData[5].toString()} Wei
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Number of Copies: <span className="font-medium text-gray-700">{bookData[6].toString()}</span>
                    </p>
                    <p className="text-gray-600 mt-3">
                        Description: {bookData[3]}
                    </p>
                    {signerAddress === bookData[7] ? (
                        <div className="flex space-x-4 mt-5">
                            <p className="text-xl font-delius text-[#503AA1] font-bold">Owner</p>
                        </div>
                    ) : (
                        <div className="flex space-x-4 mt-5">
                            <button
                                className="bg-[#604CC3] rounded-lg hover:bg-[#503AA1] text-white px-4 py-2"
                                onClick={handleSubmit}
                            >
                                Buy Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ViewCard;
