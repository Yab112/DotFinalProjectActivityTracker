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
    <Card
      className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 bg-center bg-cover bg-no-repeat cursor-pointer text-center"
      style={{ backgroundImage: book.coverImagePath ? `url(${book.coverImagePath})` : 'none' }}
    >
      <CardHeader className="bg-opacity-75 bg-black p-4">
        <CardTitle className="text-lg text-white">{book.title}</CardTitle>
      </CardHeader>
      <CardContent className="bg-opacity-75 bg-black p-4">
        <p className="text-cyan-400 mb-2">{book.author}</p>
        <p className="text-sm text-gray-200 mb-4">{book.description}</p>
      </CardContent>
      <CardFooter className="bg-opacity-75 bg-black p-4">
      </CardFooter>
    </Card>
  );
};

export default BookCard;
