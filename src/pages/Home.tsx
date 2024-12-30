import React from 'react'
import Header from '../components/Header'
import Hero from '../components/HeroSection'
import ExerciseList from '../components/ExerciseList'
import Footer from '../components/Footer'
import { Toaster } from "../components/ui/toaster"

const App: React.FC = () => {
  return (
    <div className="min-h-screen h-auto flex flex-col justify-between bg-black text-gray-900">
      <Header />
      <Hero />
      <ExerciseList />
      <Footer />
      <Toaster />
    </div>
  )
}

export default App

