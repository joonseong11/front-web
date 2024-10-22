import { faker } from '@faker-js/faker'
import { delay, http, HttpResponse } from 'msw'

// 단일 뉴스 아티클 생성 함수
const createNewsArticle = () => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  title: faker.lorem.sentence({ min: 5, max: 10 }),
  content: faker.lorem.paragraphs(3),
  aiSummary: faker.lorem.paragraphs(2),
  source: faker.company.name(),
  author: faker.person.fullName(),
  publishedAt: faker.date.recent({ days: 30 }).toISOString(),
  hits: faker.number.int({ min: 100, max: 10000 }),
  imageCaption: faker.lorem.sentence(),
  imagePath: faker.image.url({ width: 640, height: 480, category: 'nature' }),
})

export const handlers = [
  http.all('*', async () => {
    await delay(100)
  }),

  http.get('/api/newsArticles/list', ({ request }) => {
    console.log('request', request)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '0')
    const pageSize = parseInt(url.searchParams.get('pageSize') || '9')

    // 페이지네이션 로직 구현
    const totalElements = 100 // 전체 아이템 수
    const totalPages = Math.ceil(totalElements / pageSize)

    const start = page * pageSize
    const end = Math.min(start + pageSize, totalElements)

    const newsArticles = Array.from({ length: end - start }, () => ({
      id: faker.number.int({ min: 1, max: 1000 }),
      title: faker.lorem.sentence(),
      aiSummary: faker.lorem.paragraph(),
      publishedAt: faker.date.recent().toISOString().split('T')[0],
      imagePath: 'https://picsum.photos/id/10/400/300',
    }))

    return HttpResponse.json({
      totalPage: totalPages,
      totalElements: totalElements,
      newsArticleSimpleResponseList: newsArticles,
    })
  }),

  http.get('/api/newsArticles/:id', ({ params }) => {
    const article = createNewsArticle()
    article.id = parseInt(params.id as string)

    return HttpResponse.json(article)
  }),

  http.get('/api/newsArticles/:id/next', ({ params }) => {
    const article = createNewsArticle()
    article.id = parseInt(params.id as string)

    return HttpResponse.json(article)
  }),

  http.get('/api/newsArticles/:id/prev', ({ params }) => {
    const article = createNewsArticle()
    article.id = parseInt(params.id as string)

    return HttpResponse.json(article)
  }),
]
