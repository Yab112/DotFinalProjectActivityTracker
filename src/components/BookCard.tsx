import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImagePath: string;
  filePath: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div
      className="relative w-64 h-96 bg-gray-100 border border-gray-300 shadow-xl rounded-md flex flex-col overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
      style={{
        backgroundImage: book.coverImagePath ? `url(${book.coverImagePath})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Spine */}
      <div className="absolute top-0 left-0 w-4 h-full bg-gray-800 shadow-inner"></div>

      {/* Book Content */}
      <div className="absolute top-0 right-0 w-[calc(100%-1rem)] h-full bg-opacity-75 bg-black p-4 flex flex-col justify-between text-white">
        {/* Book Header */}
        <div>
          <h2 className="text-lg font-bold mb-2">{book.title}</h2>
          <p className="text-sm italic">by {book.author}</p>
        </div>

        {/* Book Description */}
        <p className="text-sm text-gray-300 flex-grow mb-4 overflow-hidden text-ellipsis">
          {book.description}
        </p>

        {/* Book Footer */}
        <div className="flex justify-between items-center">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-sm">Read Me</Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
