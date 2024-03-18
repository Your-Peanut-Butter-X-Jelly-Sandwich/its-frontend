import { ITSApi } from "@/redux/createApi";

export const questionsApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<IQuestionsResponse, IQuestionsRequest>({
      query: () => ({
        url: "/student/question",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetQuestionsQuery } = questionsApi;
