import React from "react";

const OrderDetailsCard = ({ order }) => {
  return (
    <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Order ID:</span>
          <span className="text-gray-800">{order.orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Book ID:</span>
          <span className="text-gray-800">{order.bookId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Buyer:</span>
          <span className="text-gray-800">{order.buyer}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">House Address:</span>
          <span className="text-gray-800">{order.houseAddress}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Mobile:</span>
          <span className="text-gray-800">{order.mobile}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Quantity:</span>
          <span className="text-gray-800">{order.quantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Delivered:</span>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${order.delivered ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
          >
            {order.delivered ? "Yes" : "No"}
          </span>
        </div>
      </div>
      {order.delivered ? <button
        className="mt-6 w-full bg-[#b5b4b6] text-white py-2 rounded-lg"
        disabled={order.delivered}
      >
        Delivered
      </button> :
        <button
          className="mt-6 w-full bg-[#604CC3] text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        
        >
          Delivered
        </button>
      }

    </div>
  );
};

export default OrderDetailsCard;
