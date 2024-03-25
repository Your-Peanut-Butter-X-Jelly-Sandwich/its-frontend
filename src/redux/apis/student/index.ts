import { ITSApi } from '@/redux/createApi';

export const studentApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubmissionDetail: builder.query<
      IStudentSubmissionDetailResponse,
      IStudentSubmissionDetailRequest
    >({
      query: ({ id }) => ({
        url: `/student/submission/${id}`,
        method: 'GET',
      }),
    }),
    getQuestions: builder.query<IStudentQuestionsResponse, IStudentQuestionsRequest>({
      query: () => ({
        url: '/student/question',
        method: 'GET',
      }),
    }),
    getQuestionDetail: builder.query<IStudentQuestionDetailResponse, IStudentQuestionDetailRequest>(
      {
        query: ({ qn_id }) => ({
          url: `/student/question/${qn_id}`,
          method: 'GET',
        }),
      }
    ),

    postCodeSubmission: builder.mutation<
      IStudentCodeSubmissionResponse,
      IStudentCodeSubmissionRequest
    >({
      query: (body) => ({
        url: '/student/submission',
        method: 'POST',
        body,
      }),
    }),
    getPastSubmissions: builder.query<
      IStudentPastSubmissionsResponse,
      IStudentPastSubmissionsRequest
    >({
      query: (params) => ({
        url: '/student/submission',
        method: 'GET',
        params,
      }),
    }),
    getDashboardStats: builder.query<IStudentDashboardStatsResponse, void>({
      query: () => ({
        url: '/student/dashboard-stats',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetSubmissionDetailQuery,
  useGetQuestionsQuery,
  useGetQuestionDetailQuery,
  usePostCodeSubmissionMutation,
  useGetPastSubmissionsQuery,
  useGetDashboardStatsQuery,
} = studentApi;
