import { ITSApi } from '@/redux/createApi';

export const studentApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubmissionDetail: builder.query<
      StudentSubmissionDetailResponse,
      StudentSubmissionDetailRequest
    >({
      query: ({ id }) => ({
        url: `/student/submission/${id}`,
        method: 'GET',
      }),
    }),
    getQuestions: builder.query<StudentQuestionsResponse, StudentQuestionsRequest>({
      query: () => ({
        url: '/student/question',
        method: 'GET',
      }),
    }),
    getQuestionDetail: builder.query<StudentQuestionDetailResponse, StudentQuestionDetailRequest>(
      {
        query: ({ qn_id }) => ({
          url: `/student/question/${qn_id}`,
          method: 'GET',
        }),
      }
    ),

    postCodeSubmission: builder.mutation<
      StudentCodeSubmissionResponse,
      StudentCodeSubmissionRequest
    >({
      query: (body) => ({
        url: '/student/submission',
        method: 'POST',
        body,
      }),
    }),
    getPastSubmissions: builder.query<
      StudentPastSubmissionsResponse,
      StudentPastSubmissionsRequest
    >({
      query: (params) => ({
        url: '/student/submission',
        method: 'GET',
        params,
      }),
    }),
    getDashboardStats: builder.query<StudentDashboardStatsResponse, void>({
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
