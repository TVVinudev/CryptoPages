import React, { useState, useEffect } from "react";
import OrderDetailsCard from "../components/OrderDetailsCard";

const OrderFromCustomer = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const Data = [
            {
                id: 1,
                orderId: 12345,
                bookId: 67890,
                buyer: "0x1234567890abcdef",
                houseAddress: "123 Sample Street, Example City, EX 45678",
                mobile: 9876543210,
                quantity: 3,
                delivered: true,
            },
            {
                id: 2,
                orderId: 12346, // Updated orderId
                bookId: 67891,
                buyer: "0xabcdef1234567890",
                houseAddress: "456 Sample Avenue, Example City, EX 67890",
                mobile: 9876543211,
                quantity: 2,
                delivered: false,
            },
            {
                id: 3,
                orderId: 12347, // Updated orderId
                bookId: 67892,
                buyer: "0xabcdef0987654321",
                houseAddress: "789 Sample Road, Example City, EX 11223",
                mobile: 9876543212,
                quantity: 1,
                delivered: true,
            },
        ];
        setOrders(Data);
    }, []);

    return (
        <section className="h-[83vh] w-full">
            <h2 className='font-delius font-semibold ml-24 my-10 text-2xl underline'>Order From Customers</h2>
            <div className="flex items-center justify-center my-15">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {orders.map((order) => (
                            <OrderDetailsCard key={order.id} order={order} />
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default OrderFromCustomer;
