import React from "react";
import ExerciseCard from "./ExerciseCard";
import { Dumbbell } from "lucide-react";

interface Exercise {
  name: string;
  description: string;
  category: string;
  duration: number;
  date: Date;
  isCompleted: boolean;
  intensity?: string;
  caloriesBurned?: number;
  notes?: string;
  type?: string;
  location?: string;
  _id: string;
}

interface TodaysTasksProps {
  exercises: Exercise[];
}

export default function TodaysTasks({
  exercises
}: TodaysTasksProps) {
  const today = new Date();
  const todaysTasks = exercises.filter(
    (exercise) =>
      exercise.date.toDateString() === today.toDateString() // Filter tasks for today
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[800px] overflow-y-auto p-12">
      {todaysTasks.length > 0 ? (
        todaysTasks.map((exercise) => (
          <div className="relative" key={exercise.name}>
            <ExerciseCard
              exercise={exercise}
              icon={Dumbbell} 
            />
            {/* Add animation for today's tasks */}
            <div className="absolute top-2 right-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks for today!</p>
      )}
    </div>
  );
}
