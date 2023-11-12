import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'NS Assessment',
  description: 'Search GitHub repositories',
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <html lang="en" className="max-w-[1000px] m-auto">
      <link rel="icon" href="/favicon.ico" />
      <body className="flex flex-col p-10 ">
      <header>
        {/* Voor een compact design heb ik gekozen om 2 tabjes te maken als pagina's*/}
        <nav className="flex focus:outline-2 outline-solid">
          <ul className="flex mb-3 rounded overflow-hidden">
            <Link className="bg-blue-300 p-2 px-5 focus:bg-blue-500 focus:z-index-2 hover:bg-blue-800 hover:text-white" href={"search"} id="searchButton">Search</Link>
            <Link className="bg-blue-300 p-2 px-5 focus:bg-blue-500 focus:z-index-2 hover:bg-blue-800 hover:text-white"  href={"history"} id="historyButton">History</Link>
          </ul>
        </nav>
      </header>
        <main className="flex w-full">
          {children}
        </main>
      </body>
    </html>
  )
}
