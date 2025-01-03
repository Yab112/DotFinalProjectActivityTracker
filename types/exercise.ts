export interface Exercise {
    title: string
    category: string
    equipment: string
    level: string
    force: string
    mechanic: string
    primaryMuscles: string[]
    secondaryMuscles: string[]
    instructions: string[]
    tips?: string[]
    images?: Array<{
      url: string
    }>
  }
  
  