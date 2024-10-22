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

const NewsCard = ({ article }: { article: NewsArticleCard }) => {
  const router = useRouter()

  const onClickNewsDetail = (id: string) => {
    router.push(`/news/${id}`)
  }
  return (
    <Card
      onClick={() => onClickNewsDetail(article.id)}
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
            style={{ width: '100px', height: '32px' }}
            className="rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default NewsCard
