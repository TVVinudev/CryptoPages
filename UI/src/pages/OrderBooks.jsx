import React, { useState } from "react";

const OrderBookForm = () => {
  const [formData, setFormData] = useState({
    bookId: "",
    quantity: "",
    houseAddress: "",
    mobile: "",
    payment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission, e.g., interacting with a smart contract
    console.log("Order Details:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center font-delius text-[#604CC3] underline mb-4">Order Book</h2>

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
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Payment */}
        <div className="mb-4">
          <label htmlFor="payment" className="block text-sm font-medium text-gray-700">
            Payment Amount (Wei)
          </label>
          <input
            type="number"
            id="payment"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Order Now
        </button>
      </form>
    </div>
  );
};

export default OrderBookForm;
