import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { ConvertDialog } from '@/components/ConvertDialog';
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Youtube to Text</title>
        <meta
          name="description"
          content="Introducing our free tag website tool! With this user-friendly tool, you can easily extract subtitle text from a variety of sources such as YouTube videos, TED Talks, video interviews, educational classes, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <ConvertDialog />
        </div>

        <div className="py-8 w-full flex items-center justify-center space-x-6">
          <div className="opacity-75 transition hover:opacity-100 cursor-pointer">
            <Link href="https://nextjs.org" className="flex items-center justify-center">
              <p className="text-base mr-2">Built by</p>
                <Image src={'/next.svg'} width="60" height="60" alt="Supabase logo" style={{filter:'invert(1)'}}/>
            </Link>
          </div>
        </div>
        <div className="opacity-75 transition hover:opacity-100 cursor-pointer text-sm text-center">
              Introducing our free tag website tool! With this user-friendly tool, you can easily extract subtitle text from a variety of sources such as YouTube videos, TED Talks, video interviews, educational classes, and more.
        </div>
      </main>

      <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-Q9RYQHJT1P" 
          strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Q9RYQHJT1P');
        `}
      </Script>
    </>
  )
}
