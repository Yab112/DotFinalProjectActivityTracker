import React, { useEffect, useState } from "react";
import { fetchBooks } from "../../Services/BookService";
import { toast } from "../hooks/use-toast";
import { Calendar } from "./Calendar";
import { format } from "date-fns";
import ShowCurrentDay from "./ShowCurrentDay";
import { Button } from "./ui/button";
import ExerciseCard from "./ExerciseCard";
import {
  Dumbbell,
  MonitorIcon as Running,
  SpaceIcon as Yoga,
} from "lucide-react";
import TodaysTasks from "./TodaysTasks";

interface Book {
  _id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImagePath: string;
  filePath: string;
}

const iconMap = {
  Strength: Dumbbell,
  Cardio: Running,
  Flexibility: Yoga,
};

const initialExercisesData = [
  // Tasks in the Past
  {
    id: "1",
    name: "Weight Lifting",
    description: "Full body workout focusing on major muscle groups",
    category: "Strength",
    duration: 60,
    date: new Date("2023-05-15"), // Past date
    isCompleted: false,
    intensity: "High",
    caloriesBurned: 300,
    notes: "Increased weight for bench press",
    type: "Indoor",
    location: "Home Gym",
  },
  {
    id: "2",
    name: "Morning Jog",
    description: "5km run around the park",
    category: "Cardio",
    duration: 30,
    date: new Date("2023-12-25"), // Past date
    isCompleted: true,
    intensity: "Moderate",
    caloriesBurned: 250,
    notes: "Felt great, maintained a steady pace",
    type: "Outdoor",
    location: "Central Park",
  },

  // Tasks for Today
  {
    id: "3",
    name: "Yoga Session",
    description: "Hatha yoga session to improve flexibility",
    category: "Flexibility",
    duration: 45,
    date: new Date(), // Today's date
    isCompleted: false,
    intensity: "Low",
    caloriesBurned: 200,
    notes: "Focus on breathing techniques",
    type: "Indoor",
    location: "Yoga Studio",
  },
  {
    id: "4",
    name: "Cycling",
    description: "Leisure ride to explore the countryside",
    category: "Cardio",
    duration: 120,
    date: new Date(), // Today's date
    isCompleted: false,
    intensity: "Moderate",
    caloriesBurned: 500,
    notes: "Bring water and a snack for energy",
    type: "Outdoor",
    location: "Countryside Trail",
  },

  // Tasks in the Future
  {
    id: "5",
    name: "HIIT Workout",
    description: "High-intensity interval training session",
    category: "Strength and Cardio",
    duration: 30,
    date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow's date
    isCompleted: false,
    intensity: "High",
    caloriesBurned: 400,
    notes: "Prepare a playlist of energetic songs",
    type: "Indoor",
    location: "Fitness Center",
  },
  {
    id: "6",
    name: "Swimming",
    description: "30-minute lap swimming session",
    category: "Endurance",
    duration: 30,
    date: new Date(new Date().setDate(new Date().getDate() + 2)), // Two days from today
    isCompleted: false,
    intensity: "Moderate",
    caloriesBurned: 350,
    notes: "Focus on freestyle strokes",
    type: "Indoor",
    location: "Community Pool",
  },
];

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

  const [exercises, setExercises] = useState(initialExercisesData);

  const handleUpdateExercise = (updatedExercise: any) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === updatedExercise.id ? updatedExercise : exercise
      )
    );
  };

  const handleSelectDate = (date: Date) => {
    alert(`Selected date: ${format(date, "MMMM d, yyyy")}`);
  };

  return (
    <section className="min-h-screen h-full  mt-24 flex gap-8">
      <div className="flex justify-start items-start  flex-col gap-4 ml-10 ">
        <Calendar onSelectDate={handleSelectDate} />
        <ShowCurrentDay />
        
      </div>
      <div className="flex gap-8 flex-col ">
        <div className="w-full flex  gap-4">
          <Button
            size="lg"
            className="text-gray-200 bg-transparent border border-green-200 transition-colors   focus:bg-green-600 focus:text-slate-700"
          >
            Finished Tasks
          </Button>
          <Button
            size="lg"
            className="text-gray-200 bg-transparent border border-green-200 transition-colors   focus:bg-green-600 focus:text-slate-700"
          >
            Finished Tasks
          </Button>
          <Button
            size="lg"
            className="text-gray-200 bg-transparent border border-green-200 transition-colors   focus:bg-green-600 focus:text-slate-700"
          >
            Finished Tasks
          </Button>
          <Button
            size="lg"
            className="text-gray-200 bg-transparent border border-green-200 transition-colors   focus:bg-green-600 focus:text-slate-700"
          >
            Finished Tasks
          </Button>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[800px] overflow-y-auto p-12">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                icon={
                  iconMap[exercise.category as keyof typeof iconMap] || Dumbbell
                }
                onUpdate={handleUpdateExercise}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold mb-2 ml-12 text-white">Today's Tasks</h2>
          <TodaysTasks
            exercises={exercises}
            handleUpdateExercise={handleUpdateExercise}
          />
        </div>
      </div>
    </section>
  );
};

export default BookList;
