import { useState } from 'react'
import { useEventsQueries } from '@/hooks/useEventsQueries'
import ContentList from './ContentList'

export default function EventListGrid() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 15 // 페이지 당 아이템 수

  const { eventsList, eventsListIsLoading, eventListIsError } =
    useEventsQueries({ currentPage, pageSize })

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <>
      <ContentList
        contentData={eventsList?.content}
        totalPage={eventsList?.totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        cotentListIsLoading={eventsListIsLoading}
        contentListIsError={eventListIsError}
        eventType={'events'}
        styleType={'grid'}
      />
    </>
  )
}
