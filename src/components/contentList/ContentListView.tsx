import { ContentsPagination } from '../ContentsPagination'

interface ContentListViewProps {
  layout: 'grid' | 'side'
  children: React.ReactNode
  paginationProps: {
    currentPage: number
    totalPage: number
    onPageChange: (page: number) => void
  }
}

const layoutStyles = {
  grid: 'grid grid-cols-1 gap-6 md:grid-cols-3',
  side: 'hidden flex-[2] space-y-4 laptop:block',
}

const paginationStyles = {
  grid: 'mt-6 flex justify-center w-full', // 그리드 모드용 스타일
  side: 'mt-6', // 사이드바 모드용 스타일
}

const containerStyles = {
  grid: '',
  side: 'hidden laptop:block',
}

const ContentListView = ({
  layout,
  children,
  paginationProps,
}: ContentListViewProps) => {
  return (
    <div className={containerStyles[layout]}>
      <section className={layoutStyles[layout]}>{children}</section>
      <div className={paginationStyles[layout]}>
        <ContentsPagination {...paginationProps} />
      </div>
    </div>
  )
}

export default ContentListView
