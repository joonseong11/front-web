'use client'

import EventsContent from '@/components/EventsContent'
import NewsContent from '@/components/NewsContent'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type HomeProps = {
  searchParams: {
    type: string
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('환경 뉴스')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 네비게이션 바 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="font-bold text-xl">
                  Relogging
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {/* <Link
                  href="/tab1"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Tab1
                </Link>
                <Link
                  href="/tab2"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Tab2
                </Link>
                <Link
                  href="/tab3"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Tab3
                </Link> */}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link
                href="/login"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Log-in
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* 헤더 섹션 */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center mb-4">Relogging</h1>
          <p className="text-center text-gray-600 mb-4">
            가까운 곳에서 열리는
            <br />
            플로깅 모임과 환경 뉴스를
            <br />
            실시간으로 만나보세요!
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 p-4 rounded">
                엑션버튼
              </div>
            ))}
          </div>
        </div>

        {/* 탭 섹션 */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex border-b border-gray-200 mb-4">
            <button 
              className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
                activeTab === '환경 뉴스' ? 'text-blue-500 border-b-2 font-medium border-blue-500' : ''
              }`}
              onClick={() => setActiveTab('환경 뉴스')}
            >
              환경 뉴스
            </button>
            <button 
              className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
                activeTab === '지자체 행사' ? 'text-blue-500 border-b-2 font-medium border-blue-500' : ''
              }`}
              onClick={() => setActiveTab('지자체 행사')}
            >
              지자체 행사
            </button>
          </div>

          {/* 뉴스 그리드 */}
          {activeTab === '환경 뉴스' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-2">
                      10월 {12 - i}일
                    </p>
                    <h3 className="font-semibold mb-2">
                      산림·토양 유형별 무척추동물 태풍 피해 큰 차이
                    </h3>
                    <p className="text-sm text-gray-600">
                      태풍(열대성 저기압)으로 인한 토양 무척추동물 피해 정도가
                      산림 유형과 토양종에 따라 달라질 수 있다는 연구결과가
                      나왔다. 토양 무척추동물은 산림 생...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['서울', '경기도', '강원도'].map((region) => (
                <div key={region} className="space-y-4">
                  <h2 className="font-bold text-lg">{region}</h2>
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="border rounded-lg overflow-hidden flex"
                    >
                      <div className="p-4 flex-grow">
                        <p className="text-sm text-gray-500 mb-1">
                          일회성 사업
                        </p>
                        <h3 className="font-semibold mb-2">
                          2024 제로웨이스트 플로깅 (양재천 줍깅)
                        </h3>
                        <p className="text-sm text-gray-600">
                          안산시 자원봉사 센터
                        </p>
                        <p className="text-sm text-gray-500">조회수 102</p>
                      </div>
                      <div className="w-1/3 bg-gray-200">
                        {/* 이미지 플레이스홀더 */}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
