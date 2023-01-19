import { useQuery } from "@tanstack/react-query"
import { type NextPage } from "next"
import Head from "next/head"
import { BitcoinResData, bitcoinResponse } from "../utils/zod/schemas"
import { z } from "zod"
import React, { TableHTMLAttributes, useState, type ReactNode } from "react"
import { cn } from "../utils/cn"
import { ClassValue } from "clsx"

interface WithChildren {
  children: ReactNode | ReactNode[]
}
export type ValuesOf<T> = T[keyof T]
export type KeysOf<T> = keyof T

const API_URL =
  "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2"
const fetchData = async () => {
  const data = await fetch(API_URL)
  const query = bitcoinResponse.parse(await data.json()).Data
  // console.log(query.Data)
  return query
}

const useBitcoinQuery = ({
  callback,
}: {
  callback?: (length: number) => void
}) => {
  return useQuery({
    queryKey: ["data.all"],
    queryFn: fetchData,
    onSuccess: (data) => {
      callback && callback(data.Data.length)
    },
  })
}

interface DataTableProps<T extends object> {
  rowHeaders: Record<keyof T, string>
  data: T[]
}

const objectValuesToArray = <T extends object>(object: T) => {
  const objectKeys = Object.keys(object)
  return objectKeys.map((key) => object[key as keyof T])
}

const objectKeysToArray = <T extends object>(object: T) => {
  const objectKeys = Object.keys(object)
  return objectKeys.map((key) => key as keyof T)
}

// const objectKeysToArray = <T extends object>(object: T) => {
//   const
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const DataTable: React.FC<DataTableProps<T extends object>> = ({
//   data,
//   rowHeaders,
// }) => {
//   return (
//     <table>
//       <thead></thead>
//       <tbody>
//         {data.map((item, i) => (
//           <div key={i}>
//             {objectValuesToArray(item).map((itemOfItem) => (
//               <></>
//             ))}
//           </div>
//         ))}
//       </tbody>
//     </table>
//   )
// }

const PaginationButtons = ({
  page,
  pageLimit,
  totalLength,
  handleClick,
}: {
  page: number
  pageLimit: number
  totalLength: number
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  const totalPages = Math.ceil(totalLength / pageLimit)
  return (
    <div className='flex gap-2'>
      {new Array(totalPages).fill("").map((_, i) => (
        <button
          value={i}
          key={i}
          onClick={handleClick}
          className={`border border-slate-300 px-2 ${
            page === i ? "bg-slate-200" : "bg-white"
          }`}>
          {i + 1}
        </button>
      ))}
    </div>
  )
}

interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {}

const TableRow: React.FC<TableRowProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <tr
      className={cn(
        "grid grid-cols-7 odd:bg-slate-50 even:bg-slate-200 [&>*]:border-l [&>*]:border-slate-300 [&>*]:p-2 first:[&>*]:border-none",
        className,
      )} {...props}>
      {children}
    </tr>
  )
}

const Home: NextPage = () => {
  const query = useQuery({
    queryKey: ["data.all"],
    queryFn: fetchData,
  })

  const [page, setPage] = useState(0)
  const [pageLimit, setPageLimit] = useState(20)

  const SetPageActions = {
    increment: "increment",
    decrement: "decrement",
  } as const

  const handleSetPage = (action: ValuesOf<typeof SetPageActions>) => {
    setPage((prevState) => {
      if (action === SetPageActions.increment) {
        return prevState + 1
      } else if (action === SetPageActions.decrement) {
        return prevState - 1
      }
      return prevState
    })
  }

  const setOrdering = (key: KeysOf<BitcoinResData["Data"]["Data"]>) => {
    if (!query.data) return
    return query.data.Data.sort((a, b) => {
      
      console.log(a[key], b[key])
      if (a[key] > b[key]) {
        return 1
      } else if (a[key] < b[key]) {
        return -1
      }
      return 0

    })}

  if (query.isLoading) return <div>Loading..</div>
  if (query.isError) return <div>Error</div>
  return (
    <>
      <Head>
        <title>Aboveit bitcoin</title>
        <meta name='description' content='aboveit bitcoin interview' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* <nav className='flex border-b bg-white p-4'>
        <h1 className='text-4xl'>Bitcoin</h1>
      </nav> */}

      <main className='flex min-h-screen flex-col gap-4 bg-red-100 p-4'>
        {query.isLoading && <div>Loading..</div>}
        {query.data && (
          <>
            <div className='flex gap-2'>
              <button
                onClick={() => {
                  setPage((prevState) => {
                    if (prevState > 0) {
                      return prevState - 1
                    } else return prevState
                  })
                }}>
                BACK
              </button>
              <PaginationButtons
                page={page}
                pageLimit={pageLimit}
                totalLength={query.data.Data.length}
                handleClick={(e) => setPage(parseInt(e.currentTarget.value))}
              />
              <button onClick={() => handleSetPage("increment")}>NEXT</button>
            </div>

            <table className='flex flex-col overflow-hidden rounded-md bg-yellow-500'>
              <thead>
                <TableRow className='border-b table-fixed'>
                  <th>High</th>
                  <th>Low</th>
                  <th>Time</th>
                  <th>Close</th>
                  <th>Open</th>
                  <th>Volumefrom</th>
                  <th>Volumeto</th>
                </TableRow>
              </thead>

              <tbody>
                {query.data.Data.slice(
                  page * pageLimit,
                  page * pageLimit + pageLimit
                ).map((day) => {
                  const dayKeysArr = objectKeysToArray(day)
                  const filtered = dayKeysArr.filter(
                    (value) =>
                      value !== "conversionSymbol" && value !== "conversionType"
                  )
                  return (
                    <TableRow key={day.time}>
                      {filtered.map((asd, i) => {
                        return <td key={`${day[asd]}-${i}`}>{day[asd]}</td>
                      })}
                    </TableRow>
                  )
                })}
              </tbody>
            </table>
          </>
        )}
      </main>
    </>
  )
}

export default Home
