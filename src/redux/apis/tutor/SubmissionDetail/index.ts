import { ITSApi } from "@/redux/createApi";

export const submissionApi = ITSApi.injectEndpoints({
    endpoints: (builder) => ({
      getSubmissionDetail: builder.query<SubmissionDetail, number>({
        query: (submission_id) => `/tutor/submission/${submission_id}`,
      }),
  
    //   updateSubmissionDetail: builder.mutation<void, SubmissionDetail>({
    //     query: ({ pk }) => ({
    //       url: `/tutor/submission/${pk}`,
    //       method: 'PATCH',
    //       body:  (submissionDetail:any) => submissionDetail,
    //     }),
    //   }),

      updateSubmissionDetail: builder.mutation({
        query: (body) => ({
          url: `/tutor/submission/${body.pk}`,
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json', // Ensure this is set correctly
          },
          body,
        }),
      }),
    }),
  });
  
  
  export const {
    useGetSubmissionDetailQuery,
    useUpdateSubmissionDetailMutation
  } = submissionApi;
  
