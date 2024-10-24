import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface INewsQueries {
  currentPage?: number
  pageSize?: number
  articleId?: string
}

async function fetchNewsArticle(articleId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsArticles/${articleId}}`,
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const fetchNewsLists = async (page: number, pageSize: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsArticles/list?page=${page}&pageSize=${pageSize}`,
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const useNewsQueries = ({
  currentPage,
  pageSize,
  articleId,
}: INewsQueries) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const newsListQuery = useQuery({
    queryKey: ['newsArticles', currentPage, pageSize],
    queryFn: () => fetchNewsLists(currentPage ?? 0, pageSize ?? 15),
  })

  const newsDetailQuery = useQuery({
    queryKey: ['newsDetail', currentPage, pageSize],
    queryFn: () => fetchNewsArticle(articleId?.toString() ?? ''),
  })

  // 이전/다음 이벤트 네비게이션
  const navigationMutation = useMutation({
    mutationFn: async ({
      type,
      currentId,
    }: {
      type: 'prev' | 'next'
      currentId: string
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingEvent/${currentId}/${type}`,
      )

      if (!response.ok) throw new Error(`Failed to fetch ${type} event`)

      const nextEvent = await response.json()
      // 응답에서 받은 이벤트 데이터를 바로 캐시에 저장
      queryClient.setQueryData(['eventDetail', nextEvent.id], nextEvent)

      return nextEvent
    },
    onSuccess: (newEvent) => {
      // URL 업데이트
      router.push(`/events/${newEvent.id}`)
    },
  })
  return {
    // 뉴스 리스트
    newsList: newsListQuery.data,
    newsListIsLoading: newsListQuery.isLoading,
    newsListIsError: newsListQuery.isError,
    newsListError: newsListQuery.error,

    // 뉴스 디테일
    newsDetail: newsDetailQuery.data,
    newsDetailIsLoading: newsDetailQuery.isLoading,
    newsDetailIsError: newsDetailQuery.isError,
    newsDetailError: newsDetailQuery.error,

    // 이전/다음 이벤트 네비게이션
    navigate: navigationMutation.mutate,
    isNavigating: navigationMutation.isPending,
  }
}
