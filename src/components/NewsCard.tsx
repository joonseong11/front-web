import { NewsArticleCard } from '@/types/INews'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useNewsQueries } from '@/hooks/useNewsQueries'

const NewsCard = ({ article }: { article: NewsArticleCard }) => {
  const router = useRouter()
  const {
    // 이전 이벤트, 다음 이벤트
    navigate,
    // isNavigating,
  } = useNewsQueries({
    // currentPage,
    // pageSize,
    // articleId,
  })

  const onClickNewsDetail = (type: 'main' | 'side') => {
    if (type === 'side') {
      // mutation 실행
      navigate(
        {
          type: 'side',
          currentId: article.id,
        },
        {
          onSuccess: (article) => {
            router.push(`/news/${article.id}`)
          },
          onError: (error: Error) => {
            console.error('Navigation failed:', error)
            // 에러 처리
          },
        },
      )
    } else {
      router.push(`/news/${article.id}`)
    }
  }
  return (
    <Card
      onClick={() => onClickNewsDetail('side')}
      key={article.id}
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <CardHeader>
        <p className="text-sm text-gray-500">{article.publishedAt}</p>
        <CardTitle className="mb-2">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <CardDescription className="flex-[7] overflow-hidden">
          {article.aiSummary}
        </CardDescription>
        <div className="flex-[3] relative">
          <Image
            src={article.imagePath}
            alt={article.title}
            width={50}
            height={50}
            style={{ width: '100%', height: '100%' }}
            className="rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default NewsCard
