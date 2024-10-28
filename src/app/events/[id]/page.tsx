'use client'

import HomeButton from '@/components/HomeButton'
import { ContentsPagination } from '@/components/ContentsPagination'
import { EventCard } from '@/components/ui/\bEventCard'
import { Button } from '@/components/ui/button'
import { EventContentCard } from '@/types/IEvent'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useEventsQueries } from '@/hooks/useEventsQueries'
import LabeledContent from '@/components/LabeledContent'

export default function EventDetailPage() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정

  const pageSize = 6 // 페이지 당 아이템 수
  const path = usePathname()
  const eventId = path.split('/').pop()

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage)
  }

  const {
    // 이벤트 디테일
    eventDetail,
    eventDetailIsError,
    eventDetailIsLoading,

    //이벤트 페이지네이션
    eventsList,
    eventListIsError,
    eventsListIsLoading,

    // 이전 이벤트, 다음 이벤트
    navigate,
  } = useEventsQueries({
    currentPage,
    pageSize,
    eventId,
  })
  if (eventDetailIsLoading) return <div>loading ... </div>
  if (eventDetailIsError) return <div>Error: {eventDetailIsError}</div>

  const onChangeEventDetail = (type: 'prev' | 'next') => {
    if (!eventDetail?.id) return

    navigate(
      { type, currentId: eventDetail.id },
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
  return (
    <div className="flex flex-col gap-10 p-5">
      <HomeButton />
      {/* 이벤트 상단 제목 */}
      <div className="flex flex-col w-full laptop:w-2/3 text-sm text-gray-500 mb-4  gap-1 justify-between ">
        <div className="flex gap-1 w-2/3">
          <span className="text-1l text-orange mb-4">
            {eventDetail?.region}
          </span>
          <span className="text-1l text-gray-400 mb-4">일회성</span>
          <span className="text-1l text-gray-400 mb-4">봉사시간 부여</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{eventDetail?.title}</h1>
        <div className="flex justify-between">
          <div className="flex">
            <MapPin className="w-4 h-4" />
            <p>양재도서관</p>
          </div>
          <div>
            <p>조회수 {eventDetail?.hits}</p>
          </div>
        </div>
      </div>
      {/* // 이벤트 이미지 밎 상세 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
        {/* 왼쪽 사이드바 */}
        <section className="flex flex-col gap-10 md:col-span-6">
          {/* <div></div> */}
          {/* 이벤트 이미지 */}
          <div>
            <Image
              src="https://picsum.photos/200/200"
              alt="Plogging eventDetail main image"
              width={100}
              height={100}
              className="w-full h-auto rounded-lg "
            />
          </div>
          {/* 이벤트 상세 정보 */}
          <div className="bg-background p-6 rounded-lg">
            {/* 상세 내용 제외 */}
            <div className="rounded-lg mb-4 grid grid-cols-1 laptop:grid-cols-2 gap-4 text-sm">
              <LabeledContent
                label="참여기간"
                content={`${eventDetail.startDate} - ${eventDetail.endDate}`}
              />
              <LabeledContent
                label="참여대상"
                content={`${eventDetail?.participationTarget}`}
              />
              <LabeledContent
                label="참여장소"
                content={eventDetail?.location ?? '-'}
              />
              <LabeledContent
                label="지원내용"
                content={eventDetail?.participationTarget ?? '-'}
              />
              <LabeledContent label="봉사점수" content="0.5시간" />
              <LabeledContent
                label="참여방법"
                content="양재천 ~ 양재천 일대를 걸으며 쓰레기(플로깅)"
              />
              <LabeledContent
                label="담당자명"
                content={eventDetail?.organizerName ?? '-'}
              />
              <LabeledContent
                label="전화번호"
                content={eventDetail?.phoneNumber ?? '-'}
              />
              <LabeledContent
                label="전화번호"
                content={eventDetail?.phoneNumber ?? '-'}
              />
            </div>
            <div className="prose max-w-none text-sm">
              <span className="bg-green whitespace-nowrap p-1 border border-green- text-white font-semibold rounded-md">
                상세내용
              </span>
              <p className="mt-4">{eventDetail?.content ?? '-'}</p>
            </div>
            <button className="flex w-3/5 laptop:w-2/5 p-3 justify-center margin-auto text-white bg-green rounded-md mt-4">
              참여하기
            </button>
          </div>
          <div className="flex justify-between items-center">
            <Button
              className="bg-solid"
              onClick={() => {
                onChangeEventDetail('prev')
              }}
            >
              이전 이벤트 보기
            </Button>
            <Button
              className="bg-solid"
              onClick={() => {
                onChangeEventDetail('next')
              }}
            >
              다음 이벤트 보기
            </Button>
          </div>
        </section>
        {/* 중앙 Divider (1) */}
        <div className="hidden md:flex md:col-span-1 justify-center">
          <div className="w-[1px] h-full bg-gray-200"></div>
        </div>

        {/* 오른쪽 사이드바 */}
        <section className="hidden tablet:grid laptop:grid md:col-span-3 space-y-4 mb-6">
          {eventsListIsLoading && <div>sideData...</div>}
          {eventListIsError && <div>Error: {eventListIsError}</div>}
          {eventsList?.content?.map((eventData: EventContentCard) => (
            <EventCard eventData={eventData} key={eventData.id} />
          ))}
          <div className="mt-6">
            <ContentsPagination
              currentPage={currentPage}
              totalPage={eventsList?.totalPages ?? 0}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
