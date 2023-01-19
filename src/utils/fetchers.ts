import { useQuery } from '@tanstack/react-query'
import { bitcoinResponse } from './zod/schemas'

const API_URL =
  'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2'

const fetchData = async () => {
  const data = await fetch(API_URL)
  const res = await data.json()
  const query = bitcoinResponse.parse(res)
  return query.Data
}

export const useBitcoinQuery = () => {
  return useQuery({
    queryKey: ['data.all'],
    queryFn: fetchData,
  })
}
