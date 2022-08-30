import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const buildBaseQuery = (basePath = '') =>
   fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_API_BASE_URL}/${basePath}`,
   })
