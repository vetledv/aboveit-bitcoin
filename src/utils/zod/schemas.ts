import {z} from 'zod'

export const bitcoinResponse = z.object({
  Response:z.string(),
  Message: z.string(),
  HasWarning: z.boolean(),
  // RateLimit: z.object({}),
  Data: z.object({
    Aggregated: z.boolean(),
    TimeFrom: z.number(),
    TimeTo: z.number(),
    Data: z.array(z.object({
      time: z.number(),
      high: z.number(),
      low: z.number(),
      open: z.number(),
      volumefrom: z.number(),
      volumeto: z.number(),
      close: z.number(),
      conversionType: z.string(), //z.literal("direct") 
      conversionSymbol: z.string()
    }))
  })
})