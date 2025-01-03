"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { useToast } from "../hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  category: z.string().min(2, { message: "Category must be at least 2 characters." }),
  duration: z.number().min(1, { message: "Duration must be at least 1 minute." }),
  date: z.date(),
  isCompleted: z.boolean(),
  intensity: z.string().optional(),
  caloriesBurned: z.number().optional(),
  notes: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  _id: z.string().optional(),
});

interface EditExerciseFormProps {
  exercise: z.infer<typeof formSchema>;
}

export function EditExerciseForm({ exercise }: EditExerciseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...exercise,
      date: new Date(exercise.date), // Ensure the date is a proper Date object
    },
  });
  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Serialize date field properly
      const payload = { ...values, date: values.date.toISOString() };

      // Use Axios to make the API request
      const response = await axios.put(
        `http://localhost:5001/api/exercises/${values._id}`,
        payload
      );

      console.log("Exercise updated successfully:", response.data);
      toast({
        title: "Success",
        description: "Exercise updated successfully!",
      });
    } catch (error) {
      console.error("Error updating exercise:", error);
      const message =
        axios.isAxiosError(error) && error.response
          ? error.response.data.message || error.response.data
          : "Failed to update the exercise. Please try again.";
      toast({
        title: "Error",
        description: message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Exercise name" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Strength">Strength</SelectItem>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Flexibility">Flexibility</SelectItem>
                    <SelectItem value="Balance">Balance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value.toISOString().split("T")[0]}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isCompleted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Completed</FormLabel>
                  <FormDescription>Mark this exercise as completed</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={field.value ? "bg-green-500" : "bg-gray-300"}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Add fields for optional data */}
        <div className="mt-6">
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Additional notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-8">
          <Button type="submit" className="w-full bg-green-700 hover:bg-green-950">
            Update Exercise
          </Button>
        </div>
      </form>
    </Form>
  );
}
