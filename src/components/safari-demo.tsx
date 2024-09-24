'use client'

import { useState } from 'react'

interface SafariProps {
  url: string;
  className?: string;
  src: string;
}

const Safari: React.FC<SafariProps> = ({ url, className, src }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`bg-gray-100 rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-1 bg-white rounded px-2 py-1 text-sm">{url}</div>
      </div>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        <img
          src="/images/image.png"
          alt="Website preview"
          className="w-full h-auto"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  )
}

export function SafariDemo() {
  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-video">
      <Safari
        url="appo.design"
        className="w-full h-full"
        src="/images/image.png"
      />
    </div>
  )
}