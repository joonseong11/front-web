import type { Metadata } from 'next'
import '@/styles/globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Re-logging',
  description: 'Re-logging',
}

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="bg-white">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="font-bold text-xl">
                    Relogging
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8"></div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Link
                  href="/login"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  로그인
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
        {/* <footer>푸터</footer> */}
      </body>
    </html>
  )
}
