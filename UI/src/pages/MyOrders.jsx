import React, { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const Data = [
            {
                id: 1,
                title: "One",
                description: "This is a sample description.",
                img: "https://via.placeholder.com/150",
                author: "John Doe",
                price: 100,
                stock: 20,
                owner: "0x1234567890abcdef",
                buyer: "0xabcdef1234567890",
                houseAddress: "123 Sample Street",
                mobile: 1234567890,
            },
            {
                id: 2,
                title: "Two",
                description: "This is another sample description.",
                img: "https://via.placeholder.com/150",
                author: "Jane Doe",
                price: 150,
                stock: 10,
                owner: "0x9876543210fedcba",
                buyer: "0xfedcba9876543210",
                houseAddress: "456 Example Avenue",
                mobile: 9876543210,
            },
            {
                id: 3,
                title: "Three",
                description: "This is yet another sample description.",
                img: "https://via.placeholder.com/150",
                author: "Sam Smith",
                price: 200,
                stock: 5,
                owner: "0x1122334455667788",
                buyer: "0x8877665544332211",
                houseAddress: "789 Demo Blvd",
                mobile: 1122334455,
            },
        ];
        setOrders(Data);
    }, []);

    return (
        <section className="h-[83vh] w-full">
            <h1 className="text-black font-bold mb-4 ml-10 mt-5 text-left ">
                <span className='font-delius text-2xl underline'>My Orders</span>
            </h1>
            <div className="flex items-center justify-center my-15">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default MyOrders;
