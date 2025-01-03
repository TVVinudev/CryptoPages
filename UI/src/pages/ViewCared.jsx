import React from 'react';

const ViewCard = () => {
    const signerAddress = JSON.parse(localStorage.getItem('Signer'));
    console.log(signerAddress);
    
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <img
                className="w-full h-64 object-cover"
                src="https://via.placeholder.com/150"
                alt="Book Image"
            />
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">Book Title</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Author: <span className="font-medium text-gray-700">John Doe</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    Owner: <span className="font-medium text-gray-700">Jane Smith</span>
                </p>
                <p className="text-lg text-green-600 font-semibold mt-3">Price: ₹499</p>
                <p className="text-sm text-gray-500 mt-1">
                    Number of Copies: <span className="font-medium text-gray-700">5</span>
                </p>
                <p className="text-gray-600 mt-3">
                    Description: This is a captivating book that delves into the intricacies of blockchain technology, exploring its potential and practical applications in various domains.
                </p>
                <div className="flex space-x-4 mt-5">
                    <button className="bg-[#604CC3] rounded-lg hover:bg-[#503AA1] text-white px-4 py-2 ">
                        Buy Now
                    </button>
                  
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                        Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewCard;
