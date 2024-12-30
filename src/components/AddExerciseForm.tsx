import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "../hooks/use-toast";

interface AddExerciseFormProps {
  date: Date;
}

const AddExerciseForm: React.FC<AddExerciseFormProps> = ({ date }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [intensity, setIntensity] = useState("Medium");
  const [caloriesBurned, setCaloriesBurned] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [type, setType] = useState("Indoor");
  const [location, setLocation] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newExercise = {
      name,
      category,
      duration: typeof duration === "string" ? 0 : duration,
      date,
      intensity,
      caloriesBurned: typeof caloriesBurned === "string" ? 0 : caloriesBurned,
      notes,
      type,
      location,
    };

    try {
      toast({
        title: "Exercise Added",
        description: `${name} on ${date} has been added to your activities.`,
      });
      // Clear the form fields
      setName("");
      setCategory("");
      setDuration("");
      setIntensity("Medium");
      setCaloriesBurned("");
      setNotes("");
      setType("Indoor");
      setLocation("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add the exercise. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <Label htmlFor="date" className="text-slate-200">Date</Label>
        <Input
          id="date"
          value={date.toISOString().split("T")[0]} 
          readOnly
          className="bg-transparent text-slate-200"
        />
      </div>
      <div>
        <Label htmlFor="name" className="text-slate-200">Exercise Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-transparent text-slate-200"
        />
      </div>
      <div>
        <Label htmlFor="category" className="text-slate-200">Category</Label>
        <Input
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="bg-transparent text-slate-200"
        />
      </div>
      <div>
        <Label htmlFor="duration" className="text-slate-200">Duration (minutes)</Label>
        <Input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
          className="bg-transparent text-slate-200"
        />
      </div>
      <div>
        <Label htmlFor="intensity" className="text-slate-200">Intensity</Label>
        <Input
          id="intensity"
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
          className="bg-transparent text-slate-200"
        />
      </div>
      <div>
        <Label htmlFor="caloriesBurned" className="text-slate-200">Calories Burned</Label>
        <Input
          id="caloriesBurned"
          type="number"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(Number(e.target.value))}
          className="bg-transparent text-slate-200"
        />
      </div>
      <div>
        <Label htmlFor="type" className="text-slate-200">Type</Label>
        <Input
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-transparent text-slate-200"
        />
      </div>
      <div>
        <Label htmlFor="location" className="text-slate-200">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent text-slate-200"
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="notes" className="text-slate-200">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="bg-transparent text-slate-200"
        />
      </div>
      <div className="md:col-span-2">
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white"
        >
          Add Exercise
        </Button>
      </div>
    </form>
  );
};

export default AddExerciseForm;
