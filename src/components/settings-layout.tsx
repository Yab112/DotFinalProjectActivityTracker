import { Settings } from 'lucide-react'
import React, { ReactNode } from 'react'

interface SettingsLayoutProps {
  children: ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="container mx-auto px-40 py-8 ">
      <h1 className="text-3xl font-bold mb-6 ml-3 flex gap-2 justify-center items-center"><Settings className='h-12  w-12 text-cyan-700'/>Settings</h1>
      <div className="space-y-8">{children}</div>
    </div>
  )
}

