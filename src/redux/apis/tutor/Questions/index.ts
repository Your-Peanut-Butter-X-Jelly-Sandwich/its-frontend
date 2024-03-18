import { ITSApi } from "@/redux/createApi";

export const questionsApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<any, void>({
      query: () => ({
        url: "/tutor/question",
        method: "GET",
      }),
    }),
    deleteQuestion: builder.mutation({
      query: (questionId) => ({
        url: `/tutor/question/${questionId}`,
        method: "DELETE",
      }),
    //   invalidatesTags: [{ type: 'Questions', id: 'LIST' }],
    }),
  }),
});

export const { useGetQuestionsQuery, useLazyGetQuestionsQuery, useDeleteQuestionMutation } = questionsApi;

