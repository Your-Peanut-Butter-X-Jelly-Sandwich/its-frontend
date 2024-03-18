import { ITSApi } from "@/redux/createApi";

export const questionDetailApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionDetail: builder.query<
      IQuestionDetailResponse,
      IQuestionDetailRequest
    >({
      query: ({ qn_id }) => ({
        url: `/student/question/${qn_id}`,
        method: "GET",
      }),
    }),

    postCodeSubmission: builder.mutation<
      ICodeSubmissionResponse,
      ICodeSubmissionRequest
    >({
      query: (body) => ({
        url: "/student/submission",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetQuestionDetailQuery, usePostCodeSubmissionMutation } =
  questionDetailApi;
