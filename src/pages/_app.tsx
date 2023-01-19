import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  type DehydratedState,
} from '@tanstack/react-query'
import { type AppProps, type AppType } from 'next/app'
import { useState } from 'react'
import '../styles/globals.css'

const MyApp: AppType = ({
  Component,
  pageProps,
}: AppProps<{ dehydratedState?: DehydratedState }>) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      {/* <ReactQueryDevtools/> */}
    </QueryClientProvider>
  )
}

export default MyApp
