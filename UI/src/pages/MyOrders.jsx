import React, { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import { ethers } from 'ethers';
import ABI from '../assets/CryptoPages.json';
import address from '../assets/deployed_addresses.json';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    const viewMyBooks = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const abi = ABI.abi;
            const cAddress = address["CryptoModule#CryptoPages"];
            const cryptoPagesInstance = new ethers.Contract(cAddress, abi, signer);

            const data = await cryptoPagesInstance.searchOrdersByBuyer(signer.address);
            console.log("Data:", data);

            setOrders(data);

        } catch (error) {
            console.error("Error fetching orders:", error.message);
            setError("Failed to load books. Please try again later.");
        }
    };

    useEffect(() => {
        viewMyBooks();
    }, []);

    

    return (
        <section className="h-[83vh] w-full">
            <h1 className="text-black font-bold mb-4 ml-10 mt-5 text-left ">
                <span className='font-delius text-2xl underline'>My Orders</span>
            </h1>
            <div className="flex items-center justify-center my-15">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    
                          {orders.length > 0 ? (
                            orders.map((order) => (
                                <OrderCard key={order[1]} order={order} />
                            ))
                        ) : (
                            <p className="text-center mt-10">No Order found.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default MyOrders;
