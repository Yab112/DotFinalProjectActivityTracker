import React, { useState } from 'react'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export default function AppPreferencesSection() {
  const [darkMode, setDarkMode] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [defaultView, setDefaultView] = useState('grid')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement preferences update logic
    console.log('Updating preferences:', { darkMode, notificationsEnabled, defaultView })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>App Preferences</CardTitle>
        <CardDescription>Customize your book app experience</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode">Dark Mode</Label>
            <Switch
              id="darkMode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Enable Notifications</Label>
            <Switch
              id="notifications"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultView">Default Book View</Label>
            <Select value={defaultView} onValueChange={setDefaultView}>
              <SelectTrigger>
                <SelectValue placeholder="Select default view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="list">List</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className='bg-cyan-500 hover:bg-cyan-600 text-white'>Save Preferences</Button>
        </form>
      </CardContent>
    </Card>
  )
}

