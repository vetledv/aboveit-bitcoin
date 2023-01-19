import { type NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { BitcoinTable } from '../components/bitcoin-table'
import { PageNavigateAction, Pagination } from '../components/pagination'
import { useBitcoinQuery } from '../utils/fetchers'

const Home: NextPage = () => {
  const query = useBitcoinQuery()
  const [page, setPage] = useState(0)
  const pageLimit = 20

  const handleSetPage = (action: PageNavigateAction, pages: number) => {
    setPage((prevState) => {
      if (action === 'increment') {
        //early return if last page
        if (prevState >= pages - 1) return prevState
        return prevState + 1
      }
      if (action === 'decrement') {
        //early return if first page
        if (prevState === 0) return prevState
        return prevState - 1
      }
      return prevState
    })
  }

  if (query.isLoading) return <div>Loading..</div>
  if (query.isError) return <div>Error</div>

  return (
    <>
      <Head>
        <title>Aboveit bitcoin</title>
        <meta name="description" content="aboveit bitcoin interview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col gap-4 p-4">
        {query.data && (
          <>
            <Pagination
              page={page}
              pageLimit={pageLimit}
              dataLength={query.data.Data.length}
              handleClickBackOrForward={(direction) => {
                const pages = Math.ceil(query.data.Data.length / pageLimit)
                handleSetPage(direction, pages)
              }}
              handleClickPageNumber={(newPage) => setPage(newPage)}
            />
            <BitcoinTable data={query.data} page={page} pageLimit={pageLimit} />
          </>
        )}
      </main>
    </>
  )
}

export default Home
