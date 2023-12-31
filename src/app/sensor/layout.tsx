import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "../globals.css"
import SideNav from '@/components/dashboard/side-nav'
import MarginWidthWrapper from '@/components/dashboard/margin-width-wrapper'
import HeaderMobile from '@/components/dashboard/header-mobile'
import Header from '@/components/dashboard/header'
import PageWrapper from '@/components/dashboard/page-wrapper'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stasiun Geofisika Padang Panjang',
  description: 'Monitoring Website',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex'>
          <SideNav />
          <main className='flex-1'>
            <MarginWidthWrapper>
              <Header />
              <HeaderMobile />
              <PageWrapper>
                {children}
              </PageWrapper>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </MarginWidthWrapper>
          </main>
        </div>
      </body>
    </html>
  )
}
