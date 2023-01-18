import { type AppType, type AppProps } from "next/app";
import {
  type DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "../styles/globals.css";
import { useState } from "react";

interface CustomAppProps {
  dehydratedState?: DehydratedState
}

const MyApp: AppType = ({ Component, pageProps }:AppProps<CustomAppProps>) => {
  const [queryClient] = useState(()=> new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      }<Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
};

export default MyApp;
