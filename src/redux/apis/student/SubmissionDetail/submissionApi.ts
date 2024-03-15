// redux/apis/submissionApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SubmissionReport {
  id: number;
  question: number;
  submission_under_question: number;
  submission_report: string;
  tutor_feedback: string;
}

interface ReportsResponse {
  reports: SubmissionReport[];
}

export const submissionApi = createApi({
  reducerPath: 'submissionApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getSubmissionDetail: builder.query<SubmissionReport, number>({
      query: (submissionId) => 'data/report.json',
      transformResponse: (response: ReportsResponse, meta, arg) => response.reports.find(report => report.submission_under_question === arg),
    }),
  }),
});

export const { useGetSubmissionDetailQuery } = submissionApi;
