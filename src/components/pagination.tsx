import { type ButtonHTMLAttributes } from 'react'
import { cn } from '../utils/tailwind/cn'

export type PageNavigateAction = 'increment' | 'decrement'

interface PaginationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  page: number
  pageLimit: number
  dataLength: number
}

const ForwardOrBackButton = ({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn('border border-slate-300 px-4', className)}
      {...props}>
      {children}
    </button>
  )
}

const PaginationNumberButtons = ({
  page,
  pageLimit,
  dataLength,
  ...props
}: PaginationButtonProps) => {
  const totalPages = Math.ceil(dataLength / pageLimit)

  return (
    <div className="flex gap-[1px] bg-slate-300 p-[1px]">
      {new Array(totalPages).fill('').map((_, i) => (
        <button
          key={i}
          value={i}
          className={cn(
            'border-slate-300 bg-white px-4 py-1 text-blue-500 ',
            page === i ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
          )}
          {...props}>
          {i + 1}
        </button>
      ))}
    </div>
  )
}

export const Pagination = ({
  page,
  pageLimit,
  dataLength,
  handleClickBackOrForward,
  handleClickPageNumber,
}: {
  page: number
  pageLimit: number
  dataLength: number
  handleClickBackOrForward: (direction: PageNavigateAction) => void
  handleClickPageNumber: (page: number) => void
}) => {
  const amountOfPages = Math.ceil(dataLength / pageLimit) - 1

  return (
    <div className="flex">
      <ForwardOrBackButton
        className={cn(
          'rounded-l-md border-r-0',
          page === 0 && 'bg-slate-300 text-slate-500'
        )}
        disabled={page === 0}
        onClick={() => handleClickBackOrForward('decrement')}>
        BACK
      </ForwardOrBackButton>
      <PaginationNumberButtons
        page={page}
        pageLimit={pageLimit}
        dataLength={dataLength}
        onClick={(e) => handleClickPageNumber(parseInt(e.currentTarget.value))}
      />
      <ForwardOrBackButton
        className={cn(
          'rounded-r-md border-l-0',
          page === amountOfPages && 'bg-slate-300 text-slate-500'
        )}
        disabled={page === amountOfPages}
        onClick={() => handleClickBackOrForward('increment')}>
        NEXT
      </ForwardOrBackButton>
    </div>
  )
}
