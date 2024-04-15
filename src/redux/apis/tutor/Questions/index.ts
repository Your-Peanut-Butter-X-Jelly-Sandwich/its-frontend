import { ITSApi } from '@/redux/createApi';

export const questionsApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<ITutorQuestionsResponse, void>({
      query: () => ({
        url: '/tutor/question',
        method: 'GET',
      }),
    }),
    deleteQuestion: builder.mutation({
      query: (questionId) => ({
        url: `/tutor/question/${questionId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetQuestionsQuery, useLazyGetQuestionsQuery, useDeleteQuestionMutation } =
  questionsApi;
