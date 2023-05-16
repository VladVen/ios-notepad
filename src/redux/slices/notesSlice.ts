import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { INote } from '../../types/note.interface'

// Define a service using a base URL and expected endpoints
export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://646335047a9eead6fadff0e0.mockapi.io/notes' }),
  endpoints: (builder) => ({
    getAllNotes: builder.query<INote[], void>({
      query: () => ({
        url: '/',
        transformResponse: (response: { data: INote[] }) => response.data,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllNotesQuery } = notesApi