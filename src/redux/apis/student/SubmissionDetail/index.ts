import { ITSApi } from "@/redux/createApi";

export const submissionDetailApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubmissionDetail: builder.query<
      ISubmissionDetailResponse,
      ISubmissionDetailRequest
    >({
      query: ({ id }) => ({
        url: `/student/submission/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSubmissionDetailQuery } = submissionDetailApi;
