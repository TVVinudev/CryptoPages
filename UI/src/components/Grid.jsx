import React from 'react';
import GridCards from './GridCards';

const Grid = () => {
  const books = [
    { id: 1, title: "Card 1", description: "This is the description for card 1." },
    { id: 2, title: "Card 2", description: "This is the description for card 2." },
    { id: 3, title: "Card 3", description: "This is the description for card 3." },
    { id: 4, title: "Card 4", description: "This is the description for card 4." },
  ];

  return (
    <>
      <h2 className='font-delius font-semibold ml-24 my-10 text-4xl'>Books For You</h2>
      <div className="flex items-center justify-center my-15">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <GridCards />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button className="text-white shadow-2xl px-10 py-4 bg-[#604CC3] rounded-lg hover:bg-[#503AA1] transition-colors duration-300">
          View All
        </button>
      </div>
    </>
  );
};

export default Grid;
