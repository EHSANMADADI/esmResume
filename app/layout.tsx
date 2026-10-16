import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'

// استفاده از فونت استاندارد فارسی
const vazir = Vazirmatn({ subsets: ['arabic'] })

export const metadata: Metadata = {
  title: 'احسان مددی | برنامه نویس وب',
  description: 'رزومه علی قادریان، دانشجوی دکترای علوم کامپیوتر و کارشناس هوش مصنوعی با تخصص در توسعه مدل‌های AI، یادگیری ماشین و الگوریتم‌های پردازش داده.',
  keywords: ['علی قادریان', 'هوش مصنوعی', 'یادگیری ماشین', 'برنامه نویس پایتون', 'رزومه', 'دانشمند داده'],
  authors: [{ name: 'Ali Ghaderian' }],
  openGraph: {
    title: 'احسان مددی | برنامه نویس وب',
    description: 'Full Stack Developer',
    type: 'website',
    locale: 'fa_IR',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.className} bg-neuBg text-neuText min-h-screen selection:bg-blue-300`}>
        {children}
      </body>
    </html>
  )
}