import { NewsArticleCard, NewsArticleSimpleResponse } from '@/types/INews'
import { NewsPagination } from './NewsPagination'
import { useEffect, useState } from 'react'
import NewsCard from './NewsCard'

export default function NewsListGrid() {
  const [initialNewsData, setInitialNewsData] =
    useState<NewsArticleSimpleResponse | null>(null)

  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 15 // 페이지 당 아이템 수

  const getData = async (page: number | null) => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsArticles/list?page=${page}&pageSize=${pageSize}`,
      {
        method: 'get',
      },
    ).then((res) => {
      return res.json()
    })
    console.log('data', data)
    return data
  }

  useEffect(() => {
    getData(0).then((result) => {
      setInitialNewsData(result)
    })
  }, [])

  const handlePageChange = async (newPage: number) => {
    const data = await getData(newPage)
    setInitialNewsData(data)
    setCurrentPage(newPage)
  }

  // TODO article List 컴포넌트 분리하기
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {initialNewsData?.newsArticleSimpleResponseList?.map(
          (article: NewsArticleCard) => (
            <NewsCard article={article} />
          ),
        )}
      </div>
      <div className="mt-6">
        <NewsPagination
          currentPage={currentPage}
          totalPage={initialNewsData?.totalPage ?? 0}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}
