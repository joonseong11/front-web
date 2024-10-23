'use client'

import HomeButton from '@/components/HomeButton'
import {
  NewsArticle,
  NewsArticleCard,
  NewsArticleSimpleResponse,
} from '@/types/INews'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import NewsCard from '@/components/NewsCard'
import { NewsPagination } from '@/components/NewsPagination'
import GptIcon from '@/assets/icon_gpt.svg'

export default function NewsArticlePage() {
  const path = usePathname()
  const articleId = path.split('/').pop()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [initialNewsData, setInitialNewsData] =
    useState<NewsArticleSimpleResponse | null>(null)
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 5 // 페이지 당 아이템 수

  async function fetchNewsArticle(
    type: 'next' | 'prev',
    articleId: string,
  ): Promise<NewsArticle> {
    const response = await fetch(`/api/newsArticles/${articleId}/${type}`)
    const articleData = await response.json()
    setArticle(articleData)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  }
  const handlePageChange = async (newPage: number) => {
    const data = await getData(newPage)
    setInitialNewsData(data)
    setCurrentPage(newPage)
  }

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
  const getArticleData = async (articleId: string) => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsArticles/${articleId}`,
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
    if (articleId) {
      getArticleData(articleId).then((result) => {
        setArticle(result)
      })
    }
    getData(0).then((result) => {
      setInitialNewsData(result)
    })
  }, [])

  // TODO article List 컴포넌트 분리하기
  return (
    <article className="flex m-auto max-h-[1355px] w-full  gap-6 max-w-7xl bg-white mt-16">
      <div className="mx-auto h-full flex flex-col gap-4">
        <div className="w-3/5">
          <HomeButton />
          <header className="mb-6">
            {/* 뉴스 헤드라인 */}
            <h1 className="text-2xl font-bold mb-2">{article?.title}</h1>
            {/* 뉴스 정보 */}
            <div className="flex justify-between">
              <p className="text-sm text-text font-semibold">
                {article?.source}
              </p>
              <p className="text-sm text-gray-500">
                조회수 {article?.hits} {article?.publishedAt} 발행
              </p>
            </div>
          </header>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
            {/* 왼쪽 섹션 (7/10) */}
            <section className="md:col-span-6">
              <div className="relative mb-2">
                <Image
                  src="https://picsum.photos/200/200"
                  alt="Article main image"
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-4 right-4 bg-red-500 text-white rounded-full p-2"></div>
              </div>
              {/* 뉴스 썸네일 설명 */}
              <p className="mb-10 text-sm text-gray-500">
                {article?.imageCaption}
              </p>
              <div className="flex flex-col bg-background p-5 gap-4 rounded-lg">
                <div className="rounded-lg w-full">
                  <div className="flex items-center mb-6 gap-3">
                    <GptIcon />
                    <div>
                      <p className="font-semibold">ChatGPT</p>
                      <p className="text-sm text-textLight">
                        <span className="text-green">AI</span>가 기사를 아래와
                        같이
                        <span className="text-green"> 요약</span>
                        했어요.
                      </p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <p>{article?.aiSummary}</p>
                  </div>
                  <div>
                    <Button
                      asChild
                      className="w-full bg-background text-textLight border"
                    >
                      <Link href={`/news/${article?.source}`}>
                        기사 전문 보기
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              {/* 하단 기사 버튼 */}
              <div className="flex justify-between items-center mt-10">
                <Button
                  className="bg-solid"
                  onClick={() => {
                    if (articleId) {
                      fetchNewsArticle('prev', articleId)
                    }
                  }}
                >
                  이전 기사 보기
                </Button>

                <Button
                  className="bg-solid"
                  onClick={() => {
                    if (articleId) {
                      fetchNewsArticle('next', articleId)
                    }
                  }}
                >
                  다음 기사 보기
                </Button>
              </div>
            </section>
            <div className="hidden md:flex md:col-span-1 justify-center">
              <div className="w-[1px] h-full bg-gray-200"></div>
            </div>

            <section className="md:col-span-3 space-y-4 mb-6">
              {initialNewsData?.newsArticleSimpleResponseList?.map(
                (article: NewsArticleCard) => (
                  <NewsCard article={article} />
                ),
              )}
              <div className="mt-6">
                <NewsPagination
                  currentPage={currentPage}
                  totalPage={initialNewsData?.totalPage ?? 0}
                  onPageChange={handlePageChange}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  )
}
