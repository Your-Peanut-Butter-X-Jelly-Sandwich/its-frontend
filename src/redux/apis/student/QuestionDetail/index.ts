import { ITSApi } from "@/redux/createApi";

export const questionDetailApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionDetail: builder.query<IQuestionDetailResponse, number>({
      query: (questionId) => ({
        url: `/student/question/${questionId}`,
        method: "GET",
      })
    }),
  }),
});

export const { useGetQuestionDetailQuery } = questionDetailApi;