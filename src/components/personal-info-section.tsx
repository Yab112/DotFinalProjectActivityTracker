import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export default function PersonalInfoSection() {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement update logic
    console.log('Updating personal info:', { name, email })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-cyan-500'>Personal Information</CardTitle>
        <CardDescription>Update your personal details here</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
          </div>
          <Button type="submit" className='bg-cyan-500 hover:bg-cyan-600 text-white'>Update Personal Info</Button>
        </form>
      </CardContent>
    </Card>
  )
}

