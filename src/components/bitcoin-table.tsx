import { objectKeysToArray, unixToDate } from '../utils/helpers'
import { BitcoinResData } from '../utils/zod/schemas'
import {
  TableBase,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from './table'

export const BitcoinTable = ({
  data,
  page,
  pageLimit,
}: {
  data: BitcoinResData['Data']
  page: number
  pageLimit: number
}) => {
  const pageOffset = page * pageLimit
  //offset data by page, limit by pageLimit
  const dataByPage = data.Data.slice(pageOffset, pageOffset + pageLimit)
  const unwantedKeys = ['conversionSymbol', 'conversionType']
  //gets all the keys in the object and filter unwanted keys
  const filteredKeys = objectKeysToArray(data.Data[0]!).filter((value) => {
    return !unwantedKeys.includes(value)
  })

  return (
    <TableBase>
      <TableHead>
        {filteredKeys.map((key) => (
          <TableHeaderCell key={key} onClick={() => {}}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </TableHeaderCell>
        ))}
      </TableHead>

      <tbody>
        {dataByPage.map((day) => (
          <TableRow key={day.time}>
            {filteredKeys.map((key, i) => {
              const time = key === 'time' && unixToDate(day[key])
              return (
                <TableDataCell key={i}>
                  {time ? time.toLocaleDateString() : day[key]}
                </TableDataCell>
              )
            })}
          </TableRow>
        ))}
      </tbody>
    </TableBase>
  )
}
