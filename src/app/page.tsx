'use client'

import EventsContent from '@/components/EventsContent'
import NewsContent from '@/components/NewsContent'
import { useRouter } from 'next/navigation'

type HomeProps = {
  searchParams: {
    type: string
  }
}

export default function Home({ searchParams }: HomeProps) {
  const router = useRouter()
  const contentsType = searchParams.type || 'news'
  const handleClick = (type: string) => {
    router.push(`/?type=${type}`)
  }

  return (
    <div className="">
      <div>
        <button role="tab" onClick={() => handleClick('news')}>
          환경 뉴스
        </button>
        <button role="tab" onClick={() => handleClick('events')}>
          지자체 행사
        </button>
      </div>
      <div>{(contentsType === 'news' || '') && <NewsContent />}</div>
      <div>{contentsType === 'events' && <EventsContent />}</div>
    </div>
  )
}
