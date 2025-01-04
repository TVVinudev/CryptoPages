import React from 'react'
import FileUploads from './FileUploads'

const SellingForm = () => {
  return (
    <div className='p-10 shadow-2xl w-[50vh] h-[80vh] text-[#604CC3] bg-white'>
      <form class="max-w-sm mx-auto">
        <div className='mt-2'>
          <h1 className='text-center text-2xl font-bold font-delius my-2 underline'>Sell your Books</h1>
        </div>
        <div className='mt-2'>
          <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Title</label>
          <input type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg" />
        </div>
        <div className='mt-2'>
          <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author Name</label>
          <input type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg" />
        </div>
        <div className='mt-2'>
          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Description</label>
          <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border" placeholder="Leave a comment..."></textarea>

        </div>
        <FileUploads />
        <div className='mt-2'>
          <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price (Wei) </label>
          <input type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg" />
        </div>
        <div className='mt-2'>
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of copys</label>
          <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">


            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
        <div className='my-3'>
          <button type="submit" class="text-white bg-[#604CC3] hover:bg-blue-800 w-full p-2 border-gray-300 rounded-lg">Submit</button>
        </div>

      </form>
    </div>
  )
}

export default SellingForm