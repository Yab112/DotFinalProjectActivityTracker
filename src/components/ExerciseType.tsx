import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Dumbbell } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { Exercise } from "../../types/exercise"

interface ExerciseCardProps {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Card className="w-full bg-transparent text-white border-breen-100 border-1">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-emerald-400">
              {exercise.title}
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20">
                {exercise.category}
              </Badge>
              <Badge variant="secondary" className="bg-blue-400/10 text-blue-400 hover:bg-blue-400/20">
                {exercise.level}
              </Badge>
            </div>
          </div>
          <Dumbbell className="h-8 w-8 text-emerald-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">Equipment</h3>
            <p className="font-medium">{exercise.equipment}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">Force Type</h3>
            <p className="font-medium">{`${exercise.force} (${exercise.mechanic})`}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">Primary Muscles</h3>
            <p className="font-medium">{exercise.primaryMuscles.join(", ")}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">Secondary Muscles</h3>
            <p className="font-medium">{exercise.secondaryMuscles.join(", ")}</p>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="instructions" className="border-emerald-400/20">
            <AccordionTrigger className="text-lg font-semibold hover:text-emerald-400">
              Instructions
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-gray-300">
              {exercise.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                    {index + 1}
                  </div>
                  <p>{instruction}</p>
                </div>
              ))}
              {exercise.tips && exercise.tips.length > 0 && (
                <div className="mt-4 rounded-md bg-emerald-400/10 p-4">
                  <p className="text-sm font-medium text-emerald-400">Pro Tip</p>
                  {exercise.tips.map((tip, index) => (
                    <p key={index} className="mt-1 text-sm">{tip}</p>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

