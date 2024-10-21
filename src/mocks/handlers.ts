import { faker } from '@faker-js/faker'
import { delay, http, HttpResponse } from 'msw'

export const handlers = [
  http.all('*', async () => {
    await delay(100)
  }),

  http.get('/api/newsArticles/list', ({ request }) => {
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
      imagePath: faker.image.url(),
    }))

    return HttpResponse.json({
      totalPage: totalPages,
      totalElements: totalElements,
      newsArticleSimpleResponseList: newsArticles,
    })
  }),
]

export const newsOject = {
  totalPages: 10,
  totalElements: 150,
  articles: [
    {
      id: '1',
      title: '환경 보호를 위한 새로운 정책 발표',
      aiSummary:
        '정부가 탄소 중립을 위한 새로운 정책을 발표했습니다. 이 정책은 재생 에너지 사용 확대와 전기차 보급 확대 등을 포함하고 있습니다.',
      publishedAt: '2024-10-20',
      imagePath: 'https://picsum.photos/id/10/400/300',
    },
    {
      id: '2',
      title: '해양 쓰레기 문제 해결을 위한 국제 협력 강화',
      aiSummary:
        '전 세계 국가들이 해양 쓰레기 문제 해결을 위한 새로운 협약을 체결했습니다. 이 협약은 플라스틱 사용 감소와 해양 정화 활동 강화 등을 주요 내용으로 하고 있습니다.',
      publishedAt: '2024-10-19',
      imagePath: 'https://picsum.photos/id/10/400/300',
    },
    {
      id: '3',
      title: '해양 쓰레기 문제 해결을 위한 국제 협력 강화',
      aiSummary:
        '전 세계 국가들이 해양 쓰레기 문제 해결을 위한 새로운 협약을 체결했습니다. 이 협약은 플라스틱 사용 감소와 해양 정화 활동 강화 등을 주요 내용으로 하고 있습니다.',
      publishedAt: '2024-10-19',
      imagePath: 'https://picsum.photos/id/10/400/300',
    },
    {
      id: '4',
      title: '해양 쓰레기 문제 해결을 위한 국제 협력 강화',
      aiSummary:
        '전 세계 국가들이 해양 쓰레기 문제 해결을 위한 새로운 협약을 체결했습니다. 이 협약은 플라스틱 사용 감소와 해양 정화 활동 강화 등을 주요 내용으로 하고 있습니다.',
      publishedAt: '2024-10-19',
      imagePath: 'https://picsum.photos/id/10/400/300',
    },
    {
      id: '5',
      title: '해양 쓰레기 문제 해결을 위한 국제 협력 강화',
      aiSummary:
        '전 세계 국가들이 해양 쓰레기 문제 해결을 위한 새로운 협약을 체결했습니다. 이 협약은 플라스틱 사용 감소와 해양 정화 활동 강화 등을 주요 내용으로 하고 있습니다.',
      publishedAt: '2024-10-19',
      imagePath: 'https://picsum.photos/id/10/400/300',
    },

    // 추가 뉴스 항목...
  ],
}
