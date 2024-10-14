import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Re-logging',
  description: 'Re-logging',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="">
        <header>
          <Link href="/">Relogging</Link>
          <div>
            <ul>
              <li>
                <Link href="/Tab1"> Tab1</Link>
              </li>
              <li>
                <Link href="/Tab2"> Tab2</Link>
              </li>
              <li>
                <Link href="/Tab3"> Tab3</Link>
              </li>
            </ul>
          </div>
        </header>
        {children}
        <footer>푸터</footer>
      </body>
    </html>
  )
}
