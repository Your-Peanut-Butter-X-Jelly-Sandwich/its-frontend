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
  }),
});

export const { useGetQuestionDetailQuery } = questionDetailApi;
