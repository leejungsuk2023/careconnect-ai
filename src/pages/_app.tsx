import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import dynamic from 'next/dynamic';
import '../styles/globals.css';

// 채널톡을 클라이언트 사이드에서만 로드
const ChannelTalk = dynamic(() => import('../components/ChannelTalk'), {
  ssr: false,
});

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ChannelTalk />
    </SessionProvider>
  );
}