import { EventContentCard } from '@/types/IEvent'
import { NewsArticleCard } from '@/types/INews'
import { EventCard } from '../ui/eventCard'
import NewsCard from '../NewsCard'

interface ContentCardProps {
  item: NewsArticleCard | EventContentCard
  type: 'news' | 'events'
}

const ContentCard = ({ item, type }: ContentCardProps) => {
  if (type === 'news') {
    return <NewsCard article={item as NewsArticleCard} />
  }
  return <EventCard eventData={item as EventContentCard} />
}

export default ContentCard
