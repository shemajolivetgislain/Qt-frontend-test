import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LOCAL_API_URL } from "../../constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: LOCAL_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      // LOGIN
      login: builder.mutation({
        query: ({ email, password }) => ({
          url: "/user/login/",
          method: "POST",
          body: {
            email,
            password,
          },
        }),
      }),

      // User registration endpoint
      addUser: builder.mutation({
        query: (data) => ({
          url: "/user/create/",
          method: "POST",
          body: data,
        }),
      }),

      // ******************* CRUD blog endpoints ***********************
      listAllBlogs: builder.query({
        query: () => ({
          url: "/blogs/list",
          method: "GET",
        }),
      }),
      blogDetails: builder.query({
        query: (id) => ({
          url: `/blogs/${id}/detail`,
          method: "GET",
        }),
      }),

      addBlog: builder.mutation({
        query: (data) => ({
          url: "/blogs/create",
          method: "POST",
          body: data,
        }),
      }),

      updateBlog: builder.mutation({
        query: ({ id, data }) => ({
          url: `/blogs/${id}`,
          method: "PATCH",
          body: data,
        }),
      }),

      deleteBlog: builder.mutation({
        query: (id) => ({
          url: `/blogs/${id}`,
          method: "DELETE",
        }),
      }),
      //   ***************** End of CRUD Blogs ****************
      //   *********** Start blogs comments ********************************
      listBlogComments: builder.query({
        query: (id) => ({
          url: `/comments/posts/${id}`,
          method: "GET",
        }),
      }),
      addBlogComment: builder.mutation({
        query: ({ id, data }) => ({
          url: `/comments/post/${id}/comment`,
          method: "POST",
          body: data,
        }),
      }),
      updateBlogComment: builder.mutation({
        query: ({ blogId, commentId, comment }) => ({
          url: `/comments/posts/${blogId}/comments/${commentId}`,
          method: "PATCH",
          body: { comment },
        }),
      }),
      deleteBlogComment: builder.mutation({
        query: ({ blogId, commentId }) => ({
          url: `/blogs/${blogId}/comments/${commentId}`,
          method: "DELETE",
        }),
      }),
      //   *********** End blogs comments ********************************
    };
  },
});


export const {
  useLoginMutation,
  useAddUserMutation,
  useLazyListAllBlogsQuery,
  useLazyBlogDetailsQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useLazyListBlogCommentsQuery,
  useAddBlogCommentMutation,
  useUpdateBlogCommentMutation,
} = apiSlice