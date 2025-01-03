import React from 'react'
import { useNavigate } from 'react-router-dom'

const GridCards = () => {

    const Navigate = useNavigate();

    function handleSubmit(){
        Navigate('/ViewCard')
    }

    return (
        <div class="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs">
            <img
                src="https://via.placeholder.com/400x300"
                alt="Book Cover"
                class="w-full h-48 object-cover"
            />
            <div class="p-6">
                <h2 class="text-xl font-semibold text-gray-800">Book Name</h2>
                <p class="text-gray-600 mt-2">by <span class="text-gray-700 font-medium">Author Name</span></p>
                <div class="mt-4 flex justify-between items-center">
                    <p class="text-gray-600">Available Copies:</p>
                    <span class="text-gray-800 font-bold">10</span>
                </div>
                <div class="mt-4 flex justify-between items-center">
                    <p class="text-gray-600">Price:</p>
                    <span class="text-gray-800 font-bold">0.05 ETH</span>
                </div>
                <button class="mt-6 w-full bg-[#604CC3] text-white py-2 rounded hover:bg-[#503AA1] transition" onClick={handleSubmit}>
                    Details
                </button>
            </div>
        </div>
    )
}

export default GridCards