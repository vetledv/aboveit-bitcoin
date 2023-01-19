import type { TableHTMLAttributes } from 'react'
import { cn } from '../utils/tailwind/cn'

const borderColor = 'border-slate-500'

export const TableBase = ({
  children,
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) => {
  return (
    <table
      className={cn(
        'border-collapse overflow-hidden border',
        borderColor,
        className
      )}
      {...props}>
      {children}
    </table>
  )
}

export const TableHead = ({
  children,
  className,
  ...props
}: TableHTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <thead className={cn(className)} {...props}>
      <TableRow>{children}</TableRow>
    </thead>
  )
}

export const TableRow = ({
  children,
  className,
  ...props
}: TableHTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr
      className={cn(
        'odd:bg-slate-50 even:bg-slate-200 hover:bg-slate-400',
        className
      )}
      {...props}>
      {children}
    </tr>
  )
}

export const TableHeaderCell = ({
  children,
  className,
  ...props
}: TableHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th
      className={cn('border bg-white p-2 text-left', borderColor, className)}
      {...props}>
      {children}
    </th>
  )
}

export const TableDataCell = ({
  children,
  className,
  ...props
}: TableHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td className={cn('border p-2', borderColor, className)} {...props}>
      {children}
    </td>
  )
}
