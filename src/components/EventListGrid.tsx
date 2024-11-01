import { EventCard } from './ui/\bEventCard'
import { useState } from 'react'
import { ContentsPagination } from './ContentsPagination'
import { EventContentCard } from '@/types/IEvent'
import { useEventsQueries } from '@/hooks/useEventsQueries'
import ContentList from './ContentList'

export default function EventListGrid() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 15 // 페이지 당 아이템 수

  const {
    eventsList,
    eventsListIsLoading,
    evnetListError,
    eventListIsError,
    refetch,
  } = useEventsQueries({ currentPage, pageSize })

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage)
  }

  // if (eventsListIsLoading) return <LoadingSkeleton />
  // if (evnetListError || !eventsList || eventListIsError) {
  //   return (
  //     <ErrorAlert
  //       error={evnetListError?.message || '데이터를 불러오는데 실패했습니다'}
  //       onRetry={refetch}
  //     />
  //   )
  // }
  // if (eventsList.content.length === 0) {
  //   return (
  //     <EmptyState
  //       title="이벤트가 없습니다"
  //       description="현재 진행 중인 이벤트가 없습니다."
  //     />
  //   )
  // }
  return (
    <>
      <ContentList
        contentData={eventsList?.content}
        eventType="events"
        styleType="grid"
        totalPage={eventsList?.totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        cotentList={eventsList?.content}
        cotentListIsLoading={eventsListIsLoading}
        contentListIsError={eventListIsError}
        contentListError={evnetListError}
        refetch={refetch}
      />
    </>
  )
}
