import React from 'react';
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { deleteBook } from "../../Services/BookService";
import { toast } from "../hooks/use-toast";

interface Book {
  _id: number;
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

const BookCard: React.FC<BookCardProps> = ({ book}) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); 

    try {
      await deleteBook(book._id);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div
      className="group relative w-64 h-72 bg-gray-100 border border-gray-300 shadow-xl rounded-md flex flex-col overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
      style={{
        backgroundImage: book.coverImagePath ? `url(${book.coverImagePath})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => console.log(`Book ID: ${book._id}`)}
    >
      {/* Spine */}
      <div className="absolute top-0 left-0 w-2 h-full bg-cyan-200 shadow-inner"></div>

      {/* Delete Icon */}
      <button
        className="absolute top-2 right-2 z-10 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={handleDelete}
      >
        <Trash size={16} />
      </button>

      {/* Card Content */}
      <div className="absolute top-0 right-0 w-[calc(100%-0.3rem)] h-full bg-opacity-75 bg-black p-4 flex flex-col justify-between text-white">
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
        <div className="flex justify-center items-center ">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-sm">Read Me</Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
