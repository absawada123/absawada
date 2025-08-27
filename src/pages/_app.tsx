// src/pages/_app.tsx
import '@/styles/globals.css';
import '@/styles/animations.css';
import type { AppProps } from 'next/app';
import Cursor from '@/components/Cursor';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Cursor />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;