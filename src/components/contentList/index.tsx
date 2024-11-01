'use client'

import { useState } from 'react'
import { ErrorAlert } from '../status/ErrorAlert'
import { LoadingSkeleton } from '../status/LoadingSkeleton'
import { EmptyState } from '../status/EmptyStatus'
import ContentCard from './ContentCard'
import ContentListView from './ContentListView'
import { useContentList } from '@/hooks/useContentList'

interface ContentListProps {
  type: 'news' | 'events'
  layout: 'grid' | 'side'
  pageSize?: number
}

const ContentList = ({ type, layout, pageSize = 6 }: ContentListProps) => {
  const [currentPage, setCurrentPage] = useState(0)

  const {
    data: contents,
    isLoading,
    isError,
    error,
    totalPages,
    refetch,
  } = useContentList({
    contentType: type,
    currentPage,
    pageSize,
  })

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  if (isLoading) return <LoadingSkeleton />

  if (isError) {
    return (
      <ErrorAlert
        error={error?.message || '데이터를 불러오는데 실패했습니다'}
        onRetry={refetch}
      />
    )
  }

  if (!contents || contents.length === 0) {
    return (
      <EmptyState
        title={`${type === 'news' ? '뉴스' : '이벤트'}가 없습니다`}
        description={`표시할 ${type === 'news' ? '뉴스' : '이벤트'}가 없습니다.`}
      />
    )
  }

  return (
    <ContentListView
      layout={layout}
      paginationProps={{
        currentPage,
        totalPage: totalPages,
        onPageChange: handlePageChange,
      }}
    >
      {contents.map((item: any) => (
        <ContentCard key={item.id} item={item} type={type} />
      ))}
    </ContentListView>
  )
}

export default ContentList
