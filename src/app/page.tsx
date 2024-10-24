'use client'

import EventListGrid from '@/components/EventListGrid'
import NewsListGrid from '@/components/NewsListGrid'
import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [activeTab, setActiveTab] = useState('환경 뉴스')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 네비게이션 바 */}
      <section className="w-dvw max-w-[1440px] margin-auto">
        <Image
          src="/logo.png"
          alt="로고 이미지"
          width="1000"
          height="1000"
          style={{ width: '100%', height: '100%' }}
        />
      </section>
      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto mt-16">
        {/* 헤더 섹션 */}
        {/* 탭 섹션 */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`text-gray-600 py-4 px-6 block hover:text-textLight focus:outline-none ${
                activeTab === '환경 뉴스'
                  ? 'text-blue-500 border-b-2 font-medium border-green'
                  : ''
              }`}
              onClick={() => setActiveTab('환경 뉴스')}
            >
              환경 뉴스
            </button>
            <button
              className={`text-gray-600 py-4 px-6 block hover:text-textLight focus:outline-none ${
                activeTab === '지자체 행사'
                  ? 'text-blue-500 border-b-2 font-medium border-green'
                  : ''
              }`}
              onClick={() => setActiveTab('지자체 행사')}
            >
              지자체 행사
            </button>
          </div>
          {/* 뉴스 그리드 */}
          {activeTab === '환경 뉴스' && <NewsListGrid />}
          {/* 지자체 행사 그리드 */}
          {activeTab === '지자체 행사' && <EventListGrid />}
          {/* )} */}
        </div>
      </main>
    </div>
  )
}
