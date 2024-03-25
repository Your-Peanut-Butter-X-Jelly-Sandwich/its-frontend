import { ITSApi } from '@/redux/createApi';

export const questionApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubmissions: builder.query<ISTutorSubmissionResponse, number>({
      query: (qn_id) => `/tutor/submission?qn_id=${qn_id}`,
    }),
  }),
});

export const { useGetSubmissionsQuery } = questionApi;
