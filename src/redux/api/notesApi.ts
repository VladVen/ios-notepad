/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INote } from "../../types/note.interface";

export const notesApi = createApi({
  reducerPath: "notesApi",
  tagTypes: ["Notes"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://646335047a9eead6fadff0e0.mockapi.io/notes",
  }),
  endpoints: (builder) => ({
    getAllNotes: builder.query<INote[], void>({
      query: () => ({
        url: "/",
        transformResponse: (response: { data: INote[] }) => response.data,
      }),
      providesTags: ["Notes"],
    }),
    editNote: builder.mutation<void, INote>({
      query: ({ id, ...put }) => ({
        url: `/${id}`,
        method: "PUT",
        body: put,
      }),
      invalidatesTags: ["Notes"],
    }),
    deleteNote: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),
    createNote: builder.mutation<INote, Omit<INote, "id">>({
      query: (note) => ({
        url: `/`,
        method: "POST",
        body: note,
        transformResponse: (response: { data: INote }) => response.data,
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useGetAllNotesQuery,
  useEditNoteMutation,
  useDeleteNoteMutation,
  useCreateNoteMutation,
} = notesApi;
