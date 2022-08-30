import { configureStore } from '@reduxjs/toolkit'
import { imageApi, userApi } from './apis'

const store = configureStore({
   reducer: {
      [userApi.reducerPath]: userApi.reducer,
      [imageApi.reducerPath]: imageApi.reducer,
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat([userApi.middleware, imageApi.middleware]),
})

export default store
