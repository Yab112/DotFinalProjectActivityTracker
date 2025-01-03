import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Props = {};

const ListExerciseTypes = (props: Props) => {
  const [exercises, setExercises] = useState<string[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch the exercises from the API
    const fetchExercises = async () => {
      try {
        const response = await axios.get('https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercises', {
          headers: {
            'X-Rapidapi-Key': '20da3ca5c9msh904e91bdd47e22fp10fb6cjsn38733084cec5',
            'X-Rapidapi-Host': 'exercise-db-fitness-workout-gym.p.rapidapi.com'
          }
        });
        console.log('API Response:', response.data.excercises_ids);

        // Log the response to understand its structure
        // console.log('API Response:', response.data);

        // Check and map the structure
        const exerciseArray = response.data.excercises_ids || [];
        // console.log('Exercise Array:', exerciseArray);
        const exerciseNames = exerciseArray.map((exercise: { name: string }) => exercise);
        // console.log('Exercise Names:', exerciseNames);

        setExercises(exerciseNames);
        setFilteredExercises(exerciseNames);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching exercises:', error.message);
        } else if (axios.isAxiosError(error) && error.response) {
          console.error('Error fetching exercises:', error.response);
        } else {
          console.error('An unknown error occurred');
        }
      }
    };  
    fetchExercises();
  }, []);
  
  

  // Handle search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
     
    if (query === '') {
      setFilteredExercises(exercises);
    } else {
      const filtered = exercises.filter((exercise) =>
        exercise.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredExercises(filtered);
    }
  };

  const handleExerciseClick = (exerciseName: string) => {
    const query = encodeURIComponent(exerciseName);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <section className='flex flex-col justify-center items-center gap-4 max-w-[450px] p-4 bg-transparent rounded-lg  '>
      <div className='text-2xl font-semibold text-teal-400 border-l-4 border-teal-500 pl-4'>
        Confused about what to do? Check out the Exercise Types
      </div>
      <input
        type='text'
        value={searchQuery}
        onChange={handleSearch}
        placeholder='Search for exercise types...'
        className='bg-transparent border border-slate-300 rounded-lg p-2 text-slate-200 w-full focus:outline-none focus:ring-2 focus:ring-teal-500'
      />
      <div className='flex flex-col gap-2 max-h-[200px] h-full overflow-y-auto w-full bg-transparent rounded-lg p-2 border border-slate-300 overflow-x-auto devide-y divide-slate-300'>
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise, index) => (
            <p key={index} className='text-slate-200 p-2 hover:bg-green-700 hover:text-slate-950 rounded-lg cursor-pointer bg-trans' onClick={() => handleExerciseClick(exercise)}>
              {exercise}
            </p>
          ))
        ) : (
          <p className='text-slate-400 '>No exercises found.</p>
        )}
      </div>
    </section>
  );
};

export default ListExerciseTypes;
