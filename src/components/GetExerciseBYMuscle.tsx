import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { FaSearch } from 'react-icons/fa';
import ExerciseType  from './ExerciseType';

type Props = {};
const muscleOptions = ["chest", "back", "legs", "arms", "shoulders", "abs"];

const GetExerciseByMuscle = (props: Props) => {
  const [muscle, setMuscle] = useState('');
  const [exercises, setExercises] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchExercisesByMuscle = async (muscleType: string) => {
    try {
      const response = await axios.get(
        `https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercises/muscle/${muscleType}`,
        {
          headers: {
            'X-Rapidapi-Key': '20da3ca5c9msh904e91bdd47e22fp10fb6cjsn38733084cec5',
            'X-Rapidapi-Host': 'exercise-db-fitness-workout-gym.p.rapidapi.com',
          },
        }
      );
      console.log("&&&&&&&&&&&&&&**************",response.data)
      setExercises(response.data);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      fetchExercisesByMuscle(muscle);
    }
  };

  return (
    <div className='flex flex-col items-center gap-4 p-4'>
        <h1 className='text-2xl font-semibold mt-4 text-green-600'>Search Exercise By Muscle</h1>
      <div className='flex border border-gray-300 rounded-lg w-[400px]'>
          <input
            type='text'
            placeholder='Enter muscle type...'
            value={muscle}
            onChange={(e) => setMuscle(e.target.value)}
            onKeyDown={handleKeyDown}  // Add this line
            className='bg-transparent rounded-lg p-2 text-white w-[400px] focus:outline-none focus:ring-0'
          />
          <button
            onClick={() => fetchExercisesByMuscle(muscle)}  // Pass muscle to fetch function
            className='bg-teal-500 text-white rounded-lg px-4 h-full'
          >
            <FaSearch />
          </button>
      </div>
        <div className='flex flex-wrap'>
            {muscleOptions.map((muscleOption) => (
              <button
                key={muscleOption}
                onClick={() => fetchExercisesByMuscle(muscleOption)}  // Pass the specific muscle
                className="px-4 py-2 bg-transparent text-slate-200 rounded-lg hover:text-slate-300"
              >
                {muscleOption.charAt(0).toUpperCase() + muscleOption.slice(1)}
              </button> 
            ))}
        </div>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
          <DialogContent className='max-h-[500px] w-full overflow-y-auto backdrop-blur-3xl'>
            <DialogHeader>
              <DialogTitle className='text-lg font-semibold text-center'>
                Exercises for {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div className='grid gap-4'>
                {exercises.map((exercise) => (
                  <div className="grid gap-6 p-4 md:p-6">
                    <ExerciseType key={exercise.id} exercise={exercise} />
                  </div>
                ))}
                {!exercises.length && <p className='text-green-600 text-3xl text-center'>No exercise or you have used a wrong term that is not muscle.</p>}
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default GetExerciseByMuscle;