'use client'

import { useRouter } from 'next/navigation'
import HomeIcon from '@/assets/icon_home.svg'

const HomeButton = () => {
  const router = useRouter()

  return (
    <button
      className="
        cursor-pointer
        bg-background 
        p-2
        rounded-md 
        mb-6 
        border-none 
        outline-none
        focus:outline-none  // 포커스 시에도 테두리 제거
        hover:bg-gray-100
        transition-all
       
      "
      onClick={() => router.push('/')}
    >
      <HomeIcon />
    </button>
  )
}

export default HomeButton
