"use client";

import React, { useState } from "react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import AddExerciseForm from "./AddExerciseForm";

interface CalendarProps {
  onSelectDate: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Track the selected date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set today's time to 00:00 for comparison

  const getDaysInMonth = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  };

  const days = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const openDialog = (day: Date) => {
    setSelectedDate(day);
    onSelectDate(day); // Call the provided handler
  };

  return (
    <div className="w-full max-w-md ml-4">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevMonth}
          className="bg-green-400"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold text-slate-400">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextMonth}
          className="bg-green-400"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-sm text-green-400"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const isPastDay = day < today; 
          return (
            <Button
              key={format(day, "yyyy-MM-dd")}
              variant="ghost"
              className={cn(
                "h-10 w-10 p-0 font-normal text-slate-200",
                !isSameMonth(day, currentMonth) && "text-muted-foreground",
                isSameDay(day, today) &&
                  "bg-cyan-500 font-semibold text-slate-900 hover:bg-green-400 hover:text-slate-950 focus:bg-green-600 focus:text-slate-700",
                isPastDay && "text-muted-foreground cursor-not-allowed"
              )}
              onClick={() => !isPastDay && openDialog(day)} // Only allow openDialog if it's not a past day
              disabled={isPastDay} 
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </Button>
          );
        })}
      </div>

      {/* Single Dialog for the Selected Date */}
      {selectedDate && (
        <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
          <DialogContent className="backdrop-blur-3xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-center">
                Add Exercise for{" "}
                <time dateTime={format(selectedDate, "yyyy-MM-dd")}>
                  {format(selectedDate, "MMMM d, yyyy")}
                </time>
              </DialogTitle>
              <DialogDescription>
                <AddExerciseForm date={selectedDate} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
