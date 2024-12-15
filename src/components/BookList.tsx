import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { fetchBooks } from "../../Services/BookService";
import AddBookDialog from "./AddBookDialog";
import { List, BookDownIcon } from "lucide-react";
import { toast } from "../hooks/use-toast";
import { on } from "events";

interface Book {
  _id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImagePath: string;
  filePath: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksData = await fetchBooks();
        toast({
          title: "Success",
          description: "Books loaded successfully.",
        });

        setBooks(booksData);
      } catch (err) {

        toast({
          title: "Error",
          description: "Failed to load books. Please try again later.",
          variant: "destructive",
        });
      }
    };

    getBooks();
  }, []);


  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">  
        <h2 className="text-2xl font-bold text-center text-cyan-700 w-full sm:w-auto">
          Your Monochrome Library
        </h2>
        <List className="h-8 w-8 text-cyan-900 cursor-pointer" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {books.length > 0 ? (
          books.map((book, index) => <BookCard key={index} book={book} />)
        ) : (
          <div className="flex flex-col items-center justify-center h-60 w-full sm:w-80 bg-gray-100 rounded-lg shadow-md mx-auto p-4">
            <BookDownIcon className="h-24 w-24 text-cyan-400 mb-4" />
            <div className="text-center text-gray-500 text-lg mb-4">
              No Books Here
            </div>
            <AddBookDialog />
            <p className="text-center text-gray-800 mt-4 text-sm sm:text-lg">
              Start adding books to build your library!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookList;