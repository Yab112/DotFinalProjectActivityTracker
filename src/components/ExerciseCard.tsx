"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { LucideIcon, Edit } from "lucide-react";
import { EditExerciseForm } from "./EditExerciseForm";
import { FaCheck, FaEdit, FaList, FaTimes, FaTrash } from "react-icons/fa";
import { Flame, BarChart, Dumbbell, MapPin, StickyNote } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useToast } from "../hooks/use-toast";

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

interface ExerciseCardProps {
  exercise: Exercise;
  icon: LucideIcon;
}

export default function ExerciseCard({
  exercise,
  icon: Icon,
}: ExerciseCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
   const { toast } = useToast();

  // Normalize dates to midnight for accurate comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exerciseDate = new Date(exercise.date);
  exerciseDate.setHours(0, 0, 0, 0);

  // Check if the task is in the past and not completed
  const isPast = exerciseDate < today;
  const isMissed = isPast && !exercise.isCompleted;

  const handleUpdate = (updatedExercise: Exercise) => {
    console.log("Updated exercise:", updatedExercise);
    setShowEditDialog(false);
  };

  const handledelete = async (id: string) => {
    try {
      const response = await axios.delete(`https://dot-final-project-exercise-tracker-backend.vercel.app/api/exercises/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast({
          title: "Error",
          description: "exercise deleted successfully",
        });
      } else {
        toast({
          title:"Failed to delete exercise",
          description: "Please try again",
        })
      }
    } catch (error) {
      toast({
        title:"Failed to delete exercise",
        description: "Please try again",
      })
    }
  };

  return (
    <Card
      className={`w-full max-w-lg rounded-lg shadow-lg transform transition-all relative ${
        isMissed
          ? "border-red-600 bg-transparent text-white"
          : "bg-black text-white border border-cyan-300"
      } hover:shadow-2xl`}
    >
      {/* Tooltip for Missed Tasks Only */}
      {isMissed && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {/* Invisible overlay to trigger the tooltip on hover */}
              <div className="w-full h-full absolute top-0 left-0 z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent className="flex flex-col items-center p-4 border border-red-100/100 rounded-md bg-black text-white">
              <p className="mb-2 text-center text-lg">
                You have missed this task, oops!
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="text-white/80 border-none bg-transparent "
                  onClick={() => setShowEditDialog(true)}
                >
                  <FaEdit className="mr-2 " /> Edit
                </Button>
                <Button
                  variant="outline"
                  className="text-red-500/100 border-none bg-transparent hover:bg-transparent"
                  onClick={() => handledelete(exercise._id)}
                >
                  <FaTrash className="mr-2" /> Delete
                </Button>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Edit Icon for Incomplete Tasks */}
      {!exercise.isCompleted && (
        <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <FaEdit
            className="text-green-500 text-xl cursor-pointer"
            onClick={() => setShowEditDialog(true)}
          />
        </div>
      )}

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{exercise.name}</CardTitle>
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {/* Edit Dialog */}
          {!isMissed && !exercise.isCompleted && (
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 p-0 hover:bg-green-400 focus:bg-transparent"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit exercise</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="backdrop-blur-3xl w-auto p-6 rounded-lg shadow-lg transition-transform">
                <DialogHeader>
                  <DialogTitle>Edit Exercise</DialogTitle>
                </DialogHeader>
                <EditExerciseForm exercise={exercise} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{exercise.category}</div>
        <p className="text-xs text-muted-foreground">{exercise.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <Badge variant={exercise.isCompleted ? "default" : "secondary"}>
            {exercise.isCompleted ? (
              <div className="flex items-center space-x-2">
                <FaCheck className="text-green-600 text-lg" />
                <p className="text-xs">Completed</p>
              </div>
            ) : (
              <div className="flex items-center space-x-2 bg-transparent border-1 border-sky-300">
                <FaTimes className="text-red-600 text-lg" />
                <p className="text-xs">Not Completed</p>
              </div>
            )}
          </Badge>
          <span className="text-sm text-muted-foreground ml-2">
            {exercise.duration} minutes
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <time
          dateTime={exercise.date.toISOString()}
          className="text-sm text-muted-foreground"
        >
          {exercise.date.toLocaleDateString()}
        </time>
        {isMissed && (
          <Badge variant="destructive" className="text-xs">
            Missed
          </Badge>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="hover:bg-green-400">
              <FaList /> Show Details
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-lg bg-gradient-to-br from-black/50 to-black/90 border-green-200">
            <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <DialogTitle className="text-xl font-semibold text-green-800">
                {exercise.name} - Details
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <p className="flex items-center text-gray-200">
                <span className="mr-2 text-teal-500">
                  <Flame size={18} /> {/* Intensity Icon */}
                </span>
                <strong className="font-medium text-teal-700">
                  Intensity:
                </strong>
                &nbsp;
                <span>
                  {exercise.intensity ||
                    "Not specified – take it at your own pace!"}
                </span>
              </p>

              <p className="flex items-center text-gray-200">
                <span className="mr-2 text-teal-500">
                  <BarChart size={18} /> {/* Calories Icon */}
                </span>
                <strong className="font-medium text-teal-700">
                  Calories Burned:
                </strong>
                &nbsp;
                <span>
                  {exercise.caloriesBurned
                    ? `${exercise.caloriesBurned} kcal – Great for achieving your goals!`
                    : "No data – maybe you should track it next time!"}
                </span>
              </p>

              <p className="flex items-center text-gray-200">
                <span className="mr-2 text-teal-500">
                  <Dumbbell size={18} /> {/* Type Icon */}
                </span>
                <strong className="font-medium text-teal-700">Type:</strong>
                &nbsp;
                <span>
                  {exercise.type || "Indoor/Outdoor – the choice is yours!"}
                </span>
              </p>

              <p className="flex items-center text-gray-200">
                <span className="mr-2 text-teal-500">
                  <MapPin size={18} /> {/* Location Icon */}
                </span>
                <strong className="font-medium text-teal-700">Location:</strong>
                &nbsp;
                <span>
                  {exercise.location
                    ? `At ${exercise.location} – Perfect spot for this activity!`
                    : "Anywhere you feel comfortable."}
                </span>
              </p>

              <p className="flex items-center text-gray-200">
                <span className="mr-2 text-teal-500">
                  <StickyNote size={18} /> {/* Notes Icon */}
                </span>
                <strong className="font-medium text-teal-700">Notes:</strong>
                &nbsp;
                <span>
                  {exercise.notes
                    ? `"${exercise.notes}" – Keep this in mind for your next session.`
                    : "No notes – freestyle it and have fun!"}
                </span>
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
