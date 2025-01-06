import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ABI from '../assets/CryptoPages.json';
import address from '../assets/deployed_addresses.json';
import { space } from 'postcss/lib/list';

const OrderCard = ({ order }) => {
    const [book, setBook] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sAddress, setAddress] = useState('')

    const viewMyBooks = async () => {
        try {
            setIsLoading(true);
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            setAddress(signer.address);

            const abi = ABI.abi;
            const cAddress = address["CryptoModule#CryptoPages"];
            const cryptoPagesInstance = new ethers.Contract(cAddress, abi, signer);

            const data = await cryptoPagesInstance.searchBookById(order[1].toString());
            setBook(data);
        } catch (error) {
            setError("Failed to load books. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        viewMyBooks();
    }, []);

    const fileUrl = book?.[4]
        ? "https://gateway.pinata.cloud/ipfs/" + book[4]
        : 'https://via.placeholder.com/150';

    const totalPrice = book[5] && order[6] ? BigInt(book[5]) * BigInt(order[6]) : 0n;

    return (
        <div className="w-auto md:max-w-lg md:mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
            {isLoading ? (
                <p className="text-gray-500">Loading book details...</p>
            ) : (
                <>
                    <div className="flex items-center space-x-4">
                        <img
                            src={fileUrl}
                            alt="Product Image"
                            className="w-24 h-24 rounded-md object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{book[1]}</h2>
                            <p className="text-gray-600 text-sm">
                                Order ID: <span className="font-medium text-gray-900">{order[0].toString()}</span>
                            </p>
                            <p className="text-gray-600 text-sm">
                                Book Id: <span className="font-medium text-gray-900">{order[1].toString()}</span>
                            </p>
                            <p className="text-gray-600 text-sm">
                                Quantity: <span className="font-medium text-gray-900">{order[6]?.toString()}</span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700">
                            <span className="font-semibold">Price :</span> {book[5]?.toString()} Wei
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Total Price :</span> {totalPrice.toString()} Wei
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Payment Status :</span> {order[8].toString() == "true" ?
                                <span className='font-bold text-green-600'> Completed </span> : <span className='font-bold text-red-600' >Pending</span>
                            }
                        </p>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700">
                            <span className="md:font-semibold ">Owner:</span> {order[3]}
                        </p>
                        <p className="text-gray-700">
                            <span className="md:font-semibold">Buyer:</span> {order[2]}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">House Address:</span> {order.houseAddress || "Not provided"}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Mobile:</span> {order[5] ? order[5].toString() : "Not available"}
                        </p>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700">
                            <span className="md:font-semibold "> Deliverd:</span> {order[7].toString() == "true"?
                                <span className='font-bold text-green-600'> Yes </span> : <span className='font-bold text-red-600' > No </span>  
                        }
                        </p>
                    </div>

                    {sAddress == order[2] ?
                        "" :
                        <button className="mt-4 w-full bg-[#604CC3] text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Deliverd
                        </button>

                    }


                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </>
            )}
        </div>
    );
};

export default OrderCard;
