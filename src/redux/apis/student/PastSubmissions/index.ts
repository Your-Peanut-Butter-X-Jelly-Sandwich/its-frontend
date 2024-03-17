import { ITSApi } from "@/redux/createApi";

export const pastSubmissionsApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getPastSubmissions: builder.query<
      IPastSubmissionsResponse,
      IPastSubmissionsRequest
    >({
      query: (params) => ({
        url: "/student/submission",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetPastSubmissionsQuery } = pastSubmissionsApi;
