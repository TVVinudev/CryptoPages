import React from 'react'

const FileUploads = () => {
    return (
        <div className='flex space-x-2 mt-2'>
            <div>
                <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                <input type="file" id="small-input" className="block w-full p-2 text-gray-900 border-gray-300 rounded-lg" />
            </div>
            <div className='mt-9'>
                <button type="submit" className="text-white bg-[#604CC3] hover:bg-blue-800 px-4 py-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ">Upload</button>
            </div>
        </div>
    )
}

export default FileUploads