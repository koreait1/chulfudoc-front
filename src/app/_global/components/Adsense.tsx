import Script from 'next/script'
import { FunctionComponent } from 'react'

export const GoogleAdSense: FunctionComponent = () => {
  // yarn dev 실행시 자동으로 develop로 설정 빌드 후 start로 실행시 production으로 자동 설정
  if (process.env.NODE_ENV !== 'production') {
    return null
    // 나는 광고 보기 싫음
  }
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GAPID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}