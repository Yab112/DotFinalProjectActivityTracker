import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "../hooks/use-toast";
import { Calendar } from "./Calendar";
import ShowCurrentDay from "./ShowCurrentDay";
import { Button } from "./ui/button";
import ExerciseCard from "./ExerciseCard";
import {
  Dumbbell,
  MonitorIcon as Running,
  SpaceIcon as Yoga,
} from "lucide-react";
import TodaysTasks from "./TodaysTasks";
import ListExerciseTypes from "./ListExerciseTypes";
import GetExerciseBYMuscle from "./GetExerciseBYMuscle";
import Loader from "./Loader";

const iconMap = {
  Strength: Dumbbell,
  Cardio: Running,
  Flexibility: Yoga,
};

const BookList: React.FC = () => {
  const [exercises, setExercises] = useState<any[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found in localStorage");
        }

        const response = await axios.get(
          `https://dot-final-project-exercise-tracker-backend.vercel.app/api/exercises/${userId}`
        );

        console.log("Exercises:", response.data);

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid data format: Expected an array");
        }

        setExercises(response.data);

        toast({
          title: "Success",
          description: "Exercises loaded successfully.",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description:
            error.response?.data?.message ||
            error.message ||
            "Failed to load exercises.",
          variant: "destructive",
        });
      }
    };

    fetchExercises();
  }, []);


  return (
    <section className="min-h-screen h-full mt-24 flex gap-8">
      <div className="flex justify-start items-start flex-col gap-4 ml-10">
        <ShowCurrentDay />
        <Calendar />
        <ListExerciseTypes />
        <GetExerciseBYMuscle />
      </div>
      <div className="flex gap-8 flex-col">
        <div className="w-full flex gap-4">
          <Button
            size="lg"
            className="text-gray-200 bg-transparent border border-green-200 transition-colors focus:bg-green-600 focus:text-slate-700"
          >
            Finished Tasks
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold ml-12 text-white">Today's Tasks</h2>
          <TodaysTasks
            exercises={exercises
              .map((exercise) => ({
                name: exercise.name,
                description: exercise.notes || "", // Default to an empty string if notes are missing
                category: exercise.category,
                duration: exercise.duration,
                date: new Date(exercise.date), // Convert string to Date object
                isCompleted: exercise.iscomplated, // Map iscomplated to isCompleted
                intensity: exercise.intensity,
                caloriesBurned: exercise.caloriesBurned,
                notes: exercise.notes,
                type: exercise.type,
                location: exercise.location,
                _id:exercise._id,
              }))
              .filter((exercise) => {
                // Normalize dates to compare only the date portion
                const exerciseDate = new Date(exercise.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                exerciseDate.setHours(0, 0, 0, 0);

                return exerciseDate.getTime() === today.getTime();
              })}
          />
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[800px] overflow-y-auto p-12">
            {exercises.map((exercise) => {
              return (
                <ExerciseCard
                  key={exercise._id}
                  exercise={{
                    ...exercise,
                    date: new Date(exercise.date),
                    isCompleted: exercise.iscomplated,
                  }}
                  icon={
                    iconMap[exercise.category as keyof typeof iconMap] ||
                    Dumbbell
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookList;
