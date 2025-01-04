import React from 'react'

const OrderCard = ({order}) => {
    return (
        <div className="max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
                <img
                    src={order.img}
                    alt="Product Image"
                    className="w-24 h-24 rounded-md object-cover"
                />
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{order.title}</h2>
                    <p className="text-gray-600 text-sm">
                        Order ID: <span className="font-medium text-gray-900">{order.id}</span>
                    </p>
                    <p className="text-gray-600 text-sm">
                        Price: <span className="font-medium text-gray-900">${order.price}</span>
                    </p>
                    <p className="text-gray-600 text-sm">
                        Stock Remaining: <span className="font-medium text-gray-900">{order.stock}</span>
                    </p>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-gray-700">
                    <span className="font-semibold">Description:</span> {order.description}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Author:</span> {order.author}
                </p>
            </div>
            <div className="mt-4">
                <p className="text-gray-700">
                    <span className="font-semibold">Owner:</span> {order.owner}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Buyer:</span> {order.buyer}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">House Address:</span> {order.houseAddress}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Mobile:</span> {order.mobile}
                </p>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                View Details
            </button>
        </div>
    )
}

export default OrderCard