import React from 'react';
import { useNavigate } from 'react-router-dom';

const GridCards = ({ book }) => {
    const navigate = useNavigate();


    const fileUrl = book[4]
        ? "https://gateway.pinata.cloud/ipfs/" + book[4]
        : 'https://via.placeholder.com/150';

    function handleSubmit() {
        navigate('/ViewCard', { state: { bookData: book } });
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs">
            <img
                src={fileUrl}
                alt="Book Cover"
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{book[1]}</h2>
                <p className="text-gray-600 mt-2">by <span className="text-gray-700 font-medium">{book[2]}</span></p>
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-gray-600">Available Copies:</p>
                    <span className="text-gray-800 font-bold">{ book[6] == 0 ? 'Out Of Stock' : book[6].toString()}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-gray-600">Price:</p>
                    <span className="text-gray-800 font-bold">{book[5].toString()} Wei</span>
                </div>

                <button
                    className="mt-6 w-full bg-[#604CC3] text-white py-2 rounded hover:bg-[#503AA1] transition"
                    onClick={handleSubmit}
                >
                    Details
                </button>
            </div>
        </div>
    );
};

export default GridCards;
