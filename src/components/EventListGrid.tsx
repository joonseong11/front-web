import { useRouter } from 'next/navigation'

export default function EventListGrid() {
  const router = useRouter()
  const toEventDetail = (id: string) => {
    router.push(`/events/${id}`)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="border rounded-lg overflow-hidden flex cursor-pointer"
          onClick={() => {
            toEventDetail(i.toString())
          }}
        >
          <div className="p-4 flex-grow">
            <p>서울</p>
            <p className="text-sm text-gray-500 mb-1">일회성 사업</p>
            <h3 className="font-semibold mb-2">
              2024 제로웨이스트 플로깅 (양재천 줍깅)
            </h3>
            <p className="text-sm text-gray-600">안산시 자원봉사 센터</p>
            <p className="text-sm text-gray-500">조회수 102</p>
          </div>
          <div className="w-1/3 bg-gray-200">{/* 이미지 플레이스홀더 */}</div>
        </div>
      ))}
    </div>
  )
}
