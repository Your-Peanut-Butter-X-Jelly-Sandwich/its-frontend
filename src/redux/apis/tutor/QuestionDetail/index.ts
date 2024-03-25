import { ITSApi } from '@/redux/createApi';

export const questionsDetailApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionDetail: builder.query<
      ISTutorQuestionStatisticsResponse,
      ISTutorQuestionDetailRequest
    >({
      query: ({ qn_id }) => ({
        url: `/tutor/question/${qn_id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetQuestionDetailQuery } = questionsDetailApi;
