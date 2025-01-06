import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ethers } from "ethers";
import ABI from "../assets/CryptoPages.json";
import address from "../assets/deployed_addresses.json";

const OrderBookForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookData } = location.state || {};

  const [formData, setFormData] = useState({
    bookId: bookData[0].toString(),
    quantity: 0,
    houseAddress: "",
    mobile: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { bookId, quantity, houseAddress, mobile } = formData;

    if (quantity > BigInt(bookData[6])) {
      toast.info("There is currently no such amount available.");
      return;
    }

    const payment = BigInt(bookData[5]) * BigInt(quantity);
    try {
      await uploadToBlockchain(bookId, quantity, houseAddress, mobile, payment);
    } catch (error) {
      console.error("Order Submission Error:", error);
    }
  };

  const uploadToBlockchain = async (bookId, quantity, houseAddress, mobile, payment) => {
    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        address["CryptoModule#CryptoPages"],
        ABI.abi,
        signer
      );

      const tx = await contract.orderBook(
        bookId,
        quantity,
        houseAddress,
        mobile,
        { value: payment }
      );
      await tx.wait();
      toast.success("Order placed successfully!");
      navigate('/myOrders')
    } catch (error) {
      toast.error(`Transaction Failed: ${error.reason || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const payment = BigInt(bookData[5]) * BigInt(formData.quantity || 0);

  return (
    <div className="h-auto md:h-[83vh] flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center font-delius text-[#604CC3] underline mb-4">
          Order Book
        </h2>

        {/* Book ID */}
        <div className="mb-4">
          <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">
            Book ID
          </label>
          <input
            type="number"
            id="bookId"
            name="bookId"
            value={formData.bookId}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>

        {/* House Address */}
        <div className="mb-4">
          <label htmlFor="houseAddress" className="block text-sm font-medium text-gray-700">
            House Address
          </label>
          <textarea
            id="houseAddress"
            name="houseAddress"
            value={formData.houseAddress}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>

        {/* Payment */}
        <div className="mb-4">
          <label htmlFor="payment" className="block text-sm font-medium text-gray-700">
            Payment Amount (Wei)
          </label>
          <input
            type="text"
            id="payment"
            name="payment"
            value={payment.toString()}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isLoading && "cursor-not-allowed opacity-50"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Order Now"}
        </button>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default OrderBookForm;
