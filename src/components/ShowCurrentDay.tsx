import React from 'react'
import { format } from 'date-fns'
import { FaCalendarAlt } from 'react-icons/fa' // Calendar icon

type Props = {}

const ShowCurrentDay = (props: Props) => {
  // Get the current date and format it as 'eeee, MMMM dd, yyyy'
  const currentDay = format(new Date(), 'eeee, MMMM dd, yyyy')

  return (
    <div className='flex flex-col items-center justify-center gap-4 border border-cyan-500 rounded-lg p-6 mt-6 bg-gradient-to-r from-green-900 to-teal-800 shadow-lg w-[450px]'>
      {/* Icon and Title */}
      <div className='flex items-center gap-2'>
        <FaCalendarAlt size={40} className='text-slate-200 animate-pulse' />
        <p className='text-4xl font-bold text-white'>Today is</p>
      </div>
      {/* Current Day */}
      <p className='text-2xl font-semibold text-white'>{currentDay}</p>
      {/* Friendly Message */}
      <p className='text-lg text-slate-100 italic'>What do you want to do today, Mr. Muscle?</p>
    </div>
  )
}

export default ShowCurrentDay
