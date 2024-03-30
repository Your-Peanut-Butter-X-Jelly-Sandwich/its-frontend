import { ITSApi } from '@/redux/createApi';

export const questionApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionDetail: builder.query<ITutorQuestionDetailResponse, number>({
      query: (qn_id) => `/tutor/question/${qn_id}`,
    }),

    updateQuestionDetail: builder.mutation<void, ITutorQuestionDetailResponse>({
      query: ({ question }) => ({
        url: `/tutor/question/${question.id}`,
        method: 'PATCH',
        body: question,
      }),
    }),
  }),
});

export const { useGetQuestionDetailQuery, useUpdateQuestionDetailMutation } = questionApi;
