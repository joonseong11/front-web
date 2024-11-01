'use client'

import HomeButton from '@/components/HomeButton'
import { DEFAULT_IMAGE } from '@/types/INews'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GptIcon from '@/assets/icon_gpt.svg'
import { useNewsQueries } from '@/hooks/useNewsQueries'
import { LoadingSkeleton } from '@/components/status/LoadingSkeleton'
import { EmptyState } from '@/components/status/EmptyStatus'
import { ErrorAlert } from '@/components/status/ErrorAlert'
import ContentList from '@/components/ContentList'

export default function NewsArticlePage() {
  const path = usePathname()
  const articleId = path.split('/').pop()
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 5 // 페이지 당 아이템 수

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage)
  }

  const {
    // 이벤트 디테일
    newsDetail,
    newsDetailError,
    newsDetailIsError,
    newsDetailIsLoading,

    //이벤트 페이지네이션
    newsList,
    newsListError,
    newsListIsError,
    newsListIsLoading,
    refetch,
    // 이전 이벤트, 다음 이벤트
    navigate,
    // isNavigating,
  } = useNewsQueries({
    currentPage,
    pageSize,
    articleId,
  })
  const onChangeEventDetail = (type: 'prev' | 'next') => {
    if (!newsDetail?.id) return

    navigate(
      { type, currentId: newsDetail.id },
      {
        onError: (error: Error) => {
          console.log('error', error)
          // toast({
          //   title: '이동 실패',
          //   description: '이벤트 데이터를 불러오는데 실패했습니다.',
          //   variant: 'destructive',
          // })
        },
      },
    )
  }

  // 뉴스 디테일
  if (newsDetailIsLoading) return <LoadingSkeleton />
  if (newsDetailIsLoading || !newsDetail || newsDetailIsError) {
    return (
      <ErrorAlert
        error={newsDetail?.message || '뉴스를 불러오는데 실패했습니다'}
        onRetry={refetch}
      />
    )
  }
  if (!newsDetail) {
    return (
      <EmptyState
        title="뉴스가 없습니다"
        description="현재 게시된 뉴스가 없습니다."
      />
    )
  }

  // 오른쪽 뉴스 사이드바
  if (newsListIsLoading) return <LoadingSkeleton />
  if (newsListError || !newsList || newsListIsError) {
    return (
      <ErrorAlert
        error={newsListError?.message || '데이터를 불러오는데 실패했습니다'}
        onRetry={refetch}
      />
    )
  }
  if (newsList.length === 0) {
    return (
      <EmptyState
        title="뉴스가 없습니다"
        description="현재 게시된 뉴스가 없습니다."
      />
    )
  }
  return (
    <article className="m-auto mt-16 flex max-h-[1355px] w-full max-w-7xl gap-6 bg-white p-5">
      <div className="flex w-full gap-6">
        {/* 왼쪽 섹션 (7/10) */}
        <section className="flex flex-[8] flex-col gap-10 md:col-span-6">
          {/* 상단 제목  */}
          <div className="flex w-full flex-col gap-10">
            <HomeButton />
            <header className="mb-6">
              {/* 뉴스 헤드라인 */}
              <h1 className="mb-2 text-2xl font-bold">{newsDetail?.title}</h1>
              {/* 뉴스 정보 */}
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-text">
                  {newsDetail?.author}
                </p>
                <p className="text-sm text-gray-500">
                  조회수 {newsDetail?.hits} {newsDetail?.publishedAt} 발행
                </p>
              </div>
            </header>
          </div>
          <div className="mb-2">
            <Image
              src={newsDetail?.imagePath ?? DEFAULT_IMAGE}
              alt="Article main image"
              width={200}
              height={200}
              className="h-auto w-full rounded-lg"
            />
            {/* 뉴스 썸네일 설명 */}
            <p className="mt-2 text-sm text-gray-500">
              {newsDetail?.imageCaption}
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-lg bg-background p-5">
            <div className="w-full rounded-lg">
              <div className="mb-6 flex items-center gap-3">
                <GptIcon />
                <div>
                  <p className="font-semibold">ChatGPT</p>
                  <p className="text-sm text-textLight">
                    <span className="text-green">AI</span>가 기사를 아래와 같이
                    <span className="text-green"> 요약</span>
                    했어요.
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <p>{newsDetail?.aiSummary}</p>
              </div>
              <div>
                <Button
                  asChild
                  className="w-full border bg-background text-textLight"
                >
                  <Link href={`${newsDetail?.source}`}>기사 전문 보기</Link>
                </Button>
              </div>
            </div>
          </div>
          {/* 하단 기사 버튼 */}
          <div className="flex items-center justify-between">
            <Button
              className="bg-solid"
              onClick={() => {
                onChangeEventDetail('prev')
              }}
            >
              이전 기사 보기
            </Button>
            <Button
              className="bg-solid"
              onClick={() => {
                onChangeEventDetail('next')
              }}
            >
              다음 기사 보기
            </Button>
          </div>
        </section>
        {/* 중앙 Divider */}
        <div className="hidden h-auto w-[1px] bg-gray-200 laptop:block" />
        {/* 오른쪽 사이드바 */}
        <ContentList
          contentData={newsList?.newsArticleSimpleResponseList}
          totalPage={newsList?.totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          cotentListIsLoading={newsListIsLoading}
          contentListIsError={newsListIsError}
          refetch={refetch}
          eventType={'news'}
          styleType={'side'}
        />
      </div>
    </article>
  )
}
