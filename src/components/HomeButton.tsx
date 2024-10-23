'use client'

import { useRouter } from 'next/navigation'
import Home from '@/assets/icon_home.svg'
const HomeButton = () => {
  const router = useRouter()
  return (
    <button
      className="bg-background p-4 rounded-md mb-6"
      onClick={() => router.push('/')}
    >
      <Home className="color-white" />
    </button>
  )
}

export default HomeButton
