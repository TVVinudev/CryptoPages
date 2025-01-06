import React, { useState, useEffect } from "react";
import OrderDetailsCard from "../components/OrderDetailsCard";
import { ethers } from 'ethers';
import ABI from '../assets/CryptoPages.json';
import address from '../assets/deployed_addresses.json';

const OrderFromCustomer = () => {
    const [orders, setOrders] = useState([]);

    const viewMyBooks = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const abi = ABI.abi;
            const cAddress = address["CryptoModule#CryptoPages"];
            const cryptoPagesInstance = new ethers.Contract(cAddress, abi, signer);

            const data = await cryptoPagesInstance.searchOrdersBySeller(signer.address);
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
            <h2 className='font-delius font-semibold ml-24 my-10 text-2xl underline'>Order From Customers</h2>
            <div className="flex items-center justify-center my-15">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {orders.map((order) => (
                            <OrderDetailsCard key={order[0]} order={order} />
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default OrderFromCustomer;
