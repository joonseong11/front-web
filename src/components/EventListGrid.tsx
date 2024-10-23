import { EventCard } from './ui/\bEventCard'
import { useEffect, useState } from 'react'
import { NewsPagination } from './NewsPagination'
import { EventContentCard } from '@/types/IEvent'

export interface Pageable {
  page: number
  size: string
  sort?: string[]
}

export default function EventListGrid() {
  const [initialEventData, setInitialEventData] = useState<any | null>(null)
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 15 // 페이지 당 아이템 수

  const getData = async ({ page, size }: Pageable) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size,
      sort: 'createdAt', // 정렬 기준, 쉼표로 구분
    })

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingEvent/list?${queryParams}`,
    )
    return response.json()
  }

  useEffect(() => {
    getData({ page: 0, size: pageSize.toString() }).then((result) => {
      setInitialEventData(result)
    })
  }, [])

  const handlePageChange = async (newPage: number) => {
    const data = await getData({ page: newPage, size: pageSize.toString() })
    setInitialEventData(data)
    setCurrentPage(newPage)
  }

  console.log('initialEventData', initialEventData)
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {initialEventData?.content?.map((eventData: EventContentCard) => (
          <EventCard eventData={eventData} />
        ))}
      </div>
      <div className="mt-6">
        <NewsPagination
          currentPage={currentPage}
          totalPage={initialEventData?.totalPages ?? 0}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}
