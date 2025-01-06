import React from "react";
import { ethers } from 'ethers';
import ABI from '../assets/CryptoPages.json';
import address from '../assets/deployed_addresses.json';

const OrderDetailsCard = ({ order }) => {

  async function handleSubmit (){
      console.log(order[0]);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const abi = ABI.abi;
        const cAddress = address["CryptoModule#CryptoPages"];
        const cryptoPagesInstance = new ethers.Contract(cAddress, abi, signer);

        const tx = await cryptoPagesInstance.deliverOrder(order[0]);
        console.log(tx);


    } catch (error) {
        console.error("Error fetching orders:", error.message);
        setError("Failed to load books. Please try again later.");
    }
      
  }



  return (
    <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Order ID:</span>
          <span className="text-gray-800">{order[0].toString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Book ID:</span>
          <span className="text-gray-800">{order[1].toString()}</span>
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
          <span className="text-gray-800">{order[5].toString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Quantity:</span>
          <span className="text-gray-800">{order[6].toString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Payment:</span>
          {order[8].toString() == 'true' ?<span className=" text-green-600"> Success</span>:<span className=" text-red-600"> Pending</span>  }
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
        disabled={order.delivered  }
      >
        Delivered
      </button> :
        <button
          className="mt-6 w-full bg-[#604CC3] text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleSubmit}
        >
          Delivered
        </button>
      }

    </div>
  );
};

export default OrderDetailsCard;
