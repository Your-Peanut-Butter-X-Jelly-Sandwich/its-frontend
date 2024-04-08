import { ITSApi } from '@/redux/createApi';

export const questionApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    addQuestion: builder.mutation<void, ITutorCreateNewQuestionRequest>({
      query: (questionContent) => ({
        url: `/tutor/question`,
        method: 'POST',
        body: questionContent,
      }),
    }),
  }),
});
export const { useAddQuestionMutation } = questionApi;
