import React, { useState, useEffect } from 'react';
import GridCards from './GridCards';
import { useNavigate } from 'react-router-dom';

const Grid = ({ home }) => {
  const [books, setBooks] = useState([]);
  const Navigate = useNavigate();

  const Data = [
    { id: 1, title: "Card 1", description: "This is the description for card 1." },
    { id: 2, title: "Card 2", description: "This is the description for card 2." },
    { id: 3, title: "Card 3", description: "This is the description for card 3." },
    { id: 4, title: "Card 4", description: "This is the description for card 4." },
    { id: 5, title: "Card 3", description: "This is the description for card 3." },
    { id: 6, title: "Card 4", description: "This is the description for card 4." },
  ];

  useEffect(() => {
    if (home) {
      setBooks(Data.slice(0, 4));
    } else {
      setBooks(Data);
    }
  }, [home]);


  const handleNavigate = () => {
    Navigate('/shop')
  }

  return (
    <>
      <div className="flex items-center justify-center my-15">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <GridCards /> //key={book.id} book={book}
            ))}
          </div>
        </div>
      </div>
      {
        home && (
          <div className="flex justify-center mt-8">
            <button className="text-white shadow-2xl px-10 py-4 bg-[#604CC3] rounded-lg hover:bg-[#503AA1] transition-colors duration-300" onClick={handleNavigate}>
              View All
            </button>
          </div>
        )
      }

    </>
  );
};

export default Grid;
