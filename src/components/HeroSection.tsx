"use client";

import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Button } from "./ui/moving-border";

const Hero: React.FC = () => {
  const userName = localStorage.getItem("name") || "Fitness Enthusiast";
  const totalExercises = 123;
  const totalCaloriesBurned = 14560;
  const totalWorkouts = 35; // Example data
  const categoryData = [
    { name: "Cardio", value: 40 },
    { name: "Strength", value: 50 },
    { name: "Flexibility", value: 33 },
  ];

  const comparisonData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden ">
      {/* Background Image */}
      <img
        src="/gym_hero.jpeg"
        alt="Person working out in a gym"
        className="object-cover w-full h-full absolute inset-0 z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Welcome Back, {userName}!
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-8">
          Crush your fitness goals with data-driven insights!
        </p>

        {/* Quantitative Data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Button>
            <div className="content">
              <h3 className="text-xl font-semibold text-green-400">
                Total Exercises
              </h3>
              <p className="text-3xl text-white font-bold">{totalExercises}</p>
            </div>
          </Button>

          <Button >
          <div className="content">
            <h3 className="text-xl font-semibold text-green-400">
              Calories Burned
            </h3>
            <p className="text-3xl text-white font-bold">
              {totalCaloriesBurned}
            </p>
            </div>
          </Button>
          <Button className=" bg-opacity-80 p-4 rounded-lg shadow-md border-green-200 border">
            <div className="content">

            <h3 className="text-xl font-semibold text-green-400">
              Workouts Completed
            </h3>
            <p className="text-3xl text-white font-bold">{totalWorkouts}</p>
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
